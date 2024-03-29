import Box from "@mui/material/Box";
import {MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Add, Delete} from "@mui/icons-material";
import {Permission, Role, User} from "@apibrew/client/model";

type Operation = Permission["operation"]
type Permit = Permission["permit"]

export interface PermissionsInputAdvancedProps {
    mode: 'user' | 'role' | 'resource' | 'namespace'
    constraints: Permission[]
    setConstraints: (constraints: Permission[]) => void
}

export function PermissionsInputAdvanced(props: PermissionsInputAdvancedProps) {
    return <Box>
        <IconButton onClick={() => {
            props.setConstraints([...props.constraints, {
                namespace: 'namespace-1',
                resource: 'resource-1',
                operation: 'FULL',
                permit: 'ALLOW'
            } as Permission])
        }}>
            <Add/>
        </IconButton>
        <Table size='small'>
            <TableHead>
                <TableRow>
                    <TableCell>Namespace</TableCell>
                    <TableCell>Resource</TableCell>
                    <TableCell>Property</TableCell>
                    <TableCell>Operation</TableCell>
                    {/*<TableCell>Before</TableCell>*/}
                    {/*<TableCell>After</TableCell>*/}
                    {props.mode === 'resource' && <TableCell>Username</TableCell>}
                    {props.mode === 'resource' && <TableCell>Role</TableCell>}
                    <TableCell style={{width: '50px'}}>Permit</TableCell>
                    <TableCell style={{width: '50px'}}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.constraints.map((constraint, index) => <TableRow key={index}>
                    <TableCell sx={{padding: 1}}>
                        <TextField sx={{margin: 0}}
                                   disabled={props.mode === 'namespace' || props.mode == 'resource'}
                                   size='small'
                                   variant='outlined'
                                   value={constraint.namespace}
                                   onChange={e => {
                                       const updatedConstraints = [...props.constraints]
                                       updatedConstraints[index].namespace = e.target.value
                                       props.setConstraints(updatedConstraints)
                                   }}/>
                    </TableCell>
                    <TableCell sx={{padding: 1}}>
                        <TextField disabled={props.mode === 'resource'}
                                   size='small'
                                   variant='outlined'
                                   value={constraint.resource}
                                   onChange={e => {
                                       const updatedConstraints = [...props.constraints]
                                       updatedConstraints[index].resource = e.target.value
                                       props.setConstraints(updatedConstraints)
                                   }}/>
                    </TableCell>
                    <TableCell sx={{padding: 1}}>
                        <Select sx={{width: '100%'}}
                                size='small'
                                variant='outlined'
                                value={constraint.operation}
                                onChange={e => {
                                    const updatedConstraints = [...props.constraints]
                                    updatedConstraints[index].operation = e.target.value as string as Operation
                                    props.setConstraints(updatedConstraints)
                                }}>
                            <MenuItem value='FULL'>full</MenuItem>
                            <MenuItem value='READ'>read</MenuItem>
                            <MenuItem value='UPDATE'>update</MenuItem>
                            <MenuItem value='CREATE'>create</MenuItem>
                            <MenuItem value='DELETE'>delete</MenuItem>
                        </Select>
                    </TableCell>
                    {props.mode === 'resource' && <TableCell sx={{padding: 1}}>
                        <TextField size='small'
                                   variant='outlined'
                                   value={constraint.user?.username}
                                   onChange={e => {
                                       const updatedConstraints = [...props.constraints]
                                       updatedConstraints[index].user = {
                                           username: e.target.value,
                                       } as User
                                       props.setConstraints(updatedConstraints)
                                   }}/>
                    </TableCell>}
                    {props.mode === 'resource' && <TableCell sx={{padding: 1}}>
                        <TextField size='small'
                                   variant='outlined'
                                   value={constraint.role?.name}
                                   onChange={e => {
                                       const updatedConstraints = [...props.constraints]
                                       updatedConstraints[index].role = {
                                           name: e.target.value
                                       } as Role
                                       props.setConstraints(updatedConstraints)
                                   }}/>
                    </TableCell>}
                    <TableCell sx={{padding: 1}}>
                        <Select sx={{width: '100%'}}
                                size='small'
                                variant='outlined'
                                value={constraint.permit}
                                onChange={e => {
                                    const updatedConstraints = [...props.constraints]
                                    updatedConstraints[index].permit = e.target.value as string as Permit
                                    props.setConstraints(updatedConstraints)
                                }}>
                            <MenuItem value='ALLOW'>allow</MenuItem>
                            <MenuItem value='REJECT'>reject</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell sx={{padding: 1}}>
                        <IconButton onClick={() => {
                            const updatedConstraints = [...props.constraints]
                            updatedConstraints.splice(index, 1)
                            props.setConstraints(updatedConstraints)
                        }}>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </Box>
}
