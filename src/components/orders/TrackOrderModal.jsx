import { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { updateOrderStatus } from "../../firebase/firestoreService";

const TrackOrderModal = ({
  showModal,
  setShowModal,
  orderId,
  currentStatus,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const statusProgression = [
    "Pending",
    "Approved",
    "In Process",
    "Ready",
    "Out for Delivery",
    "Completed",
  ];

  const handleStatusChange = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "dispensary/manage-order-by-dispensary",
        {
          orderId,
          status: selectedStatus,
        }
      );
      if (response.status === 200) {
        updateOrderStatus(orderId, selectedStatus);
        setShowModal(false);
        navigate("/track-orders");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  const isStatusReached = (status) =>
    statusProgression.indexOf(status) <=
    statusProgression.indexOf(selectedStatus);

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-gray-50 p-8 rounded-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Track Order</h2>

          {/* Vertical Status Tracker */}
          <div className="mb-6">
            {statusProgression.map((status, index) => (
              <div key={status} className="flex items-start space-x-2 relative">
                <div className="flex flex-col items-center">
                  {/* Circle or Checkmark */}
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                      isStatusReached(status) ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    {isStatusReached(status) ? "✓" : ""}
                  </span>
                  {/* Vertical Line */}
                  {index !== statusProgression.length - 1 && (
                    <div className="w-px h-6 bg-gray-300 mt-1"></div>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isStatusReached(status)
                      ? "text-green-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>

          {/* Dropdown */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-600">
              Select Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 border rounded-lg mt-2"
            >
              {statusProgression.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleStatusChange}
              className="w-1/2 py-2 bg-green-600 text-white rounded-lg font-medium"
              disabled={loading}
            >
              {loading ? "Updating..." : "Done"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-1/2 py-2 bg-gray-300 text-black rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TrackOrderModal;
