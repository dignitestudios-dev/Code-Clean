import React, { useState } from 'react';
import { CiEdit, CiLocationOn, CiMapPin, CiSearch } from 'react-icons/ci';
import { FaChevronRight } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
import { useNavigate } from 'react-router';

const BroadcastServiceRequests = ({ setCustombooking, setIsOpen, setIsRestrict }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate("");
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
                '/api/placeholder/80/60',
                '/api/placeholder/80/60',
                '/api/placeholder/80/60'
            ]
        },
        {
            id: 2,
            title: 'Move-Out Cleaning for a 1-Bedroom Apartment',
            location: 'Miami, FL',
            status: 'In Progress',
            statusColor: 'bg-blue-100 text-blue-600',
            description: 'Need this done before the lease ends next week. Deep cleaning of all rooms, Carpet steam cleaning, Wall and cabinet cleaning, Kitchen and bathroom sanitization.',
            price: '$250',
            date: 'Sunday, 2 PM',
            images: []
        },
        {
            id: 3,
            title: 'Cleaning for a Small Office (10 Desks)',
            location: 'Miami, FL',
            status: 'Completed',
            statusColor: 'bg-green-100 text-green-600',
            description: 'Need this done before the lease ends next week. Deep cleaning of all rooms, Carpet steam cleaning, Wall and cabinet cleaning, Kitchen and bathroom sanitization.',
            price: '$200',
            date: 'Sunday, 2 PM',
            images: []
        }
    ];

    const filteredRequests = serviceRequests.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Broadcast Service Requests</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button onClick={() => setCustombooking(true)} className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Broadcast a Request
                    </button>
                </div>
            </div>

            {/* Service Request Cards */}
            <div className="space-y-6">
                {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            {/* Header with title and actions */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-semibold text-gray-900">{request.title}</h2>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.statusColor}`}>
                                            {request.status}
                                        </span>
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
                                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
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
                                <button onClick={() => navigate("/service-detail/123")} className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    <FaChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No service requests found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default BroadcastServiceRequests;