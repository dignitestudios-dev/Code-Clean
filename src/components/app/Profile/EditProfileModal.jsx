import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { HiOutlineXMark } from 'react-icons/hi2';
import Modal from "react-modal";
export default function EditProfileModal({ isOpen, setIsOpen,updateProfile,setUpdateProfile }) {

    const [formData, setFormData] = useState({
        fullName: 'Apple Inc',
        email: 'designer@digitestudios.com',
        phone: '+1 462 849 558',
        location: 'Florida, United States'
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        setUpdateProfile(true)
        setIsOpen(false)
        // Handle save logic here
    };
    return (
<>
        <Modal
            isOpen={isOpen}
            contentLabel="Page Not Found"
            shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000] "
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
        >
            <div className="bg-white rounded-[16px] shadow-lg p-1 w-[450px]   flex flex-col text-center justify-center gap-3 ">
                <div className="flex justify-end w-full">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <HiOutlineXMark size={23} />
                    </button>
                </div>
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-0 w-8 h-8  bg-gradient-to-r from-[#27A8E2] to-[#00034A] rounded-full flex items-center justify-center shadow-lg transition-colors">
                            <FaPlus size={20} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="px-6 text-start space-y-2">
                    {/* Full Name */}
                    <div>
                        <label className="block  text-[#181818] text-[15px] font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-[#181818] text-[15px] font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                            placeholder="Enter your email"
                            disabled
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-[#181818] text-[15px] font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-[#181818] text-[15px] font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Enter your location"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="p-6 pt-8">
                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg"
                    >
                        Save
                    </button>
                </div>

            </div>
        </Modal>
        
</>
    )
}
