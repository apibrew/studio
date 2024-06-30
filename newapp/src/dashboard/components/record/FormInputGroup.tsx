import {Property, Resource} from "@apibrew/client/model";
import {makeProperties} from "../../../util/property";
import {useMemo} from "react";
import {FormInput} from "./FormInput";
import {FormControl, FormLabel} from "@mui/material";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {Delete} from "@mui/icons-material";

export interface FormInputGroupProps {
  resource: Resource
  properties: { [key: string]: Property }
  errors: { [key: string]: string }
  readOnly: boolean
  depth: number

  value?: { [key: string]: any }
  onChange: (value: { [key: string]: any }) => void
}

export function FormInputGroup(props: FormInputGroupProps) {
  const properties = useMemo(() => makeProperties(props.properties), [props.properties])

  const formId = 'fi-' + Math.random().toString(36).substring(7)

  return <>
    {properties.map(item => <Box
      key={item.name}
      m={1}>
      <FormControl>
        <FormLabel style={{
          display: 'inline'
        }}
                   htmlFor={formId}>
          <span>{item.property.title ?? item.name}</span>
          {!props.readOnly && <Tooltip title={"Set Null"}>
            <IconButton style={{
              display: 'inline'
            }}
                        onClick={() => {
                          const currentValue = props.value ?? {}

                          props.onChange({
                            ...currentValue,
                            [item.name]: null
                          })
                        }}>
              <Delete/>
            </IconButton>
          </Tooltip>}
        </FormLabel>
        <FormInput
          key={item.name}
          sx={{
            width: '500px'
          }}
          depth={props.depth + 1}
          resource={props.resource}
          property={item.property}
          required={item.property.required}
          readOnly={props.readOnly}
          value={props.value ? props.value[item.name] : null}
          onChange={value => {
            if (props.readOnly) {
              return
            }
            const currentValue = props.value ?? {}

            props.onChange({
              ...currentValue,
              [item.name]: value
            })
          }}
        />
        {item.property.description &&
          <FormHelperText id="my-helper-text">{item.property.description}</FormHelperText>}

        {props.errors[item.name] && <FormHelperText error={true}
                                                    id="my-helper-text">{props.errors[item.name]}</FormHelperText>}
      </FormControl>
    </Box>)}
  </>
}
