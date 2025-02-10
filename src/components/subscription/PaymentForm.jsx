import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../global/Toaster";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#000000",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "14px",
      fontWeight: "500",
      "::placeholder": {
        color: "#000000",
      },
      border: "none",
      padding: "0 12px",
      borderRadius: "12px",
      height: "45px",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const PaymentForm = ({ state }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method using stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const response = await axios.post("dispensary/create-subscription", {
          planType: state,
          paymentMethodId: paymentMethod.id,
        });

        if (response.status === 200) {
          navigate("/req-success");
          SuccessToast("Subscribed");
          setLoading(false);
        }
      } catch (err) {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        ErrorToast(err?.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Input */}
      <div className="w-full h-auto flex flex-col gap-2">
        <label className="ml-1 text-sm font-medium capitalize text-gray-700">Payment Method</label>
        <div
          className={`w-full pt-4 h-[52px] lg:w-[434px] rounded-[12px] bg-light flex items-center shadow-sm justify-start border ${
            error && "border-2 border-red-500"
          }`}
        >
          <div className="w-full h-full flex items-center justify-center rounded-[12px] relative">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="w-full h-full px-3 text-sm font-medium "
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Buttons Section */}
      <div className="w-full grid grid-cols-6 md:grid-cols-2 md:justify-start gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full px-8 md:px-0 col-span-2 h-[52px] md:h-[52px] bg-gray-200 text-gray-700 rounded-[12px] flex items-center justify-center text-[14px] md:text-[16px] font-bold border border-gray-300 hover:bg-gray-300 transition duration-200"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-14 md:px-0 col-span-2 h-[52px] md:h-[52px] bg-green-600 text-white rounded-[12px] flex items-center justify-center text-[14px] md:text-[16px] font-bold hover:bg-green-700 disabled:bg-gray-400 transition duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              </svg>
              <span>Loading...</span>
            </span>
          ) : (
            "Proceed"
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
