import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NotificationsModal from "../../components/notifications/NotificationsModal";
import axios from "../../axios";

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

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

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 pb-20 w-full h-auto overflow-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
      </div>

      {/* Notifications Modal */}
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
      {!isLoading && !error && currentNotifications.length > 0 ? (
        <>
          <div className="mt-8 space-y-4">
            {currentNotifications.map((notification) => (
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

          {/* Pagination Controls */}
          <div className="flex justify-end items-center mt-8 space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-[#1D7C42] text-white rounded-lg hover:bg-[#155e2e] disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <span className="text-xl text-gray-500 font-semibold">
              Page {currentPage}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastNotification >= notifications.length}
              className="px-6 py-2 bg-[#1D7C42] text-white rounded-lg hover:bg-[#155e2e] disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500">No notifications found.</p>
        )
      )}
    </div>
  );
};

export default Notifications;
