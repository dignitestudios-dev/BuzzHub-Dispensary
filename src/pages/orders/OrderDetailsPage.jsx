import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "../../axios";
import TrackOrderModal from "../../components/orders/TrackOrderModal";

const OrderDetailsPage = () => {
  const location = useLocation();
  const { order } = location.state; // Extract the order from state
  console.log("order is --? ", order);
  const navigate = useNavigate();

  // State to manage the clicked image
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state

  // States for the modals
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(order); // State to store order details

  // Function to handle accepting the order
  const handleAcceptOrder = async () => {
    setLoading(true); // Set loading state
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "dispensary/manage-order-by-dispensary",
        {
          orderId: orderDetails._id, // Using _id to update status
          status: "Approved",
        }
      );

      if (response.status === 200) {
        // Update the order details state with the new status
        setOrderDetails((prevOrder) => ({
          ...prevOrder,
          orderStatus: "Approved",
        }));

        alert(`Order ${orderDetails.orderUvid} has been Approved`);
        navigate("/orders"); // Navigate to the orders page
      }
    } catch (err) {
      setError("An error occurred while updating the order status.");
    } finally {
      setLoading(false); // Stop loading state
      setShowAcceptModal(false); // Close the accept modal
    }
  };

  // Function to handle rejecting the order
  const handleRejectOrder = async () => {
    setLoading(true); // Set loading state
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "dispensary/manage-order-by-dispensary",
        {
          orderId: orderDetails._id, // Using _id to update status
          status: "Rejected",
        }
      );

      if (response.status === 200) {
        // Update the order details state with the new status
        setOrderDetails((prevOrder) => ({
          ...prevOrder,
          orderStatus: "Rejected",
        }));

        alert(`Order ${orderDetails.orderUvid} has been Rejected`);
        navigate("/orders"); // Navigate to the orders page
      }
    } catch (err) {
      setError("An error occurred while updating the order status.");
    } finally {
      setLoading(false); // Stop loading state
      setShowRejectModal(false); // Close the reject modal
    }
  };

  // Handle image click (open modal)
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the clicked image in state
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  const handleTrackOrder = () => {
    setShowTrackOrderModal(true);
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
          <h1 className="ml-4 text-2xl font-semibold text-gray-800 ">
            Order Request
          </h1>
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-8 ">
          <div>
            <h2 className="text-2xl font-semibold mb-6 ">Order Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-medium">{order.orderUvid}</span>
              </div>
              <div className="flex justify-between">
                <span>Placed On</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Status</span>
                <span className={`font-semibold ${orderDetails.orderStatus}`}>
                  {orderDetails.orderStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-medium">${order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment Method</span>
                <span>{order.fulfillmentMethod}</span>
              </div>
            </div>
          </div>
          {/* User Information */}
          <div className="border-b border-gray-200"></div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 ">User Information</h2>
            <div className="flex items-center mb-6">
              <img
                src={order.OrderBy.profilePicture}
                alt={order.OrderBy.Username}
                className="w-16 h-16 rounded-full mr-6"
              />
              <div>
                <p className="text-lg font-semibold">
                  {order.OrderBy.Username}
                </p>
                <p className="text-sm text-gray-600">
                  User ID: {order.OrderBy.uid}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.phoneNumber}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Medical Details</h3>
              <div className="flex space-x-4">
                <img
                  src={order.OrderBy.medicalCardFront}
                  alt="Medical Card Front"
                  className="w-24 h-16 object-cover rounded-md cursor-pointer hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={() =>
                    handleImageClick(order.OrderBy.medicalCardFront)
                  } // Open modal on click
                />
                <img
                  src={order.OrderBy.medicalCardBack}
                  alt="Medical Card Back"
                  className="w-24 h-16 object-cover rounded-md cursor-pointer hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={() =>
                    handleImageClick(order.OrderBy.medicalCardBack)
                  } // Open modal on click
                />
              </div>
            </div>
          </div>
          {/* Product Details */}
          <div className="border-b border-gray-200"></div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            {order.products.map((product) => (
              <div key={product.productId} className="flex items-center mb-6">
                <img
                  src={product.productImage[0]} // First product image
                  alt={product.name}
                  className="w-36 h-36 rounded-lg mr-6"
                />
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Type: {product.productType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Sub-Types: {product.subTypes.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Weight: {product.weightQuantity} {product.weightType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.productDescription}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.warningDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Shipping Address */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <p className="text-sm text-gray-600">{order.shippingAddress}</p>
          </div>
          {/* Conditional Buttons */}
          {order.orderStatus === "In Process" ||
          order.orderStatus === "Ready" ||
          order.orderStatus === "Out for Delivery" ||
          order.orderStatus === "Approved" ||
          order.orderStatus === "Completed" ? (
            <div className="w-full">
              <button
                onClick={() => handleTrackOrder()} // Add a function to track the order
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium" // w-full makes it full width
              >
                Track Order
              </button>
            </div>
          ) : (
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowAcceptModal(true)} // Show Accept Modal
                className="w-1/2 py-3 bg-green-600 text-white rounded-lg font-medium"
                disabled={loading}
              >
                {loading ? "Updating..." : "Accept Order"}
              </button>
              <button
                onClick={() => setShowRejectModal(true)} // Show Reject Modal
                className="w-1/2 py-3 bg-red-600 text-white rounded-lg font-medium"
                disabled={loading}
              >
                {loading ? "Updating..." : "Reject Order"}
              </button>
            </div>
          )}
          {error && <p className="text-red-600 mt-4">{error}</p>}{" "}
          {/* Show error message */}
        </div>
      </div>

      {/* Confirmation Modals */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to accept this order?
            </h2>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleAcceptOrder}
                className="w-1/2 py-2 bg-green-600 text-white rounded-lg font-medium"
              >
                Accept
              </button>
              <button
                onClick={() => setShowAcceptModal(false)}
                className="w-1/2 py-2 bg-gray-300 text-black rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to reject this order?
            </h2>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleRejectOrder}
                className="w-1/2 py-2 bg-red-600 text-white rounded-lg font-medium"
              >
                Reject
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-1/2 py-2 bg-gray-300 text-black rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      <TrackOrderModal
        showModal={showTrackOrderModal}
        setShowModal={setShowTrackOrderModal}
        orderId={order._id}
        currentStatus={order.orderStatus}
      />

      {/* Modal to display the clicked image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="relative bg-gray-50 p-6 rounded-lg max-w-2xl w-full">
            <img
              src={selectedImage}
              alt="Medical Card"
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-0.5 right-3 text-black rounded-full focus:outline-none transition"
            >
              <span className="text-3xl">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
