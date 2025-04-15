import React, { useState, useEffect } from "react";
import { FiEdit2, FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  const [dispensaryDetails, setDispensaryDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState(""); // State to store password
  const [passwordError, setPasswordError] = useState(""); // State for password error message

  useEffect(() => {
    const fetchDispensaryDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          // Fetch dispensary details using the userId
          const response = await axios.get(`/dispensary/details/${userId}`);
          if (response.data.success) {
            setDispensaryDetails(response.data.data.dispensary);
          } else {
            console.error("Failed to fetch dispensary details.");
          }
        } catch (error) {
          console.error("Error fetching dispensary details:", error);
        }
      }
    };
    fetchDispensaryDetails();
  }, []);

  // If dispensaryDetails is not yet fetched, show a loading state
  if (!dispensaryDetails) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleDeleteProfile = async () => {
    if (!password) {
      setPasswordError("Password is required to delete your profile.");
      ErrorToast("Password is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token is missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        `auth/delete-account-dispensary`,
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        SuccessToast("Profile deleted successfully");
        localStorage.clear();
        navigate("/");
      } else {
        ErrorToast("Failed to delete profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      ErrorToast("An error occurred while deleting the profile.");
    }

    setIsModalOpen(false);
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

  return (
    <div className="w-full text-black mx-auto p-6 bg-white overflow-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          src={
            dispensaryDetails?.profilePicture || "https://i.pravatar.cc/?img=12"
          } // Fallback image if profilePicture is not available
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            {dispensaryDetails?.dispensaryName}
          </h2>

          <p className="flex items-center text-gray-600 text-sm mt-2">
            <FiMapPin className="mr-2" /> {dispensaryDetails?.city},{" "}
            {dispensaryDetails?.state}
          </p>
          {dispensaryDetails?.disType && (
            <p className="flex items-center text-gray-600 text-sm">
              <span className="mr-2">Type:</span>
              {dispensaryDetails.disType === "MED" ? "Medical" : "Recreational"}
            </p>
          )}
          <p className="flex items-center text-gray-600 text-sm">
            <FiPhone className="mr-2" /> +1{" "}
            {formatPhoneNumber(dispensaryDetails?.phoneNumber)}
          </p>
          <p className="flex items-center text-gray-600 text-sm">
            <FiMail className="mr-2" /> {dispensaryDetails?.email}
          </p>
          <p className="flex items-center text-gray-600 text-sm">
            <FiClock className="mr-2" />{" "}
            {new Date(dispensaryDetails?.openingHourTime).toLocaleTimeString()}{" "}
            -{" "}
            {new Date(dispensaryDetails?.closingHourTime).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-4 mt-6">
        {/* Edit Profile Button */}
        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
        >
          <FiEdit2 className="mr-2" /> Edit Profile
        </button>

        {/* Change Password Button */}
        <button
          onClick={() => navigate("/change-password")}
          className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
        >
          <FiEdit2 className="mr-2" /> Change Password
        </button>

        {/* Delete Profile Button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal when clicked
          className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-red-700 transition duration-300"
        >
          <MdOutlineDeleteOutline className="mr-2 text-xl" /> Delete Profile
        </button>
      </div>

      {/* Bio Section */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">Bio</h3>
        <p className="text-gray-500 text-sm mt-2">
          {dispensaryDetails?.bio || "No bio available"}
        </p>
      </div>

      {/* Modal for Deleting Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Delete Profile
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete your profile? This action is
              irreversible.
            </p>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal without deleting
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile} // Proceed to delete the profile
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Licenses and Registration Documents Section */}
      <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">
          Licenses & Registration
        </h3>
        <div className="space-y-4 mt-4">
          {/* License Front */}
          {dispensaryDetails?.licenseFront && (
            <div>
              <h4 className="text-gray-600 text-sm">License Front</h4>
              <a
                href={dispensaryDetails?.licenseFront}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
              >
                View License Front
              </a>
            </div>
          )}

          {/* License Back */}
          {dispensaryDetails?.licenseBack && (
            <div>
              <h4 className="text-gray-600 text-sm">License Back</h4>
              <a
                href={dispensaryDetails?.licenseBack}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
              >
                View License Back
              </a>
            </div>
          )}

          {/* Registration License Front */}
          {dispensaryDetails?.registrationLicenseFront && (
            <div>
              <h4 className="text-gray-600 text-sm">
                Registration License Front
              </h4>
              <a
                href={dispensaryDetails?.registrationLicenseFront}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
              >
                View Registration License Front
              </a>
            </div>
          )}

          {/* Registration License Back */}
          {dispensaryDetails?.registrationLicenseBack && (
            <div>
              <h4 className="text-gray-600 text-sm">
                Registration License Back
              </h4>
              <a
                href={dispensaryDetails?.registrationLicenseBack}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
              >
                View Registration License Back
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
