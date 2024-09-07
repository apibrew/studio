import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {Button, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import {useRecords, useRepository, useTokenBody} from "@apibrew/react";
import {useModalResult} from "../../components/modal/use-modal.tsx";
import {useNavigate} from "react-router-dom";
import {Invoice, InvoiceEntityInfo} from "../model/invoice.ts";
import {handleErrorMessage} from "../../util/errors.ts";
import {InvoiceView} from "./invoice-view.tsx";
import {Account} from "../model/account.ts";
import {AccountPlan, AccountPlanEntityInfo} from "../model/account-plan.ts";

export interface ProjectInlineInvoiceProps {
    account: Account
    plan: AccountPlan
    modal: useModalResult
}

export function ProjectInlineInvoice(props: ProjectInlineInvoiceProps) {
    const navigate = useNavigate()
    const tokenBody = useTokenBody();

    const plans = useRecords<AccountPlan>(AccountPlanEntityInfo) || []

    const premiumPlan = plans.find(plan => plan.name === 'premium')

    const repository = useRepository<Invoice>(InvoiceEntityInfo)

    const [invoice, setInvoice] = useState<Invoice>({
        user: tokenBody.username,
        amount: 0,
        currency: 'USD',
    } as Invoice)

    useEffect(() => {
        if (premiumPlan) {
            setInvoice({
                ...invoice,
            } as Invoice)
        }
    }, [premiumPlan]);

    if (plans.length == 0) {
        return <>Loading...</>
    }

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

        navigate(`/payment/${invoice?.payment!.id}`)
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
                    Set Plan:<Select value={premiumPlan?.name}
                                     fullWidth
                                     name={'instance'}
                                     onChange={e => {
                                         const plan = plans.find(plan => plan.name === e.target.value)
                                         setInvoice({
                                             ...invoice,
                                             plan: plan!,
                                         })
                                     }}>
                    {plans.filter(item => item.name !== 'free').map(plan => (
                        <MenuItem key={plan.name}
                                  value={plan.name}>
                            {plan.name}
                        </MenuItem>
                    ))}
                </Select>
                </Grid>
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
                            })
                        }}
                    />
                </Grid>
            </Grid>
        </Stack>
        <InvoiceView invoice={invoice}/>
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
