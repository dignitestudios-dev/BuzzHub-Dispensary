import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AcceptedOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Dummy order data with buyer's profile picture
  const order = {
    id: "2151515156",
    placedOn: "Sun, Jun 7, 2024",
    time: "11:30 AM",
    fulfillmentMethod: "Delivery",
    status: "Accepted",
    buyer: "Mike Smith",
    buyerImage: "https://i.pravatar.cc/?img=7", // Added profile image of the buyer
    shippingAddress: "Unit 305, Montford Court, Montford Street, Salford, M50",
    productDetails: {
      name: "Item name",
      weight: "50gms",
      price: "$40.00",
      location: "Toronto, Canada",
      imageUrl: "https://i.pravatar.cc/?img=12", // Replace with actual image path
    },
    billing: {
      subtotal: "$140",
      platformFees: "$10",
      total: "$150",
    },
  };

  const handleStatusChange = (newStatus) => {
    // alert(`Order ${order.id} has been ${newStatus}`);
    navigate("/chat-screen"); // Go back to the main page after accepting or rejecting
  };

  return (
    <div className="h-auto w-full bg-gray-100 flex justify-center p-6 overflow-auto text-black">
      <div className="w-full bg-white rounded-lg shadow-xl overflow-y-auto">
        {/* Back Button */}
        <div className="p-6 border-b border-gray-200 flex items-center">
          <FaArrowLeft
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="ml-4 text-2xl font-semibold text-gray-800">Order Request</h1>
        </div>

        {/* Scrollable content */}
        <div className="p-6 space-y-8 overflow-auto">
          {/* Order Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Placed On</span>
                <span>{order.placedOn}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{order.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment Method</span>
                <span>{order.fulfillmentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className={`font-semibold ${order.status === "Accepted" ? "text-green-600" : order.status === "Rejected" ? "text-red-600" : "text-yellow-500"}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Buyer Details</h2>
            <div className="flex items-center mb-4 space-x-4">
              {/* Buyer Profile Image */}
              <img
                src={order.buyerImage}
                alt={order.buyer}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">{order.buyer}</span>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-all">
                    View Medical Card
                  </button>
                </div>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <div className="flex items-center mb-6">
              <img
                src={order.productDetails.imageUrl}
                alt={order.productDetails.name}
                className="w-36 h-36 rounded-lg mr-6"
              />
              <div>
                <p className="text-lg font-semibold">{order.productDetails.name}</p>
                <p className="text-sm text-gray-600">{order.productDetails.weight}</p>
                <p className="text-sm text-gray-600">{order.productDetails.location}</p>
              </div>
            </div>
            <p className="text-right text-xl font-semibold">{order.productDetails.price}</p>
          </div>

          {/* Billing */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Billing</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{order.billing.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fees</span>
                <span>{order.billing.platformFees}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{order.billing.total}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6 gap-2  flex justify-between">
            <button
              onClick={() =>
                navigate(`/order-tracking/${order.id}`, { state: { order } })
              }
              className="w-full md:w-1/2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
            >
              Order Tracking
            </button>

            <button
              onClick={() => handleStatusChange("rejected")}
              className="w-full md:w-1/2 mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
            >
              Chat With Buyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedOrder;
