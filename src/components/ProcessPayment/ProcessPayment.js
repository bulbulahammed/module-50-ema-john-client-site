import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { } from '@stripe/react-stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IeJLsIAaC3TIFJNwJ36AiZ3PVdC0gWWoRAPIgw1g7qZl3h9TsZcxBCm5pFgupkWPsU2a31pmKUTiyEIvVAcIzB200fRNeclmj');


const ProcessPayment = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;