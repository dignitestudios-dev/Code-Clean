import React, { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import Modal from "react-modal";
import { Button } from '../../global/GlobalButton';
export default function NotificationSettings({isOpen,setIsOpen}) {
    const [toggles, setToggles] = useState([true, true, false, false, false]);

    const handleToggle = (index) => {
        const updatedToggles = [...toggles];
        updatedToggles[index] = !updatedToggles[index];
        setToggles(updatedToggles);
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Page Not Found"
            shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000] "
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
        >
            <div className="bg-white w-[500px] p-4 rounded-[16px] shadow-lg   items-center flex flex-col justify-center gap-3   text-center">
                <div className="w-full flex justify-end" >
                    <button onClick={() => {
                        setIsOpen(!isOpen)
                    }} ><HiOutlineXMark /></button>
                </div>
                <div className=" text-start w-full">
                    <h2 className="text-2xl font-bold  text-black">Notification Settings</h2>
                </div>

                {/* Toggle list */}
                <div className="w-full flex flex-col gap-3 mt-6">
                    {toggles.map((isOn, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-[#F9FAFA] px-4 py-3 rounded-xl"
                        >
                            <span className="text-[#181818] font-[500]">Notification title</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isOn}
                                    onChange={() => handleToggle(index)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                            </label>
                        </div>
                    ))}
                </div>
                  <div className='mt-3 w-full' >
                 <Button  text={"Save"} />
                  </div>
            </div>
        </Modal>
    );
}
