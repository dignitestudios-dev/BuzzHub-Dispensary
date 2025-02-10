import React from "react";

const AuthSubmitBtn = ({ text, loading }) => {
  return (
    <div className="w-auto h-auto flex flex-col gap-1 justify-start items-start  ">
      <button
        type="submit"
        className="w-auto h-[52px] lg:w-[434px] bg-green-600 text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
      >
        {loading? "loading...":text}
      </button>
    </div>
  );
};

export default AuthSubmitBtn;