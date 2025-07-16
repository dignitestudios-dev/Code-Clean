import React from 'react'
import Navbar from '../../layout/Navbar'
import { FaArrowLeft } from 'react-icons/fa'
import { RiEdit2Fill } from 'react-icons/ri'
import { LuTrash2 } from 'react-icons/lu'
import { HeroBg, stripe } from '../../../assets/export'
import { useNavigate } from 'react-router'

export default function PaymentMethod() {
    const navigate=useNavigate("");
    return (
        <div>
            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
            </div>
            <div className='h-full px-40   -mt-60 bottom-0 items-center gap-3 '>
                <div className='flex items-center gap-2 mb-6'>
                    <button type="button" onClick={() => navigate("/app/settings")} >
                        <FaArrowLeft color='white' size={16} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white">Payment Method</h1>
                </div>
                <div className='bg-[#F9FAFA] shadow-lg flex h-[300px] flex-col gap-3 mb-48 rounded-[8px] p-10 mt-3' >
                    <h1 className="text-3xl font-normal text-gray-900 mb-4">Credit/debit card</h1>

                    <div className="bg-[#FFFFFF] p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Attached Stripe</p>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-gray-900 font-mono text-base">**** **** **** **72</span>
                                        <img src={stripe} className='w-[40px]' alt="" srcset="" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button 
                                 onClick={()=>navigate("/app/edit-card")}
                                style={{
                                    background:
                                        " linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                                }} className="p-2 rounded-[8px] text-white transition-colors">
                                    <RiEdit2Fill size={16} />
                                </button>
                                <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                    <LuTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
