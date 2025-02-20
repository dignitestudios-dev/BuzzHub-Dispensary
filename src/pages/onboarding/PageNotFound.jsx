import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-10">
        <div className="mt-10">
          <p className="text-[28px] font-semibold">Page Not Found</p>
          <div className="ml-[44px] mt-10">
            <Link
              to="/"
              className={`bg-slate-700 text-white text-xs font-medium px-4 py-3 rounded-xl`}
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
