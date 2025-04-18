import React, { useEffect, useState } from "react";
import { Logo } from "../../assets/export";
import { FaMobileAlt } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const ManageSubscription = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const planDescriptions = {
    basic: "3-Month Plan – Mobile App Only",
    standard: "3-Month Plan – Mobile App + Web Platform",
    bronze: "6-Month Plan – Mobile App Only",
    bronzePlus: "6-Month Plan – Mobile App + Web Platform",
    premium: "12-Month Plan – Mobile App Only",
    premiumPlus: "12-Month Plan – Mobile App + Web Platform",
  };

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = JSON.parse(localStorage?.getItem("userData"));

    // Check if user data exists in localStorage
    if (userData) {
      setSubscriptionPlan(userData?.subscriptionPlan); // Set the subscription plan
    }
  }, []);

  if (!subscriptionPlan) {
    return <div>Loading...</div>;
  }

  // Handle the Cancel Subscription button click
  const handleCancelSubscription = async () => {
    setShowConfirmation(true); // Show confirmation popup
  };

  // Function to confirm cancellation
  const handleConfirmCancel = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || !userData.subscriptionPlan?.subscriptionId) return;

    setLoading(true);
    try {
      const response = await axios.post("/dispensary/cancel-subscription", {
        subscriptionId: userData.subscriptionPlan.subscriptionId,
      });

      if (response.status === 200) {
        const updatedSubscription = response.data;
        setSubscriptionPlan(updatedSubscription);
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, subscriptionPlan: updatedSubscription })
        );
        setShowConfirmation(false);
        alert("Your subscription has been cancelled.");

        // Redirect user to login page after successful cancellation
        // navigate("/login");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      alert("There was an issue cancelling your subscription.");
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel the operation (close the confirmation modal)
  const handleCancelOperation = () => {
    setShowConfirmation(false); // Close the confirmation modal
  };

  // Get description based on the plan name
  const planDescription =
    planDescriptions[subscriptionPlan?.SubscriptionPlan] ||
    "No description available";

  return (
    <div className="flex flex-col w-full justify-start h-full bg-gray-100 px-4 py-10">
      <div className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center space-x-4 ">
            <img
              src={Logo}
              alt="pill"
              className="w-[60px] h-[60px] bg-green-600 rounded-full "
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800">Subscription</h1>
              <p className="text-sm text-gray-600">
                Manage Your Subscription Plan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {subscriptionPlan?.status === "active" ? (
              <MdCheckCircle size={20} color="green" />
            ) : (
              <MdCancel size={20} color="red" />
            )}
            <span className="text-md font-semibold text-gray-800">
              {subscriptionPlan?.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="space-y-4 ">
          <div className="space-y-2 border-b pb-4">
            {/* <p className="text-md text-gray-600">
              <strong>Plan: </strong>
              {subscriptionPlan?.SubscriptionPlan.toLowerCase()} Plan{" "}
            </p> */}
            <p className="text-md text-gray-500">
              <strong>Plan : </strong> {planDescription}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Amount : </p>
              <span className="text-xl font-bold text-green-600">
                ${subscriptionPlan?.totalAmount}
              </span>
            </div>
          </div>

          <div className="flex items-center text-black gap-2">
            <p className="text-gray-600">Status :</p>
            {subscriptionPlan?.status}
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              <strong>Period:</strong>{" "}
              {new Date(
                subscriptionPlan?.currentPeriodStart
              ).toLocaleDateString()}{" "}
              -{" "}
              {new Date(
                subscriptionPlan?.currentPeriodEnd
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-left mt-6">
          <button
            onClick={handleCancelSubscription}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 space-y-4 w-96">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-600">
              You are about to cancel your subscription. This action cannot be
              undone.
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleCancelOperation}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={loading}
                className={`px-6 py-2 ${
                  loading ? "bg-gray-400" : "bg-red-500"
                } text-white rounded-lg hover:bg-red-600`}
              >
                {loading ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubscription;
