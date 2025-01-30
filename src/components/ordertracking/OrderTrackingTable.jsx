import React, { useState } from "react";
import { FaEye } from "react-icons/fa"; // Import the eye icon
import { useNavigate } from "react-router-dom";

// Dummy order data with updated statuses
const orders = [
  { id: 1, status: "Order in Process", orderId: "ORD001", date: "2025-01-22", amount: "$100" },
  { id: 2, status: "Ready for Delivery", orderId: "ORD002", date: "2025-01-21", amount: "$200" },
  { id: 3, status: "Ready for Pickup", orderId: "ORD003", date: "2025-01-20", amount: "$150" },
  { id: 4, status: "Completed Orders", orderId: "ORD004", date: "2025-01-22", amount: "$250" },
  { id: 5, status: "Order in Process", orderId: "ORD005", date: "2025-01-19", amount: "$300" },
  { id: 6, status: "Ready for Delivery", orderId: "ORD006", date: "2025-01-18", amount: "$400" },
];

const OrderTrackingTable = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Filter orders based on the selected filter
  const filteredOrders = filter === "all" ? orders : orders.filter((order) => order.status === filter);

  // Handle navigation to order details page
  const handleViewDetails = (orderId) => {
    navigate(`/accepted-order`);
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter("Order in Process")}
            className={`px-4 py-2 rounded-md ${filter === "Order in Process" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Order in Process
          </button>
          <button
            onClick={() => setFilter("Ready for Delivery")}
            className={`px-4 py-2 rounded-md ${filter === "Ready for Delivery" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Ready for Delivery
          </button>
          <button
            onClick={() => setFilter("Ready for Pickup")}
            className={`px-4 py-2 rounded-md ${filter === "Ready for Pickup" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Ready for Pickup
          </button>
          <button
            onClick={() => setFilter("Completed Orders")}
            className={`px-4 py-2 rounded-md ${filter === "Completed Orders" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Completed Orders
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full text-black bg-white border border-gray-200">
          <thead>
            <tr className="text-left bg-[#1D7C42] text-white">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100 text-left">
                <td className="p-4">{order.orderId}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.amount}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleViewDetails(order.orderId)}
                    className="text-[#074F57] hover:text-green-500"
                  >
                    <FaEye className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTrackingTable;
