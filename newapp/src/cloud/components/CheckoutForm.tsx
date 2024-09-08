import {useEffect, useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";

export interface CheckoutFormProps {
    onResult(): unknown;
}

export function CheckoutForm(props: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            if (!paymentIntent) {
                throw new Error("No PaymentIntent found in URL");
            }
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }

            props.onResult()
        });
    }, [stripe]);

    const handleSubmit = async () => {
        // e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: window.location.href,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        props.onResult()

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    } as stripeJs.StripePaymentElementOptions

    return (
        <form id="payment-form"
              onSubmit={e => {
                  e.preventDefault()
                  handleSubmit()
              }}>
            <Stack spacing={3}>
                <Box>
                    <PaymentElement id="payment-element"
                                    options={paymentElementOptions}/>
                </Box>

                <Box sx={{mt: 5}}>
                    <Box flexGrow={1}/>
                    <Button
                        disabled={isLoading || !stripe || !elements}
                        variant="contained"
                        color='warning'
                        sx={{m: 'auto', mr: 3}}
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || !stripe || !elements}
                        variant="contained"
                        color='success'
                        type='submit'
                        sx={{m: 'auto'}}
                    >
                        {isLoading ? <div className="spinner"
                                          id="spinner"></div> : "Pay now"}
                    </Button>
                </Box>
            </Stack>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
