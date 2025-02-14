import React, { useEffect, useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Map from "../global/Map";
import {
  Autocomplete,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";

const InputField = ({
  placeholder,
  type,
  error,
  register,
  keyname,
  index,
  maxLength,
  isDisabled = false,
  onInput,
  isPhone = false,
  icon,
  setCoordinates,
  coordinatesMessage,
  setCoordinatesMessage,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  const Api_Key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

  const startLocationRef = useRef();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Api_Key,
    libraries: ["places"],
  });

  const [startAddress, setStartAddress] = useState("");
  const [originCoords, setOriginCoords] = useState([30.0444, 31.2357]);
  const handleStartPlaceChanged = () => {
    const place = startLocationRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setStartAddress(place?.formatted_address);
      setCoordinates({
        type: "Point",
        coordinates: { lat: lat, lng: lng },
      });
      setOriginCoords([lat, lng]);
      setCoordinatesMessage(null);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start  ">
      <div
        className={`w-full h-[56px] focus-within:border-[1px] rounded-[12px] bg-light shadow-sm 
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
          {keyname == "streetAddress" && index == 1 ? (
            isLoaded && (
              <Autocomplete
                className="w-[96%] lg:w-[46%]"
                onLoad={(autocomplete) =>
                  (startLocationRef.current = autocomplete)
                }
                onPlaceChanged={handleStartPlaceChanged}
              >
                <div className="w-full">
                  <input
                    disabled={isDisabled}
                    type="text"
                    placeholder={placeholder}
                    className={`w-full text-sm text-[#1D7C42] placeholder:text-black ml-2 placeholder:font-normal 
                  font-normal ${
                    isPhone ? "pr-4 pl-2" : "px-4"
                  } lg:py-3 md:py-2 py-3 my-2 rounded-xl outline-none bg-light `}
                    {...register}
                    maxLength={maxLength}
                    onInput={onInput}
                    value={startAddress}
                    onChange={(e) => setStartAddress(e.target.value)}
                  />
                </div>
              </Autocomplete>
            )
          ) : (
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
          )}

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
      {coordinatesMessage && index == 1 ? (
        <p className="text-xs text-red-600">{coordinatesMessage}</p>
      ) : null}
      {keyname == "streetAddress" && index == 1 && (
        <div className="w-full">
          <Map
            isLoaded={isLoaded}
            center={{
              lat: originCoords[0],
              lng: originCoords[1],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InputField;
