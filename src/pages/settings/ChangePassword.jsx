import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Make sure this is your configured axios instance

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State to toggle visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("dispensary/change-password-dispensary", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-8 flex flex-col items-center gap-6"
      >
        {/* Back Button and Heading */}
        <div className="flex items-center w-full justify-start space-x-3">
          <button type="button" onClick={() => navigate(-1)} className="text-gray-500">
            <BiArrowBack className="text-2xl" />
          </button>
          <h1 className="text-3xl font-semibold text-gray-800">Change Your Password</h1>
        </div>

        {/* Current Password Input */}
        <div className="w-full flex flex-col gap-4 text-black">
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-4 top-5 text-gray-500"
            >
              {showCurrentPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          {/* New Password Input */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-5 text-gray-500"
            >
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-5 text-gray-500"
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500 text-sm">Password updated successfully! Redirecting...</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-4 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700 focus:outline-none disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
