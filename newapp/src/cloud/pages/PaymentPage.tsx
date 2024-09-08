'use client';

import * as stripeJs from "@stripe/stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import {useRepository, useTokenBody} from "@apibrew/react";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router-dom";
import {Payment, PaymentEntityInfo} from "../model/payment.ts";
import {CheckoutForm} from "../components/CheckoutForm.tsx";
import {Card} from "@mui/material";

const stripePromise = loadStripe("pk_live_51N2XWCBBD2KO664nUDf9O08PIMJTZJlbpZsRjsKRWXpZXYiEfWXHFLSbTTvP6pbIllwbeJSXJ4nZvqzjXN3gzW7K00672goSqL");

export const PaymentPage = () => {
    const params = useParams()
    const navigate = useNavigate()

    const id = params.id

    const [payment, setPayment] = useState<Payment>()

    const repository = useRepository<Payment>(PaymentEntityInfo)

    function loadPayment() {
        const loadingId = toast.loading('Loading...')

        repository.get(id!)
            .then(setPayment)
            .finally(() => toast.dismiss(loadingId))
    }

    useEffect(() => {
        loadPayment()
    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const tokenBody = useTokenBody();

    const options = {
        clientSecret: payment?.token,
        appearance,
        customerOptions: {
            customer: tokenBody.username,
        },
    } as stripeJs.StripeElementsOptions;

    if (payment && payment.status == 'PAID' && payment.returnUrl) {
        navigate(payment.returnUrl)
    }

    if (payment && payment.status == 'FAILED' && payment.returnUrl) {
        toast.error('Payment failed')
        navigate(payment.returnUrl)
    }

    return <>
        <Card
            sx={{
                flexGrow: 1,
                p:2
            }}
        >
            <Typography>Payment for: {payment?.id}</Typography>
            <Container maxWidth='sm'>
                {payment && <>
                    {payment.status == 'PAID' && <>
                        <h1>Paid</h1>
                    </>}
                    {payment.token && (
                        <Elements options={options}
                                  stripe={stripePromise}>
                            <Box>
                                <h1>Pay {payment.amount / 100} {payment.currency}</h1>
                            </Box>
                            <CheckoutForm onResult={() => {
                                loadPayment()
                            }}/>
                        </Elements>
                    )}
                </>}
            </Container>
        </Card>
    </>
};
