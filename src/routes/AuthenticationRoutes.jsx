import Login from "../pages/onboarding/Login";
import ForgotPassword from "../pages/onboarding/ForgotPassword"
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import VerifyOtp from "../pages/onboarding/VerifyOtp";
import SignUp from "../pages/onboarding/SignUp";
import Verification from "../pages/onboarding/Verification";


export const AuthenticationRoutes = [
    {
      title: "Login",
      url: "/",
      page: <Login />,
    },
    {
      title: "Signup",
      url: "/signup",
      page: <SignUp />,
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
    title: "Verification",
    url: "/verification",
    page: <Verification />,
  },
   {
      title: "Verify Otp",
      url: "/verify-otp",
      page: <VerifyOtp />,
    },
]    
