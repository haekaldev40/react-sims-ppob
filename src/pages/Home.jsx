import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../store/thunks/profileThunks";
import { getBalance } from "../store/thunks/balanceThunks";
// import Navbar from "../components/Navbar";
import ProfileBalance from "../components/ProfileBalance";
import { getService } from "../store/thunks/informationThunks";
import ServiceList from "../components/ServiceList";
import BannerList from "../components/BannerList";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { error: profileError } = useSelector((state) => state.profile);
  const { error: balanceError } = useSelector((state) => state.balance);
  const { error: serviceError } = useSelector((state) => state.service);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    const fetchData = async () => {
      try {
        const [profileResult, balanceResult] = await Promise.all([
          dispatch(getProfile()).unwrap(),
          dispatch(getBalance()).unwrap()
        ]);

        const [serviceResult] = await Promise.all([
          dispatch(getService()).unwrap()
        ]);

        if (serviceResult?.status === 108) {
          localStorage.removeItem("token");
          navigate("/login");
        }

        if (profileResult?.status === 108 || balanceResult?.status === 108) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        
        if (error?.status === 108 || profileError?.status === 108 || balanceError?.status === 108 || serviceError?.status === 108) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }

    };

    fetchData();
  }, [dispatch, navigate, profileError, balanceError, serviceError]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* <Navbar /> */}
      </div>
      {/* <div className="border border-gray-100 max-w-7xl ml-6"></div> */}
      <div className="max-w-6xl mx-auto">
        <ProfileBalance />
      </div>
      <ServiceList />
      <BannerList />
    </>
  );
};

export default Home;