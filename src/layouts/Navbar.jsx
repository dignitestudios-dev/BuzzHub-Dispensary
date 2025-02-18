import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { GlobalContext } from "../contexts/GlobalContext";
import axios from "../axios";

const Navbar = () => {
  const { navigate } = useContext(GlobalContext);
  const [dispensaryDetails, setDispensaryDetails] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="w-full h-[60px] bg-gray-50  border-b border-gray-300 flex justify-end items-center px-4 relative">
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <div className="relative">
          <button
            onClick={() => navigate("/notifications", "Notifications")}
            className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#074F5730]  p-1 relative"
          >
            <IoNotificationsOutline className="text-[#074F57] w-full h-full" />
            {/* <GoDotFill className="w-[20px] h-[20px] text-[#F44237] absolute -top-2 -right-1" /> */}
          </button>

          {/* {isDropdownOpen && <NotificationDropdown />} */}
        </div>

        <button
          // onClick={() => navigate("/profile")}
          className="flex items-center gap-2 relative"
        >
          {/* Image for profile link */}
          <img
            src={
              dispensaryDetails?.profilePicture ||
              "https://i.pravatar.cc/?img=12"
            }
            alt="Profile"
            className="w-[35px] h-[35px] rounded-full cursor-pointer"
            onClick={() => navigate("/profile", "Profile")}
          />
          <div className="w-auto flex flex-col justify-start items-start">
            <p
              className="text-[11px] font-normal text-black"
              onClick={() => navigate("/profile", "Profile")}
            >
              Welcome back,
            </p>
            <p
              className="text-[11px] font-medium text-[#074F57]"
              onClick={() => navigate("/profile", "Profile")}
            >
              {dispensaryDetails.dispensaryName}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
