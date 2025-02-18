import React, { useState } from "react";

const ReportModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const [selectedReason, setSelectedReason] = useState("");

  const reportReasons = [
    "Non-Payment or Fraudulent Activities",
    "Safety and Health Concerns",
    "Security Concerns",
    "Abuse or Misconduct",
    "Legal Compliance",
    "Violation Policies",
    "Repeated Infractions",
    "Others",
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
    } else {
      alert("Please select a reason.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Report User</h3>
        <p className="mb-4">
          To help improve your experience for next time, please let us know why
          you are reporting this user:
        </p>

        <div className="space-y-2">
          {reportReasons.map((reason, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name="reportReason"
                value={reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                checked={selectedReason === reason}
                className="mr-2"
              />
              {reason}
            </label>
          ))}

          {selectedReason === "Others" && (
            <input
              type="text"
              placeholder="Please specify"
              className="mt-2 px-4 py-2 w-full border rounded-lg"
              onChange={(e) => setSelectedReason(e.target.value)}
            />
          )}
        </div>

        <div className="mt-4 flex ">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mr-4"
            onClick={handleSubmit}
          >
            Confirm
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
