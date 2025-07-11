import React, { useState } from 'react';
import { EditIcon, EditWhiteIcon } from '../../assets/export';
import { FaTrash } from 'react-icons/fa';
import SubscribedPlan from '../../components/onboarding/SubscribedPlain';

export default function BillingSummary({ handleNext }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Billing Summary
            </h1>

            {/* Plan Section */}
            <div className="border border-[#BEBEBE]  bg-[#FFFFFF] rounded-[8px] p-6 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-[16px] font-[500] text-gray-900">Plan 1</span>
                    <span className="text-[16px] font-[500] text-gray-900">Basic</span>
                    <span className="text-[16px] font-[500] text-gray-900">$150.00</span>
                </div>
            </div>

            {/* Attached Card Section */}
            <div className="mb-6">
                <h2 className="text-[16px] font-medium text-[#212935] mb-4">Attached Card</h2>
                <div className="border border-gray-300 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                        <span className="text-[16px] font-[400] text-[#727272]">**** **** **** **72</span>
                        <div className="flex space-x-2">
                            <button style={{
                                background:
                                    " linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                            }} className="text-white p-2 rounded">
                                <img src={EditWhiteIcon} className='w-4' alt="" srcset="" />
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                <FaTrash size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buy Now Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background:
                        " linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                }} className="text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors">
                Buy Now
            </button>

            <SubscribedPlan isOpen={isOpen} setIsOpen={setIsOpen} handleNext={handleNext} />
        </div>
    );
}