import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "../../axios";
import TrackOrderModal from "../../components/orders/TrackOrderModal";
import { db } from "../../firebase/firebase"; // Assume Firebase is configured here
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getExistingChatRoom } from "../../firebase/firestoreService";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const OrderDetailsPage = () => {
  const location = useLocation();
  const { order } = location.state; // Extract the order from state
  console.log("order is --? ", order);
  const navigate = useNavigate();

  // State to manage the clicked image
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state
  const [chatLoading, setChatLoading] = useState(false);

  // States for the modals
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(order); // State to store order details

  const totalProducts = order?.products.length || 0; // Count number of products

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

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ""; // return an empty string if phoneNumber is not provided

    // Removing any non-digit characters (optional, in case you have a formatted number)
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Apply the USA format (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber; // Return the original phone number if it doesn't match the expected pattern
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

  const totalGrams = order?.products.reduce(
    (total, product) => total + product.gram,
    0
  );

  const subtotal = order?.totalAmount + order?.platformFee;

  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleSubmit = async (sellerId, buyerId, chatName, imageUrl) => {
    setChatLoading(true);
    try {
      const members = [sellerId, buyerId];

      console.log(`sellerId: ${sellerId}\nbuyerId: ${buyerId}`);

      let existingChatRoomId = await getExistingChatRoom(members);
      console.log("existingChatRoomId--- ", existingChatRoomId);

      if (!existingChatRoomId) {
        const response = await axios.post("/dispensary/create-chatroom", {
          userUid: buyerId,
        });
        console.log("response== ", response);
        if (response.status === 200) {
          const chatRoomId = response.data.chatRoomId;

          existingChatRoomId = chatRoomId;

          const chatRoomRef = await addDoc(collection(db, "chats"), {
            members,
            chatName,
            imageUrl,
            buyerId,
            sellerId,
            createdAt: new Date(),
          });

          existingChatRoomId = chatRoomRef.id;
        }
      }
      navigate(`/chat`, { state: { existingChatRoomId } });
    } catch (e) {
      console.error("Error starting chat:", e);
    } finally {
      setChatLoading(false);
    }
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
          <div className="rounded-lg  mx-auto">
            <h2 className="text-4xl font-extrabold text-black mb-6 text-left">
              Order Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-800">
              {/* Order ID */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">Order ID</span>
                <span className="font-bold text-teal-700">
                  {order.orderUvid}
                </span>
              </div>

              {/* Placed On */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">
                  Total Amount
                </span>
                <span className="font-bold text-teal-700">
                  ${(order?.totalAmount * 1.02).toFixed(2)}
                </span>
              </div>

              {/* Order Status */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">
                  Order Status
                </span>
                <span className="font-bold text-teal-700">
                  {orderDetails.orderStatus}
                </span>
              </div>

              {/* Total Grams */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">Total Grams</span>
                <span className="font-bold text-teal-700">
                  {totalGrams} grams
                </span>
              </div>

              {/* Total Products Ordered */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">
                  Total Products
                </span>
                <span className="font-bold text-teal-700">
                  {totalProducts} products
                </span>
              </div>

              {/* Platform Fee */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">
                  Platform Fee
                </span>
                <span className="font-bold text-teal-700">
                  ${(order?.totalAmount * 0.02).toFixed(2)}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">
                  Fulfillment Method
                </span>
                <span className="font-bold text-teal-700">
                  {order?.fulfillmentMethod}
                </span>
              </div>

              {/* Fulfillment Method */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">Subtotal</span>
                <span className="font-bold text-teal-700">
                  ${order?.totalAmount}
                </span>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                <span className="font-semibold text-gray-600">Placed On</span>
                <span className="font-bold text-teal-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* User Information */}
          {/* <div className="border-b border-gray-200"></div> */}
          <div className="rounded-xl ">
            {/* Section Header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              User Information
            </h2>

            {/* Top: Profile & Contact Info */}
            <div className="flex items-start gap-4 md:gap-6 mb-8 flex-col sm:flex-row">
              <img
                src={order.OrderBy.profilePicture}
                alt={order.OrderBy.Username}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-300"
              />
              <div className="flex flex-col overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {order.OrderBy.Username}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mt-1 truncate">
                  <FiPhone className="mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">
                    +1 {formatPhoneNumber(order?.phoneNumber)}
                  </span>
                </div>

                {order.fulfillmentMethod !== "Self Pickup" && (
                  <div className="flex items-start text-sm text-gray-600 mt-1">
                    <IoLocationOutline className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                    <span className="truncate max-w-[300px] sm:max-w-[400px] md:max-w-full">
                      {order.shippingAddress}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom: Medical & License side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Medical Card */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Medical Card
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    order.OrderBy.medicalCardFront,
                    order.OrderBy.medicalCardBack,
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Medical Card ${idx === 0 ? "Front" : "Back"}`}
                      className="w-32 h-20 rounded-lg object-cover border border-gray-200 shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
              </div>

              {/* Driver’s License */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Driver’s License
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    order.OrderBy.drivingLicenseFront,
                    order.OrderBy.drivingLicenseBack,
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`License ${idx === 0 ? "Front" : "Back"}`}
                      className="w-32 h-20 rounded-lg object-cover border border-gray-200 shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
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
                    Total Grams: {product.weightQuantity} {product.weightType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ordered Grams: {product.gram} grams
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.warningDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full grid grid-cols-2 justify-center space-x-2">
            {order.orderStatus === "Approved" ? (
              <div>
                <div className="w-full">
                  <button
                    disabled={chatLoading}
                    onClick={() =>
                      handleSubmit(
                        user?.uid,
                        order?.userId,
                        user?.dispensaryName,
                        user?.profilePicture
                      )
                    }
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-medium"
                  >
                    {chatLoading ? "Loading..." : "Chat with Buyer"}
                  </button>
                </div>
              </div>
            ) : null}
            {order.orderStatus === "In Process" ||
            order.orderStatus === "Ready" ||
            order.orderStatus === "Out for Delivery" ||
            order.orderStatus === "Approved" ||
            order.orderStatus === "Completed" ? (
              <div className="w-full">
                <button
                  onClick={() => setShowTrackOrderModal(true)}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-medium"
                >
                  Track Order
                </button>
              </div>
            ) : null}
            {order.orderStatus === "Pending" ? (
              <div className="flex justify-between space-x-4">
                <button
                  onClick={() => setShowAcceptModal(true)}
                  className="w-1/2 py-3 bg-green-600 text-white rounded-lg font-medium"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Accept Order"}
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="w-1/2 py-3 bg-red-600 text-white rounded-lg font-medium"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Reject Order"}
                </button>
              </div>
            ) : null}
            {error && <p className="text-red-600">{error}</p>}
          </div>
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
                disabled={loading}
                onClick={handleAcceptOrder}
                className="w-1/2 py-2 bg-green-600 text-white rounded-lg font-medium"
              >
                {loading ? "loading..." : "Accept"}
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
