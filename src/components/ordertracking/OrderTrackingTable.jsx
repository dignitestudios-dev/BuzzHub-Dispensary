import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const OrderTrackingTable = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Pending"); // Default filter is Pending
  const navigate = useNavigate();

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("dispensary/view-all-orders-dispensary");
        if (response.data.success) {
          // Ensure that you handle each filter correctly based on the status
          setOrders(response.data.data[filter] || []); // Load orders based on the filter
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [filter]); // Fetch orders whenever the filter changes

  // Handle navigation to order details page with state
  const handleViewDetails = (order) => {
    navigate("/order-details", { state: { order } });
  };

  // Map status to a background color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400"; // Yellow for Pending
      case "Approved":
        return "bg-green-600"; // Green for Approved
      case "Rejected":
        return "bg-red-500"; // Red for Rejected
      case "Completed":
        return "bg-blue-600"; // Blue for Completed
      case "In Process":
        return "bg-orange-600"; // Orange for In Process
      case "Out for Delivery":
        return "bg-green-600"; // Purple for Out for Delivery
      case "Ready":
        return "bg-teal-600"; // Teal for Ready
      default:
        return "bg-gray-300"; // Default color for other statuses
    }
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex justify-start mb-6 space-x-4">
        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "All" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          All Orders
        </button>
        {/* <button
          onClick={() => setFilter("Pending")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Pending" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("Approved")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Approved" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("Rejected")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Rejected" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Rejected
        </button> */}
        <button
          onClick={() => setFilter("Completed")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Completed" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("InProcess")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "InProcess" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          In Process
        </button>
        <button
          onClick={() => setFilter("OutForDelivery")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "OutForDelivery" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Out for Delivery
        </button>
        <button
          onClick={() => setFilter("Ready")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Ready" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Ready
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border">
        {orders.length === 0 ? (
          <div className="text-center p-6 text-gray-500">No orders to show.</div>
        ) : (
          <table className="min-w-full text-black bg-white border border-gray-200">
            <thead>
              <tr className="text-left bg-[#1D7C42] text-white">
                <th className="p-5 text-sm font-medium">Product</th>
                <th className="p-5 text-sm font-medium">Order ID</th>
                <th className="p-5 text-sm font-medium">Date</th>
                <th className="p-5 text-sm font-medium">Amount</th>
                <th className="p-5 text-sm font-medium">Status</th>
                <th className="p-5 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="p-4 flex items-center space-x-3">
                    {order.products.length > 0 && (
                      <>
                        <img
                          src={order.products[0].productImage[0]} // First image of the first product
                          alt={order.products[0].name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <span className="text-sm font-medium">{order.products[0].name}</span>
                      </>
                    )}
                  </td>
                  <td className="p-4 text-sm">{order.orderUvid}</td>
                  <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-sm font-medium">${order.totalAmount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-white rounded-full ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-[#1D7C42] hover:text-green-500 transition duration-300"
                    >
                      <FaEye className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingTable;
