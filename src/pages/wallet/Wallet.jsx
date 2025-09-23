import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import axios from "../../axios";

const Wallet = () => {
  const [walletData, setWalletData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const response = await axios?.get("dispensary/get-wallet-dispensary");
        setWalletData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch wallet data.");
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleWithdraw = async () => {
    if (isWithdrawing || !withdrawAmount) return; // Prevent multiple withdrawal requests

    try {
      setIsWithdrawing(true);
      setWithdrawError(null); // Reset previous error state

      const response = await axios.post("dispensary/withdrawl-bank-account", {
        amount: withdrawAmount,
      });

      if (response?.data?.success) {
        // Handle success, maybe refresh wallet data or display a success message
        alert("Withdrawal successful!");
        setIsWithdrawing(false);
        setIsModalOpen(false); // Close the modal on success
      } else {
        // Trim the error message up to the first period (.)
        const errorMessage = response?.data?.message;
        const trimmedErrorMessage = errorMessage.split(".")[0];
        setWithdrawError(
          trimmedErrorMessage || "Failed to withdraw funds. Please try again."
        );
        setIsWithdrawing(false);
      }
    } catch (error) {
      // Handle unexpected errors (network issues, etc.)
      const errorMessage =
        error?.response?.data?.error ||
        "An error occurred while processing your withdrawal.";
      const trimmedErrorMessage = errorMessage.split(".")[0];
      setWithdrawError(trimmedErrorMessage);
      setIsWithdrawing(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open modal when clicking 'Withdraw Now'
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full mt-12">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  const { walletAmount } = walletData?.wallet || {};
  const transactions = walletData?.transactions;
console.log(transactions,"transactions")
  return (
    <div className="p-6 pb-20 lg:pb-2 w-full mx-auto bg-white h-full overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-4">Wallet Management</h1>

      <div className="space-y-4">
        {/* Available Balance Section */}
        <div className="bg-green-600 p-4 rounded-2xl text-white flex items-center">
          <FaWallet className="text-4xl mr-4" />
          <div>
            <p className="text-sm">Available Balance</p>
            <p className="text-2xl font-semibold">${walletAmount}</p>
          </div>
        </div>

        {/* Total Funds Withdrawn Section */}
        <div className="bg-black p-4 rounded-2xl text-white">
          <p className="text-xl font-semibold">Withdrawn Funds</p>
          {/* <p className="text-xl font-semibold">$250.00</p> */}
          <p
            className={`text-green-400 mt-2 flex items-center cursor-pointer ${
              isWithdrawing ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={openModal}
          >
            {isWithdrawing ? "Withdrawing..." : "Withdraw Now"}
            <HiArrowUpRight className="ml-1" />
          </p>
          {withdrawError && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {withdrawError}
            </div>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-black">
            Transaction History
          </h3>
        </div>

        <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-lg">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-2 text-center text-gray-500">
                    No transactions available.
                  </td>
                </tr>
              ) : (
                transactions?.map((item, index) => (
                  <tr
                    key={index}
                    className="text-sm border-t text-black hover:bg-gray-200 transition-all"
                  >
                    <td
                      className={`py-2 px-4 ${
                        item.type === "Withdrawn"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item?.type}
                    </td>
                    <td className="font-semibold py-2 px-4">${item?.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Amount Entry */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-96 max-w-lg transform transition-all">
            <h3 className="text-3xl font-semibold text-center text-gray-900 mb-2 tracking-tight">
              Withdraw Funds
            </h3>

            {/* Wallet Amount Display */}
            <div className="mb-2 text-center">
              <p className="text-lg text-gray-500">
                Available Wallet Balance $
                {walletAmount ? walletAmount.toFixed(2) : "0.00"}
              </p>
              {/* <p className="text-3xl font-extrabold text-green-600">
                Wallet Balance $
                {walletAmount ? walletAmount.toFixed(2) : "0.00"}
              </p> */}
            </div>

            {/* Withdraw Input Field */}
            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 text-lg font-semibold placeholder-gray-400 transition duration-300 ease-in-out transform hover:border-green-500"
            />

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <button
                className="w-1/3 py-3 bg-gray-600 text-white rounded-lg text-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`w-1/2 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out ${
                  isWithdrawing || !withdrawAmount
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleWithdraw}
                disabled={isWithdrawing || !withdrawAmount}
              >
                {isWithdrawing ? "Withdrawing" : "Withdraw"}
              </button>
            </div>

            {/* Error Message */}
            {withdrawError && (
              <div className="text-red-500 text-sm mt-4 text-center">
                {withdrawError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
