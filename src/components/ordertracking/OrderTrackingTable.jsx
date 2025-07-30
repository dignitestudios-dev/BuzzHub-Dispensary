import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const OrderTrackingTable = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All"); // Default filter is All
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [ordersPerPage] = useState(10); // Number of orders to show per page
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "dispensary/view-all-orders-dispensary"
        );
        if (response.data.success) {
          console.log(response.data.data);
          // Ensure that you handle each filter correctly based on the status
          setOrders(response.data.data[filter] || []); // Load orders based on the filter
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]); // Fetch orders whenever the filter changes

  // Handle navigation to order details page with state
  const handleViewDetails = (order) => {
    navigate("/order-details", { state: { order } });
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Map status to a background color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400";
      case "Approved":
        return "bg-green-600";
      case "Rejected":
        return "bg-red-500";
      case "Completed":
        return "bg-blue-600";
      case "In Process":
        return "bg-yellow-400";
      case "Out for Delivery":
        return "bg-purple-500";
      case "Ready":
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex justify-start mb-6 space-x-4 overflow-x-auto">
  <button
    onClick={() => setFilter("All")}
    className={`px-4 py-3 rounded-md text-sm font-semibold ${
      filter === "All" ? "bg-[#1D7C42] text-white" : "bg-gray-300"
    }`}
  >
    All Orders
  </button>
  <button
    onClick={() => setFilter("Completed")}
    className={`px-4 py-3 rounded-md text-sm font-semibold ${
      filter === "Completed" ? "bg-[#1D7C42] text-white" : "bg-gray-300"
    }`}
  >
    Completed
  </button>
  <button
    onClick={() => setFilter("InProcess")}
    className={`px-4 py-3 rounded-md text-sm font-semibold ${
      filter === "InProcess" ? "bg-[#1D7C42] text-white" : "bg-gray-300"
    }`}
  >
    In Process
  </button>
  <button
    onClick={() => setFilter("OutForDelivery")}
    className={`px-4 py-3 rounded-md text-sm font-semibold ${
      filter === "OutForDelivery" ? "bg-[#1D7C42] text-white" : "bg-gray-300"
    }`}
  >
    Out for Delivery
  </button>
  <button
    onClick={() => setFilter("Ready")}
    className={`px-4 py-3 rounded-md text-sm font-semibold ${
      filter === "Ready" ? "bg-[#1D7C42] text-white" : "bg-gray-300"
    }`}
  >
    Ready
  </button>
</div>

      {/* Orders Table */}
      {loading ? (
        <>
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        </>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          {currentOrders.length === 0 ? (
            <div className="text-center p-6 text-gray-500">
              No orders have been placed at your dispensary yet📦
            </div>
          ) : (
            <table className="min-w-full text-black bg-white border border-gray-200">
              <thead>
                <tr className="text-left bg-[#1D7C42] text-white">
                  {/* <th className="p-5 text-sm font-medium">Product</th> */}
                  <th className="p-5 text-sm font-medium">Ordered By</th>

                  <th className="p-5 text-sm font-medium">Order ID</th>
                  <th className="p-5 text-sm font-medium">Date</th>
                  <th className="p-5 text-sm font-medium">Amount</th>
                  <th className="p-5 text-sm font-medium">Status</th>
                  <th className="p-5 text-sm font-medium hidden lg:block">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order?._id} className="border-b hover:bg-gray-100">
                    {/* <td className="p-4 flex items-center space-x-3">
                    {order.products.length > 0 && (
                      <>
                        <img
                          src={order?.products[0]?.productImage[0]} // First image of the first product
                          alt={order?.products[0]?.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <span className="text-sm font-medium">
                          {order?.products[0]?.name}
                        </span>
                      </>
                    )}
                  </td> */}
                    {/* <td className="p-4 text-sm">{order?.OrderBy?.Username}</td> */}
                    <td className="p-4 flex items-center space-x-3"                         onClick={() => handleViewDetails(order)}
>
                      <>
                        <img
                          src={order?.OrderBy?.profilePicture} // First image of the first product
                          alt={order?.products[0]?.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <span className="text-sm font-medium"                         onClick={() => handleViewDetails(order)}
>
                          {order?.OrderBy?.Username}
                        </span>
                      </>
                    </td>
                    <td className="p-4 text-sm pl-12"                         onClick={() => handleViewDetails(order)}
>{order?.orderUvid}</td>
                    <td className="p-4 text-sm "                         onClick={() => handleViewDetails(order)}
>
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm font-medium"                         onClick={() => handleViewDetails(order)}
>
                      ${order?.totalAmount?.toFixed(1)}
                    </td>
                    <td className="p-4"                         onClick={() => handleViewDetails(order)}
>
                      <span
                        className={`px-3 py-1 text-white rounded-full ${getStatusColor(
                          order?.orderStatus
                        )}`}
                      >
                        {order?.orderStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-[#1D7C42] hover:text-green-500 transition duration-300 hidden lg:block"
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
      )}

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-8 space-x-4">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-[#1D7C42] text-white rounded-lg hover:bg-[#155e2e] focus:outline-none focus:ring-2 focus:ring-[#074F57] disabled:opacity-50 transition-all duration-200"
        >
          Previous
        </button>

        {/* Current Page */}
        <span className="text-xl text-gray-700 font-semibold">
          Page {currentPage}
        </span>

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * ordersPerPage >= orders.length}
          className="px-6 py-2 bg-[#1D7C42] text-white rounded-lg hover:bg-[#155e2e] focus:outline-none focus:ring-2 focus:ring-[#074F57] disabled:opacity-50 transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingTable;
