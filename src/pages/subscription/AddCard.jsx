import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "../../components/subscription/PaymentForm";
import PaymentInput from "../../components/subscription/PaymentInput";

const AddCard = () => {
  const { state } = useLocation();

  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_API_KEY);

  const [cardHolderName, setCardHolderName] = useState("");
  const [nameError, setNameError] = useState(null);

  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row items-center justify-center px-4">
      {/* Left Side - Form Section */}
      <div
        className="w-full lg:w-1/2 max-w-[500px] h-auto px-4 py-8 lg:p-10 z-10 flex flex-col 
      justify-center items-center gap-6 lg:gap-8 bg-secondary rounded-xl"
      >
        <h1 className="w-full text-[28px] md:text-[32px] font-bold leading-tight md:leading-[38px] text-left">
          Add Card Details
        </h1>

        {/* Input Fields */}
        <div className="w-full flex flex-col justify-start items-start gap-4 ">
          {/* <PaymentInput
            text={"Card Holder Name"}
            placeholder={"Mike Smith"}
            type={"text"}
            state={cardHolderName}
            setState={setCardHolderName}
            error={nameError}
            setNameError={setNameError}
          /> */}

          <Elements stripe={stripePromise}>
            <PaymentForm state={state} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default AddCard;