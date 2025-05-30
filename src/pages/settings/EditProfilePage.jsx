import React, { useEffect, useState, useRef, useContext } from "react";
import { FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { GlobalContext } from "../../contexts/GlobalContext";

const EditProfilePage = () => {
  const {stateNames} = useContext(GlobalContext)
  
  const navigate = useNavigate();
  const [startingTime, setStartingTime] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [closingTimeValue, setClosingTimeValue] = useState("");
  const [pickupType, setPickupType] = useState("");
  const [loading, setLoading] = useState(false);
  const [latLong, setlatLong] = useState("");
  const [fileNames, setFileNames] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
  });

  const [fileUpload, setFileUpload] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
  });

  const [profileImg, setProfileImg] = useState("");
  const [profileFile, setProfileFile] = useState("");

  const [formData, setFormData] = useState({});

const [checkedState,setCheckedState] = useState("")
  const [checkStateErr, setCheckStateErr] = useState(null);


  useEffect(() => {
    // Retrieve userData from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    // Check if userData exists before setting the state
    if (userData) {
      // Convert opening and closing times from UTC (or any base timezone) to user's local time
      const openingTimeLocal = moment
        .utc(userData.openingHourTime)
        .local()
        .format("HH:mm");
      const closingTimeLocal = moment
        .utc(userData.closingHourTime)
        .local()
        .format("HH:mm");

      // Set time values in input fields (local time)
      setTimeValue(openingTimeLocal);
      setClosingTimeValue(closingTimeLocal);

      // Build ISO string for user's local date with selected times
      const formattedOpeningTimeWithDate = moment()
        .set({
          hour: moment(openingTimeLocal, "HH:mm").hour(),
          minute: moment(openingTimeLocal, "HH:mm").minute(),
          second: 0,
        })
        .toISOString(); // Converts local time to ISO in user's timezone

      setStartingTime(formattedOpeningTimeWithDate);

      const formattedClosingTimeWithDate = moment()
        .set({
          hour: moment(closingTimeLocal, "HH:mm").hour(),
          minute: moment(closingTimeLocal, "HH:mm").minute(),
          second: 0,
        })
        .toISOString();

      setClosingTime(formattedClosingTimeWithDate);

      setFormData({
        dispensaryName: userData.dispensaryName || "Dispensary Name", // Fallback to default if undefined
        phoneNumber: `+1 ${userData.phoneNumber || "add you number"}`, // Fallback phone format
        streetAddress: `${userData.streetAddress || "Select Location"}`,
        bio:
          userData.bio ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

        // openingHour: new Date(userData.openingHourTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),  // Format time
        // closingHour: new Date(userData.closingHourTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),  // Format time
        city: userData.city || "City Name", // Fallback to default if undefined
        state: userData.state || "state", // Fallback to default if undefined
        deliveryRadius: userData.deliveryRadius || "deliveryRadius", // Fallback to default if undefined
        zipCode: userData.zipCode || "zipCode", // Fallback to default if undefined
        disType: userData.disType?.toUpperCase() || "", // Normalize to 'MED' or 'REC'
      });

      setPickupType(userData?.fulfillmentMethod);
      setProfileImg(userData?.profilePicture);
      setlatLong(userData?.location?.coordinates);
      setFileNames({
        back: userData.licenseBack,
        front: userData.licenseFront,
        left: userData.registrationLicenseFront,
        right: userData.registrationLicenseBack,
      });
    }
  }, []);

  const [startAddress, setStartAddress] = useState();

  useEffect(() => {
    setStartAddress(formData?.streetAddress);
  }, [formData]);

  const [originCoords, setOriginCoords] = useState([30.0444, 31.2357]);
  const [coordinatesMessage, setCoordinatesMessage] = useState(null);
  const [coordinates, setCoordinates] = useState({
    type: "Point",
    coordinates: { lat: 0, lng: 0 },
  });
