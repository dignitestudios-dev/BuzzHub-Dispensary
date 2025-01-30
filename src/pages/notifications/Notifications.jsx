import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import NotificationsModal from '../../components/notifications/NotificationsModal';

const notifications = [
  {
    id: 1,
    title: "New Order",
    message: "A user has ordered one of your products.",
    timestamp: "2025-01-06 10:00 AM",
    status: "active",
  },
  {
    id: 2,
    title: "New Order",
    message: "A user has ordered one of your products.",
    timestamp: "2025-01-05 3:00 PM",
    status: "inactive",
  },
  {
    id: 3,
    title: "New Order",
    message: "A user has ordered one of your products.",
    timestamp: "2025-01-04 5:00 PM",
    status: "active",
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [newNotification, setNewNotification] = useState({ title: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="p-6  w-full min-h-screen">
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

      {/* Notifications List */}
      <div className="mt-8 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="cursor-pointer rounded-xl border border-[#1D7C42] bg-[#1D7C4215]  shadow  p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#074F57]">{notification.title}</h3>
              <span className="text-sm text-gray-700">{notification.timestamp}</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
