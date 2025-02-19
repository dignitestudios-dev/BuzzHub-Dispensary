import React, { useState, useContext } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Logo } from "../../assets/export";
import axios from "../../axios";
import InputField from "../../components/onboarding/InputField";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";

const Login = () => {
  const { navigate } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const {
    // getValues,
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const handleLogin = async (formData) => {
    const requestBody = {
      email: formData.email,
      password: formData.password,
      fcmToken: "000056",
      deviceIdentity: "123",
    };

    try {
      setLoading(true);
      const response = await axios.post("/auth/login-dispensary", requestBody);

      if (response.status === 200) {
        const { status, isSubscribed, rejectionReason, isSessionComplete } =
          response.data.data;

        // Check if session is complete
        if (!isSessionComplete) {
          navigate("/profile-completion");
          return;
        }

        if (status === "Approved") {
          if (!isSubscribed) {
            navigate("/packages");
          } else {
            navigate("/dashboard");
          }
        } else if (status === "Rejected" || status === "Pending") {
          navigate("/req-success", {
            state: status,
            rejectReason: rejectionReason || null,
          });
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.data._id);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Login failed, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        <div className="flex flex-col items-start space-y-2 mt-16">
          <img
            src={Logo}
            alt="pill"
            className="w-[60px] bg-green-600 rounded-full"
          />
          <h3 className="text-lg font-medium">Buzzhub Dispensary Panel</h3>
          <p className="text-sm">Login with your credentials to continue.</p>
        </div>

        <div className="flex flex-col w-full h-auto justify-start items-start gap-4">
          <div className="relative w-full h-auto flex flex-col justify-start items-start my-4 border rounded-lg">
            <InputField
              text={"Email"}
              placeholder={"Email Address"}
              type={"email"}
              register={register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              error={errors.email}
              icon={true}
            />
            <PiEnvelopeLight
              size={20}
              className={`text-gray-600 absolute left-2 ml-2 ${
                errors.email ? "top-[25%]" : "top-[35%]"
              }`}
            />
          </div>

          <div className="flex flex-col w-full justify-start items-end gap-1">
            <div className="relative w-full h-auto flex flex-col justify-start items-start border rounded-lg">
              <InputField
                register={register("password", {
                  required: "Please enter your password",
                })}
                maxLength={12}
                text={"Password"}
                placeholder={"Enter your password here"}
                type={"password"}
                error={errors.password}
                icon={true}
              />
              <CiLock
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.password ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs lg:w-[20%] font-medium text-green-600"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <AuthSubmitBtn text={"Log in"} loading={loading} />

        <div className="w-full h-auto flex flex-col gap-1 justify-center items-center">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Don’t have an account?
            </span>
            <button
              type="button"
              className="outline-none text-[13px] border-none text-green-600 font-bold"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create one
            </button>
          </div>
        </div>
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <div className="relative flex justify-center items-center h-full">
          <img
            src={Logo}
            alt="login_mockup"
            className="relative w-[70%] bg-green-600 h-auto mb-20 object-contain rounded-full"
          />
        </div>

        <div className="absolute bottom-10 text-[#074F57] text-center z-20">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-medium">Buzzhub Dispensary Panel</h3>
            <p className="text-sm">Login with your credentials to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
