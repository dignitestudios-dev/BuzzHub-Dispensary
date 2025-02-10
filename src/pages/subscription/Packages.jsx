import React from "react";
import { IoCheckbox } from "react-icons/io5";
// import CustomButton from "../components/CustomButton";
// import { checkIcon } from "../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/export";

const Packages = () => {
  const navigate = useNavigate();

  const handleNavigate = (plan) => {
    navigate("/add-card", { state: plan });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-full w-full  ">
            <div className="flex items-center space-x-4 mt-8">
        <img src={Logo} alt="pill" className="w-[60px] bg-green-600 rounded-full border-2" />
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-medium text-black">Buzzhub Dispensary</h3>
          <p className="text-sm text-black">Select A Subscription Package to Continue</p>
        </div>
      </div>
      </div>
      <p className="text-center font-[600] my-12 text-[22px]">Select A Subscription Package to Continue</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:px-56 lg:px-[60px] px-2 bg-white rounded-l">
        <div
          className="overflow-auto shadow-customShadow rounded-xl p-3 py-6 md:mb-0 min-h-[210px] 
        max-h-[300px] md:min-h-[290px] md:max-h-[400px] bg-secondary border "
        >
          <div>
            <div className="flex flex-col justify-center items-center px-2 ">
              <p className="text-lg font-medium text-gray-800">Basic Plan</p>
              <p className="text-[28px] font-bold text-[#1D7C42]">$89.99</p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="mt-2 mb-6 space-y-1 ">
                {[...Array(3)].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[18px]  ">
                    <IoCheckbox className="text-[16px] text-[#1D7C42] mr-2" />
                    {/* <img src={checkIcon} /> */}
                    <p className="text-[12px] md:text-[16px] text-gray-700">
                      Lorem ipsum dolor sit amet
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
          <div className="w-auto h-auto flex flex-col gap-1 justify-start items-start  ">
      <button
      type="button"
        onClick={() => handleNavigate("basic")}
        className="w-auto h-[52px] lg:w-[434px] bg-green-600 text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
      >
        Buy Subscription
      </button>
    </div>

            
          </div>
        </div>
        <div className="overflow-auto shadow-customShadow rounded-xl p-3 py-6 md:mb-0 min-h-[210px] max-h-[300px] bg-secondary border">
          <div>
            <div className="flex flex-col justify-center items-center px-2">
              <p className="text-lg font-medium text-gray-800">Standard Plan</p>
              <p className="text-[28px] font-bold text-[#1D7C42]">$99.99</p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="mt-2 mb-6 space-y-1 ">
                {[...Array(3)].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[18px]  ">
                    <IoCheckbox className="text-[16px] text-[#1D7C42] mr-2" />
                    {/* <img src={checkIcon} /> */}
                    <p className="text-[12px] md:text-[16px] text-gray-700">
                      Lorem ipsum dolor sit amet
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>

          <button
      type="button"
        onClick={() => handleNavigate("standard")}
        className="w-auto h-[52px] lg:w-[434px] bg-green-600 text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
      >
        Buy Subscription
      </button>
           
          </div>
        </div>
        <div className="overflow-auto shadow-customShadow rounded-xl p-3 py-6 md:mb-0 mb-1 min-h-[210px] max-h-[300px] bg-secondary border">
          <div>
            <div className="flex flex-col justify-center items-center px-2">
              <p className="text-lg font-medium">Premium Plan</p>
              <p className="text-[28px] font-bold text-[#1D7C42]">$109.99</p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="mt-2 mb-6 space-y-1 ">
                {[...Array(3)].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[18px]  ">
                    <IoCheckbox className="text-[16px] text-[#1D7C42] mr-2" />
                    {/* <img src={checkIcon} /> */}
                    <p className="text-[12px] md:text-[16px] text-gray-700">
                      Lorem ipsum dolor sit amet
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>

          <button
      type="button"
        onClick={() => handleNavigate("premium")}
        className="w-auto h-[52px] lg:w-[434px] bg-green-600 text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
      >
        Buy Subscription
      </button>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;