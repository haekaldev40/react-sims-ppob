import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBalance } from "../store/thunks/balanceThunks";
import { makePayment } from "../store/thunks/transactionThunks";
import ProfileBalance from "../components/ProfileBalance";
import { MdAccountBalanceWallet } from "react-icons/md";

import BrandImage from "../assets/logo.png";
import SuksesImage from '../assets/sukses.png';

function ServiceDetailPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    serviceCode,
    serviceName,
    serviceTariff: initialServiceTariff,
    serviceIcon,
  } = location.state || {};
  const [serviceTariff, setServiceTariff] = useState(initialServiceTariff);
  const [formattedTariff, setFormattedTariff] = useState(
    initialServiceTariff?.toLocaleString("id-ID")
  );
  const { balance } = useSelector((state) => state.balance);
  const { loading, error } = useSelector((state) => state.transaction);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // State for modal
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false); // State for success modal

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  useEffect(() => {
    if (!location.state) {
      navigate("/home");
    }
  }, [location.state, navigate]);

  const handleTariffChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    const numericValue = Number(rawValue);
    setServiceTariff(numericValue);
    setFormattedTariff(numericValue.toLocaleString("id-ID"));
  };

  const handlePayment = async () => {
    try {
      const result = await dispatch(
        makePayment({ service_code: serviceCode })
      ).unwrap();
      if (result.status === 0) {
        await dispatch(getBalance());
        setSuccessModalOpen(true); // Show success modal after successful payment
        setConfirmModalOpen(false); // Close the confirmation modal
      }
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  const handleConfirmPayment = () => {
    setConfirmModalOpen(true); // Show confirmation modal
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false); // Close confirmation modal
  };

  const handleBackToHome = () => {
    navigate("/"); // Redirect to home
  };

  if (!serviceCode || !serviceName) {
    return navigate("/home");
  }

  return (
    <>
      <ProfileBalance />
      <div className="max-w-6xl mx-auto">
        <h1 className="mx-8 text-lg mb-2">Pembayaran</h1>
        <div className="flex items-center gap-4 mx-8">
          {serviceIcon ? (
            <img
              src={serviceIcon}
              alt={serviceName}
              className="w-10 h-10"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-icon.png"; // Default icon if the image fails
              }}
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full" /> // Placeholder
          )}
          <span className="font-medium">{serviceName}</span>
        </div>

        <div className="mt-6 mx-8">
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-7 left-3 flex items-center text-gray-500">
                <MdAccountBalanceWallet size={14} />
              </span>
              <input
                type="text"
                className="w-full text-sm pl-8 border border-gray-300 rounded-md py-3 px-3 mt-1"
                value={formattedTariff}
                onChange={handleTariffChange}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              onClick={handleConfirmPayment} // Trigger confirmation modal
              disabled={loading || balance < serviceTariff}
              className={`w-full py-2 px-4 rounded-sm text-sm font-semibold ${
                loading || balance < serviceTariff
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white font-semibold`}
            >
              {loading ? "Memproses..." : "Bayar"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <div className="flex justify-center">
              <img src={BrandImage} alt="Logo" className="w-16 h-16" />
            </div>
            <h2 className="text-sm text-center mt-2">Beli {serviceName} Senilai</h2>
            <p className="text-center font-semibold text-lg">
              Rp {formattedTariff}
            </p>
            <div className="flex flex-col justify-center mt-6 gap-4">
              <button
                onClick={handleCloseModal}
                className="font-semibold text-sm text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handlePayment}
                className="font-semibold text-sm text-red-600"
              >
                Ya, Lanjutkan Pembayaran
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
              <img src={SuksesImage} alt="Success" className="w-14" />
            </div>
            <div className="text-center flex flex-col">
              <span className="text-sm font-semibold mt-4">Pembayaran {serviceName} Sebesar</span>
              <span className="font-semibold text-lg">Rp {formattedTariff}</span>
              <span>Berhasil!</span>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleBackToHome}
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

export default ServiceDetailPayment;
