import React, { useState, useEffect } from "react";

const CountDown = ({ isActive, setIsActive, seconds, setSeconds }) => {
  // Start the countdown when `isActive` is true
  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1); // decrease seconds by 1
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false); // stop the countdown when it reaches 0
    }

    return () => clearInterval(timer); // clear timer on cleanup
  }, [isActive, seconds]);

  return (
    <div className="countdown">
      <p className="text-[13px] text-[#0e1014] font-bold">0:{seconds}</p>
    </div>
  );
};

export default CountDown;