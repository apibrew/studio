import {Resource} from "@apibrew/client/model";
import {FormInputGroup} from "../record/FormInputGroup";
import {UserResource} from "@apibrew/client/model/user";
import Box from "@mui/material/Box";
import {filterMap} from "../../util/map";
import {isSpecialProperty, withPropertyOrder} from "../../util/property";
import {PermissionsInput} from "../security/PermissionsInput";
import {RoleResource} from "@apibrew/client/model/role";
import {Role} from "@apibrew/react";

export interface RoleFormProps {
  readOnly: boolean
  record: Role
  errors: { [key: string]: string }
  onChange: (record: Role) => void
}

const roleResource = (RoleResource as Resource)
const systemProperties = filterMap(roleResource.properties, (key, property) => isSpecialProperty(property))

export function RoleForm(props: RoleFormProps) {
  return <>
    <FormInputGroup resource={UserResource as Resource}
                    properties={{
                      "name": withPropertyOrder(roleResource.properties["name"], 0),
                    }}
                    errors={props.errors}
                    readOnly={props.readOnly}
                    depth={0}
                    value={props.record}
                    onChange={val => {
                      props.onChange(val as any)
                    }}/>

    <hr/>
    <h3>Permissions</h3>
    {props.record.permissions && <PermissionsInput mode={'user'}
                                                   value={props.record.permissions ? props.record.permissions : []}
                                                   onChange={permissions => {

                                                     props.onChange({...props.record, permissions})
                                                   }}/>}

    {props.record.id && <Box>
      <hr/>
      <h3>System Properties:</h3>
      <FormInputGroup resource={roleResource}
                      readOnly={true}
                      value={props.record}
                      depth={0}
                      errors={props.errors}
                      properties={systemProperties}
                      onChange={value => {
                        props.onChange(value as any)
                      }}

      />
    </Box>}
  </>;
}
