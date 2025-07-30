import Home from "../pages/dashboard/Home";
import GlobalLayout from "../layouts/GlobalLayout";
import OrderDetailsPage from "../pages/orders/OrderDetailsPage";
import ChatList from "../pages/chat/ChatList";
import ChatScreen from "../pages/chat/ChatScreen";
import AcceptedOrder from "../pages/orders/AcceptedOrder";
import ItemDetails from "../pages/orders/ItemDetails";
import OrderTracking from "../pages/orders/OrderTracking";
import Orders from "../pages/orders/Orders";
import Notifications from "../pages/notifications/Notifications";
import Products from "../pages/products/Products";
import TrackOrders from "../pages/ordertracking/TrackOrders";
import Reviews from "../pages/reviews/Reviews";
import Profile from "../pages/settings/Profile";
import EditProfilePage from "../pages/settings/EditProfilePage";
import Chat from "../pages/chat/Chat";
import ProfileCompletion from "../pages/onboarding/ProfileCompletion";
import Packages from "../pages/subscription/Packages";
import RequestSuccessScreen from "../pages/onboarding/RequestSuccessScreen";
import AddCard from "../pages/subscription/AddCard";
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import Wallet from "../pages/wallet/Wallet";
import ChangePassword from "../pages/settings/ChangePassword";
import PageNotFound from "../pages/onboarding/PageNotFound";
import { Navigate } from "react-router-dom";
import ManageSubscripiton from "../pages/subscription/ManageSubscripiton";

export const normalRoutes = [
  {
    title: "Profile Completion",
    url: "/profile-completion",
    page: <ProfileCompletion />,
  },
  {
    title: "Request Success",
    url: "/req-success",
    page: <RequestSuccessScreen />,
  },

 

  {
    title: "Update Password",
    url: "/update-password",
    page: <UpdatePassword />,
  },

  {
    title: "Packages",
    url: "/packages",
    page: <Packages />,
  },

  {
    title: "Add Card",
    url: "/add-card",
    page: <AddCard />,
  },

  {
    title: "Dashboard",
    url: "/dashboard",
    page: <GlobalLayout page={<Home />} />,
  },

  {
    title: "Dashboard",
    url: "/order-details",
    page: <GlobalLayout page={<OrderDetailsPage />} />,
  },

  {
    title: "Wallet",
    url: "/wallet",
    page: <GlobalLayout page={<Wallet />} />,
  },

  // {
  //   title: "Chat List",
  //   url: "/chat",
  //   page: <GlobalLayout page={<ChatList />} />,
  // },

  {
    title: "Chat List",
    url: "/chat",
    page: <GlobalLayout page={<Chat />} />,
  },

  {
    title: "Chat Screen",
    url: "/chat-screen",
    page: <GlobalLayout page={<ChatScreen />} />,
  },

  {
    title: "Accepted Order",
    url: "/accepted-order",
    page: <GlobalLayout page={<AcceptedOrder />} />,
  },

  {
    title: "Order Tracking",
    url: "/order-tracking/:id",
    page: <GlobalLayout page={<OrderTracking />} />,
  },

  {
    title: "Change Password",
    url: "/change-password",
    page: <GlobalLayout page={<ChangePassword />} />,
  },

  {
    title: "Item Details",
    url: "/item-details/:orderId",
    page: <GlobalLayout page={<ItemDetails />} />,
  },

  {
    title: "Order Management",
    url: "/orders",
    page: <GlobalLayout page={<Orders />} />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    page: <GlobalLayout page={<Notifications />} />,
  },

  {
    title: "Subscription",
    url: "/manage-subscription",
    page: <GlobalLayout page={<ManageSubscripiton />} />,
  },

  {
    title: "products",
    url: "/products",
    page: <GlobalLayout page={<Products />} />,
  },

  {
    title: "Track Orders",
    url: "/track-orders",
    page: <GlobalLayout page={<TrackOrders />} />,
  },

  {
    title: "Reviews",
    url: "/reviews",
    page: <GlobalLayout page={<Reviews />} />,
  },

  {
    title: "Profile",
    url: "/profile",
    page: <GlobalLayout page={<Profile />} />,
  },

  {
    title: "Edit Profile",
    url: "/edit-profile",
    page: <GlobalLayout page={<EditProfilePage />} />,
  },

  {
    title: "Not found",
    url: "*",
    page: <Navigate to="/404" />,
  },
  {
    title: "Not found",
    url: "/404",
    page: <PageNotFound />,
  },
];
