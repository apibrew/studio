'use client';

import React, {useEffect, useState} from "react";
import {Code, useClient, useRepository} from "@apibrew/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {Resource, User} from "@apibrew/client/model";
import {UserEntityInfo, UserResource} from "@apibrew/client/model/user";
import {useParams} from "react-router-dom";
import {UserForm} from "../../../../components/user-and-roles/UserForm";

export default function EditUser() {
  const {id} = useParams()
  const client = useClient();
  const repository = useRepository<User>(UserEntityInfo)
  const [record, setRecord] = useState<User>({} as User)
  const [errors, setErrors] = useState<{}>({})

  async function load() {
    // NProgress.start()
    const resp = await repository?.get(id as string, ['$.permissions[]'])
    // NProgress.done()
    if (!resp) {
      throw new Error('Failed to load record');
    } else {
      setRecord(resp)
    }
  }

  async function save() {
    Object.keys((UserResource as Resource).properties ?? {}).forEach((key) => {
      if ((record as any)[key] === undefined) {
        (record as any)[key] = null
      }
    })

    // NProgress.start()
    try {
      const resp = await repository?.update(record)
      if (!resp) {
        throw new Error('Failed to save User');
      } else {
        toast.success('User saved successfully');
        load()
      }
    } catch (e: any) {
      if (e.code == Code.RECORD_VALIDATION_ERROR) {
        const errorsObj: { [key: string]: string } = {};

        if (e.fields) {
          for (const field of e.fields) {
            errorsObj[field.property] = field.message;

            if (!field.property) {
              toast.error(field.message)
            }
          }
        }

        setErrors(errorsObj)
      }
      toast.error(e.message)
    } finally {
      // NProgress.done()
    }
  }

  useEffect(() => {
    if (repository) {
      load();
    }
  }, [client, id]);

  return <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth='md'>
        <h3>Update: User / {id}</h3>
        <Grid
          container
          disableEqualOverflow
          spacing={{
            xs: 3,
            lg: 4,
          }}
        >
          <Grid xs={12}>
            <UserForm readOnly={false}
                      errors={errors}
                      record={record}
                      onChange={setRecord}/>
          </Grid>
          <Button onClick={() => save()}>Save</Button>
          <Button onClick={() => load()}>Reload</Button>
          <Button onClick={() => {
            // router.push(`${pathname}/../..`)
          }}>Cancel</Button>
        </Grid>
      </Container>
    </Box>
  </>
}
