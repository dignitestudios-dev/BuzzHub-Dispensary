import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import axios from "../../axios";

const Wallet = () => {
  const [walletData, setWalletData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const response = await axios?.get("dispensary/get-wallet-dispensary");
        setWalletData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch wallet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

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
  const transactions = walletData?.transactions?.data;

  return (
    <div className="p-6 w-full mx-auto bg-white min-h-screen">
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
          <p className="text-sm">Total Funds Withdrawn</p>
          <p className="text-xl font-semibold">$250.00</p>
          <p className="text-green-400 mt-2 flex items-center cursor-pointer">
            Withdraw Now <HiArrowUpRight className="ml-1" />
          </p>
        </div>
      </div>

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
    </div>
  );
};

export default Wallet;