const getStateFromPlace = (place) => {
  const component = place.address_components.find((comp) =>
    comp.types.includes("administrative_area_level_1")
  );
  return component ? component.long_name : "";
};
  const startLocationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  const handleStartPlaceChanged = () => {
    setCheckStateErr(null)
    const place = startLocationRef.current.getPlace();
    const state = getStateFromPlace(place)

    setCheckedState(state)
    
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setStartAddress(place.formatted_address || "");
      setFormData({ ...formData, ["streetAddress"]: place.formatted_address });
      setCoordinates({
        type: "Point",
        coordinates: { lat, lng },
      });
      setOriginCoords([lng, lat]);
      setCoordinatesMessage(null);
    } else {
      setCoordinatesMessage("Please select a valid location from suggestions.");
    }
  };

  const handleOpeningTimeChange = (e) => {
    const formattedTimeWithDate = moment()
      .set({
        hour: moment(e.target.value, "HH:mm").hour(),
        minute: moment(e.target.value, "HH:mm").minute(),
        second: 0,
      })
      .toISOString();
    setStartingTime(formattedTimeWithDate);
    setTimeValue(e.target.value);
  };

  const handleClosingTimeChange = (e) => {
    const closingTimeValue = e.target.value;

    // Convert opening and closing time to moment objects for comparison
    const openingTimeMoment = moment(startingTime);
    const closingTimeMoment = moment().set({
      hour: moment(closingTimeValue, "HH:mm").hour(),
      minute: moment(closingTimeValue, "HH:mm").minute(),
      second: 0,
    });

    // Check if the closing time is earlier than the opening time
    if (closingTimeMoment.isBefore(openingTimeMoment)) {
      // If closing time is before opening time, display an error message
      ErrorToast("Closing time must be later than opening time.");
      return; // Exit the function without updating the state
    }

    const formattedClosingTimeWithDate = moment()
      .set({
        hour: moment(closingTimeValue, "HH:mm").hour(),
        minute: moment(closingTimeValue, "HH:mm").minute(),
        second: 0,
      })
      .toISOString();
    setClosingTime(formattedClosingTimeWithDate);
    setClosingTimeValue(closingTimeValue);
  };

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name == "streetAddress") {
      setStartAddress(e.target.value);
    }
  };

  const handleCheckboxChange = (type) => {
    if (pickupType === type) {
      setPickupType("");
    } else {
      setPickupType(type);
    }
  };

  const handleDispensaryTypeChange = (e) => {
    setFormData({ ...formData, disType: e.target.value });
  };

  const handleApiCall = async () => {
    setLoading(true);
    try {
      console.log("00--> state",stateNames)
console.log("00--> checkedState",checkedState)
      if(!stateNames.includes(checkedState)){
        console.log(checkedState)
        setCheckStateErr("This state is not allowed")
        return;
      }
      
      // data
      const data = new FormData();
      data.append("dispensaryName", formData.dispensaryName);
      data.append("bio", formData.bio);
      data.append("city", formData?.city);
      data.append("country", "USA");
      data.append("deliveryRadius", formData.deliveryRadius);
      data.append("closingHourTime", closingTime);
      data.append("openingHourTime", startingTime);
      data.append("fulfillmentMethod", pickupType);
      // data.append("pickupType", JSON.stringify(formData.pickupType)); // assuming it's an array
      data.append("state", formData.state);
      data.append("streetAddress", formData.streetAddress);
      data.append("zipCode", formData.zipCode);
      data.append("disType", formData.disType);
      // data.append("location[coordinates]", JSON.stringify(latLong));
      data.append(
        "location[coordinates]",
        JSON.stringify(originCoords ? originCoords : latLong)
      );
      // data.append("location[type]", "Point");

      // Append file data (if exists)
      if (profileFile) {
        data.append("profilePicture", profileFile);
      }
      if (fileUpload.front) {
        data.append("licenseFront", fileUpload.front);
      }
      if (fileUpload.back) {
        data.append("licenseBack", fileUpload.back);
      }
      if (fileUpload.left) {
        data.append("registrationLicenseFront", fileUpload.left);
      }
      if (fileUpload.right) {
        data.append("registrationLicenseBack", fileUpload.right);
      }

      const response = await axios.post(
        "dispensary/dispensary-complete-profile",
        data
      );
      if (response.status === 200) {
        setLoading(false);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        SuccessToast("Information Submitted");
        navigate("/profile");
      }
    } catch (err) {
      console.log("🚀 ~ handleApiCall ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, position) => {
    const file = e.target.files[0];
    // const error = validateFile(file);

    setFileUpload((prevFileNames) => ({
      ...prevFileNames,
      [position]: file,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
    }
  };

  return (
    <div className="w-full text-black mx-auto p-6 bg-white shadow-lg overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-8 border-b pb-2">
        Edit Profile
      </h1>

      {/* Profile Section (Image and Name) */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{formData.dispensaryName}</h2>
          <p className="text-gray-500 text-sm mt-1">Dispensary</p>
        </div>
        <div
          className="relative flex items-center justify-center w-[88px] h-[88px] mb-4  mt-4 border-2
         border-primary border-dashed bg-[#F6F6F6] rounded-full"
        >
          <img
            src={profileFile ? URL.createObjectURL(profileFile) : profileImg}
            alt="Uploaded Preview"
            className="w-full h-full object-cover rounded-full"
          />

          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer my-1"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <p className="text-[13px] font-[600]">Name</p>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMail className="text-gray-500" />
          <input
            type="text"
            name="dispensaryName"
            value={formData.dispensaryName}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Dispensary Name"
          />
        </div>
        {/* <div className="flex items-center border-b border-gray-300 py-2">
          <FiPhone className="text-gray-500" />
          <input
            type="text"
            name="phoneNumber"
            maxLength={11}
            value={formData.phoneNumber}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Phone Number"
          />
        </div> */}
        <p className="text-[13px] font-[600]">Location</p>

        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => (startLocationRef.current = autocomplete)}
            onPlaceChanged={handleStartPlaceChanged}
          >
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                type="text"
                placeholder="Enter start location"
                className="w-full text-sm text-black ml-2 placeholder:font-normal 
              font-normal px-4 lg:py-3 md:py-2 py-3 my-2 rounded-xl outline-none "
                value={startAddress}
                name="streetAddress"
                onChange={handleChange}
                // maxLength={100}
              />
            </div>
          </Autocomplete>
        ) : (
          <p>Loading Google Maps...</p>
        )}
        {checkStateErr&&<p className="text-red-500">{checkStateErr}</p>}
        <p className="text-[13px] font-[600]">Bio</p>
        <div className="flex items-center border-b border-gray-300 py-2">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Bio"
            rows={4}
          />
        </div>
        {/* Opening and Closing Hours */}
        <p className="text-[13px] font-[600]">Opening and Closing Time</p>
        <div className="flex space-x-4 mt-4 ">
          <div className="flex items-center  border-gray-300 py-2 w-1/2">
            <input
              type="time"
              value={timeValue}
              onChange={handleOpeningTimeChange}
              className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3  border border-gray-300 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
            />
          </div>
          <div className="flex items-center  border-gray-300 py-2 w-1/2">
            <input
              type="time"
              value={closingTimeValue}
              onChange={handleClosingTimeChange}
              className="w-[98%] border border-gray-300 text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
            />
          </div>
        </div>
        {/* Dispensary Type Selection */}
        <p className="text-[13px] font-[600]">Dispensary Type</p>
        <select
          name="disType"
          value={formData.disType}
          onChange={handleDispensaryTypeChange}
          className="w-full text-sm border border-gray-300 text-[#1D7C42] font-medium px-4 py-3 rounded-xl outline-none bg-white shadow-sm"
        >
          <option value="">Select Type</option>
          <option value="MED">Medical</option>
          <option value="REC">Recreational</option>
        </select>
        {/* {formData.disType && (
          <p className="text-[13px] mt-1 text-[#1D7C42]">
            You selected:{" "}
            {formData.disType === "MED" ? "Medical" : "Recreational"}
          </p>
        )} */}
        <div className="mt-4 mx-1">
          <p className="text-[13px] font-[600]">Fulfillment Method</p>
          <div className="flex items-center my-2">
            <input
              type="checkbox"
              className="w-[16px] h-[16px] accent-primary"
              checked={pickupType === "Pickup"}
              onChange={() => handleCheckboxChange("Pickup")}
            />
            <label className="text-[13px] ml-1">Self Pickup</label>
          </div>

          <div className="flex items-center my-2">
            <input
              type="checkbox"
              className="w-[16px] h-[16px] accent-primary"
              checked={pickupType === "Deliver at home"}
              onChange={() => handleCheckboxChange("Deliver at home")}
            />
            <label className="text-[13px] ml-1">Deliver at home</label>
          </div>

          <div className="flex items-center my-2">
            <input
              type="checkbox"
              className="w-[16px] h-[16px] accent-primary"
              checked={pickupType === "Both"}
              onChange={() => handleCheckboxChange("Both")}
            />
            <label className="text-[13px] ml-1">Both</label>
          </div>
        </div>
        <div className="pt-2 pb-1">
          <p className="text-[12px] font-bold text-center justify-center">
            License
          </p>
        </div>
        {/* License Upload Buttons */}
        <div className="flex justify-center space-x-4">
          <div
            className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary 
          cursor-pointer rounded-xl flex flex-col gap-0 justify-center items-center relative"
          >
            {fileNames.front ? (
              <img
                src={
                  fileUpload?.front
                    ? URL.createObjectURL(fileUpload?.front)
                    : fileNames.front
                }
                className="w-[320px] h-[135px] rounded-lg object-cover"
                // onLoad={() => URL.revokeObjectURL(fileNames.front)}
              />
            ) : (
              <label className="text-sm text-primary font-medium text-center">
                Upload Image
                <br />
                <span className="text-xs font-[400] text-gray-500">Front</span>
                <br />
                <span className="text-xs font-[400]  text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </label>
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "front")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {fileNames.back ? (
              <img
                src={
                  fileUpload?.back
                    ? URL.createObjectURL(fileUpload?.back)
                    : fileNames.back
                }
                className="w-[320px] h-[135px] rounded-lg object-cover"
                onLoad={() => URL.revokeObjectURL(fileUpload?.back)}
              />
            ) : (
              <label className="text-sm text-primary font-medium text-center">
                Upload Image
                <br />
                <span className="text-xs font-[400] text-gray-500">Back</span>
                <br />
                <span className="text-xs font-[400] text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </label>
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "back")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="pt-4 pb-1">
          <p className="text-[12px] font-bold text-center justify-center">
            Registration
          </p>
        </div>
        {/* Registration Upload Buttons */}
        <div className="flex justify-center space-x-4">
          <div className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {fileNames.left ? (
              <img
                src={
                  fileUpload?.left
                    ? URL.createObjectURL(fileUpload?.left)
                    : fileNames.left
                }
                className="w-[320px] h-[135px] rounded-lg object-cover"
                onLoad={() => URL.revokeObjectURL(fileUpload?.left)}
              />
            ) : (
              <label className="text-sm text-primary font-medium text-center">
                Upload Image
                <br />
                <span className="text-xs font-[400] text-gray-500">Left</span>
                <br />
                <span className="text-xs font-[400] text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </label>
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "left")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
            {fileNames.right ? (
              <img
                src={
                  fileUpload?.right
                    ? URL.createObjectURL(fileUpload?.right)
                    : fileNames.right
                }
                className="w-[320px] h-[135px] rounded-lg object-cover"
                onLoad={() => URL.revokeObjectURL(fileUpload?.right)}
              />
            ) : (
              <label className="text-sm text-primary font-medium text-center">
                Upload Image
                <br />
                <span className="text-xs font-[400] text-gray-500">Right</span>
                <br />
                <span className="text-xs font-[400] text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </label>
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "right")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        disabled={loading}
        onClick={handleApiCall}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfilePage;
