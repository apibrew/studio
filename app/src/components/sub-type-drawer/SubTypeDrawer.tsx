import {DrawerComponent} from "../common/DrawerComponent";
import {SubTypesForm} from "../sub-types-form/SubTypesForm";

import {SubType} from "@apibrew/client/model/resource";
import {Button} from "@mui/material";
import {useState} from "react";

export interface SubTypeDrawerProps {
    type: SubType
    onChange: (updated: SubType) => void
    onClose: () => void
}

export function SubTypeDrawer(props: SubTypeDrawerProps) {
    const [value, setValue] = useState<SubType>(props.type)

    return (<DrawerComponent title={'Sub Type: ' + value.name}
                             content={<SubTypesForm
                                 subType={value}
                                 onChange={setValue}/>}
                             actions={<>
                                 <Button variant='contained'
                                         size='small'
                                         color='success'
                                         onClick={() => {
                                             props.onChange(value)
                                             props.onClose()
                                         }
                                         }>Apply</Button>
                                 <Button variant='outlined'
                                         size='medium'
                                         color='primary'
                                         onClick={() => props.onClose()}>Cancel</Button>
                             </>}/>)
}
