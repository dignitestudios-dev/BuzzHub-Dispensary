import React from 'react'
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import Map from '../global/Map';

const MapInput = ({
    placeholder,
    error,
    register,
    maxLength,
    isDisabled = false,
    onInput,
    isPhone = false,
    setCoordinates,
    setCoordinatesMessage,
}) => {

    const Api_Key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

  const startLocationRef = useRef();
  const { isLoaded } = useLoadScript({
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
        </div>
        </div>
        {/* {error ? (
        <p className="text-xs text-red-600">{coordinatesMessage}</p>
      ) : null} */}
      
        <div className="w-full">
          <Map
            isLoaded={isLoaded}
            center={{
              lat: originCoords[0],
              lng: originCoords[1],
            }}
          />
        </div>
        </div>
  )
}

export default MapInput