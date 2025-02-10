  import React, { useEffect, useRef, useState } from "react";
  import { BsEye, BsEyeSlash } from "react-icons/bs";

  const InputField = ({
    placeholder,
    type,
    error,
    register,
    maxLength,
    isDisabled = false,
    onInput,
    isPhone = false,
    icon,
  }) => {
    const [isPassVisible, setIsPassVisible] = useState(false);

    return (
      <div className="w-[80%] h-auto flex flex-col gap-1 justify-start items-start  ">
        <div
          className={`w-full h-[56px] focus-within:border-[1px] border rounded-[12px] bg-light shadow-sm 
              flex items-center justify-start  ${
                error
                  ? "focus-within:border-[#FF453A]"
                  : "focus-within:border-[#1D7C42]"
              } `}
        >
          <div
            className={` w-[96%]  h-full flex items-center justify-start rounded-[12px] relative`}
          >
            {isPhone && (
              <div className="flex items-center bg-light h-full rounded-l-[12px] pl-4">
                {/* <span className="text-xl pr-1">
                  <img
                    src="https://flagcdn.com/w320/us.png"
                    alt="US flag"
                    className="w-6 h-4 mr-2"
                  />
                </span> */}
                <span className="text-md text-[#6B7373] ml-7 -mr-7">+1</span>
              </div>
            )}
            
              <input
                disabled={isDisabled}
                type={isPassVisible ? "text" : type}
                placeholder={placeholder}
                className={`w-full text-sm text-[#1D7C42] placeholder:text-black ${
                  icon ? "ml-7" : "ml-2"
                } placeholder:font-normal 
              font-normal ${
                isPhone ? "pr-4 pl-2" : "px-4"
              } lg:py-3 md:py-2 py-3 my-2 rounded-xl outline-none bg-light `}
                {...register}
                maxLength={maxLength}
                onInput={onInput}
              />
            

            <span
              type="button"
              onClick={() => setIsPassVisible((prev) => !prev)}
              className="absolute top-4 text-lg right-2"
              style={{
                color: "#6B7373",
              }}
            >
              {type == "password" &&
                (!isPassVisible ? <BsEyeSlash /> : <BsEye />)}
            </span>
          </div>
        </div>
        {error && <p className="text-[#FF453A] text-sm">{error.message}</p>}
        
        
      </div>
    );
  };

  export default InputField;