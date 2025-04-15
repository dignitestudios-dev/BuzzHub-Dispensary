import React, { useEffect, useState } from "react";
import InputField from "../onboarding/InputField";
import { useNavigate } from "react-router-dom";
import AuthSubmitBtn from "../onboarding/AuthSubmitBtn";

const UserSummary = ({
  handleApi,
  handlePrev,
  watch,
  register,
  handleSubmit,
  fileNames,
  loading,
  city,
  selectedState,
  setValue,
  pickupType,
  dispensaryType,
}) => {
  const navigate = useNavigate();
  const formData = watch();

  const onFormSubmit = (data) => {
    handleApi(data);
  };

  useEffect(() => {
    setValue("state", selectedState);
    setValue("city", city);
  }, [selectedState, city]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {/* <p className="text-[12px] font-medium mt-6">Review Summary</p> */}
      <div className="w-full flex justify-center items-center mt-1">
        <div className="relative flex items-center justify-center w-[80px] h-[80px] mt-4 border-2 bg-gray-200 rounded-full">
          {fileNames?.front && (
            <img
              className="w-[80px] rounded-full h-[80px]"
              src={URL.createObjectURL(fileNames?.front)}
            />
          )}
        </div>
      </div>
      <p className="text-center mt-1 text-[13px] font-bold ">Uploaded Image</p>
      <div className="w-full h-auto flex flex-col justify-start items-start mt-2">
        <label className="text-[14px] text-secondary pl-1">Bio</label>
        <textarea
          value={formData?.bio}
          disabled
          type="text"
          placeholder="Bio"
          className="w-full text-sm text-[#1D7C42] placeholder:font-normal 
            font-normal px-4 lg:py-3 md:py-2 py-3 mb-3 rounded-xl outline-none bg-light"
        />
      </div>
      <div className="w-full h-auto flex  items-center">
        <div>
          <label className="text-[14px] text-secondary pl-1">
            Opening Hour
          </label>
          <input
            value={formData?.openingHour}
            disabled
            type="text"
            placeholder="Opening Hour"
            className="w-[95%] h-[56px] font-normal px-4 lg:py-3 md:py-2 py-3  mb-4 rounded-xl
             outline-none bg-light shadow-sm text-sm text-[#1D7C42] placeholder:font-normal"
          />
        </div>
        <div>
          <label className="text-[14px] text-secondary pl-1">
            Closing Hour
          </label>
          <input
            value={formData?.closingHour}
            disabled
            type="text"
            placeholder="Closing Hour"
            className="w-[95%] h-[56px] font-normal px-4 lg:py-3 md:py-2 py-3 mb-4 rounded-xl
             outline-none bg-light shadow-sm text-sm text-[#1D7C42] placeholder:font-normal"
          />
        </div>
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        <label className="text-[14px] text-secondary pl-1">
          Delivery Radius
        </label>
        <InputField
          isDisabled={true}
          register={register("deliveryRadius")}
          disabled
          placeholder={"Enter Radius in Miles"}
          type={"text"}
          error={""}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <label className="text-[14px] text-secondary pl-1">
          Dispensary Name
        </label>
        <InputField
          placeholder={"Dispensary Name"}
          type={"name"}
          isDisabled={true}
          register={register("dispensaryName")}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <label className="text-[14px] text-secondary pl-1">
          Street Address
        </label>
        <InputField
          placeholder={"Street Address"}
          type={"text"}
          error={""}
          isDisabled={true}
          register={register("streetAddress")}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <label className="text-[14px] text-secondary pl-1">City</label>
        <InputField
          placeholder={"City"}
          type={"text"}
          error={""}
          isDisabled={true}
          register={register("city")}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <label className="text-[14px] text-secondary pl-1">State</label>
        <InputField
          placeholder={"State"}
          type={"text"}
          error={""}
          isDisabled={true}
          register={register("state")}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <label className="text-[14px] text-secondary pl-1">Country</label>
        <InputField
          placeholder={"Country"}
          type={"text"}
          error={""}
          isDisabled={true}
          register={register("country")}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <label className="text-[14px] text-secondary pl-1">Zip Code</label>
        <InputField
          placeholder={"Zip Code"}
          type={"text"}
          error={""}
          isDisabled={true}
          register={register("zipCode")}
        />
      </div>
      {/* New Section: Show Dispensary Type */}
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <div className="flex items-center">
          <label className="text-[14px] text-secondary pl-1">
            Dispensary Type :
          </label>
          <p className="ml-2 text-sm font-semibold text-[#1D7C42]">
            {dispensaryType === "REC"
              ? "Recreational"
              : dispensaryType === "MED"
              ? "Medical"
              : "Not Selected"}
          </p>
        </div>
      </div>

      <div className="mt-4 mx-1">
        <p className="text-[14px] text-secondary ">Delivery Option</p>
        <div className="flex items-center my-2">
          <input
            type="checkbox"
            className="w-[16px] h-[16px] accent-primary"
            checked={pickupType === "Pickup"}
            disabled
          />
          <label className="text-[12px] ml-1">Self Pickup</label>
        </div>
        <div className="flex items-center my-2">
          <input
            type="checkbox"
            className="w-[16px] h-[16px] accent-primary"
            checked={pickupType === "Deliver at home"}
            disabled
          />
          <label className="text-[12px] ml-1">Deliver at home</label>
        </div>
        <div className="flex items-center my-2">
          <input
            type="checkbox"
            className="w-[16px] h-[16px] accent-primary"
            checked={pickupType === "Both"}
            disabled
          />
          <label className="text-[12px] ml-1">Both</label>
        </div>
      </div>

      <div>
        <div className="pt-2">
          <p className="text-[14px] text-secondary pl-1 text-center font-semibold">
            License and Registration
          </p>
        </div>

        <div className="flex justify-center space-x-4 mt-1 mb-2">
          <div className="w-[343px] h-[153px] bg-white shadow-lg cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {/* <label className="text-sm font-medium text-center">
              Uploaded Image
            </label> */}
            <img
              className="w-[330px]  object-contain h-[140px]"
              alt="123"
              src={URL.createObjectURL(fileNames?.front)}
            />
          </div>

          <div className="w-[343px] h-[153px] bg-white shadow-lg cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {/* <label className="text-sm font-medium text-center">
              Uploaded Image
            </label> */}
            <img
              className="w-[300px] h-[140px] object-contain"
              alt="123"
              src={URL.createObjectURL(fileNames?.back)}
            />
          </div>

          <div className="w-[343px] h-[153px] bg-white shadow-lg cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {/* <label className="text-sm font-medium text-center">
              Uploaded Image
            </label> */}
            <img
              className="w-[300px] h-[140px] object-contain"
              alt="123"
              src={URL.createObjectURL(fileNames?.left)}
            />
          </div>

          <div className="w-[343px] h-[153px] bg-white shadow-lg cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {/* <label className="text-sm font-medium text-center">
              Uploaded Image
            </label> */}
            <img
              className="w-[300px] h-[140px] object-contain"
              alt="123"
              src={URL.createObjectURL(fileNames?.right)}
            />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <AuthSubmitBtn text={"Submit"} loading={loading} />
      </div>
      <div className="">
        <button
          onClick={handlePrev}
          type="button"
          className="w-full h-[52px] text-primary rounded-[12px] flex items-center justify-center
   text-[13px] font-bold leading-[21.6px] tracking-[-0.24px] hover:text-[#000] hover:bg-[#f0f0f0] transition duration-300"
        >
          Go Back
        </button>
      </div>
    </form>
  );
};

export default UserSummary;
