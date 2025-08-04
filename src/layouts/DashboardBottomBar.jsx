import { useState } from "react";
import { NavLink } from "react-router-dom"; 
import { chat, home, profile, homeinactive, profileactive, chatactive } from "../../src/assets/export"; // Import icons

// Bottom Bar links
const bottomBarLinks = [
  { title: "Chat", link: "/chat", icon: chat, activeIcon: chatactive },
  { title: "Home", link: "/dashboard", icon: homeinactive, activeIcon: home },
  { title: "Profile", link: "/profile", icon: profile, activeIcon: profileactive }
];

const DashboardBottomBar = () => {
  const [activeLink, setActiveLink] = useState("/dashboard");  // Default to Home

  // Handle the link click to set the active state
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-30 w-[90%] bg-green-600 rounded-full shadow-lg px-8 py-3 flex justify-between items-center sm:hidden">
      {bottomBarLinks.map((item) => (
        <NavLink
          key={item.link}
          to={item.link}
          onClick={() => handleLinkClick(item.link)}  // Update active link
          className={`flex flex-col items-center justify-center text-xs font-medium transition duration-200 ${
            activeLink === item.link ? "text-white" : "text-white/70"
          }`}
        >
          {/* Dynamically change the icon based on the active state */}
          <img
            src={activeLink === item.link ? item.activeIcon : item.icon}  // Switch icons based on active state
            alt={item.title}
            className="text-xl"
          />
          <span className="text-[11px] mt-1">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardBottomBar;
