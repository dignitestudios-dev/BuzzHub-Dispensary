import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // for redirecting after logout

const SubscriptionSuccess = () => {
  const navigate = useNavigate(); // to navigate after logout

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear cookies (you can use a helper function to remove cookies)
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Optionally, redirect to login or home page after logout
    navigate("/login"); // or you can redirect to your home page like navigate("/")
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-center gap-4 relative">
      <div>
        <div className="flex justify-center items-center">
          <FaRegCircleCheck size={76} color="#1D7C42" />
        </div>
        <div>
          <p className="text-[26px]">Congratulations</p>
        </div>
        <div>
          <p className="text-[20px]">
            You have successfully registered dispensary
          </p>

          {/* Replace the previous text with the logout button */}
          <p className="text-[14px] lg:text-[16px] font-normal text-primary">
            ⓘ You can logout now.
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 py-2 px-6 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;