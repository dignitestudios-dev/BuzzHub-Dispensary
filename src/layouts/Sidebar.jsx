import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../src/assets/export"; // Assuming Logo is an image component
import { sidebarArr } from "../constants/sidebarArr"; // Import your sidebarArr
import { RiLogoutCircleLine, RiMenuLine, RiCloseLine } from "react-icons/ri";

const Sidebar = () => {
  // State for controlling the drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // State for tracking the active link
  const [activeLink, setActiveLink] = useState(null);

  // Toggle Drawer (Mobile)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close Drawer when clicking on overlay
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Handle active link change
  const handleLinkClick = (url) => {
    setActiveLink(url);
  };

  return (
    <div>
      {/* Drawer Toggle Button (Hamburger -> X) */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-[#074F57]"
      >
        {isDrawerOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Sidebar (Drawer) */}
      <div
        className={`fixed lg:static top-0 left-0 w-[280px] bg-gray-50 border-r border-gray-300 py-4 flex flex-col justify-start items-start transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 h-screen overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex justify-center items-center w-full">
          <Link to="/">
            <img
              src={Logo}
              alt="perfectboat_logo"
              className="h-[100px] bg-[#1D7C42] rounded-full"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="w-full flex-grow mt-4 scrollbar-hide">
          <ul className="w-full space-y-4">
            {sidebarArr.map((link, index) => (
              <li key={index} className="w-full flex justify-start items-center gap-3">
                <span
                  className={`w-2 h-3 rounded-r-full ${
                    activeLink === link.url
                      ? "bg-[#1D7C42]"
                      : "bg-[#1D7C4230] border border-[#074F57]"
                  }`}
                ></span>
                <Link
                  to={link.url}
                  onClick={() => handleLinkClick(link.url)} // Set active on click
                  className={`flex items-end w-[calc(100%-1.9rem)] gap-2 px-8 py-3 rounded-md transition-all relative ${
                    activeLink === link.url
                      ? "bg-[#1D7C42] text-white" // Active background color
                      : "bg-[#1D7C4230] border border-[#074F57] text-[#074F57] hover:bg-[#1D7C42]  hover:text-white" // Hover background color
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-sm font-medium">{link.title}</span>

                  {/* Modern hover effect: underline */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            
            {/* Logout Button as a List Item */}
            <li className="w-full flex justify-start items-center gap-3">
              <span className="w-2 h-3 rounded-r-full bg-[#074F5730] border border-[#074F57]"></span>
              <button
                onClick={() => alert("Logged out")}
                className="flex items-center gap-3 px-8 py-3 bg-[#1D7C4230] border border-[#074F57] text-[#074F57] hover:bg-[#1D7C42]  hover:text-white rounded-md transition-all w-[calc(100%-1.9rem)]"
              >
                <RiLogoutCircleLine className="text-xl" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay when drawer is open (Mobile only) */}
      {isDrawerOpen && (
        <div
          onClick={handleCloseDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
