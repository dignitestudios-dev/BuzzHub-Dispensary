import React, { useState } from "react";
import { FaEye } from "react-icons/fa"; // Import the eye icon
import { useNavigate } from "react-router-dom";

// Dummy order data
const orders = [
  { id: 1, status: "pending", orderId: "ORD001", date: "2025-01-22", amount: "$100" },
  { id: 2, status: "accepted", orderId: "ORD002", date: "2025-01-21", amount: "$200" },
  { id: 3, status: "rejected", orderId: "ORD003", date: "2025-01-20", amount: "$150" },
  { id: 4, status: "pending", orderId: "ORD004", date: "2025-01-22", amount: "$250" },
  { id: 5, status: "accepted", orderId: "ORD005", date: "2025-01-19", amount: "$300" },
  { id: 6, status: "rejected", orderId: "ORD006", date: "2025-01-18", amount: "$400" },
];

const OrdersTable = () => {
  const [filter, setFilter] = useState("pending");
  const navigate = useNavigate();

  // Filter orders based on the selected filter
  const filteredOrders = filter === "all" ? orders : orders.filter((order) => order.status === filter);

  // Handle navigation to order details page
  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
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
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("accepted")}
            className={`px-4 py-2 rounded-md ${filter === "accepted" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Accepted
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-md ${filter === "rejected" ? "bg-[#1D7C42] text-white" : "bg-[#074F5720]"}`}
          >
            Rejected
          </button>
        </div>
        {/* <div className="w-1/3">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Search Orders..."
          />
        </div> */}
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

export default OrdersTable;
