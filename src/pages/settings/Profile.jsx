import React from "react";
import { FiEdit2, FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-black mx-auto p-6 bg-white ">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src="https://i.pravatar.cc/?img=12"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
        />
        <h2 className="text-2xl font-semibold mt-4">Dispensary Name</h2>
        <p className="flex items-center text-gray-600 text-sm mt-2">
          <FiMapPin className="mr-2" /> Toronto, Canada
        </p>
        <p className="flex items-center text-gray-600 text-sm">
          <FiPhone className="mr-2" /> +1 834 0570 746
        </p>
        <p className="flex items-center text-gray-600 text-sm">
          <FiMail className="mr-2" /> dispensary@gmail.com
        </p>
        <p className="flex items-center text-gray-600 text-sm">
          <FiClock className="mr-2" /> 09:00 AM - 09:00 PM
        </p>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => navigate("/edit-profile")}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
      >
        <FiEdit2 className="mr-2" /> Edit Profile
      </button>

      {/* Bio Section */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">Bio</h3>
        <p className="text-gray-500 text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna ligula, feugiat sit amet tincidunt eget, tempor et nisi.
        </p>
      </div>

      {/* Documents Section */}
      <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">Documents</h3>
        <p className="text-gray-500 text-sm mt-2">License, Registration</p>
      </div>
    </div>
  );
};

export default Profile;
