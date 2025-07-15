import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { SlTarget } from "react-icons/sl";
import { GoTrash } from "react-icons/go";
import { stripe } from '../../../assets/export';
import { LuTrash2 } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';

export default function BroadCastModal({ custombooking, setCustombooking, setCustombookingtwo }) {
    const [formData, setFormData] = useState({
        description: '',
        file: null,
        date: '',
        time: '',
        location: '',
        price: '',
    });

    const [dateTimeSlots, setDateTimeSlots] = useState([
        { date: '', time: '' },
    ]);
    const addMoreSlot = () => {
        setDateTimeSlots([...dateTimeSlots, { date: '', time: '' }]);
    };

    const removeSlot = (index) => {
        if (dateTimeSlots.length > 1) {
            setDateTimeSlots(dateTimeSlots.filter((_, i) => i !== index));
        }
    };

    const updateSlot = (index, field, value) => {
        const updated = [...dateTimeSlots];
        updated[index][field] = value;
        setDateTimeSlots(updated);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData({ ...formData, file: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        custombooking && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                <div className="bg-white w-full max-w-[36em] rounded-lg shadow-lg p-0 pt-6 pb-6 relative max-h-[43rem] overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 border-b-[1px] pb-3 pl-6 pr-6">
                        <h2 className="text-[24px] font-semibold">Broadcast Request form</h2>
                        <button onClick={() => setCustombooking(false)}>
                            <RxCross2 size={26} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4 pl-6 pr-6">
                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Service Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder="Briefly explain the service required"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2 focus:outline-none"
                            />
                        </div>

                        {/* Upload */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Upload Images <span className="text-gray-500">(Optional)</span>
                            </label>

                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer border border-dashed rounded p-6 text-center w-full block hover:bg-gray-50 transition"
                            >
                                <div className="text-gray-700 font-medium">
                                    {formData.file ? formData.file.name : 'Upload “document name”'}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Upto 20mb JPG, PNG</p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Date & Time */}
                        <div className="space-y-4">
                            {dateTimeSlots.map((slot, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <div>
                                        {index === 0 && (
                                            <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
                                        )}
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={slot.date}
                                                onChange={(e) => updateSlot(index, 'date', e.target.value)}
                                                placeholder="Select Date"
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />

                                        </div>
                                    </div>

                                    <div className="relative">
                                        {index === 0 && (
                                            <label className="block text-sm font-medium text-gray-900 mb-2">Time</label>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="time"
                                                    value={slot.time}
                                                    onChange={(e) => updateSlot(index, 'time', e.target.value)}
                                                    placeholder="Enter Time"
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />

                                            </div>
                                            {index > 0 && (
                                                <button
                                                    onClick={() => removeSlot(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <LuTrash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={addMoreSlot}
                                className="flex items-center gap-2 text-[#208BC7] font-medium transition-colors"
                            >
                                <FaPlus className="w-4 h-4" />
                                Add more
                            </button>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block mb-1 font-medium">Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter your location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2 focus:outline-none"
                            />
                            <div className="flex items-center mt-2 text-black cursor-pointer">
                                <SlTarget className="mr-1" />
                                <span className="text-sm">Use my current Location</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block mb-1 font-medium">Proposed Price</label>
                            <div className="flex items-center border rounded px-2">
                                <span className="text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter amount"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full py-2 ml-1 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block mb-1 font-medium">Payment Method</label>
                            <div className="flex justify-between items-center border rounded p-2">
                                <div className="flex gap-3">
                                    <span className="text-gray-700">**** **** **** **72</span>
                                    <img src={stripe} className="h-6" alt="Stripe" />
                                </div>
                                <button className="text-red-500 hover:text-red-700 text-lg">
                                    <GoTrash />
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    setCustombooking(false);
                                    setCustombookingtwo(true);
                                }}
                                className="w-[30em] flex justify-center mt-2 bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-2 rounded-[10px] font-semibold hover:opacity-90"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
