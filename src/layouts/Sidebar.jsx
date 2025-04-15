import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../src/assets/export";
import { sidebarArr } from "../constants/sidebarArr";
import { RiLogoutCircleLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for controlling the modal visibility

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLinkClick = (url) => {
    setActiveLink(url);
  };

  const handleLogout = async () => {
    signOut();
    navigate("/");
  };

  const handleLogoutClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without logging out
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-[#074F57]"
      >
        {isDrawerOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 w-[280px] bg-gray-50 border-r border-gray-300 py-4 flex flex-col justify-start items-start transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 h-screen overflow-y-auto`}
      >
        <div className="flex justify-center items-center w-full">
          {" "}
          <img
            src={Logo}
            alt="perfectboat_logo"
            className="h-[100px] bg-[#1D7C42] rounded-full"
          />
        </div>

        <div className="w-full flex-grow mt-4 scrollbar-hide">
          <ul className="w-full space-y-4">
            {sidebarArr.map((link, index) => (
              <li
                key={index}
                className="w-full flex justify-start items-center gap-3"
              >
                <span
                  className={`w-2 h-3 rounded-r-full ${
                    activeLink === link.url
                      ? "bg-[#1D7C42]"
                      : "bg-[#1D7C4230] border border-[#074F57]"
                  }`}
                ></span>
                <Link
                  to={link.url}
                  onClick={() => handleLinkClick(link.url)}
                  className={`flex items-end w-[calc(100%-1.9rem)] gap-2 px-8 py-3 rounded-md transition-all relative ${
                    activeLink === link.url
                      ? "bg-[#1D7C42] text-white"
                      : "bg-[#1D7C4230] border border-[#074F57] text-[#074F57] hover:bg-[#1D7C42]  hover:text-white" // Hover background color
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-sm font-medium">{link.title}</span>

                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            <li className="w-full flex justify-start items-center gap-3">
              <span className="w-2 h-3 rounded-r-full bg-[#074F5730] border border-[#074F57]"></span>
              <button
                onClick={handleLogoutClick} // Show modal on click
                className="flex items-center gap-3 px-8 py-3 bg-[#1D7C4230] border border-[#074F57] text-[#074F57] hover:bg-[#1D7C42]  hover:text-white rounded-md transition-all w-[calc(100%-1.9rem)]"
              >
                <RiLogoutCircleLine className="text-xl" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          onClick={handleCloseDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}

      {/* Logout confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold">
              Are you sure you want to logout?
            </h2>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded-md text-sm text-BLACK hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#1D7C42] px-4 py-2 rounded-md text-sm text-white hover:bg-[#21653b]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
