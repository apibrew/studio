import {PropertyValue, PropertyValueProps} from "./PropertyValue";
import {leftSpace} from "./util";
import {Type} from "@apibrew/client/model/resource";
import {Property} from "@apibrew/client/model";

export function MapValue(props: PropertyValueProps) {
    const obj = props.value as any || {}

    const keys = Object.keys(obj)

    return <div>
        {keys.map((key, index) => {
            const value = obj[key]
            return (
                <div key={index}>
                    {leftSpace(props.depth)}
                    <span>
                <span className='cell-hand unselectable'
                      style={{
                          color: 'red'
                      }}
                      onClick={() => {
                          const updatedObj = {...obj}

                          delete (updatedObj[key])

                          props.onChange(updatedObj)
                      }}>x&nbsp;</span>
                <span>-&nbsp;</span>
            </span>
                    <span>
                <PropertyValue resource={props.resource}
                               new={props.new}
                               property={{
                                   type: Type.STRING,
                               } as Property}
                               value={key}
                               path={`${props.path}[${index}]`}
                               depth={props.depth + 2}
                               isInline={true}
                               onChange={(updated) => {
                                   if (updated === key) {
                                       return
                                   }

                                   const updatedObj = {...obj}

                                   delete (updatedObj[key])
                                   updatedObj[updated] = value

                                   props.onChange(updatedObj)
                               }}/>:
                <PropertyValue resource={props.resource}
                               new={props.new}
                               property={props.property.item}
                               value={value}
                               path={`${props.path}[${index}]`}
                               depth={props.depth + 2}
                               isInline={true}
                               onChange={(updated) => {
                                   props.onChange({
                                       ...obj,
                                       [key]: updated
                                   })
                               }}/>
            </span>
                </div>)
        })}
        <span className='unselectable'>{leftSpace(props.depth+5)}</span>
        <span
            className='unselectable cell-hand'
            onClick={() => {
                props.onChange({
                    ...obj,
                    'new-key': undefined
                })
            }}
            style={{
                color: 'green'
            }}>
            +
        </span>
    </div>
}