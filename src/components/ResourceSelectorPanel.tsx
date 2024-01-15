import {
    Box,
    FormControl, Icon,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {Namespace, Resource, useRecords} from "@apibrew/react";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {LoadingOverlay} from "./LoadingOverlay";
import {RemoveRedEye, TableChart} from "@mui/icons-material";

export function ResourceSelectorPanel() {
    const [resource, setResource] = useState<Resource>()
    const [namespace, setNamespace] = useState<Namespace>({
        name: 'default'
    } as Namespace)

    const namespacesAll = useRecords<Namespace>(NamespaceEntityInfo)
    const resourcesAll = useRecords<Resource>(ResourceEntityInfo)

    const namespaces = namespacesAll ? namespacesAll.filter(item => item.name !== 'nano') : undefined
    const resources = resourcesAll ? resourcesAll.filter(item => item.namespace.name === namespace.name) : undefined

    const loaded = namespaces && resources

    return <>
        <Box id='left-top-bar'
             sx={{
                 height: '31px',
                 padding: '8px 16px',
                 borderBottom: '1px solid #e6e8ec',
                 flexDirection: 'row',
                 display: 'flex',
             }}>
            <Typography sx={{
                fontSize: '16px',
                padding: '4px',
                textAlign: 'center'
            }}>
                Resource Selector
            </Typography>
        </Box>
        {!loaded && <LoadingOverlay/>}
        {namespaces && resources && <Box sx={{
            padding: '16px',
        }}>
            <FormControl fullWidth
                         size='small'
                         variant={'filled'}
            >
                <InputLabel>Namespace</InputLabel>
                <Select fullWidth
                        value={namespace.name}
                        onChange={(event) => {
                            setNamespace(namespaces.find(item => item.name === event.target.value)!)
                        }}
                        size='small'>
                    {namespaces.map(item => <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <List>
                {resources.map(resource => <ListItem disablePadding value={resource.name}>
                    <ListItemButton sx={{
                        padding: 0,
                    }}>
                        <Icon sx={{
                            marginRight: 0.6
                        }}>
                            <TableChart color='secondary' fontSize='small'/>
                        </Icon>
                        <Typography color='primary'>{resource.name}</Typography>
                    </ListItemButton>
                </ListItem>)}
            </List>
        </Box>}
    </>;
}