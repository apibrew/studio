import React, {useState} from "react";
import {PermissionsInputSimple} from "./PermissionsInputSimple";
import {PermissionsInputAdvanced} from "./PermissionsInputAdvanced";
import {Tab, Tabs} from "@mui/material";
import {Permission} from "@apibrew/client/model";
import {Operation, Permit} from "@apibrew/client/model/permission";

export interface PermissionsInputProps {
  mode: 'user' | 'role' | 'resource' | 'namespace'
  value: Permission[]

  onChange(value: Permission[]): void
}

export function PermissionsInput(props: PermissionsInputProps) {
  const [tab, setTab] = React.useState(0)

  const [constraints, setConstraints] = useState<Permission[]>(props.value)

  constraints.forEach((constraint) => {
    if (!constraint.operation) {
      constraint.operation = Operation.FULL
    }

    if (!constraint.permit) {
      constraint.permit = Permit.ALLOW
    }
  })

  return <>
    <Tabs value={tab}
          onChange={(_, value) => setTab(value)}>
      <Tab label="Simple"/>
      <Tab label="Advanced"/>
    </Tabs>
    {tab === 0 && <PermissionsInputSimple
      constraints={constraints}
      setConstraints={value => {
        setConstraints(value)
        props.onChange(value)
      }}
      mode={props.mode}/>}
    {tab === 1 && <PermissionsInputAdvanced
      constraints={constraints}
      setConstraints={value => {
        setConstraints(value)
        props.onChange(value)
      }}
      mode={props.mode}/>}
  </>
}
