import React, { useEffect, useState } from "react";
import { FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [startingTime, setStartingTime] = useState("");

  const [timeValue, setTimeValue] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [closingTimeValue, setClosingTimeValue] = useState("");
  const [pickupType, setPickupType] = useState("");
  const [loading, setLoading] = useState(false);

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
  console.log("fileNames 00--", fileNames);

  useEffect(() => {
    // Retrieve userData from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Check if userData exists before setting the state
    if (userData) {
      const openingTime = moment(userData.openingHourTime)
        .local()
        .format("HH:mm");
      const closingTime = moment(userData.closingHourTime)
        .local()
        .format("HH:mm");
      setTimeValue(openingTime);
      setClosingTimeValue(closingTime);

      const formattedOpeningTimeWithDate = moment()
        .set({
          hour: moment(openingTime, "HH:mm").hour(),
          minute: moment(openingTime, "HH:mm").minute(),
          second: 0,
        })
        .toISOString();
      setStartingTime(formattedOpeningTimeWithDate);

      const formattedClosingTimeWithDate = moment()
        .set({
          hour: moment(closingTime, "HH:mm").hour(),
          minute: moment(closingTime, "HH:mm").minute(),
          second: 0,
        })
        .toISOString();
      setClosingTime(formattedClosingTimeWithDate);

      setFormData({
        dispensaryName: userData.dispensaryName || "Dispensary Name", // Fallback to default if undefined
        phoneNumber: `+1 ${userData.phoneNumber || "8340570746"}`, // Fallback phone format
        streetAddress: `${userData.streetAddress || "Toronto"}`,
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
      setFileNames({
        back: userData.licenseBack,
        front: userData.licenseFront,
        left: userData.registrationLicenseFront,
        right: userData.registrationLicenseBack,
      });
    }
  }, []);

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

      data.append(
        "location[coordinates]",
        JSON.stringify([-74.0059413, 40.7127837])
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
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMapPin className="text-gray-500" />
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Address"
          />
        </div>
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
        <div className="flex space-x-4 mt-4">
          <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
            <input
              type="time"
              value={timeValue}
              onChange={handleOpeningTimeChange}
              className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
            <input
              type="time"
              value={closingTimeValue}
              onChange={handleClosingTimeChange}
              className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
            />
          </div>
        </div>

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

        {/* Dispensary Type Selection */}
        <p className="text-[13px] font-[600]">Dispensary type</p>

        <select
          name="disType"
          value={formData.disType}
          onChange={handleDispensaryTypeChange}
          className="w-full text-sm text-[#1D7C42] font-medium px-4 py-3 rounded-xl outline-none bg-light shadow-sm"
        >
          <option value="">Select Type</option>
          <option value="MED">Medical</option>
          <option value="REC">Recreational</option>
        </select>
        {formData.disType && (
          <p className="text-[13px] mt-1 text-[#1D7C42]">
            You selected:{" "}
            {formData.disType === "MED" ? "Medical" : "Recreational"}
          </p>
        )}

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
