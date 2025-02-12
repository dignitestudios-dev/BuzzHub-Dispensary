import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import axios from "../../axios"; // Make sure axios.js is properly imported

const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the wallet data on component mount
    const fetchWalletData = async () => {
      try {
        const response = await axios.get("dispensary/get-wallet-dispensary");
        setWalletData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch wallet data.");
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  // Check if data is still loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="spinner"></div> {/* This shows the loading spinner */}
      </div>
    );
  }

  // Handle API errors
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  // Destructure the wallet data
  const { walletAmount } = walletData.wallet;
  const transactions = walletData.transactions.data; // Assuming your transactions are in this structure

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
          <h3 className="text-lg font-semibold text-black">Transaction History</h3>
          <select className="bg-gray-100 text-black p-2 rounded-lg border focus:outline-none">
            <option value="all">All</option>
          </select>
        </div>

        <div className="bg-gray-100 p-2 rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="p-2">Date</th>
                <th>Account Name</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-2 text-center text-gray-500">
                    No transactions available.
                  </td>
                </tr>
              ) : (
                transactions.map((item, index) => (
                  <tr key={index} className="text-sm border-t text-black">
                    <td className="p-2">{item.date}</td>
                    <td>{item.name}</td>
                    <td className={item.type === "Withdrawn" ? "text-red-500" : "text-green-500"}>
                      {item.type}
                    </td>
                    <td className="font-semibold">{item.amount}</td>
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
