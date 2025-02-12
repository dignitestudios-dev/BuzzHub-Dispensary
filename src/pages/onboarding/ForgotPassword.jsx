import React, { useState, useContext } from "react";
import axios from "../../axios"; // Importing axios instance
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { Logo } from "../../assets/export";

const ForgotPassword = () => {
  const { navigate } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("auth/forgot-password", { email });
      localStorage.setItem("forgot-password-email", email);
      if(response.status === 201){
        navigate("/verification");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Forgot Password
          </h1>
          <p className="w-[90%] font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Enter your email to reset your password and swiftly resume your experience.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text="Email"
            placeholder="Type your email here"
            type="email"
            value={email}
            required
            setState={setEmail}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <AuthSubmitBtn text={loading ? "Processing..." : "Next"} disabled={loading} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <div className="relative flex justify-center items-center h-full">
          <img
            src={Logo}
            alt="login_mockup"
            className="relative w-[70%] h-auto mb-20 object-contain rounded-full bg-green-600"
          />
        </div>
        <div className="absolute bottom-10 text-[#074F57] text-center z-20">
          <div className="flex flex-col items-center space-y-2">
            <img src={Logo} alt="pill" className="w-[50px]" />
            <h3 className="text-lg font-medium">Forgot Password</h3>
            <p className="text-sm">Enter your email to reset your password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
