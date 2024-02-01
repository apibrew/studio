import Container from "@mui/material/Container";
import {UserResource} from "@apibrew/client/model/user";
import {Resource} from "@apibrew/client/model";
import Box from "@mui/material/Box";
import React from "react";
import {RecordList} from "../../../../components/record/RecordList";

export interface List {

}

export function ListUser() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 1,
            }}
        >
            <Container maxWidth='xl'>
                <h2 style={{
                    display: 'inline-block',
                    marginRight: '10px'
                }}>Users</h2>

                <RecordList resource={UserResource as Resource}
                            columns={['username']}></RecordList>
            </Container>
        </Box>
    )
}
