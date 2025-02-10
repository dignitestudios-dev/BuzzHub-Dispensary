import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const OrderTracking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { order } = state || {};

  if (!order) {
    return (
      <div className="h-screen w-full bg-gray-100 flex justify-center items-center text-gray-800">
        <p>No order data available.</p>
      </div>
    );
  }

  const [status, setStatus] = useState([
    { step: "Product Ordered", completed: true },
    { step: "Order Confirmed", completed: true },
    { step: "Processing, Dispensary is preparing the items.", completed: false },
    { step: "Order ready for Pick Up", completed: false },
    { step: "Order Picked Up", completed: false },
  ]);

  const handleStatusUpdate = (index) => {
    const updatedStatus = status.map((item, i) => ({
      ...item,
      completed: i <= index,
    }));
    setStatus(updatedStatus);
  };

  const handleChatClick = () => {
    navigate("/chat-screen");
  };

  return (
    <div className="h-auto w-full bg-gray-100 flex justify-center items-start p-6 overflow-auto text-black">
      <div className="h-auto w-full  bg-white overflow-auto rounded-xl shadow-xl">
        <div className="p-6 border-b border-gray-200 flex items-center">
          <FaArrowLeft
            className="text-gray-600 cursor-pointer hover:text-green-600 transition duration-200"
            onClick={() => navigate(-1)}
          />
          <h1 className="ml-4 text-2xl font-semibold text-gray-800">Order Tracking</h1>
        </div>

        <div className="w-full shadow-sm p-6 space-y-6 flex flex-col">
          {/* Order Details */}
          <div className="mb-6">
            <h2 className="text-sm text-gray-500">Order ID: {order.id}</h2>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-lg font-medium text-black">{order.productDetails.name}</p>
                <p className="text-sm text-gray-500">{order.productDetails.weight}</p>
              </div>
              <p className="text-xl font-bold text-gray-800">{order.productDetails.price}</p>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="flex items-center mb-6 border-b pb-6 justify-between">
            <div className="flex items-center">
              <img
                src={order.productDetails.imageUrl}
                alt={order.buyer}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-black">{order.buyer}</p>
              </div>
            </div>
            <button
              onClick={handleChatClick} // Navigate to the chat screen when clicked
              className="text-white bg-green-600 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Chat with Buyer
            </button>
          </div>

          {/* Order Status */}
          <div className="flex-grow overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="space-y-6">
              {status.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => handleStatusUpdate(index)}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full border-2 ${
                        item.completed ? "bg-green-600 border-green-600" : "border-gray-400"
                      } flex items-center justify-center`}
                    >
                      {item.completed && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                    {index < status.length - 1 && (
                      <div
                        className={`w-px h-14 ${
                          item.completed ? "bg-green-600" : "bg-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <p
                    className={`${
                      item.completed ? "text-gray-800" : "text-gray-400"
                    } text-sm font-medium`}
                  >
                    {item.step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Done/Submit Button */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => alert("Order Submitted/Updated")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-500 transition duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
