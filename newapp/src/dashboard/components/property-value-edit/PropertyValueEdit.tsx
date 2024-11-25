import {Property, Resource} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {ReferenceValueSelector} from "../ReferenceValueSelector";
import {IconButton} from "@mui/material";
import {EditNote} from "@mui/icons-material";
import {File} from "../../model/file.ts";
import {FileUploadDrawer} from "../storage/FileUpload.tsx";
import {isAnnotationEnabled} from "../../../util/annotation.ts";
import {PropertyNanoDrawer} from "../property-nano-drawer/PropertyNanoDrawer.tsx";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {PropertyEditor} from "../property-editor/PropertyEditor.tsx";

export interface PropertyValueEditProps {
    resource: Resource
    property: Property
    propertyName: string
    value: any
    onChange: (value: any) => void
    autoOpen?: boolean
}

export function PropertyValueEdit(props: PropertyValueEditProps) {
    const drawer = useDrawer()

    switch (props.property.type) {
        case Type.BOOL:
            return <input type='checkbox'
                          style={{
                              width: '25px',
                          }}
                          checked={props.value}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.checked)
                          }}/>
        case Type.INT32:
        case Type.INT64:
            return <input type='number'
                          value={props.value || '0'}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(parseInt(e.target.value))
                          }}/>
        case Type.FLOAT32:
        case Type.FLOAT64:
            return <input type='number'
                          value={props.value || '0.0'}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(parseFloat(e.target.value))
                          }}/>
        case Type.STRING:
            let isNanoProperty = false

            if (props.property.type === 'STRING' && isAnnotationEnabled(props.property.annotations, 'NanoCode')) {
                isNanoProperty = true
            }

            if (props.resource.namespace.name === 'nano') {
                if (props.resource.name === 'Function' && props.propertyName === 'source') {
                    isNanoProperty = true
                }
                if (props.resource.name === 'Function' && props.propertyName === 'source') {
                    isNanoProperty = true
                }
                if (props.resource.name === 'CronJob' && props.propertyName === 'source') {
                    isNanoProperty = true
                }
                if (props.resource.name === 'Module' && props.propertyName === 'source') {
                    isNanoProperty = true
                }
            }

            if (isNanoProperty) {
                drawer.open(<PropertyNanoDrawer
                    code={props.value}
                    onClose={() => {
                        drawer.close()
                    }}
                    onChange={updated => {
                        props.onChange(updated)
                    }}/>)
                return
            }
            return <input type='text'
                          value={props.value || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}/>
        case Type.DATE:
            return <input type='date'
                          value={props.value || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}/>
        case Type.TIME:
            return <input type='time'
                          value={props.value || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}
                          onBlur={_ => {
                              // if (!updated) {
                              //     props.onChange(undefined)
                              //     return
                              // }
                              //
                              // let value = updated
                              //
                              // if (value.length === 5) {
                              //     value = value + ':00'
                              // }
                              //
                              // props.onChange(value)
                          }}/>
        case Type.TIMESTAMP:
            return <input type='datetime-local'
                          value={props.value || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}
                          onBlur={_ => {
                              // if (!updated) {
                              //     props.onChange(undefined)
                              //     return
                              // }
                              //
                              // let value = updated
                              //
                              // if (value.length === 16) {
                              //     value = value + ':00Z'
                              // }
                              //
                              // props.onChange(value)
                          }}/>
        case Type.ENUM:
            return <select value={props.value || ''}
                           autoFocus={Boolean(props.autoOpen)}
                           style={{
                               height: '30px',
                           }}
                           className='property-edit-input'
                           onChange={e => {
                               props.onChange(e.target.value)
                           }}
                           onBlur={_ => {
                               // if (!updated) {
                               //     props.onChange(undefined)
                               //     return
                               // }
                               //
                               // let value = updated
                               //
                               // if (value.length === 0) {
                               //     props.onChange(undefined)
                               // } else {
                               //     props.onChange(value)
                               // }
                           }}>
                <option value={undefined}>---</option>
                {props.property.enumValues?.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                })}
            </select>
        case Type.OBJECT:
        case Type.BYTES:
        case Type.LIST:
            return <>
                {drawer.render()}
                <IconButton onClick={() => {
                    drawer.open(<PropertyEditor
                        resource={props.resource}
                        property={props.property}
                        title={'Edit Object'}
                        value={props.value}
                        onClose={() => drawer.close()}
                        onApply={updated => {
                            props.onChange(updated)
                        }}/>)
                }}>
                    <EditNote/>
                </IconButton>
            </>
        case Type.REFERENCE:
            if (!props.property.reference) {
                return <>Reference is not specified yet</>
            }
            if (props.property.reference === 'storage/File') {
                let file = (props.value) as File

                drawer.open(<FileUploadDrawer
                    title={'Upload File'}
                    value={file}
                    onChange={updated => {
                        props.onChange(updated)
                    }}
                    onClose={() => {
                        drawer.close()
                    }}/>)
                return
            }
            return <ReferenceValueSelector
                autoFocus={Boolean(props.autoOpen)}
                sx={{
                    margin: 0,
                    padding: 0,
                    display: 'inline-block',
                    verticalAlign: 'text-bottom',
                    '& .MuiSelect-select': {
                        padding: 0,
                        margin: 0,
                    }
                }}
                value={props.value || ''}
                onChange={e => {
                    props.onChange(e)
                }}
                reference={props.property.reference}
                required={props.property.required}
            />
    }

    return <></>
}
