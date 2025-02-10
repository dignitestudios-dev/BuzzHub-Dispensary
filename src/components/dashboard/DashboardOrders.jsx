// import React, { useState, useEffect } from "react";
// import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "../../axios";

// const OrdersTable = () => {
//   const [orders, setOrders] = useState([]);
//   const [filter, setFilter] = useState("Pending");
//   const navigate = useNavigate();

//   // Fetch orders from API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("dispensary/view-all-orders-dispensary");
//         if (response.data.success) {
//           setOrders(response.data.data[filter]); // Load orders based on the filter
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [filter]); // Fetch orders whenever the filter changes

//   // Handle navigation to order details page
//   const handleViewDetails = (orderId) => {
//     navigate(`/order-details/${orderId}`);
//   };

//   // Map status to a background color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-yellow-400"; // Yellow for Pending
//       case "Accepted":
//         return "bg-blue-500"; // Blue for Accepted
//       case "Rejected":
//         return "bg-red-500"; // Red for Rejected
//       case "Completed":
//         return "bg-green-500"; // Green for Completed
//       default:
//         return "bg-gray-300"; // Default color
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Filter Buttons */}
//       <div className="flex justify-start mb-6 space-x-4">
//         <button
//           onClick={() => setFilter("All")}
//           className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "All" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
//         >
//           All Orders
//         </button>
//         <button
//           onClick={() => setFilter("Pending")}
//           className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Pending" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
//         >
//           Pending
//         </button>
//         <button
//           onClick={() => setFilter("Completed")}
//           className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Completed" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
//         >
//           Completed
//         </button>
//       </div>

//       {/* Orders Table */}
//       <div className="overflow-x-auto rounded-lg shadow-md">
//         <table className="min-w-full text-black bg-white border border-gray-200">
//           <thead>
//             <tr className="text-left bg-[#1D7C42] text-white">
//               <th className="p-5 text-sm font-medium">Product</th>
//               <th className="p-5 text-sm font-medium">Order ID</th>
//               <th className="p-5 text-sm font-medium">Date</th>
//               <th className="p-5 text-sm font-medium">Amount</th>
//               <th className="p-5 text-sm font-medium">Status</th>
//               <th className="p-5 text-sm font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border-b hover:bg-gray-100">
//                 <td className="p-4 flex items-center space-x-3">
//                   {order.products.length > 0 && (
//                     <>
//                       <img
//                         src={order.products[0].productImage[0]} // First image of the first product
//                         alt={order.products[0].name}
//                         className="w-20 h-20 object-cover rounded-md"
//                       />
//                       <span className="text-sm font-medium">{order.products[0].name}</span>
//                     </>
//                   )}
//                 </td>
//                 <td className="p-4 text-sm">{order.orderUvid}</td>
//                 <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td className="p-4 text-sm font-medium">${order.totalAmount}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 text-white rounded-full ${getStatusColor(order.orderStatus)}`}>
//                     {order.orderStatus}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => handleViewDetails(order.orderUvid)}
//                     className="text-[#1D7C42] hover:text-green-500 transition duration-300"
//                   >
//                     <FaEye className="text-xl" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrdersTable;





import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const navigate = useNavigate();

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("dispensary/view-all-orders-dispensary");
        if (response.data.success) {
          setOrders(response.data.data[filter]); // Load orders based on the filter
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [filter]); // Fetch orders whenever the filter changes

  // Handle navigation to order details page
  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  // Map status to a background color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400"; // Yellow for Pending
      case "Accepted":
        return "bg-blue-500"; // Blue for Accepted
      case "Rejected":
        return "bg-red-500"; // Red for Rejected
      case "Completed":
        return "bg-green-500"; // Green for Completed
      default:
        return "bg-gray-300"; // Default color
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
        <button
          onClick={() => setFilter("Pending")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Pending" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={`px-3 py-3 rounded-md text-sm font-semibold ${filter === "Completed" ? "bg-[#1D7C42] text-white" : "bg-gray-300"}`}
        >
          Completed
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
                      onClick={() => handleViewDetails(order.orderUvid)}
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

export default DashboardOrders;
