import {Resource, User} from "@apibrew/client/model";
import {FormInputGroup} from "../record/FormInputGroup";
import {UserResource} from "@apibrew/client/model/user";
import Box from "@mui/material/Box";
import {filterMap} from "../../util/map";
import {isSpecialProperty, withPropertyOrder} from "../../util/property";
import {PermissionsInput} from "../security/PermissionsInput";

export interface UserFormProps {
  readOnly: boolean
  record: User
  errors: { [key: string]: string }
  onChange: (record: User) => void
}

const userResource = (UserResource as Resource)
const systemProperties = filterMap(userResource.properties, (key, property) => isSpecialProperty(property))

export function UserForm(props: UserFormProps) {
  return <>
    <FormInputGroup resource={UserResource as Resource}
                    properties={{
                      "username": withPropertyOrder(userResource.properties["username"], 0),
                      "password": withPropertyOrder(userResource.properties["password"], 1),
                      "roles": withPropertyOrder(userResource.properties["roles"], 2),
                      "details": withPropertyOrder(userResource.properties["details"], 3),
                    }}
                    errors={props.errors}
                    readOnly={props.readOnly}
                    depth={0}
                    value={props.record}
                    onChange={val => {
                      props.onChange(val as any)
                    }}/>

    <hr/>
    <h3>Permissions</h3>
    {props.record.permissions && <PermissionsInput mode={'user'}
                      value={props.record.permissions ? props.record.permissions : []}
                      onChange={permissions => {

                        props.onChange({...props.record, permissions})
                      }}/>}

    {props.record.id && <Box>
      <hr/>
      <h3>System Properties:</h3>
      <FormInputGroup resource={userResource}
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
  </>;
}
