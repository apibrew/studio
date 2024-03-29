import React, {useEffect, useState} from "react";
import {ChevronRight, ExpandMore} from "@mui/icons-material";
import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {prepareAccessMap, prepareConstraintsFromAccessMap} from "./access-map.computer";
import {AccessMap, PermissionChecks} from "./model";
import {
  computeNamespaceIndeterminate,
  computeNamespaceValue,
  computeResourceValue,
  computeSystemIndeterminate,
  computeSystemValue,
  isolate,
  namespacePermissions,
  resourcePermissions
} from "./helper";
import {Namespace, Permission, Resource} from "@apibrew/client/model";
import {BaseLogger} from "../../logging";
import {useClient, useRecords} from "@apibrew/react";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";

const logger = BaseLogger.child({component: 'PermissionsInputSimple'})

export interface PermissionsInputSimpleProps {
  mode: 'user' | 'role' | 'resource' | 'namespace'
  constraints: Permission[]
  setConstraints: (constraints: Permission[]) => void
}

export function PermissionsInputSimple(props: PermissionsInputSimpleProps) {
  const namespaces = useRecords<Namespace>(NamespaceEntityInfo) || []
  const client = useClient()
  const [resources, setResources] = useState<Resource[]>([])

  logger.trace('render', {namespaces, resources, props})

  useEffect(() => {
    async function loadResources() {
      const resp = await client.listResources()
      if (!resp) {
        throw new Error('Failed to load resources')
      } else {
        setResources(resp)
        logger.debug('loaded resources', {resp})
      }
    }

    loadResources()
  }, [])

  const [open, setOpen] = useState<{
    [k: string]: boolean
  }>({
    'namespace-default': true
  })

  const [accessMap, setAccessMap] = useState<AccessMap>({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (namespaces.length > 0 && resources.length > 0) {
      let updatedAccessMap = prepareAccessMap(accessMap, namespaces, resources, props.constraints);

      setAccessMap(updatedAccessMap)
      setReady(true)

      logger.debug('updated access map', {updatedAccessMap})
    }
  }, [
    namespaces, resources
  ])

  useEffect(() => {
    updateConstraints()

    logger.debug('updated constraints', {constraints: props.constraints})
  }, [accessMap])

  const updateConstraints = () => {
    if (Object.keys(accessMap).length === 0) {
      return
    }
    props.setConstraints(prepareConstraintsFromAccessMap(props.constraints, accessMap, namespaces, resources))
  }

  const systemPermissions = accessMap['system']

  if (!ready) {
    return <>Loading...</>
  }

  return <>
    <Table size={'small'}>
      <TableHead>
        <TableRow>
          <TableCell width={'300px'}><b>Name</b></TableCell>
          <TableCell><b>Full</b></TableCell>
          <TableCell><b>Read</b></TableCell>
          <TableCell><b>Create</b></TableCell>
          <TableCell><b>Update</b></TableCell>
          <TableCell><b>Delete</b></TableCell>
          <TableCell><b>Options</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <b>All</b>
          </TableCell>
          {systemPermissions && <PermissionCheckBoxGroup value={computeSystemValue(accessMap)}
                                                         indeterminate={computeSystemIndeterminate(accessMap, namespaces)}
                                                         onChange={value => {
                                                           setAccessMap({
                                                             ...accessMap,
                                                             [`system`]: value
                                                           })
                                                         }}/>}
          <TableCell/>
        </TableRow>
        {namespaces.map(namespace => <React.Fragment key={namespace.name}>
          <TableRow>
            <TableCell>
              <span>Namespace: <b>{namespace.name}</b></span>
              <IconButton onClick={() => setOpen({
                ...open,
                [`namespace-${namespace.name}`]: !open[`namespace-${namespace.name}`]
              })}>
                {open[`namespace-${namespace.name}`] ? <ExpandMore/> : <ChevronRight/>}
              </IconButton>
            </TableCell>
            {namespacePermissions(accessMap, namespace.name) &&
              <PermissionCheckBoxGroup
                value={computeNamespaceValue(accessMap, namespace)}
                indeterminate={computeNamespaceIndeterminate(accessMap, namespace, resources)}
                onChange={value => {
                  setAccessMap({
                    ...accessMap,
                    [`namespace-${namespace.name}`]: value
                  })
                }}/>}
            <TableCell/>
          </TableRow>
          {open[`namespace-${namespace.name}`] && resources.filter(item => item.namespace.name === namespace.name)
            .map(resource => <React.Fragment key={resource.name}>
              <TableRow>
                <TableCell>
                  <Box sx={{marginLeft: '30px'}}>
                    <span>Resource: <b>{resource.name}</b></span>
                    {/* <IconButton onClick={() => setOpen({
                                            ...open,
                                            [`resource-${resource.namespace.name}/${resource.name}`]: !open[`resource-${resource.namespace.name}/${resource.name}`]
                                        })}>
                                            {open[`resource-${resource.namespace.name}/${resource.name}`] ? <ExpandMore /> :
                                                <ChevronRight />}
                                        </IconButton> */}
                  </Box>
                </TableCell>
                {resourcePermissions(accessMap, resource) &&
                  <PermissionCheckBoxGroup
                    value={computeResourceValue(accessMap, resource)}
                    allowOptions={true}
                    onChange={value => {
                      setAccessMap({
                        ...accessMap,
                        [`resource-${resource.namespace.name}/${resource.name}`]: isolate(value, computeNamespaceValue(accessMap, namespace), resourcePermissions(accessMap, resource))
                      })
                    }}/>}
              </TableRow>

              {/* {open[`resource-${resource.namespace.name}/${resource.name}`] && resource.properties.map(property =>
                                <TableRow key={property.name}>
                                    <TableCell>
                                        <Box sx={{ marginLeft: '70px' }}>
                                            <span>Property: <b>{property.name}</b></span>
                                        </Box>
                                    </TableCell>
                                    {accessMap[`resource-${resource.namespace.name}/${resource.name}-${property.name}`] &&
                                        <PermissionCheckBoxGroup
                                            value={computeResourcePropertyValue(accessMap, resource, property)}
                                            onChange={value => {
                                                setAccessMap({
                                                    ...accessMap,
                                                    [`resource-${resource.namespace.name}/${resource.name}-${property.name}`]: isolate(value, computeResourceValue(accessMap, resource), resourcePermissions(accessMap, resource)),
                                                })
                                            }} />}
                                    <TableCell />
                                </TableRow>)} */}
            </React.Fragment>)}
        </React.Fragment>)}
      </TableBody>
    </Table>
  </>
}

