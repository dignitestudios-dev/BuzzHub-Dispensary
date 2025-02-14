import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NotificationsModal from "../../components/notifications/NotificationsModal";
import axios from "../../axios"; // Import the axios instance

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("dispensary/get-notification-content");
        if (response.data.success) {
          setNotifications(response.data.data);
        } else {
          setError("Failed to fetch notifications");
        }
      } catch (err) {
        setError("Error fetching notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleCreateNotification = () => {
    if (newNotification.title && newNotification.message) {
      alert("Notification Created!");
      setNewNotification({ title: "", message: "" });
      setIsModalOpen(false);
    } else {
      alert("Please fill in both title and message.");
    }
  };

  return (
    <div className="p-6 w-full h-auto overflow-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
      </div>

      {/* Create Notification Button */}
      {/* <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#074F57] text-white p-4 rounded-full shadow-lg hover:bg-[#113b3f] transition duration-300"
      >
        <IoAddCircleOutline className="text-3xl" />
      </button> */}

      {/* New Notification Modal */}
      <NotificationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newNotification={newNotification}
        onChange={setNewNotification}
        onSubmit={handleCreateNotification}
      />

      {/* Loading & Error Handling */}
      {isLoading && (
        <p className="text-center text-gray-600">Loading notifications...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Notifications List */}
      {!isLoading && !error && notifications.length > 0 ? (
        <div className="mt-8 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="cursor-pointer rounded-xl border border-[#1D7C42] bg-[#1D7C4215] shadow p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#074F57]">
                  {notification.title}
                </h3>
                <span className="text-sm text-gray-700">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500">No notifications found.</p>
        )
      )}
    </div>
  );
};

export default Notifications;
