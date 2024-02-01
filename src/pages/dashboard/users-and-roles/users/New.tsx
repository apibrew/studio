'use client';

import React, {useState} from "react";
import {Code, User, useRepository} from "@apibrew/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {Permission} from "@apibrew/client/model";
import {UserForm} from "../../../../components/user-and-roles/UserForm";

export default function NewUser() {
  // const pathname = usePathname()
  // const router = useRouter()
  const repository = useRepository(UserEntityInfo)
  const [record, setRecord] = useState<User>({
    permissions: [] as Permission[],
  } as User)
  const [errors, setErrors] = useState<{}>({})

  async function save() {
    // NProgress.start()
    try {
      const resp = await repository?.create(record)
      if (!resp) {
        throw new Error('Failed to save User');
      } else {
        toast.success('User saved successfully');
        // router.push(`${pathname}/../${resp.id}/edit`)
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

  return <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth='md'>
        <h3>New: User</h3>
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
          <Button onClick={() => save()}>Create</Button>
          <Button onClick={() => {
            // router.push(`${pathname}/..`)
          }}>Cancel</Button>
        </Grid>
      </Container>
    </Box>
  </>
}
