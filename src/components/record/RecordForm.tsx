import {Resource} from "@apibrew/client/model";
import {Entity} from "@apibrew/client";
import {FormInputGroup} from "./FormInputGroup";
import {filterMap} from "../../util/map";
import {isSpecialProperty} from "../../util/property";
import Box from "@mui/material/Box";

export interface RecordFormProps {
  readOnly: boolean
  resource: Resource
  record: Entity
  errors: { [key: string]: string }
  onChange: (record: Entity) => void
}

export function RecordForm(props: RecordFormProps) {
  const userProperties = filterMap(props.resource.properties, (_, property) => !isSpecialProperty(property))
  const systemProperties = filterMap(props.resource.properties, (_, property) => isSpecialProperty(property))

  return <>
    <h3>Properties:</h3>
    <FormInputGroup resource={props.resource}
                    readOnly={props.readOnly}
                    value={props.record}
                    depth={0}
                    errors={props.errors}
                    properties={userProperties}
                    onChange={value => {
                      props.onChange(value as any)
                    }}

    />
    {props.record.id && <Box>
      <hr/>
      <h3>System Properties:</h3>
      <FormInputGroup resource={props.resource}
                      readOnly={true}
                      value={props.record}
                      depth={0}
                      errors={props.errors}
                      properties={systemProperties}
                      onChange={value => {
                        props.onChange(value as any)
                      }}

      />
    </Box>}
  </>
}
