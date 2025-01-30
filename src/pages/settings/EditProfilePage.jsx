import React, { useState } from "react";
import { FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Dispensary Name",
    phone: "+1 834 0570 746",
    address: "Toronto, Canada",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    openingHour: "09:00 AM",
    closingHour: "09:00 PM",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full text-black mx-auto p-6 bg-white shadow-lg overflow-auto">
<h1 className="text-black text-3xl font-bold mb-8 border-b pb-2">Edit Profile</h1>

      {/* Profile Section (Image and Name) */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{formData.name}</h2>
          <p className="text-gray-500 text-sm mt-1">Dispensary</p>
        </div>
        <img
          src="https://i.pravatar.cc/?img=12"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMail className="text-gray-500" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Dispensary Name"
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiPhone className="text-gray-500" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Phone Number"
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMapPin className="text-gray-500" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Address"
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Bio"
            rows={4}
          />
        </div>

        {/* Opening and Closing Hours */}
        <div className="flex space-x-4 mt-4">
          <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
            <FiClock className="text-gray-500" />
            <input
              type="text"
              name="openingHour"
              value={formData.openingHour}
              onChange={handleChange}
              className="ml-2 w-full p-2 outline-none"
              placeholder="Opening Hour"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
            <FiClock className="text-gray-500" />
            <input
              type="text"
              name="closingHour"
              value={formData.closingHour}
              onChange={handleChange}
              className="ml-2 w-full p-2 outline-none"
              placeholder="Closing Hour"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={() => navigate("/profile")}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfilePage;
