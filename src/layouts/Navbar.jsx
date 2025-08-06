import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets/export";
import { IoNotificationsOutline } from "react-icons/io5";
import { GlobalContext } from "../contexts/GlobalContext";
import axios from "../axios";

const Navbar = () => {
  const { navigate } = useContext(GlobalContext);
  const [dispensaryDetails, setDispensaryDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal visibility
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchDispensaryDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`/dispensary/details/${userId}`);
          if (response?.data?.success) {
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Navigate to login page after logout
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the confirmation modal
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false); // Close the modal without logging out
  };

  return (
    <div className="w-full h-[60px] bg-gray-50 border-b border-gray-300 flex justify-end items-center px-4 relative">
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900 relative">
        <div>
          <button
            onClick={() => navigate("/notifications", "Notifications")}
            className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#074F5730] p-1 relative"
          >
            <IoNotificationsOutline className="text-[#074F57] w-full h-full" />
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2"
          >
            <img
              src={dispensaryDetails?.profilePicture || Logo}
              alt="Profile"
              className="w-[35px] h-[35px] rounded-full cursor-pointer bg-green-600"
            />
            <div className="flex flex-col items-start text-left">
              <p className="text-[11px] text-black">Welcome back,</p>
              <p className="text-[11px] font-medium text-[#074F57]">
                {dispensaryDetails?.dispensaryName || "User"}
              </p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 shadow-md rounded-xl py-2 z-50">
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/profile", "Profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href =
                      "https://buzzhub-landing.vercel.app/privacypolicy2")
                  }
                >
                  Privacy Policy
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href =
                      "https://buzzhub-landing.vercel.app/termsandconditions2")
                  }
                >
                  Terms and Condition
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate("/change-password", "Account & Setting")
                  }
                >
                  Change Password
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  onClick={handleLogoutClick} // Trigger logout modal
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl w-80">
            <h2 className="text-xl font-semibold text-black text-center">
              Are you sure you want to logout?
            </h2>
            <div className="mt-6 space-x-4 flex justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 text-sm font-medium text-black bg-white rounded-full border border-gray-300 hover:bg-gray-400 hover:text-white transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-full  hover:bg-red-800 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
