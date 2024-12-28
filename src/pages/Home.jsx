import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProfile } from "../store/thunks/profileThunks";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error); // Tampilkan error jika ada
    }
  }, [error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Data tidak tersedia</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <img src={data.profile_image} alt="Profile" style={{ width: "100px", borderRadius: "50%" }} />
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>First Name:</strong> {data.first_name}</p>
      <p><strong>Last Name:</strong> {data.last_name}</p>
    </div>
  );
};

export default Home;
