import React, { useState, useEffect } from "react";
import { FiEdit2, FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Make sure this points to your axios.js instance

const Profile = () => {
  const navigate = useNavigate();
  const [dispensaryDetails, setDispensaryDetails] = useState(null);

  useEffect(() => {
    const fetchDispensaryDetails = async () => {
      const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
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

  // If dispensaryDetails is not yet fetched, you can show a loading state
  if (!dispensaryDetails) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full text-black mx-auto p-6 bg-white">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src={
            dispensaryDetails.profilePicture || "https://i.pravatar.cc/?img=12"
          } // Use a fallback image if profilePicture is not available
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
        />
        <h2 className="text-2xl font-semibold mt-4">
          {dispensaryDetails.dispensaryName}
        </h2>
        <p className="flex items-center text-gray-600 text-sm mt-2">
          <FiMapPin className="mr-2" /> {dispensaryDetails.city},{" "}
          {dispensaryDetails.state}
        </p>
        <p className="flex items-center text-gray-600 text-sm">
          <FiPhone className="mr-2" /> {dispensaryDetails.phoneNumber}
        </p>
        <p className="flex items-center text-gray-600 text-sm">
          <FiMail className="mr-2" /> {dispensaryDetails.email}
        </p>
        <p className="flex items-center text-gray-600 text-sm">
          <FiPhone className="mr-2" />{" "}
          {new Date(dispensaryDetails.openingHourTime).toLocaleTimeString()} -{" "}
          {new Date(dispensaryDetails.closingHourTime).toLocaleTimeString()}
        </p>
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
        {/* Change Password Button */}
        {/* <button
          className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
        >
          <FiEdit2 className="mr-2" /> Delete Profile
        </button> */}
      </div>

      {/* Bio Section */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">Bio</h3>
        <p className="text-gray-500 text-sm mt-2">
          {dispensaryDetails.bio || "No bio available"}
        </p>
      </div>

      {/* Documents Section */}
      <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">Documents</h3>
        <p className="text-gray-500 text-sm mt-2">License, Registration</p>
        {/* You can add links to documents here */}
        {dispensaryDetails.licenseFront && (
          <a
            href={dispensaryDetails.licenseFront}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600"
          >
            View Documents
          </a>
        )}
      </div>
    </div>
  );
};

export default Profile;
