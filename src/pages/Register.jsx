import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../store/thunks/authThunks";
import { registerSchema } from "../schema/authSchema";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import LogoRegister from "../assets/login.png";
import {
  MdOutlineAlternateEmail,
  MdPersonOutline,
  MdLockOutline,
  MdError,
} from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { reset } from "../store/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      console.log('hasil: ',result);
      if (result.status === 0 || result.message) {
        console.log("Navigating to login...");
        navigate("/login");
      }
      dispatch(reset());
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="w-full h-screen flex">
      
      <div className="flex-1 flex flex-col justify-center px-16 py-8">
        <div className="flex gap-2 w-full justify-center items-center mb-5 mt-12">
          <div className="w-8 h-8 overflow-hidden">
            <img className="w-full h-full object-cover" src={Logo} alt="" />
          </div>
          <label className="text-lg font-semibold " htmlFor="">
            SIMS PPOB
          </label>
        </div>
        <h1 className="font-semibold text-base md:text-2xl text-black w-full text-center mb-7 px-[15%] lg:px-[30%] ">
          Lengkapi data untuk membuat akun
        </h1>

        {error && (
          <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold">
            <MdError size={10}/>
            {error}
          </div>
        )}
        
        {message && (
          <div className="text-xs text-green-500 flex gap-1 items-center mt-1 font-bold">
            <FaCheck size={10}/>
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 lg:px-[10%]"
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
              <MdPersonOutline size={15} />
            </span> 
            <input
              id="first_name"
              type="text"
              placeholder="nama depan"
              className={`pl-8 w-full py-2 text-gray-700 border rounded-md focus:outline-none ${
                errors.first_name ? "border-red-500" : "border-gray-300"}`}
              {...register("first_name")}
            />
            {errors.first_name && (
              <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold">
                <MdError size={10}/>
                {errors.first_name.message}
              </div>
            )}
          </div>

          <div className="relative">
            <span className="absolute top-4 left-0 flex items-center pl-3 text-gray-500">
              <MdPersonOutline size={15} />
            </span> 
            <input
              id="last_name"
              type="text"
              placeholder="nama belakang"
              className={`pl-8 w-full py-2 text-gray-700 border rounded-md focus:outline-none ${
                errors.last_name ? "border-red-500" : "border-gray-300"}`}
              {...register("last_name")}
            />
           {errors.last_name && (
              <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold">
                <MdError size={10}/>
                {errors.last_name.message}
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

          <div className="relative">
            <span className="absolute top-4 left-0 flex items-center pl-3 text-gray-500">
              <MdLockOutline size={15} />
            </span> 
            <input
              id="confirmPassword"
              type="password"
              placeholder="konfirmasi password"
              className={`pl-8 w-full py-2 text-gray-700 border rounded-md focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="text-xs text-red-500 flex gap-1 items-center mt-1 font-bold">
                <MdError size={10}/>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-[#dc2626] rounded-sm normal-case font-bold text-sm"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>

      <div className="hidden lg:flex flex-1 bg-pink-100 justify-center items-center">
        <img src={LogoRegister} alt="Illustration" className="" />
      </div>
    </div>
  );
}

export default Register;
