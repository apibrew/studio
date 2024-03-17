import {Resource} from "@apibrew/react";
import {TableContainer} from "./table/TableContainer";
import './DataTable.scss'
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {Api, Code, DataArray, Schema} from "@mui/icons-material";
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {ApiDocModal} from "../api-doc/ApiDocModal";
import {SchemaContainer as SchemaContainerNew} from "./schema-new/SchemaContainer";
import {useDrawer} from "../../hooks/use-drawer";
import {ResourceNanoDrawer} from "../resource-nano-drawer/ResourceNanoDrawer";
import {useAnalytics} from "../../hooks/use-analytics";
import {ResourceDrawer} from "../resource-drawer/ResourceDrawer";

export interface DataTableProps {
    resource: Resource
    reloadResource?: () => void
}

export function DataTable(props: DataTableProps) {
    const drawer = useDrawer()
    const [searchParams, setSearchParams] = useSearchParams();
    const [mode, setMode] = useState<'data' | 'schema' | 'schema-new'>(searchParams.get('mode') === 'schema-new' ? 'schema-new' : 'data')
    const analytics = useAnalytics()

    const commonButtons = (
        <Stack direction='row' spacing={1}>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(<ResourceDrawer
                            new={false}
                            onClose={() => {
                                drawer.close()
                                props.reloadResource?.()
                            }}
                            resource={props.resource}/>)

                        analytics.click('update-resource')
                    }}>
                <Api fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Update Resource</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(
                            <ResourceNanoDrawer
                                namespace={props.resource.namespace.name}
                                resource={props.resource.name}
                                onClose={drawer.close}/>
                        )

                        analytics.click('nano-code')
                    }}>
                <Code fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Nano code</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(<ApiDocModal
                            onClose={() => {
                                drawer.close()
                            }}
                            resource={props.resource}/>)

                        analytics.click('api-doc')
                    }}>
                <Api fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Api Doc</span>
            </Button>
            <ToggleButtonGroup value={mode}>
                <ToggleButton color='secondary'
                              value={'data'}
                              onClick={() => {
                                  setMode('data')
                                  setSearchParams({
                                      ...searchParams,
                                      mode: 'data'
                                  })
                                  props.reloadResource?.()
                                  analytics.click('tab', 'data')
                              }}
                              size='small'>
                    <DataArray fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Data</span>
                </ToggleButton>
                {/*<ToggleButton color='secondary'*/}
                {/*              value={'schema'}*/}
                {/*              onClick={() => {*/}
                {/*                  setMode('schema')*/}
                {/*                  setSearchParams({*/}
                {/*                      ...searchParams,*/}
                {/*                      mode: 'schema'*/}
                {/*                  })*/}
                {/*              }}*/}
                {/*              size='small'>*/}
                {/*    <Schema fontSize='small'/>*/}
                {/*    <span style={{marginLeft: '3px'}}>Schema</span>*/}
                {/*</ToggleButton>*/}
                <ToggleButton color='secondary'
                              value={'schema-new'}
                              onClick={() => {
                                  setMode('schema-new')
                                  setSearchParams({
                                      ...searchParams,
                                      mode: 'schema-new'
                                  })
                                  props.reloadResource?.()
                                  analytics.click('tab', 'schema')
                              }}
                              size='small'>
                    <Schema fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Schema</span>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )

    return <>
        {drawer.render()}
        {mode === 'data' && <TableContainer
            resource={props.resource}
            commonButtons={commonButtons}
        />}
        {/*{mode === 'schema' && <SchemaContainer*/}
        {/*    resource={props.resource}*/}
        {/*    commonButtons={commonButtons}*/}
        {/*/>}*/}
        {mode === 'schema-new' && <SchemaContainerNew
            resource={props.resource}
            commonButtons={commonButtons}
        />}
    </>
}