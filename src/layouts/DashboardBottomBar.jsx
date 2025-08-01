import { useState } from "react";
import { NavLink } from "react-router-dom"; 
import { FaCommentAlt, FaHome, FaUserAlt } from "react-icons/fa";  // Importing React Icons for Chat, Home, Profile

// Bottom Bar links
const bottomBarLinks = [
  { title: "Chat", link: "/chat", icon: FaCommentAlt, activeIcon: FaCommentAlt },
  { title: "Home", link: "/dashboard", icon: FaHome, activeIcon: FaHome },
  { title: "Profile", link: "/profile", icon: FaUserAlt, activeIcon: FaUserAlt }
];

const DashboardBottomBar = () => {
  const [activeLink, setActiveLink] = useState("/app/dashboard");  // Default to Home

  // Handle the link click to set the active state
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md bg-green-600 rounded-t-3xl shadow-lg px-8 py-3 flex justify-between items-center sm:hidden">
      {bottomBarLinks.map((item) => (
        <NavLink
          key={item.link}
          to={item.link}
          onClick={() => handleLinkClick(item.link)}  // Update active link
          className={`flex flex-col items-center justify-center text-xs font-medium transition duration-200 ${
            activeLink === item.link ? "text-white" : "text-white/70"
          }`}
        >
          {/* Render icons directly using React Icons */}
          <item.icon
            className={`text-xl ${activeLink === item.link ? "text-white" : "text-white/70"}`}
          />
          <span className="text-[11px] mt-1">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardBottomBar;
