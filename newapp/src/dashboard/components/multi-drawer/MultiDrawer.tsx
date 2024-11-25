import {ReactNode, useState} from "react";
import {useDrawerResult} from "../../../hooks/use-drawer.tsx";
import {Box, Tab, Tabs} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {Close} from "@mui/icons-material";

export interface TabComponentProps<T> {
    value: T
    onChange: (value: T, isValid: boolean) => void
}

export interface MultiDrawerTab<T> {
    name: string
    component: (props: TabComponentProps<T>) => ReactNode
    isInitiallyValid?: boolean
}

export interface MultiDrawerProps<T> {
    title: string
    saveText?: string
    tabs: MultiDrawerTab<T>[]
    sx?: SxProps
    initialValue: Partial<T>
    onClose?: () => void
    onSave?: (value: T, onClose?: () => void) => void
}

export function MultiDrawer<T>(props: MultiDrawerProps<T>) {
    const [currentTab, setCurrentTab] = useState<MultiDrawerTab<T>>(props.tabs[0])
    const [value, setValue] = useState<T>(props.initialValue as T)
    const [isValid, setIsValid] = useState<{
        [tabName: string]: boolean
    }>(Object.fromEntries(props.tabs.map(tab => [tab.name, tab.isInitiallyValid ?? true])))
    const currentTabIndex = props.tabs.indexOf(currentTab)

    const isAllTabsValid = props.tabs.every(tab => isValid[tab.name])

    if (props.tabs.length === 0) {
        throw new Error('At least one tab is required')
    }

    return (
        <Box className='MltDrw' sx={{
            margin: 3,
            ...props.sx,
        }} display='flex' flexDirection='row'>
            {props.tabs.length > 1 && <Box className='MD-dv1' width='280px'>
                <div className="fnt-600-20-Inter clr101828">{props.title}</div>
                <Tabs className="MD-dv1-1"
                      orientation="vertical"
                      value={currentTabIndex}
                      onChange={(_, tab) => {
                          setCurrentTab(props.tabs[tab])
                      }}>
                    {props.tabs.map(tab => {
                        return <Tab label={tab.name} className={`${!isValid[tab.name] ? 'invalid' : ''} `}/>
                    })}
                </Tabs>
            </Box>}

            <hr className="MD-hr1"></hr>

            <Box className="MD-dv2" flexGrow={1}>

                <div className="MD-dv2-add">
                    <div
                        className="fnt-600-20-Inter clr101828">{currentTab.name == '' ? props.title : currentTab.name}</div>
                    <Button onClick={() => {
                        if (props.onClose) {
                            props.onClose()
                        }
                    }}>
                        <Close/>
                    </Button>
                </div>

                <Box minHeight='200px' mt={3}>
                    {currentTab.component({
                        value: value,
                        onChange: (value, isTabValid) => {
                            setValue(value)
                            setIsValid({
                                ...isValid,
                                [currentTab.name]: isTabValid,
                            })
                        }
                    })}
                </Box>
                <Box className="MD-dv3" display='flex' flexDirection='row'>

                    <div className="MD-dv3-1">
                        {currentTabIndex > 0 && <Button className="MD-dv3-btn1" variant='contained' onClick={() => {
                            setCurrentTab(props.tabs[currentTabIndex - 1])
                        }}>
                            Prev
                        </Button>}
                        {currentTabIndex < props.tabs.length - 1 && props.tabs.length > 1 &&
                            <Button className="MD-dv3-btn1" sx={{marginLeft: 1}} variant='contained' onClick={() => {
                                setCurrentTab(props.tabs[currentTabIndex + 1])
                            }}>
                                Next
                            </Button>}
                    </div>

                    <Box flexGrow={1}/>
                    <Button className="MD-dv3-btn2" variant='text'
                            onClick={() => {
                                if (props.onClose) {
                                    props.onClose()
                                }
                            }}>
                        Cancel
                    </Button>
                    {props.onSave && <Button className="MD-dv3-btn2" disabled={!isAllTabsValid}
                                             sx={{marginLeft: 1}}
                                             variant='contained'
                                             color='primary'
                                             onClick={() => {
                                                 if (!isAllTabsValid) {
                                                     toast.error('Form is not valid, please check the form fields')
                                                     return
                                                 }
                                                 props.onSave!(value, props.onClose)
                                             }}>
                        {props.saveText ?? 'Save'}
                    </Button>}
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
