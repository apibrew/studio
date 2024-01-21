import {Resource} from "@apibrew/react";
import {TableContainer} from "./table/TableContainer";
import './DataTable.scss'
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {Api, Code, DataArray, Schema} from "@mui/icons-material";
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {ApiDocModal} from "../api-doc/ApiDocModal";
import {SchemaContainer} from "./schema/SchemaContainer";

export interface DataTableProps {
    resource: Resource
}

export function DataTable(props: DataTableProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mode, setMode] = useState<'data' | 'schema'>(searchParams.get('mode') === 'schema' ? 'schema' : 'data')
    const [apiDocOpen, setApiDocOpen] = useState<boolean>(false)

    const commonButtons = (
        <Stack direction='row' spacing={1}>
            <Button color='secondary'
                    size='small'>
                <Code fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Nano code</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        setApiDocOpen(true)
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
                              }}
                              size='small'>
                    <DataArray fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Data</span>
                </ToggleButton>
                <ToggleButton color='secondary'
                              value={'schema'}
                              onClick={() => {
                                  setMode('schema')
                                  setSearchParams({
                                      ...searchParams,
                                      mode: 'schema'
                                  })
                              }}
                              size='small'>
                    <Schema fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Schema</span>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )

    return <>
        <ApiDocModal open={apiDocOpen}
                     onClose={() => {
                         setApiDocOpen(false)
                     }}
                     resource={props.resource}/>
        {mode === 'data' && <TableContainer
            resource={props.resource}
            commonButtons={commonButtons}
        />}
        {mode === 'schema' && <SchemaContainer
            resource={props.resource}
            commonButtons={commonButtons}
        />}
    </>
}