import { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

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

  const statusList = [
    "Pending",
    "Approved",
    "Completed",
    "Rejected",
    "In Process",
    "Out for Delivery",
    "Ready",
    "Unknown",
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
      console.log("resp00", response);
      if (response.status === 200) {
        setShowModal(false); // Close the modal
        navigate("/track-orders");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-gray-50 p-8 rounded-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Track Order</h2>

          {/* Dropdown to select the status */}
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
              {statusList.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
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
