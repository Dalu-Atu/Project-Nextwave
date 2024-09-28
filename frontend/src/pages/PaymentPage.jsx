import React, { useState } from "react";
import styled from "styled-components";
import { FaStripe } from "react-icons/fa";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useStripePaymentMethod } from "../../services/payment";
import SpinnerMini from "../ui/SpinnerMini";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
`;

const ModalContainer = styled.div`
  background: var(--color-card);
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: lightgray;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: lightgray;
  font-size: 0.9rem;
`;

const PaymentGateways = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;

const GatewayButton = styled.button`
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: ${(props) =>
    props.selected ? "var(--secondary-color)" : "lightgray"};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      props.selected ? "var(--secondary-color)" : "#e0e0e0"};
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: var(--secondary-color);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: lightgray;
`;

const PaymentModal = ({ plan, onClose }) => {
  const [selectedGateway, setSelectedGateway] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { payWithStripe, isPayingWithStripe } = useStripePaymentMethod();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!selectedGateway) {
      alert("Please select a payment gateway.");
      return;
    }

    if (selectedGateway === "Stripe") {
      await payWithStripe({ plan, stripe, elements });
    } else if (selectedGateway === "PayPal") {
      // handlePayPalPayment();
    } else if (selectedGateway === "GooglePay") {
      // handleGooglePayPayment();
    }
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Heading>
          Subscribe to {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
        </Heading>
        <PaymentGateways>
          <GatewayButton
            selected={selectedGateway === "Stripe"}
            onClick={() => setSelectedGateway("Stripe")}
          >
            <FaStripe size={"30px"} />
            Stripe
          </GatewayButton>
        </PaymentGateways>
        <Form onSubmit={handlePaymentSubmit}>
          {selectedGateway === "Stripe" && (
            <>
              <FormGroup>
                <Label>Card Details:</Label>
                <CardElement
                  options={{
                    style: { base: { fontSize: "16px", color: "#FFF" } },
                  }}
                />
              </FormGroup>

              <SubmitButton type="submit">
                {isPayingWithStripe ? <SpinnerMini /> : "Submit Payment"}
              </SubmitButton>
            </>
          )}
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default PaymentModal;

// Card Number: 4242 4242 4242 4242
// Expiration Date: Any future date (e.g., 12/24)
// CVV: Any 3-digit number (e.g., 123)
