import { RxDashboard } from "react-icons/rx";

import { RiNotificationLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";

import { MdChatBubbleOutline } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";

import { BsCartCheck } from "react-icons/bs";

import { FaRegStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import { IoWalletOutline } from "react-icons/io5";

import { IoCardOutline } from "react-icons/io5";

export const sidebarArr = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard />,
  },

  {
    title: "Order Management",
    url: "/orders",
    icon: <IoCartOutline />,
  },

  {
    title: "Order Tracking",
    url: "/track-orders",
    icon: <BsCartCheck />,
  },

  {
    title: "Products",
    url: "/products",
    icon: <AiOutlineShopping />,
  },

  {
    title: "Subscriptions",
    url: "/manage-subscription",
    icon: <IoCardOutline />,
  },

  {
    title: "Messages",
    url: "/chat",
    icon: <MdChatBubbleOutline />,
  },

  {
    title: "Reviews",
    url: "/reviews",
    icon: <FaRegStar />,
  },

  {
    title: "Wallet",
    url: "/wallet",
    icon: <IoWalletOutline />,
  },

  {
    title: "Settings",
    url: "/profile",
    icon: <IoSettingsOutline />,
  },
];
