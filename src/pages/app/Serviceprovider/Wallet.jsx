import React, { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import { HeroBg } from "../../../assets/export";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions, getWallet } from "../../../redux/slices/provider.slice";

const Wallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Transaction History");
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [withdrawal, setWithdrawal] = useState(false);
  const [addbankaccount, setAddbankaccount] = useState(false);
  const dispatch = useDispatch();
  const { wallet,transaction } = useSelector((state) => state.provider);
  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getWallet());
  }, []);
  console.log(wallet,"wallets record")
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    saveDetails: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      saveDetails: !prev.saveDetails,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddbankaccount(false);
    setShowModal(true);
  };

  const transactions = Array(7).fill({
    id: "12FGH123",
    name: "John Doe",
    account: "0112********12",
    date: "10/May/2024",
    time: "08:15pm",
    amount: "$1499",
  });
console.log(transaction,"transaction")
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar type="serviceprovider" />

      {/* Hero Section */}
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39,168,226,1) -20.45%, rgba(0,3,74,0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex items-center gap-3 ml-[8em]">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[32px] font-bold leading-[48px] capitalize">
            Wallet
          </h2>
        </div>
      </div>

      {/* Balance Card */}
      <div className="max-w-7xl mx-auto -mt-[17em] relative mb-8">
        <div className="bg-white/30 rounded-xl shadow-md p-6 flex justify-between items-center">
          <div>
            <p className="text-white text-[18px] font-[500]">
              Remaining Balance
            </p>
            <h2 className="text-[37px] font-semibold text-[#ffffff]">
              ${wallet?.balance}
            </h2>
          </div>
          <button
            onClick={() => setShowModal(true)} // Show modal when clicked
            className="bg-gradient-to-r from-[#003973] to-[#27A8E2] text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Cash Withdrawal
          </button>
        </div>
      </div>

      {/* Pop-up Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">
                Attached Bank Account{" "}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-black"
              >
                <ImCross />
              </button>
            </div>
            <div className="border-2 rounded-2xl py-1 px-3 mt-3 mb-3">
              <label className="block text-sm font-bold text-black">
                Bank Name
              </label>
              <p className="text-sm">0112**********12</p>
            </div>
            <div className="-mt-3">
              <span
                className="text-blue-600 text-[12px] underline cursor-pointer"
                onClick={() => {
                  setAddbankaccount(true);
                  setShowModal(false);
                }}
              >
                +Add new bank
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-black capitalize">
                withdraw funds
              </h2>

              <label className="block text-sm font-medium text-gray-700 pt-3">
                Enter Amount
              </label>
              <input
                type="number"
                placeholder="$200"
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="mt-[6em] flex justify-between items-center">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Save my details for future withdrawal
              </label>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setShowModal(false);
                  setWithdrawal(true);
                }}
                className="bg-gradient-to-r from-[#003973] to-[#27A8E2] text-white text-sm px-[8em] py-2 rounded-lg"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {withdrawal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 md:w-[30em] shadow-2xl text-center">
            {/* Checkmark Icon */}
            <button
              onClick={() => setWithdrawal(false)}
              className="text-black flex justify-end  w-full"
            >
              <ImCross />
            </button>
            <div className="mb-4 flex justify-center items-center">
              <div className="bg-gradient-to-r from-[#27A8E2] to-[#00034A] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                <FaCheck color="white" size={30} />
              </div>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Withdraw Successfully!
            </h2>

            {/* Message */}
            <p className="text-gray-600 text-sm mb-4">
              Your withdrawal request has been successfully processed.
            </p>
            <p className="text-gray-600 text-sm">Amount Withdraw</p>
            <p className="text-blue-600 font-bold text-2xl">USD $200</p>
            <div className="text-left border-2 rounded-2xl p-0 mt-6">
              <div className="border-b-2 p-3">
                <p>Transaction ID:</p>
                <p className="text-blue-600">9621486393454</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Card Holder Name:</p>
                <p className="text-blue-600"> John Doe</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Account Number:</p>
                <p className="text-blue-600">0112**********12</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Transfer Date: </p>
                <p className="text-blue-600"> 10/May/2025</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Transfer Time:</p>
                <p className="text-blue-600"> 08:15pm</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {addbankaccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Bank Account</h2>
              <button
                onClick={() => {
                  setAddbankaccount(false);
                }}
                className="text-black"
              >
                <ImCross />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  placeholder="Enter your number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Routing Number
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  value={formData.routingNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  placeholder="Enter your routing number"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.saveDetails}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">
                  Save my details for future withdrawal
                </label>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#003973] to-[#27A8E2] text-white px-[8em] py-2 rounded-lg"
                >
                  Add Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions Section */}
      <div className="max-w-7xl mx-auto px-0 pb-16">
        <h3 className="text-xl font-bold text-white mb-4">
          Transaction History
        </h3>

        {/* Tabs */}
        <div className="flex  border-b mb-0 px-5 bg-white rounded-t-2xl">
          {["Transaction History", "Withdrawal History"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 relative py-3 mb-3  text-sm font-medium ${
                activeTab === tab
                  ? "text-gradient after:content-[''] after:absolute after:left-7 after:bottom-[5px] after:w-[17px] after:h-[1px] after:bg-[#3961ac] after:rounded"
                  : "text-[#595959] hover:text-[#003973]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white shadow overflow-x-auto rounded-b-2xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#D2E8F4] text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4 text-[#082166] ">#</th>
                <th className="px-6 py-4 text-[#082166] ">Transactions ID</th>
                <th className="px-6 py-4 text-[#082166] ">Card Holder Name</th>
                <th className="px-6 py-4 text-[#082166] ">Account Number</th>
                <th className="px-6 py-4 text-[#082166] ">Transfer Date</th>
                <th className="px-6 py-4 text-[#082166] ">Transfer Time</th>
                <th className="px-6 py-4 text-[#082166] ">Total Amount</th>
              </tr>
            </thead> 
            <tbody className="text-[#181818]">
              {transaction?.transactions?.data?.map((t, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4 text-[12px] font-[400]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-[12px] font-[400]">{t.transaction_id}</td>
                  <td className="px-6 py-4 text-[12px] font-[400]">{t.account_name}</td>
                  <td className="px-6 py-4 text-[12px] font-[400]">
                    {t.account_number}
                  </td>
                  <td className="px-6 py-4 text-[12px] font-[400]">{t.date}</td>
                  <td className="px-6 py-4 text-[12px] font-[400]">{t.time}</td>
                  <td className="px-6 py-4 text-[12px] font-[400]">
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
