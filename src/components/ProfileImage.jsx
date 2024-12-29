import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getProfile, uploadProfileImage } from "../store/thunks/profileThunks";
import { profileImageSchema } from "../schema/uploadSchema";
import DefaultProfile from '../assets/profileImage.png'

function ProfileImage () {
  const dispatch = useDispatch();
  const { data, uploadLoading, uploadError } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
  console.log("Profile Data:", data); // Periksa apakah data sudah tersedia
}, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileImageSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const file = formData.profileImage[0];
      const result = await dispatch(uploadProfileImage(file)).unwrap();
      console.log("Update profile data", {
        email: result.data.email,
        firstName: result.data.first_name,
        lastName: result.data.last_name,
        profileImage: result.data.profile_image,
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="relative">
          <img
            src={data?.profile_image || DefaultProfile}
            alt="Profile"
            className="w-32 h-32 rounded-full cursor-pointer border border-gray-300 object-contain "
            onClick={() => document.getElementById("profileImage").click()}
          />
          <input
            id="profileImage"
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            {...register("profileImage")}
            onChange={(e) => {
              register("profileImage").onChange(e);
              if (e.target.files?.[0]) {
                handleSubmit(onSubmit)();
              }
            }}
          />
          {uploadLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {errors.profileImage && (
          <div className="text-red-500 text-sm mt-2">
            {errors.profileImage.message}
          </div>
        )}
        {uploadError && (
          <div className="text-red-500 text-sm mt-2">{uploadError}</div>
        )}
      </form>
    </>
  );
};

export default ProfileImage;
