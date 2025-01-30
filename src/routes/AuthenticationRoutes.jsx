import Login from "../pages/onboarding/Login";
import ForgotPassword from "../pages/onboarding/ForgotPassword"
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import VerifyOtp from "../pages/onboarding/VerifyOtp";

export const AuthenticationRoutes = [
    {
      title: "Login",
      url: "/",
      page: <Login />,
    },
    {
      title: "Forgot Password",
      url: "/forgot-password",
      page: <ForgotPassword />,
    },
    {
      title: "Update Password",
      url: "/update-password",
      page: <UpdatePassword />,
    },
    {
      title: "Verify Otp",
      url: "/verify-otp",
      page: <VerifyOtp />,
    },
   
]    