import React, { useContext } from "react";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { Logo } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {

  const navigate = useNavigate(); // Directly using useNavigate hook

  const arr = [1, 2, 3, 4];
  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gray-50">
      <form
        onSubmit={() => navigate("/update-password")}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col button" 
        >
          <BiArrowBack className="text-3xl text-black " />
        </button>

        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className="font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Please enter the code that we sent to your email to reset your password.
          </p>
        </div>

        <div className="w-full h-auto flex justify-start items-center gap-2 my-2 flex-wrap">
          {arr.map((item) => (
            <input
              key={item}
              className="flex-1 min-w-[50px] max-w-[66px] h-[60px] rounded-xl bg-transparent outline-none text-center border border-[#074F57] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#074F57]"
              maxLength={1} 
            />
          ))}
        </div>

        <div className="w-full h-auto flex -mt-8 flex-col gap-1 justify-start items-start">
          <div className="w-full lg:w-[434px] flex gap-1 justify-start items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive a code?
            </span>
            <button className="outline-none text-[13px] border-none text-black font-bold">
              Resend now
            </button>
          </div>
        </div>
        <AuthSubmitBtn text={"Next"} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* <img
          src={Gradient}
          alt="auth_mockup"
          className="absolute inset-25 w-full h-full"
        />

        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        /> */}

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
                            <h3 className="text-lg font-medium">Verification</h3>
                            <p className="text-sm">
                              Verify your OTP to continue
                            </p>
                          </div>
                        </div>
        </div>
    </div>
  );
};

export default VerifyOtp;
