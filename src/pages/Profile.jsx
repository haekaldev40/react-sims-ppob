import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../store/thunks/profileThunks";
import ProfileImage from "../components/ProfileImage";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { logout } from "../store/slices/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, message, error } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: data?.email || "",
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
    },
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    if (
      formData.email === data.email &&
      formData.first_name === data.first_name &&
      formData.last_name === data.last_name
    ) {
     
      return;
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
      alert("Profile berhasil diperbarui");
    } catch (error) {
      alert(error.message || "Gagal memperbarui profile");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error.message)
    }
    navigate("/login");
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div className="container mx-auto max-w-2xl mt-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center">
          <ProfileImage src={data?.profile_image} />
          <h1 className="text-2xl font-bold mt-2">
            {data?.first_name} {data?.last_name}
          </h1>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="relative">
            <label htmlFor="email" className="text-[12px] font-semibold">
              Email
            </label>
            <span className="absolute top-12 left-0 flex items-center pl-3 text-gray-500">
              <MdOutlineAlternateEmail size={15} />
            </span>
            <input
              id="email"
              type="email"
              disabled
              {...register("email")}
              className={`pl-8 mt-3 w-full px-3 py-2 border rounded-md text-sm ${
                isEditing ? "border-gray-300" : ""
              } rounded-md shadow-sm focus:outline-none`}
            />
          </div>
          <div className="relative">
            <label htmlFor="first_name" className="text-[12px] font-semibold">
              First Name
            </label>
            <span className="absolute top-12 left-0 flex items-center pl-3 text-gray-500">
              <MdOutlineAlternateEmail size={15} />
            </span>
            <input
              id="first_name"
              type="text"
              disabled={!isEditing}
              {...register("first_name")}
              className={`pl-8 mt-3 w-full px-3 py-2 border rounded-md text-sm ${
                isEditing ? "border-gray-300" : ""
              } rounded-md shadow-sm focus:outline-none`}
            />
          </div>
          <div className="relative">
            <label htmlFor="last_name" className="text-[12px] font-semibold">
              Last Name
            </label>
            <span className="absolute top-12 left-0 flex items-center pl-3 text-gray-500">
              <MdOutlineAlternateEmail size={15} />
            </span>
            <input
              id="last_name"
              type="text"
              disabled={!isEditing}
              {...register("last_name")}
              className={`pl-8 mt-3 w-full px-3 py-2 border rounded-md text-sm ${
                isEditing ? "border-gray-300" : ""
              } rounded-md shadow-sm focus:outline-none`}
            />
          </div>

          <div className="flex flex-col mt-6 gap-y-4 pb-20">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-md shadow-sm bg-[#dc2626]"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400"
              >
                Batalkan
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-3 bg-[#f02c2c] text-white font-semibold rounded-md shadow-sm text-sm "
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-3 bg-white text-[#f02c2c] rounded-md shadow-sm border border-[#f02c2c] text-sm font-semibold" 
              >
                Logout
              </button>
            </>
          )}
        </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

