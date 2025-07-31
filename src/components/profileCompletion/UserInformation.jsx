import React, { useEffect, useState } from "react";
import InputField from "../onboarding/InputField";
import SelectField from "../onboarding/SelectField";
import AuthSubmitBtn from "../onboarding/AuthSubmitBtn";
import stateCityData from "../../components/profileCompletion/CountryData";

const UserInformation = ({
  handleNext,
  register,
  errors,
  setValue,
  handleSubmit,
  cities,
  setCities,
  city,
  setCity,
  selectedState,
  setSelectedState,
  coordinates,
  setCoordinates,
  stateNames
}) => {
  const [coordinatesMessage, setCoordinatesMessage] = useState(null);
  const [stateError, setStateError] = useState(null);

  const onSubmit = () => {
    if (Object.keys(coordinates).length === 0) {
      setCoordinatesMessage("Please select a valid location");
      return;
    }
    handleNext();
  };

  // Handle state change (for state dropdown)
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    if (!stateNames?.includes(selectedState)) {
      setStateError("The Illegal State can't be selected and won't appear in the field");
      return;
    }
    setStateError(null);

    setCities(stateCityData[selectedState] || []);
    setSelectedState(selectedState);
  };

  // This function is called when street address is selected and coordinates are provided
  const handleAddressSelection = (selectedCoordinates) => {
    // Assuming `selectedCoordinates` has a `state` and `city` property
    const { state, city } = selectedCoordinates;

    // Set state and city
    setSelectedState(state);
    setCity(city);

    // Update cities dropdown based on the selected state
    setCities(stateCityData[state] || []);
  };

  useEffect(() => {
    const nameValue = "USA";
    if (nameValue) setValue("country", nameValue);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Render Street Address Input */}
      <div className="w-full h-auto flex flex-col justify-start items-start my-4 border rounded-lg">
        <InputField
          setCoordinates={setCoordinates}
          setCoordinatesMessage={setCoordinatesMessage}
          coordinatesMessage={coordinatesMessage}
          text="Street Address"
          placeholder="Street address"
          type="text"
          keyname="streetAddress"
          error={errors.streetAddress}
          register={register("streetAddress", { required: "Please enter the street address." })}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^A-Za-z0-9\s,]/g, "");  // Prevent non-alphanumeric characters
            // Call map logic here to get coordinates, state, and city.
            handleAddressSelection(coordinates); // coordinates should be set when map selects an address
          }}
        />
      </div>

      {/* Render State Select Input */}
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <SelectField
          value={selectedState}
          handleChange={handleStateChange}
          label="State"
          name="state"
          options={Object.keys(stateCityData)}
          error={errors.state?.message}
          disabled={false}
        />
        {stateError && <p className="text-red-500">{stateError}</p>}
      </div>

      {/* Render City Select Input */}
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <SelectField
          value={city}
          handleChange={(e) => setCity(e.target.value)}
          label="City"
          name="city"
          options={cities}
          error={errors.city?.message}
          disabled={cities?.length === 0}
        />
      </div>

      {/* Render Zip Code Input */}
      <div className="w-full h-auto flex flex-col justify-start items-start my-4 border rounded-lg">
        <InputField
          placeholder="Enter zip code"
          type="text"
          error={errors?.zipCode}
          register={register("zipCode", {
            required: "Please enter your zip code.",
            pattern: {
              value: /^[0-9]{5}$/,
              message: "Zip code must be 5 digits.",
            },
          })}
          maxLength={5}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <AuthSubmitBtn text="Next" />
      </div>
    </form>
  );
};

export default UserInformation;
