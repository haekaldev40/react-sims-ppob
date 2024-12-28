import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/authSchema";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/thunks/authThunks";
import toast from "react-hot-toast";

import Logo from "../assets/logo.png";
import LogoRegister from "../assets/login.png";
import { MdError, MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import {BsFillCheckCircleFill} from 'react-icons/bs';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, loading, error, message } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data) => {
        try {
            const result = await dispatch(loginUser(data));
            console.log(result);
            if (result.status === 0) {
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            toast.success(result.message);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);
   
    return (
      <div className="w-full h-screen flex">
           
           <div className="flex-1 flex flex-col justify-center px-16 py-8">
             <div className="flex gap-2 w-full justify-center items-center mb-5 mt-8">
               <div className="w-8 h-8 overflow-hidden">
                 <img className="w-full h-full object-cover" src={Logo} alt="" />
               </div>
               <label className="text-lg font-semibold " htmlFor="">
                 SIMS PPOB
               </label>
             </div>
             <h1 className="font-semibold text-base md:text-2xl text-black w-full text-center mb-7 px-[15%] lg:px-[30%] ">
               Masuk atau buat akun untuk memulai
             </h1>
     
             {error && (
               <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold mb-2 lg:pl-14">
                 <MdError size={10}/>
                 {error}
               </div>
             )}
             
             {message && (
               <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold pl-8">
                 <BsFillCheckCircleFill size={10}/>
                 {message}
               </div>
             )}
     
             <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex flex-col gap-6 lg:px-[10%]"
             >
               <div className="relative">
                 <span className="absolute top-4 left-0 flex items-center pl-3 text-gray-500">
                   <MdOutlineAlternateEmail size={15} />
                 </span> 
                 <input
                   id="email"
                   type="email"
                   placeholder="masukkan email anda"
                   className={`pl-8 w-full py-2 text-gray-700 border rounded-md focus:outline-none ${
                     errors.email ? "border-red-500" : "border-gray-300"}`}
                   {...register("email")}
                 />
                 {errors.email && (
                   <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold">
                     <MdError size={10}/>
                     {errors.email.message}
                   </div>
                 )}
               </div>
     
               <div className="relative">
                 <span className="absolute top-4 left-0 flex items-center pl-3 text-gray-500">
                   <MdLockOutline size={15} />
                 </span> 
                 <input
                   id="password"
                   type="password"
                   placeholder="password"
                   className={`pl-8 w-full py-2 text-gray-700 border rounded-md focus:outline-none ${
                     errors.password ? "border-red-500" : "border-gray-300"}`}
                   {...register("password")}
                 />
                {errors.password && (
                   <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold">
                     <MdError size={10}/>
                     {errors.password.message}
                   </div>
                 )}
               </div>

               <button
                 type="submit"
                 disabled={loading}
                 className="w-full py-2 text-white bg-[#dc2626] rounded-sm normal-case font-bold text-sm mt-2"
               >
                 {loading ? "Loading..." : "Masuk"}
               </button>
             </form>
           </div>
     
           <div className="hidden lg:flex flex-1 bg-pink-100 justify-center items-center">
             <img src={LogoRegister} alt="Illustration" className="" />
           </div>
         </div>
    )
}

export default Login;