import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "./button";
import { selectCartTotal, selectUser } from "../store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const Form = styled.form`
  height: 100px;
  min-width: 500px;
`;

const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const user = useSelector(selectUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    console.log(clientSecret);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName || "guest",
        },
      },
    });

    setIsProcessing(false);

    if (paymentResult.error) {
      console.error(paymentResult.error);
      alert(paymentResult.error.message);
    } else {
      alert("Payment successful");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessing}
          type="submit"
          buttonType="inverted"
        >
          Pay Now
        </PaymentButton>
      </Form>
    </Container>
  );
};