export interface PermissionCheckBoxGroupProps {
  value: PermissionChecks
  indeterminate?: PermissionChecks
  onChange: (value: PermissionChecks) => void
  allowOptions?: boolean
}

export function PermissionCheckBoxGroup(props: PermissionCheckBoxGroupProps) {
  const controls = ['full', 'read', 'create', 'update', 'delete']

  return <>
    {controls.map(item => {
      return <TableCell key={item}>
        <Checkbox checked={props.value['full'] || props.value[item as keyof PermissionChecks]}
                  indeterminate={!(props.value['full'] || props.value[item as keyof PermissionChecks]) && props?.indeterminate && (props.indeterminate['full'] || props.indeterminate[item as keyof PermissionChecks])}
                  onChange={e => {
                    if (item != 'full' && props.value['full']) {
                      return
                    }
                    props.onChange({
                      ...props.value,
                      [item]: e.target.checked
                    })
                  }}/>
      </TableCell>
    })}
    {/*{props.allowOptions && <>*/}
    {/*    {moreControls.map(item => {*/}
    {/*        return <TableCell key={item}>*/}
    {/*            <Tooltip title={'Allow owned only'}>*/}
    {/*                <Checkbox checked={props.value[item]}*/}
    {/*                          onChange={e => {*/}
    {/*                              props.onChange({*/}
    {/*                                  ...props.value,*/}
    {/*                                  [item]: e.target.checked*/}
    {/*                              })*/}
    {/*                          }}/>*/}
    {/*            </Tooltip>*/}
    {/*        </TableCell>*/}
    {/*    })}*/}
    {/*</>}*/}
  </>
}
