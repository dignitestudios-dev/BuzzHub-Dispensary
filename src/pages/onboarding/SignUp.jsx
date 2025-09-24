import React, { useEffect, useRef, useState } from "react";
import InputField from "../../components/onboarding/InputField";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import axios from "../../axios";
import { Logo } from "../../assets/export";
import {
  getAuth,
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import SocialLogin from "./SocialLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [newUser, setNewUser] = useState("");

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const createAccount = async (formData) => {
    setLoading(true);
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        formData?.email,
        "Test@123"
      );
      const user = newUser.user;
      setNewUser(newUser);
      const token = await getIdToken(user);
      if (token) {
        setIdToken(token);
      } else {
        ErrorToast("Token not found");
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ firebase ONE is ~ error:", error?.message);
      if (error?.message?.includes("auth/email-already-in-use")) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            formData?.email,
            "Test@123"
          );
          const user = userCredential?.user;
          const token = await getIdToken(user);
          if (token) {
            setIdToken(token);
          } else {
            ErrorToast("Token Not Found");
            setLoading(false);
          }
        } catch (err) {
          console.log("🚀 ~ ~ firebase Two is ~ err:", err);
          ErrorToast("Email is already in use");
          setLoading(false);
        }
      } else {
        ErrorToast("Login error || Firebase authentication failed");
        setLoading(false);
      }
    }
  };

  const sendDataToBackend = async (formData) => {
    if (formData) {
      setLoading(true);
      try {
        let obj = {
          dispensaryName: formData?.dispensaryName,
          email: formData?.email,
          password: formData?.password,
          confirmPassword: formData?.confirmPassword,
          phoneNumber: formData?.phoneNumber,
          idToken: idToken,
        };
        const response = await axios.post("/auth/dispansory-signup", obj);

        if (response.status === 201 || response.status === 200) {
          sessionStorage.setItem("email", formData?.email);
          sessionStorage.setItem("phoneNumber", formData?.phoneNumber);
          setLoading(false);
          SuccessToast("SignUp Successfully");
          navigate("/verify-otp");
        } else {
          ErrorToast(response?.message);
        }
      } catch (err) {
        console.log("🚀 ~ sendDataToBackend ~ err:", err);
        ErrorToast(err?.response?.data?.message);
        if (newUser && newUser.user) {
          try {
            await newUser?.user?.delete();
            console.log("Account successfully deleted.");
          } catch (deleteError) {
            console.log("Failed to delete the account:", deleteError);
            ErrorToast(deleteError);
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (idToken) {
      let obj = {
        dispensaryName: getValues("fullName"),
        email: getValues("email"),
        password: getValues("password"),
        confirmPassword: getValues("confPassword"),
        phoneNumber: getValues("phoneNumber"),
        idToken: idToken,
        isWebUser: true,
      };
      sendDataToBackend(obj);
    }
  }, [idToken]);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center w-full bg-gray-50 min-h-screen">
      {/* Left section (Form) */}
      <div className="w-full sm:w-1/2 px-4 sm:px-14 py-6 bg-white rounded-xl">
        <div className="w-full h-auto p-6 rounded-xl">
          <form className="w-full" onSubmit={handleSubmit(createAccount)}>
            <div className="flex flex-col items-start space-y-2 mb-4">
              <img
                src={Logo}
                alt="pill"
                className="w-[60px] bg-green-600 rounded-full"
              />
              <h3 className="text-lg font-medium">Buzzhub Dispensary</h3>
            </div>
            <div className="mb-6">
              <p className="text-2xl font-bold text-primary">Sign Up</p>
              <p className="text-sm text-secondary">
                Enter the details below to Sign up
              </p>
            </div>

            {/* Form Fields */}
            <div className="relative w-full mb-4 border rounded-lg">
              <InputField
                text={"Full Name"}
                placeholder={"Full Name"}
                register={register("fullName", {
                  required: "Please enter your name.",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter a valid name.",
                  },
                })}
                type={"text"}
                error={errors.fullName}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                }}
                icon={true}
              />
              <CiUser
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.fullName ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div className="relative w-full mb-4 border rounded-lg">
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

            <div className="relative w-full mb-4 border rounded-lg">
              <InputField
                type={"text"}
                text={"Phone"}
                placeholder={"Phone Number"}
                register={register("phoneNumber", {
                  required: "Please enter your phone number.",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                maxLength="10"
                error={errors.phoneNumber}
                isPhone={true}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                icon={true}
              />
              <CiPhone
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.phoneNumber ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div className="relative w-full mb-4 border rounded-lg">
              <InputField
                register={register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message:
                      "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                  },
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

            <div className="relative w-full mb-6 border rounded-lg">
              <InputField
                register={register("confPassword", {
                  required: "Please enter confirm password.",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                  },
                  validate: (value) =>
                    value === password.current ||
                    "Confirm Password does not match",
                })}
                maxLength={12}
                text={"Confirm Password"}
                placeholder={"Enter confirm password here"}
                type={"password"}
                error={errors.confPassword}
                icon={true}
              />
              <CiLock
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.confPassword ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div className="w-full mb-4">
              <AuthSubmitBtn text={"Sign Up"} loading={loading} />
            </div>
          </form>

          <div className="w-full h-auto flex flex-col gap-1 justify-center items-center">
            <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
              <span className="text-[13px] font-medium text-[#C2C6CB]">
                Already have an account?
              </span>
              <button
                type="button"
                className="outline-none text-[13px] border-none text-green-600 font-bold"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </button>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <hr className="w-full border-t border-[#959393]" />
            <p className="px-2 text-[#959393]">OR</p>
            <hr className="w-full border-t border-[#959393]" />
          </div>
          <SocialLogin />

          <div className="flex items-center justify-items-center justify-center mt-4">
            <p className="text-secondary text-xs text-center">
              By Registering, You Accept Our{" "}
              <span className="text-primary text-green-500">
                <a
                  href="https://buzzhub-landing.vercel.app/termsandconditions2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & Services
                </a>
              </span>
              <span className="text-secondary"> & </span>
              <span className="text-primary text-green-500">
                <a
                  href="https://buzzhub-landing.vercel.app/privacypolicy2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right section (Image) */}
      <div className="hidden sm:flex flex-col justify-center items-center sm:w-1/2 mt-4 sm:mt-20">
        <div className="flex justify-center items-center mb-8">
          <img
            src={Logo}
            alt="login_mockup"
            className="w-[70%] bg-green-600 h-auto object-contain rounded-full"
          />
        </div>

        <div className="text-[#074F57] text-center mt-4">
          <h3 className="text-lg font-medium">Buzzhub Dispensary Panel</h3>
          <p className="text-sm">Sign Up with your credentials to continue.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
