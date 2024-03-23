import { PaymentElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

interface Props {
  orderData: any,
  placeOrderHandler: () => void
}

export default function CheckoutForm({orderData,placeOrderHandler}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const {total_amount} = orderData
  const [message] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/order-success",
        // payment_method_data: {
        //   billing_details: {
        //     name: 'Jenny Rosen',
        //     email: 'jenny.rosen@example.com',
        //   }
        // },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
     
    } else {
     
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="w-full">
        <div onClick={()=> placeOrderHandler()} id="button-text" className="bg-black text-white mt-5 w-full px-4 py-2 rounded-md">
          {isProcessing ? "Processing ... " : `Pay now (USD ${total_amount})`} 
        </div>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}