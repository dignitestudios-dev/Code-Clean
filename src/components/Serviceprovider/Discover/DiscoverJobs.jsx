import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { HeroBg, ServiceImg1, ServiceImg2, ServiceImg3 } from "../../../assets/export";
import Navbar from "../../layout/Navbar";
import { useNavigate } from "react-router";
import Footer from "../../layout/Footer";
import { useState } from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import Filter from "../../global/Filter";
import { LuSettings2 } from "react-icons/lu";

export default function DiscoverJobs() {
    const navigate = useNavigate("")
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilter, setIsFilter] = useState(false);
    const serviceRequests = [
        {
            id: 1,
            title: 'Deep Cleaning for a 2-Bedroom Apartment',
            location: 'Downtown, Los Angeles',
            status: 'Avaliable',
            statusColor: 'bg-green-100 text-green-600',
            description: 'Looking for eco-friendly cleaning products. 2 Bedrooms, 1 Bathroom, Kitchen, and Living Room. Vacuuming, mopping, and dusting. Kitchen and bathroom sanitization. Window and glass cleaning expected duration: 4-5 hours',
            price: '$300',
            date: 'Saturday, 10 AM',
            images: [
                ServiceImg1,
                ServiceImg2,
                ServiceImg3
            ]
        },
        {
            id: 2,
            title: 'Move-Out Cleaning for a 1-Bedroom Apartment',
            location: 'Miami, FL',
            status: 'Already taken',
            statusColor: 'bg-[#FF990026] text-[#FF9900]',
            description: 'Need this done before the lease ends next week. Deep cleaning of all rooms, Carpet steam cleaning, Wall and cabinet cleaning, Kitchen and bathroom sanitization.',
            price: '$250',
            date: 'Sunday, 2 PM',
            images: []
        },
        {
            id: 3,
            title: 'Cleaning for a Small Office (10 Desks)',
            location: 'Miami, FL',
            status: 'Avaliable',
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
        <div>

            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
            </div>
            <div className='h-full px-5 lg:px-40   -mt-60 bottom-0 items-center gap-3 '>
                <div className='flex items-center justify-between gap-2 mb-6'>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => navigate("/app/landing")} >
                            <FaArrowLeft color='white' size={16} />
                        </button>
                        <h1 className="text-2xl font-semibold text-white">Discover Jobs</h1>
                    </div>
                    <div>
                        <div className='flex items-center gap-4 '>
                            <div className='relative flex items-center'>
                                <div className='absolute left-1' >
                                    <CiSearch color='white' size={20} />
                                </div>
                                <input type="text" className="bg-[#FFFFFF4D] blur-[40] outline-none p-2 rounded-[8px] text-white" />
                            </div>
                            <button onClick={() => setIsFilter(!isFilter)} className='bg-[#FFFFFF4D] text-white p-3 rounded-md' ><LuSettings2 />
                            </button>
                        </div>
                        <div className="relative top-12 left-20">
                            {
                                isFilter && (
                                    <Filter setIsFilter={setIsFilter} />
                                )
                            }
                        </div>
                    </div>

                </div>

                <div className='bg-[#F9FAFA] shadow-lg mb-48 rounded-[8px] p-10 mt-3' >
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
                                        <button onClick={() => navigate("/discover-detail/123", { state:{status:request.status} })} className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
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
            </div>
            <Footer />
        </div>
    )
}
