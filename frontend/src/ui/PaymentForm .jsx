import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axiosInstance from "../../axiosConfig";

const PaymentForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    // Get the card details from the CardElement
    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Stripe error:", error.message);
      return;
    }

    try {
      const response = await axiosInstance.post("/stripe/subscribe", {
        token: token.id,
        plan,
      });

      // console.log('Stripe subscription successful:', response.data);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <form onSubmit={handleStripePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
};

export default PaymentForm;
