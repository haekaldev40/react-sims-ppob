import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBalance } from '../store/thunks/balanceThunks';
import { getProfile } from '../store/thunks/profileThunks';
import DefaultProfileImage from "../assets/profileImage.png";


function ProfileBalance() {
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
 
  
  const { token } = useSelector((state) => state.auth);
  const { data: profileData } = useSelector((state) => state.profile);
  const { data: balanceData } = useSelector((state) => state.balance);

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
      dispatch(getBalance(token));
    } else {
      navigate('/login');
    }
  }, [dispatch, token, navigate]);
  
 
  const formatBalance = (balance) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(balance).replace('IDR', 'Rp');
  };

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };


  console.log('token diprofile balance:', token)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col my-8 mx-10">
        <img src={profileData?.profile_image || DefaultProfileImage } className='w-10 h-10 mb-2 rounded-full border border-gray-300' />
        <span className="text-lg text-gray-600">Selamat datang,</span>
        <span className="text-3xl font-semibold tracking-tight">
          {profileData.first_name} {profileData.last_name}
        </span>
      </div>
      <div className=" w-full flex flex-col rounded-2xl bg-[url('/src/assets/backgroundSaldo.png')] bg-no-repeat bg-contain p-4 mt-4 ">
        <span className="text-white text-sm mx-2 my-2">Saldo anda</span>
        <div className="text-white text-2xl font-bold mx-2">
          {showBalance 
            ? formatBalance(balanceData?.balance || 0)
            : 'Rp •••••••'
          }
        </div>
        <button 
          onClick={toggleBalance}
          className="flex items-center gap-2 text-white hover:underline"
        >
          <span className='text-[8px] mx-2 lg:mt-4 lg:text-[10px]'>Lihat Saldo</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileBalance;