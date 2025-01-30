import React from "react";
import { FiUsers, FiDollarSign } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";




const DashboardStats = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Pending Orders",
      value: 6,
      icon: <IoCartOutline className="text-[#1D7C42] text-3xl" />,
      change: "0% change from yesterday",
      bgColor: "#074F5720",
      route: "/users",
    },
    {
      title: "Accepted Orders",
      value: 40,
      icon: <FaCheck className="text-[#1D7C42] text-3xl" />,
      change: "0% change from yesterday",
      bgColor: "#074F5720",
      route: "/posts",
    },
    {
      title: "Rejected Orders",
      value: "8",
      icon: <MdOutlineCancel className="text-[#1D7C42] text-3xl" />,
      change: "0% change from yesterday",
      bgColor: "#074F5720",
      route: "/withdrawals",
    },
    {
      title: "Total Revenue",
      value: "$5010",
      icon: <FiDollarSign className="text-[#1D7C42] text-3xl" />,
      change: "0% change from yesterday",
      bgColor: "#074F5720",
      route: "/revenue",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          onClick={() => navigate(stat.route)}
          className="cursor-pointer w-full rounded-xl border border-gray-200 bg-white shadow  transition-all duration-300 p-6 flex items-center justify-between space-x-6"
        >
          <div className="flex flex-col items-start justify-between space-y-2">
            <span className="text-4xl font-semibold text-gray-800">{stat.value}</span>
            <span className="text-gray-500 text-sm font-medium">{stat.title}</span>
            {/* Optional: Display the change value */}
            {/* <span className="text-xs text-gray-400">{stat.change}</span> */}
          </div>
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{ backgroundColor: stat.bgColor }}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
