import React from "react"; 
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardBottomBar from "./DashboardBottomBar"; // Import the BottomBar

const GlobalLayout = ({ page }) => {
  return (
    <div className="w-full h-screen overflow-y-hidden flex justify-start items-start">
      <Sidebar />
      <div className="w-full lg:w-[calc(100%-280px)] h-full relative flex flex-col justify-start items-start">
        <Navbar />
        <div className="w-full h-[calc(100%-60px)] bg-[#f3f7f4] white text-white flex flex-col justify-start items-start">
          {page}
        </div>
        {/* Add Bottom Bar Here */}
        <DashboardBottomBar />
      </div>
    </div>
  );
};

export default GlobalLayout;
