import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, topUpBalance } from "../store/thunks/balanceThunks";
import ProfileBalance from "../components/ProfileBalance";
import { MdAccountBalanceWallet } from "react-icons/md";

import BrandImage from "../assets/logo.png";
import SuksesImage from '../assets/sukses.png';
import { useNavigate } from "react-router-dom";

const TOP_UP_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 1000000];

function TopUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { balance, loading } = useSelector((state) => state.balance.balance);

  console.log("Current Balance from Redux:", balance);

  const [selectedAmount, setSelectedAmount] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount.toLocaleString("id-ID"));
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setSelectedAmount(
      rawValue ? parseInt(rawValue, 10).toLocaleString("id-ID") : ""
    );
  };

  const handleConfirm = () => {
    setConfirmModalOpen(true);
  };

  const handleBackToHome = () => {
    navigate('/'); // Redirect ke beranda ('/')
  };

  const handleTopUp = () => {
    if (selectedAmount) {
      // Remove formatting for backend (convert "10.000" to 10000)
      const numericAmount = parseInt(selectedAmount.replace(/\./g, ""), 10);
      dispatch(topUpBalance(numericAmount)).then(() => {
        console.log("Top-Up Successful! Updated Balance:", balance);
        dispatch(getBalance());
        setConfirmModalOpen(false);
        setSuccessModalOpen(true);
      });
    }
  };

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      dispatch(getBalance(tokenFromLocalStorage));
    }
  }, [dispatch, token]);

  console.log("balance:", balance);

  return (
    <>
      <ProfileBalance />

      <div className="max-w-6xl mx-auto">
        <div className="mx-10 mt-6">
          <h1 className="text-lg text-gray-600">Silahkan masukkan,</h1>
          <span className="text-3xl font-semibold tracking-tight">
            Nominal Top Up
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mx-10 gap-4 mt-4">
          {/* Input Field */}
          <div className="flex flex-col">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <MdAccountBalanceWallet size={15} />
              </span>
              <input
                type="text"
                value={selectedAmount}
                onChange={handleInputChange}
                className="w-full pl-10 px-3 py-3 border rounded-md"
                placeholder="masukkan nominal top up"
              />
            </div>

            <div className=" mt-4">
              {/* Tombol Top Up */}
              <button
                onClick={handleConfirm}
                disabled={!selectedAmount || loading}
                className={`w-full py-2 rounded-sm text-white text-sm font-semibold ${
                  !selectedAmount || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#f02c2c]"
                }`}
              >
                {loading ? "Memproses..." : "Top Up"}
              </button>
            </div>
          </div>

          {/* Pilihan Nominal */}
          <div className="grid grid-cols-3 gap-4">
            {TOP_UP_AMOUNTS.map((amount) => (
              <button
                key={amount}
                className={`py-2 px-4 border rounded-md text-center ${
                  parseInt(selectedAmount.replace(/\./g, ""), 10) === amount
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleAmountClick(amount)}
              >
                Rp {amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <div className="flex justify-center">
              <img
                src={BrandImage}
                className="flex justify-center text-center items-center"
              />
            </div>
            <h2 className="text-sm mt-4 text-center">Anda Yakin Untuk Top Up Sebesar</h2>
            <p className="text-center">
              
              <strong>Rp {selectedAmount}</strong> ?
            </p>
            <div className="flex flex-col justify-center mt-6 gap-4">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="font-semibold text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleTopUp}
                className=" text-[#f02c2c] font-semibold text-sm"
              >
                Ya, Lanjutkan Top Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <div className="flex justify-center">
              <img src={SuksesImage} className="w-14" />
            </div>
            <div className="text-center flex flex-col">
              <span className="text-sm font-semibold mt-4">Top Up Sebesar</span>
              <span className="font-semibold text-lg">Rp. {selectedAmount}</span>
              <span>Berhasil!</span>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleBackToHome()}
                className="font-semibold text-base text-[#f02c2c]"
              >
                Kembali Ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopUp;
