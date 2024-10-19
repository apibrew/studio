import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useStateContext} from "../../context/StateContext.tsx";
import {CustomPage, Settings} from "../../model/settings.ts";
import Button from "@mui/material/Button";
import {useState} from "react";

export function CustomPagesPage() {
    const [settings, updateSettings] = useStateContext<Settings>()

    const customPages = settings.customPages || []
    const updateCustomPages = (customPages: CustomPage[]) => {
        updateSettings({
            ...settings,
            customPages
        })
    }

    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({})

    return (
        <Box>
            <Button onClick={() => {
                updateCustomPages([
                    ...customPages,
                    {
                        name: 'New Page',
                        route: '/new-page',
                        location: 'top',
                        showInMenu: true
                    }
                ])
            }}>Add</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Route</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Menu</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customPages.map((customPage, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            {!editMode[index] && (<>
                                <TableCell>{customPage.name}</TableCell>
                                <TableCell>{customPage.route}</TableCell>
                                <TableCell>{customPage.location}</TableCell>
                                <TableCell>{customPage.showInMenu ? 'Y' : 'N'}</TableCell>
                            </>)}
                            {editMode[index] && (<>
                                <TableCell>
                                    <input value={customPage.name} onChange={(e) => {
                                        updateCustomPages(customPages.map((p, i) => i === index ? {
                                            ...p,
                                            name: e.target.value
                                        } : p))
                                    }}/>
                                </TableCell>
                                <TableCell><input value={customPage.route} onChange={(e) => {
                                    updateCustomPages(customPages.map((p, i) => i === index ? {
                                        ...p,
                                        route: e.target.value
                                    } : p))
                                }}/></TableCell>
                                <TableCell><input value={customPage.location} onChange={(e) => {
                                    updateCustomPages(customPages.map((p, i) => i === index ? {
                                        ...p,
                                        location: e.target.value
                                    } : p))
                                }}/></TableCell>
                                <TableCell><input type='checkbox' checked={customPage.showInMenu} onChange={(e) => {
                                    updateCustomPages(customPages.map((p, i) => i === index ? {
                                        ...p,
                                        showInMenu: e.target.checked
                                    } : p))
                                }}/></TableCell>
                            </>)}
                            <TableCell>
                                <Button onClick={() => {
                                    setEditMode({
                                        ...editMode,
                                        [index]: true
                                    })
                                }}>Edit</Button>
                                <Button onClick={() => {
                                    updateCustomPages(customPages.filter((_, i) => i !== index))
                                }}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
