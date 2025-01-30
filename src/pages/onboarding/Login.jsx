import React, { useContext } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { LoginImage } from "../../assets/export";
import { Logo } from "../../assets/export";


const Login = () => {
  const { navigate } = useContext(GlobalContext);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <form
        onSubmit={() => navigate("/dashboard", "Home")}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        
        <div className="flex flex-col items-start space-y-2 mt-16">
    <img src={Logo} alt="pill" className="w-[60px] bg-green-600 rounded-full" />
    <h3 className="text-lg font-medium">Buzzhub Dispensary Panel</h3>
    <p className="text-sm">
      Login with your credentials to continue.
    </p>
  </div>
        <div className="flex flex-col w-full h-auto justify-start items-start gap-4">
          <AuthInput
            text={"Email"}
            placeholder={"Type your email address here"}
            type={"text"}
          />
          <div className="flex flex-col w-full lg:w-[434px] justify-start items-end gap-1">
            <AuthInput
              text={"Password"}
              placeholder={"Enter Password"}
              type={"password"}
            />
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs font-medium text-green-600"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <AuthSubmitBtn text={"Log in"} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* <img
          src={Gradient}
          alt="gradient"
          className="absolute inset-25 w-full h-full"
        />

        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        /> */}

        <div className="relative flex justify-center items-center h-full">
          <img
            src={Logo}
            alt="login_mockup"
            className="relative w-[70%] bg-green-600 h-auto mb-20 object-contain rounded-full" 
          />
          
        </div>
        
        <div className="absolute bottom-10 text-[#074F57] text-center z-20">
  <div className="flex flex-col items-center space-y-2">
    {/* <img src={Logo} alt="pill" className="w-[50px] bg-green-600 rounded-full" /> */}
    <h3 className="text-lg font-medium">Buzzhub Dispensary Panel</h3>
    <p className="text-sm">
      Login with your credentials to continue.
    </p>
  </div>
</div>

      </div>    
    </div>
  );
};

export default Login;
