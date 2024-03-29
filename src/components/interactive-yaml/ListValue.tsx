import {PropertyValue, PropertyValueProps} from "./PropertyValue";
import {leftSpace} from "./util";

export function ListValue(props: PropertyValueProps) {
    const arr = props.value as [] || []

    return <div>
        {arr.map((item, index) => (
            <div style={{
                display: 'flex'
            }} key={index}>
                {leftSpace(props.depth)}
                <div style={{
                    display: 'inline-block'
                }}>
                    <span className='cell-hand unselectable'
                          style={{
                              color: 'red'
                          }}
                          onClick={() => {
                              props.onChange([
                                  ...arr.slice(0, index),
                                  ...arr.slice(index + 1)
                              ])
                          }}>x&nbsp;</span>
                    <span>-&nbsp;</span>
                </div>
                <PropertyValue resource={props.resource}
                               new={props.new}
                               property={props.property.item}
                               value={item}
                               path={`${props.path}[${index}]`}
                               depth={props.depth + 2}
                               isInline={true}
                               onChange={(updated) => {
                                   props.onChange([
                                       ...arr.slice(0, index),
                                       updated,
                                       ...arr.slice(index + 1)
                                   ])
                               }}/>
            </div>
        ))}
        <span className='unselectable'>{leftSpace(props.depth)}</span>
        <span
            className='unselectable cell-hand'
            onClick={() => {
                props.onChange([...arr, null])
            }}
            style={{
                color: 'green'
            }}>
            +
        </span>
    </div>
}