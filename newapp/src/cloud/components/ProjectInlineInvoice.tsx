import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {Button, Grid, Typography} from "@mui/material";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import {useRepository, useTokenBody} from "@apibrew/react";
import {useModalResult} from "../../components/modal/use-modal.tsx";
import {useNavigate} from "react-router-dom";
import {Invoice, InvoiceEntityInfo} from "../model/invoice.ts";
import {handleErrorMessage} from "../../util/errors.ts";
import {InvoiceView} from "./invoice-view.tsx";
import {Account} from "../model/account.ts";
import {AccountPlan} from "../model/account-plan.ts";

export interface ProjectInlineInvoiceProps {
    account: Account
    plan: AccountPlan
    modal: useModalResult
}

export function ProjectInlineInvoice(props: ProjectInlineInvoiceProps) {
    const navigate = useNavigate()
    const tokenBody = useTokenBody();

    const repository = useRepository<Invoice>(InvoiceEntityInfo)

    const [invoice, setInvoice] = useState<Invoice>({
        user: tokenBody.username,
        amount: props.plan.amount,
        monthCount: 1,
        plan: props.plan,
        currency: 'USD',
    } as Invoice)

    function handleCreateInvoice() {
        const promise = repository.create(invoice);

        toast.promise(promise, {
            loading: 'Creating invoice...',
            success: 'Invoice created',
            error: handleErrorMessage
        })

        return promise;
    }

    async function handlePay() {
        const invoice = await handleCreateInvoice()

        navigate(`/cloud/payment/${invoice?.payment!.id}`)
    }

    return <>
        <Stack
            direction="row"
            spacing={2}
            sx={{
                display: 'flex',
                p: 3,
            }}
        >
            <Typography variant="h6">
                Upgrade to {props.plan.name}
            </Typography>
            <Grid
                mt={0.1}
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    Month Count:
                    <TextField
                        fullWidth
                        name="monthCount"
                        type='number'
                        value={invoice.monthCount || 0}
                        onChange={e => {
                            setInvoice({
                                ...invoice,
                                monthCount: parseInt(e.target.value),
                                amount: props.plan.amount * parseInt(e.target.value)
                            })
                        }}
                    />
                </Grid>
            </Grid>
        </Stack>
        {invoice.plan && <InvoiceView invoice={invoice}/>}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 1,
                pb: 3,
                px: 3,
            }}
        >
            <Button
                color="inherit"
                size='small'
                sx={{mr: 2}}
                onClick={() => props.modal.close()}
            >
                Cancel
            </Button>
            <Button
                color='secondary'
                size='small'
                variant="contained"
                sx={{mr: 2}}
                onClick={() => handleCreateInvoice()}
            >
                Create Invoice
            </Button>
            <Button
                color='success'
                size='small'
                variant="contained"
                onClick={() => handlePay()}
            >
                Pay
            </Button>
        </Box>
    </>
}
