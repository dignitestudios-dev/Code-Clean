import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { HeroBg, ServiceImg1, ServiceImg2, ServiceImg3 } from '../../../assets/export'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import { CiEdit, CiLocationOn } from 'react-icons/ci'
import { LuTrash2 } from 'react-icons/lu'
import { useNavigate } from 'react-router'

export default function BroadCastBookingDetail() {
    const navigate=useNavigate("")
    const serviceRequests = [
        {
            id: 1,
            title: 'Deep Cleaning for a 2-Bedroom Apartment',
            location: 'Downtown, Los Angeles',
            status: 'Requested',
            statusColor: 'bg-gray-100 text-gray-600',
            description: 'Looking for eco-friendly cleaning products. 2 Bedrooms, 1 Bathroom, Kitchen, and Living Room. Vacuuming, mopping, and dusting. Kitchen and bathroom sanitization. Window and glass cleaning expected duration: 4-5 hours',
            price: '$300',
            date: 'Saturday, 10 AM',
            images: [
                ServiceImg1,
                ServiceImg2,
                ServiceImg3

            ]
        },
    ];



    return (
        <div>

            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
            </div>
            <div className='h-full px-10 lg:px-40   -mt-80 bottom-0 items-center gap-3 '>
                <div className='flex items-center gap-2 mb-6'>
                    <button type="button" onClick={() => navigate(-1)} >
                        <FaArrowLeft color='white' size={16} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white">Broadcast booking details</h1>
                </div>
                <div className='bg-[#F9FAFA] shadow-lg mb-48 rounded-[8px] p-10 mt-3' >
                    {/* Service Request Cards */}
                    <div className="space-y-6">
                        {serviceRequests.map((request) => (
                            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    {/* Header with title and actions */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-xl font-semibold text-gray-900">{request.title}</h2>                                               
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <CiLocationOn color='#00034A' />
                                                {request.location}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setCustombooking(true)} className="p-2 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-lg transition-colors">
                                                <CiEdit color='white' className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => request.status == "In Progress" ? setIsRestrict(true) : setIsOpen(true)} className="p-2 text-white bg-red-500 rounded-lg transition-colors">
                                                <LuTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Images */}
                                    {request.images && request.images.length > 0 && (
                                        <div className="flex gap-3 mb-4">
                                            {request.images.map((image, index) => (
                                                <div key={index} className="w-20 h-15 bg-gray-200 rounded-lg overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400">
                                                        <img src={image} alt="" srcset="" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {request.description}
                                    </p>

                                    {/* Price and Date */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-12">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Proposed Price</p>
                                                <p className="text-xl font-semibold text-gray-900">{request.price}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Preferred Date & Time</p>
                                                <p className="text-lg font-medium text-gray-900">{request.date}</p>
                                            </div>
                                        </div>                                     
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
