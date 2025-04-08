import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/export";

const Packages = () => {
  const navigate = useNavigate();
  const [isMobileOnly, setIsMobileOnly] = useState(true); // State to toggle between Mobile only and Mobile + Web

  const handleNavigate = (plan) => {
    navigate("/add-card", { state: plan });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 py-4">
      <div className="flex items-center space-x-4 mb-12">
        <img
          src={Logo}
          alt="pill"
          className="w-[60px] bg-green-600 rounded-full border-2 border-green-600"
        />
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold text-gray-800">
            Buzzhub Dispensary
          </h3>
          <p className="text-sm text-gray-600">
            Select A Subscription Package to Continue
          </p>
        </div>
      </div>

      <p className="text-center font-semibold text-2xl mb-12 text-gray-800">
        Choose Your Subscription Plan
      </p>

      {/* Toggle Buttons for Mobile Only vs Mobile + Web */}
      <div className="flex space-x-8 mb-8">
        <button
          onClick={() => setIsMobileOnly(true)}
          className={`px-6 py-2 font-semibold text-sm rounded-lg transition ${
            isMobileOnly
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Mobile App Only
        </button>
        <button
          onClick={() => setIsMobileOnly(false)}
          className={`px-6 py-2 font-semibold text-sm rounded-lg transition ${
            !isMobileOnly
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Mobile + Web Platform
        </button>
      </div>

      {/* Subscription Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-16">
        {isMobileOnly ? (
          // Render Mobile Only Plans
          <>
            {/* 3-Month Plan Mobile App Only */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  3-Month Plan
                </h4>
                <p className="text-md text-gray-600 mb-2">Mobile App Only</p>
                <p className="text-xl font-bold text-green-600">
                  $49.99/month – Total: $149.97
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-center text-gray-600">
                  Access to dispensary mobile app only
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleNavigate("basic")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            </div>

            {/* 6-Month Plan Mobile App Only */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  6-Month Plan
                </h4>
                <p className="text-md text-gray-600 mb-2">Mobile App Only</p>
                <p className="text-xl font-bold text-green-600">
                  $40.99/month – Total: $245.95
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-center text-gray-600">
                  Access to dispensary mobile app only
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleNavigate("bronze")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            </div>

            {/* 12-Month Plan Mobile App Only */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  12-Month Plan
                </h4>
                <p className="text-md text-gray-600 mb-2">Mobile App Only</p>
                <p className="text-xl font-bold text-green-600">
                  $29.99/month – Total: $359.88
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-center text-gray-600">
                  Great for long-term mobile access
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleNavigate("premium")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            </div>
          </>
        ) : (
          // Render Mobile + Web Plans
          <>
            {/* 3-Month Plan Mobile App + Web Platform */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  3-Month Plan
                </h4>
                <p className="text-md text-gray-600 mb-2">
                  Mobile App + Web Platform
                </p>
                <p className="text-xl font-bold text-green-600">
                  $40.99/month – Total: $245.95
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Full access to both mobile app and web-based features
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleNavigate("standard")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            </div>

            {/* 6-Month Plan Mobile App + Web Platform */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  6-Month Plan
                </h4>
                <p className="text-md text-gray-600 mb-2">
                  Mobile App + Web Platform
                </p>
                <p className="text-xl font-bold text-green-600">
                  $45.99/month – Total: $275.94
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Full access to both mobile app and web-based features
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleNavigate("bronzePlus")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            </div>

            {/* 12-Month Plan Mobile App + Web Platform */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  12-Month Plan
                </h4>
                <p className="text-md text-gray-600 mb-2">
                  Mobile App + Web Platform
                </p>
                <p className="text-xl font-bold text-green-600">
                  $33.99/month – Total: $407.88
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-center text-gray-600">
                  Best value for full access across mobile and web
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleNavigate("premiumPlus")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Packages;
