import React, { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import { HeroBg } from "../../../assets/export";
import { FaArrowLeft, FaCheck, FaSpinner, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  AddBank,
  DeleteBank,
  getPaymentMethod,
  getTransactions,
  getWallet,
  widrawFunds,
} from "../../../redux/slices/provider.slice";
import { Button } from "../../../components/global/GlobalButton";
import { ErrorToast } from "../../../components/global/Toaster";
import SkeletonRows from "../../../components/global/Skellyton";
import Pagination from "../../../components/global/Pagination";
const BankSkeleton = ({ count = 2 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="border-2 rounded-2xl py-1 px-3 mt-3 mb-3 animate-pulse"
      >
        <label className="block text-sm font-bold text-black">Bank Name</label>
        <div className="h-4 w-40 bg-gray-200 rounded mt-1" />
      </div>
    ))}
  </>
);

const Wallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Transaction History");
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [withdrawal, setWithdrawal] = useState(false);
  const [addbankaccount, setAddbankaccount] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // State add kardo
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const {
    wallet,
    transaction,
    isLoading,
    paymentMethod,
    bookingRequestLoader,
    StartJobLoading,
    widrawData,
  } = useSelector((state) => state.provider);
  useEffect(() => {
    if (activeTab == "Transaction History") {
      dispatch(getTransactions("provider/transactions"));
    } else {
      dispatch(getTransactions("provider/withdrawals"));
    }
    dispatch(getWallet());
    dispatch(getPaymentMethod());
  }, [dispatch, activeTab]);

  const sliceBaseUrl = (url) => {
    if (!url) return null;
    try {
      const base = "https://api.codecleanpros.com/api/";
      return url.startsWith(base) ? url.replace(base, "") : url;
    } catch {
      return url;
    }
  };

  const handlePageChange = (url) => {
    const cleanUrl = sliceBaseUrl(url);
    if (cleanUrl) {
      dispatch(getTransactions(cleanUrl));
    }
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      account_number: formData?.accountNumber,
      routing_number: formData?.routingNumber,
      bank_name: formData?.bankName,
      holder_name: formData?.accountHolderName,
    };
    await dispatch(AddBank(data)).unwrap();
    dispatch(getPaymentMethod());
    setAddbankaccount(false);
    setShowModal(true);
    setFormData({
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      saveDetails: false,
    });
  };
  const handleWidraw = async () => {
    if (!selectedBank) return ErrorToast("Please Select Bank");
    if (!amount) return ErrorToast("amount is required");
    const data = {
      bank_id: selectedBank,
      amount: amount,
    };
    await dispatch(widrawFunds(data)).unwrap();
    setShowModal(false);
    setWithdrawal(true);
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(DeleteBank(id));
    } finally {
      dispatch(getPaymentMethod());
    }
  };
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
        <div className="flex items-center gap-3 px-5 md:px-[40px]">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[32px] font-bold leading-[48px] capitalize">
            Wallet
          </h2>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-5 md:px-[40px] mx-auto -mt-[17em] relative mb-8">
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
            {isLoading ? ( // <-- yahan apna loader state use karo
              <BankSkeleton count={2} />
            ) : paymentMethod?.banks?.length > 0 ? (
              paymentMethod.banks.map((item, i) => (
                <div
                  key={i}
                  // <-- select bank
                  className={`border-2 flex justify-between items-center rounded-2xl py-1 px-3 mt-3 mb-3 transition
      ${
        selectedBank == item?.id
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300"
      }
    `}
                >
                  <div>
                    <label
                      onClick={() => setSelectedBank(item?.id)}
                      className="block text-sm font-bold cursor-pointer text-black"
                    >
                      {item?.bank_name}
                    </label>
                    <p className="text-sm">0112********{item?.last_digits}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setSelectedId(item?.id);
                        handleDelete(item?.id);
                      }}
                      disabled={StartJobLoading}
                      className={`flex items-center justify-center p-2 rounded ${
                        StartJobLoading
                          ? "cursor-not-allowed opacity-70"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {StartJobLoading && selectedId == item?.id ? (
                        <FaSpinner
                          className="animate-spin"
                          size={16}
                          color="gray"
                        />
                      ) : (
                        <FaTrash size={15} color="red" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-2 rounded-2xl py-1 px-3 mt-3 mb-3 text-center">
                <p className="text-sm text-gray-500">No Bank Found</p>
              </div>
            )}

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
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                min="0" // prevent negative
                placeholder="$200"
                value={amount}
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
              <Button
                text={"Withdraw Funds"}
                loading={bookingRequestLoader}
                onClick={() => handleWidraw()}
              />
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
            <p className="text-blue-600 font-bold text-2xl">
              USD ${widrawData?.amount}
            </p>
            <div className="text-left border-2 rounded-2xl p-0 mt-6">
              <div className="border-b-2 p-3">
                <p>Transaction ID:</p>
                <p className="text-blue-600">{widrawData?.reference_id}</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Card Holder Name:</p>
                <p className="text-blue-600"> {widrawData?.name}</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Transfer Date: </p>
                <p className="text-blue-600"> {widrawData?.date}</p>
              </div>
              <div className="border-b-2 p-3">
                <p>Transfer Time:</p>
                <p className="text-blue-600"> {widrawData?.time}</p>
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
                  required
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
                  required
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
                  required
                  maxLength={12} // Account number max 12 digits
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
                  required
                  maxLength={9}
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
                <Button loading={isLoading} text={"Add Bank"} type={"submit"} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions Section */}
      <div className="px-5 md:px-[40px] mx-auto px-0 pb-16">
        <h3 className="text-xl font-bold text-white mb-4">
          Transaction History
        </h3>

        {/* Tabs */}
        <div className="flex border-b mb-0 px-5 bg-white rounded-t-2xl">
          {["Transaction History", "Withdrawal History"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 relative py-3 mb-3 text-sm font-medium ${
                activeTab === tab
                  ? "text-gradient after:content-[''] after:absolute after:left-7 after:bottom-[5px] after:w-[17px] after:h-[1px] after:bg-[#3961ac] after:rounded"
                  : "text-[#595959] hover:text-[#003973]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tables */}
        {/* Tables */}
        <div className="bg-white mb-4 shadow overflow-x-auto rounded-b-2xl">
          {activeTab === "Transaction History" && (
            <table className="w-full text-sm text-left">
              <thead className="bg-[#D2E8F4] text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-4 text-[#082166] ">#</th>
                  <th className="px-6 py-4 text-[#082166] ">Transactions ID</th>
                  <th className="px-6 py-4 text-[#082166] ">
                    Card Holder Name
                  </th>
                  {/* <th className="px-6 py-4 text-[#082166] ">Account Number</th> */}
                  <th className="px-6 py-4 text-[#082166] ">Transfer Date</th>
                  <th className="px-6 py-4 text-[#082166] ">Transfer Time</th>
                  <th className="px-6 py-4 text-[#082166] ">Total Amount</th>
                </tr>
              </thead>
              {isLoading ? (
                <SkeletonRows count={5} />
              ) : (
                <tbody className="text-[#181818]">
                  {transaction?.transactions?.data?.length > 0 ? (
                    transaction.transactions.data.map((t, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {t.transaction_id}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {t.account_name}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {t.date}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {t.time}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {t.amount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-[12px] font-[400] text-gray-500"
                      >
                        No record found
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          )}

          {activeTab === "Withdrawal History" && (
            <table className="w-full text-sm text-left">
              <thead className="bg-[#D2E8F4] text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-4 text-[#082166] ">#</th>
                  <th className="px-6 py-4 text-[#082166] ">Payout ID</th>
                  <th className="px-6 py-4 text-[#082166] ">Bank Name</th>
                  <th className="px-6 py-4 text-[#082166] ">Account Name</th>
                  <th className="px-6 py-4 text-[#082166] ">Last Digits</th>
                  <th className="px-6 py-4 text-[#082166] ">Type</th>
                  <th className="px-6 py-4 text-[#082166] ">Date</th>
                  <th className="px-6 py-4 text-[#082166] ">Amount</th>
                  <th className="px-6 py-4 text-[#082166] ">Status</th>
                </tr>
              </thead>
              {isLoading ? (
                <SkeletonRows count={5} />
              ) : (
                <tbody className="text-[#181818]">
                  {transaction?.withdrawals?.data?.length > 0 ? (
                    transaction.withdrawals.data.map((w, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.payout_id}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.bank_name}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.account_name}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.last_digits}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.type}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.date}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.amount}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-[400]">
                          {w.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9} // total number of columns in your table
                        className="px-6 py-4 text-center text-[12px] font-[400] text-gray-500"
                      >
                        No record found
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          )}
        </div>
        <Pagination
          onPageChange={handlePageChange}
          links={
            activeTab === "Transaction History"
              ? transaction?.transactions?.links
              : transaction?.withdrawals?.links
          }
        />
      </div>
    </div>
  );
};

export default Wallet;
