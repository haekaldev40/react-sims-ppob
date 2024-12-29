import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../store/thunks/transactionThunks";
import ProfileBalance from "../components/ProfileBalance";

function TransactionHistory() {
  const dispatch = useDispatch();
  const { transactionData, loading } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getHistory({ offset: 0, limit: 5 }));
  }, [dispatch]);

  const handleShowMore = () => {
    const nextOffset = transactionData.offset;
    dispatch(getHistory({ offset: nextOffset, limit: 5 }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ProfileBalance />
      <h1 className="mx-6 font-semibold mt-4 text-lg">Semua Transaksi</h1>
      <div className="mx-6 mt-4">
        {/* Cek apakah ada transaksi */}
        {transactionData?.records && transactionData.records.length > 0 ? (
          transactionData.records.map((transaction, index) => (
            <div key={index} className="border border-gray-200 shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                {transaction.transaction_type === "TOPUP" && (
                  <p className="text-xl text-green-500 font-semibold">
                    + Rp.{transaction.total_amount.toLocaleString("id-ID")}
                  </p>
                )}
                {transaction.transaction_type === "PAYMENT" && (
                  <p className="text-xl text-red-500 font-semibold">
                    - Rp.{transaction.total_amount.toLocaleString("id-ID")}
                  </p>
                )}
                <p className="font-semibold text-xs">{transaction.description}</p>
              </div>
              <p className="font-extralight text-gray-500 text-xs mt-2">
                {moment(transaction.created_on).format("MMMM Do YYYY, h:mm")} WIB
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-semibold mt-4">
            Maaf, tidak ada transaksi yang dilakukan
          </p>
        )}
      </div>
      {transactionData?.records && transactionData.records.length > 0 && (
        <div className="text-center text-sm font-semibold text-[#dc2626] pb-20">
          <button onClick={handleShowMore} disabled={loading}>
            {loading ? "Memuat..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
