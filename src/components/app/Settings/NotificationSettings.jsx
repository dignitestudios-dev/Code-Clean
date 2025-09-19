import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import Modal from "react-modal";
import { Button } from "../../global/GlobalButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPreferences,
  updateUserPreferences,
} from "../../../redux/slices/users.slice";

export default function NotificationSettings({ isOpen, setIsOpen }) {
  const { userPreference, isLoading, bookinghistoryLoading } = useSelector(
    (state) => state?.user
  );
  const dispatch = useDispatch();

  const [toggles, setToggles] = useState([]);
  useEffect(() => {
    dispatch(fetchUserPreferences());
  }, [dispatch]);
  const notificationFields = [
    {
      backendKey: "activity_notifications",
      key: "activity_notification",
      label: "Activity Notifications",
    },
    {
      backendKey: "general_notifications",
      key: "general_notification",
      label: "General Notifications",
    },
    {
      backendKey: "messages_notifications",
      key: "messages_notification",
      label: "Messages Notifications",
    },
    {
      backendKey: "transaction_notifications",
      key: "transaction_notification",
      label: "Transaction Notifications",
    },
  ];

  useEffect(() => {
    if (userPreference) {
      setToggles(
        notificationFields.map((field) => ({
          key: field.key,
          label: field.label,
          value:
            userPreference[field.backendKey] === true ||
            userPreference[field.backendKey] === 1,
        }))
      );
    }
  }, [userPreference]);


  const handleToggle = (index) => {
    const updated = [...toggles];
    updated[index].value = !updated[index].value;
    setToggles(updated);
  };

  const handleSave = async () => {
    const payload = toggles.reduce((acc, item) => {
      // map back to backend keys
      const backendField = notificationFields.find(
        (field) => field.key === item.key
      );
      acc[backendField.backendKey] = item.value; // ✅ send 1/0 or true/false depending on backend
      return acc;
    }, {});

    await dispatch(updateUserPreferences(payload));
    dispatch(fetchUserPreferences());
    setIsOpen(false)
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Notification Settings"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      <div className="bg-white w-[500px] p-4 rounded-[16px] shadow-lg items-center flex flex-col justify-center gap-3 text-center">
        <div className="w-full flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <HiOutlineXMark />
          </button>
        </div>

        <div className="text-start w-full">
          <h2 className="text-2xl font-bold text-black">
            Notification Settings
          </h2>
        </div>

        <div className="w-full flex flex-col gap-3 mt-6">
          {isLoading
            ? // 🔥 Skeleton loader
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[#F9FAFA] px-4 py-3 rounded-xl animate-pulse"
                >
                  <div className="h-4 w-40 bg-gray-300 rounded"></div>
                  <div className="h-6 w-11 bg-gray-300 rounded-full"></div>
                </div>
              ))
            : toggles.map((item, index) => (
                <div
                  key={item.key}
                  className="flex justify-between items-center bg-[#F9FAFA] px-4 py-3 rounded-xl"
                >
                  <span className="text-[#181818] font-[500]">
                    {item.label}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.value}
                      onChange={() => handleToggle(index)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              ))}
        </div>

        <div className="mt-3 w-full">
          <Button
            text={"Save"}
            loading={bookinghistoryLoading}
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
}
