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


export const normalRoutes = [
    {
        title: "Dashboard",
        url: "/dashboard",
        page: <GlobalLayout page={<Home />} />,
      },

      {
        title: "Dashboard",
        url: "/order-details/:orderId",
        page: <GlobalLayout page={<OrderDetailsPage />} />,
      },

      {
        title: "Chat List",
        url: "/chat",
        page: <GlobalLayout page={<ChatList />} />,
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
        title: "Item Details",
        url: "/item-details",
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
]    