// import React, { useContext } from "react";
// import AuthInput from "../../components/Onboarding/AuthInput";
// import AuthSubmitBtn from "../../components/Onboarding/AuthSubmitBtn";
// import { GlobalContext } from "../../contexts/GlobalContext";
// import { Gradient, LoginImage, Black, Pill } from "../../assets/export";

// const Login = () => {
//   const { navigate } = useContext(GlobalContext);

//   return (
//     <div className="flex w-full h-screen overflow-hidden bg-black">
//       <form
//         onSubmit={() => navigate("/dashboard", "Home")}
//         className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
//       >
//         <h1 className="text-left text-4xl font-bold text-black leading-[64.8px] tracking-[-1.2px]">
//           Log in
//         </h1>
//         <div className="flex flex-col w-full h-auto justify-start items-start gap-4">
//           <AuthInput
//             text={"Email"}
//             placeholder={"Type your email address here"}
//             type={"text"}
//           />
//           <div className="flex flex-col w-full lg:w-[434px] justify-start items-end gap-1">
//             <AuthInput
//               text={"Password"}
//               placeholder={"Enter Password"}
//               type={"password"}
//             />
//             <button
//               type="button"
//               onClick={() => navigate("/forgot-password")}
//               className="text-sm font-medium text-[#109BFF]"
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </div>
//         <AuthSubmitBtn text={"Log in"} />
//       </form>

//       <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
//         <img
//           src={Gradient}
//           alt="gradient"
//           className="absolute inset-25 w-full h-full"
//         />

//         <img
//           src={Black}
//           alt="black_overlay"
//           className="absolute inset-25 w-[60%] h-[60%]"
//         />

//         <div className="relative flex justify-center items-center h-full">
//           <img
//             src={LoginImage}
//             alt="login_mockup"
//             className="relative w-[60%] h-auto object-contain" 
//           />
//         </div>

//         <div className="absolute bottom-10 text-white text-center z-20">
//           <h3 className="text-lg font-medium">Connect with any device.</h3>
//           <p className="text-sm">
//             Everything you need is an internet connection.
//           </p>

//           <div className="mt-2 flex justify-center">
//             <img src={Pill} alt="pill" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
