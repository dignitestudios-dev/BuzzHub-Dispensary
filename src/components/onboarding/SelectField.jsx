import React from "react";

const SelectField = ({
  value,
  handleChange,
  label,
  name,
  options,
  disabled,
  error,
  register,
}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <div
        className={`w-full h-[56px] focus-within:border-[1px] rounded-[12px] bg-gray-50 shadow-sm flex items-center justify-start ${
          error
            ? "focus-within:border-[#FF453A]"
            : "focus-within:border-[#1D7C42]"
        }`}
      >
        <div className="w-full h-full flex items-center justify-center rounded-[12px] relative border p-1">
          <select
            disabled={disabled}
            name={name}
            value={value}
            onChange={handleChange}
            // {...register}
            className={`w-full text-sm ${
              value ? "text-[#1D7C42]" : "text-black"
            } text-[#1D7C42] placeholder:font-normal font-normal px-5 lg:py-3 md:py-2 py-3 my-2
             rounded-xl outline-none bg-gray-50`}
          >
            <option value="" label={`Select ${label}`} disabled hidden />
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default SelectField;
