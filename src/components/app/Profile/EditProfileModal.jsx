import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineXMark } from 'react-icons/hi2';
import Modal from 'react-modal';

export default function EditProfileModal({ isOpen, setIsOpen, updateProfile, setUpdateProfile }) {
    const [formData, setFormData] = useState({
        fullName: 'Apple Inc',
        email: 'designer@digitestudios.com',
        phone: '+1 462 849 558',
        location: 'Florida, United States'
    });

    const [selectedImage, setSelectedImage] = useState(
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    );

    const [imageFile, setImageFile] = useState(null); // optional if you want to upload image to backend

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file); // optional
        }
    };

    const handleSave = () => {
        setUpdateProfile(true);
        setIsOpen(false);

        // Optional: console.log form data and image file
        console.log('Form Data:', formData);
        if (imageFile) {
            console.log('Selected Image File:', imageFile);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000]"
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
        >
            <div className="bg-white rounded-[16px] shadow-lg px-10 py-6 w-[800px] max-h-[90vh] overflow-y-auto flex flex-col gap-3">


                {/* Close Button */}
                <div className="flex justify-end px-6 pt-0">
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                        <HiOutlineXMark size={22} />
                    </button>
                </div>

                {/* Title */}
                <h2 className="text-center text-[28px] font-[900] text-[#181818]">Edit Profile</h2>

                <div className='ml-20 mr-20'>
                    {/* Profile Image */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-green-300 rounded-full overflow-hidden flex items-center justify-center">
                                <img
                                    src={selectedImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label
                                htmlFor="upload"
                                className="absolute bottom-1 right-0 w-8 h-8 cursor-pointer bg-gradient-to-r from-[#27A8E2] to-[#00034A] rounded-full flex items-center justify-center shadow-lg"
                            >
                                <FaPlus size={16} className="text-white" />
                            </label>
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="px-6 text-start space-y-4">
                        <div>
                            <label className="block text-[#181818] text-[15px] font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-[#181818] text-[15px] font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-[#181818] text-[15px] font-medium mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    const cleaned = value.replace(/[^+\d]/g, '');

                                    if (!cleaned.startsWith('+1')) return;

                                    const digitsOnly = cleaned.replace(/\D/g, '');
                                    if (digitsOnly.length > 11) return;

                                    setFormData(prev => ({
                                        ...prev,
                                        phone: cleaned
                                    }));
                                }}
                                placeholder="+1 123 456 7890"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />

                        </div>

                        <div>
                            <label className="block text-[#181818] text-[15px] font-medium mb-2">Location</label>
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
                    <div className="p-6 pt-6">
                        <button
                            onClick={handleSave}
                            className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-4 rounded-xl font-semibold shadow-lg transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
