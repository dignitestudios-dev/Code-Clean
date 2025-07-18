import React from 'react'
import { FaArrowLeft, FaBriefcase, FaHeart, FaMapMarkerAlt, FaRegHeart, FaShieldAlt, FaStar } from 'react-icons/fa'
import { HeroBg } from "../../../assets/export"
import Navbar from '../../../components/layout/Navbar'
import Footer from "../../../components/layout/Footer"
import { useNavigate } from 'react-router'

const Favorites = () => {

    const professionalsData = [
        {
            name: 'Justin Cruz',
            rating: 4.4,
            location: 'Florida, United States',
            experience: '2 yrs',
            success: '20+',
            bio: 'We are seeking a dedicated and customer-oriented Customer Support Agent to join our team. As a Customer Support Agent, you will be responsible for providing...'
        },
        {
            name: 'John Doe',
            rating: 4.9,
            location: 'Florida, United States',
            experience: '8 yrs',
            success: '100+',
            bio: 'We are seeking a dedicated and customer-oriented Customer Support Agent to join our team. As a Customer Support Agent, you will be responsible for providing...'
        },
        {
            name: 'Emily Johnson',
            rating: 4.7,
            location: 'California, United States',
            experience: '3 yrs',
            success: '30+',
            bio: 'We are looking for a proactive and detail-oriented Customer Support Specialist who can handle inquiries efficiently and effectively.'
        },
        {
            name: 'David Lee',
            rating: 4.8,
            location: 'New York, United States',
            experience: '6 yrs',
            success: '80+',
            bio: 'We are searching for a skilled and enthusiastic Customer Service Representative to engage with our clients and enhance their experience.'
        },
        {
            name: 'Michael Brown',
            rating: 4.5,
            location: 'Illinois, United States',
            experience: '7 yrs',
            success: '70+',
            bio: 'We are looking for a motivated Customer Service Expert who can effectively solve problems and ensure a positive customer experience across all platforms.'
        },
        {
            name: 'Sophia Turner',
            rating: 4.6,
            location: 'Texas, United States',
            experience: '4 yrs',
            success: '50+',
            bio: 'We are in need of a knowledgeable and friendly Customer Support Agent to assist customers with their inquiries and provide exceptional service.'
        },
       
    ];
    const currentProfessionals = professionalsData;
    const navigate = useNavigate();


    return (
        <div>
            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
                <div className='flex items-center gap-3 ml-[11em]'>
                    <button type="button" cla onClick={() => navigate(-1)} >
                        <FaArrowLeft color='white' size={20} />
                    </button>
                    <h2 className="text-white text-[30px] mt-0 font-bold leading-[48px] capitalize">
                        Favorites
                    </h2>
                </div>

            </div>

            <div className="bg-[#F9FAFA] p-6 rounded-2xl mx-auto max-w-[74em] grid grid-cols-1 md:grid-cols-3 gap-6 -mt-[16em] mb-[4em]">
                {currentProfessionals.map((pro, idx) => (
                    <div key={idx} className="p-5  rounded-xl shadow-xl bg-white hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${idx + 1}`}
                                    alt={pro.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="font-semibold text-md text-gray-800">{pro.name}</h2>
                                    <div className="flex items-center text-sm text-yellow-500">
                                        <FaStar className="mr-1" />
                                        {pro.rating}
                                    </div>
                                </div>
                            </div>
                            <FaHeart className='text-red-600 text-lg cursor-pointer' />
                        </div>

                        <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-[#4147f2]" />
                                    <span className="font-medium text-gray-700">Location</span>
                                </div>
                                <span>{pro.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FaBriefcase className="text-[#4147f2]" />
                                    <span className="font-medium text-gray-700">Experience</span>
                                </div>
                                <span>{pro.experience}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FaShieldAlt className="text-[#4147f2]" />
                                    <span className="font-medium text-gray-700">Job Success</span>
                                </div>
                                <span>{pro.success}</span>
                            </div>
                        </div>

                        <hr className="mb-2" />

                        <h3 className="font-semibold text-[#00034A] mb-1">Biography</h3>
                        <p className="text-sm text-gray-700 line-clamp-3">{pro.bio}</p>
                    </div>
                ))}
            </div>

            <Footer/>

        </div>
    )
}

export default Favorites