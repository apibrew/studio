import {PropertyValue, PropertyValueProps} from "./PropertyValue";
import {Box, IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";

export function ListValue(props: PropertyValueProps) {
    const arr = props.value as [] || []

    return <Box>
        {arr.map((item, index) => <Box display='flex'>
            <span style={{
                marginLeft: '5px',
                marginRight: '5px'
            }}>
                <span className='cell-hand unselectable'
                      style={{
                          marginRight: '5px'
                      }}
                      onClick={() => {
                          props.onChange([
                              ...arr.slice(0, index),
                              ...arr.slice(index + 1)
                          ])
                      }}>x</span>
                <span>-</span>
            </span>
            <Box>
                <PropertyValue resource={props.resource}
                               property={props.property.item}
                               value={item}
                               onChange={(updated) => {
                                   props.onChange([
                                       ...arr.slice(0, index),
                                       updated,
                                       ...arr.slice(index + 1)
                                   ])
                               }}/>
            </Box>
        </Box>)}
        <IconButton
            onClick={() => {
                props.onChange([...arr, undefined])
            }}
            size='small'
            sx={{
                marginLeft: '-5px'
            }}>
            <Add fontSize='small'/>
        </IconButton>
    </Box>
}