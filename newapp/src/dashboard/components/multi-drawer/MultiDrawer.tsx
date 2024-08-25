import {ReactNode, useState} from "react";
import {useDrawerResult} from "../../../hooks/use-drawer.tsx";
import {Box, Tab, Tabs} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export interface TabComponentProps<T> {
    value: T
    onChange: (value: T, isValid: boolean) => void
}

export interface MultiDrawerTab<T> {
    name: string
    component: (props: TabComponentProps<T>) => ReactNode
}

export interface MultiDrawerProps<T> {
    title: string
    tabs: MultiDrawerTab<T>[]
    sx?: SxProps
    initialValue: Partial<T>
    onClose?: () => void
    onSave?: (value: T, onClose?: () => void) => void
}

export function MultiDrawer<T>(props: MultiDrawerProps<T>) {
    const [currentTab, setCurrentTab] = useState<MultiDrawerTab<T>>(props.tabs[0])
    const [value, setValue] = useState<T>(props.initialValue as T)
    const [isValid, setIsValid] = useState<boolean>(false)
    const currentTabIndex = props.tabs.indexOf(currentTab)


    if (props.tabs.length === 0) {
        throw new Error('At least one tab is required')
    }

    return (
        <Box sx={{
            margin: 3,
            ...props.sx,
        }} display='flex' flexDirection='row'>
            {props.tabs.length > 1 && <Box>
                <Tabs
                    orientation="vertical"
                    onChange={(_, tab) => {
                        setCurrentTab(props.tabs[tab])
                    }}>
                    {props.tabs.map(tab => {
                        return <Tab title={tab.name}/>
                    })}
                </Tabs>
            </Box>}
            <Box flexGrow={1}>
                <span>{currentTab.name == '' ? props.title : currentTab.name}</span>
               <Box mt={2}>
                   {currentTab.component({
                       value: value,
                       onChange: (value, isValid) => {
                           setValue(value)
                           setIsValid(isValid)
                       }
                   })}
               </Box>
                <Box mt={2} display='flex' flexDirection='row'>
                    {currentTabIndex > 0 && <Button variant='contained'>
                        Prev
                    </Button>}
                    {currentTabIndex < props.tabs.length - 1 && props.tabs.length > 1 &&
                        <Button sx={{marginLeft: 1}} variant='contained'>
                            Next
                        </Button>}
                    <Box flexGrow={1}/>
                    <Button variant='text'
                            onClick={() => {
                                if (props.onClose) {
                                    props.onClose()
                                }
                            }}>
                        Cancel
                    </Button>
                    <Button disabled={!isValid}
                            sx={{marginLeft: 1}}
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                if (!isValid) {
                                    toast.error('Form is not valid, please check the form fields')
                                    return
                                }
                                if (props.onSave) {
                                    props.onSave(value, props.onClose)
                                }
                            }}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export function openMultiDrawer<T>(drawer: useDrawerResult, props: MultiDrawerProps<T>) {
    drawer.open(<MultiDrawer {...props} onClose={() => {
        drawer.close()

        if (props.onClose) {
            props.onClose()
        }
    }}/>)
}
