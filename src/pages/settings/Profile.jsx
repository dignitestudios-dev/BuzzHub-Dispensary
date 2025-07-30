import React, { useState, useEffect } from "react";
import { FiEdit2, FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { MdLocalHospital, MdOutlineDeleteOutline, MdSpa } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  const [dispensaryDetails, setDispensaryDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          ErrorToast("Token missing. Please login again.");
          return;
        }

        const response = await axios.get("/dispensary/get-dispensary-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setDispensaryDetails(response.data.data);
        } else {
          ErrorToast("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        ErrorToast("Something went wrong while fetching profile");
      }
    };

    fetchProfile();
  }, []);

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
    if (!phoneNumber) return "";
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const getDispensaryType = (disType) => {
    switch (disType) {
      case "REC":
        return (
          <span className="flex items-center text-gray-600 text-sm">
            <MdSpa className="mr-2 text-gray-600" /> Recreational
          </span>
        );
      case "MED":
        return (
          <span className="flex items-center text-gray-600 text-sm">
            <MdLocalHospital className="mr-2 text-blue-600" /> Medical
          </span>
        );
      default:
        return <span className="text-gray-600 text-sm">Unknown</span>;
    }
  };

  if (!dispensaryDetails) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full text-black mx-auto p-6 bg-white overflow-auto">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex items-center gap-4">
          <img
            src={
              dispensaryDetails?.profilePicture ||
              "https://i.pravatar.cc/?img=12"
            }
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
            <p className="text-gray-600 text-sm">
              {getDispensaryType(dispensaryDetails?.disType)}
            </p>
            <p className="flex items-center text-gray-600 text-sm">
              <FiPhone className="mr-2" /> +1{" "}
              {formatPhoneNumber(dispensaryDetails?.phoneNumber)}
            </p>
            <p className="flex items-center text-gray-600 text-sm">
              <FiMail className="mr-2" /> {dispensaryDetails?.email}
            </p>
            <p className="flex items-center text-gray-600 text-sm">
              <FiClock className="mr-2" />{" "}
              {new Date(
                dispensaryDetails?.openingHourTime
              ).toLocaleTimeString()}{" "}
              -{" "}
              {new Date(
                dispensaryDetails?.closingHourTime
              ).toLocaleTimeString()}
            </p>
          </div>
        </div>

       <div className="flex gap-6 lg:justify-end justify-start items-center sm:justify-start sm:gap-2 w-full">
  <button
    onClick={() => navigate("/edit-profile")}
    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base"
  >
    <FiEdit2 className="text-lg sm:text-xl" /> {/* Icon */}
    <span className="text-xs sm:text-base font-semibold">Edit</span> {/* Text */}
  </button>

  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm sm:text-base"
  >
    <MdOutlineDeleteOutline className="text-lg sm:text-xl" /> {/* Icon */}
    <span className="text-xs sm:text-base font-semibold">Delete</span> {/* Text */}
  </button>
</div>


      </div>

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
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">
          About The Dispensary
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          {dispensaryDetails?.bio || "No bio available"}
        </p>
      </div>

      <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-700 text-xl font-medium">
          Licenses & Registration
        </h3>
        <div className="space-y-4 mt-4">
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
