import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Herotwo from '../../components/app/LandingPage/Dashboard/Herotwo';
import { FaMapMarkerAlt, FaBriefcase, FaShieldAlt, FaStar, FaRegHeart, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { LuSettings2 } from 'react-icons/lu';

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

const itemsPerPage = 6;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(professionalsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfessionals = professionalsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Navbar />
      <Herotwo />
      <div className='mx-auto max-w-[87em] mt-6'>
        <div className="px-10 py-8">
          <div className='flex gap-3 justify-between items-center mb-10'>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl font-[600]'>Hire Top-Rated Professionals</h1>
              <span className='bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white px-4 py-0 rounded-xl text-sm'>1,358</span>
            </div>
            <div className='flex items-center gap-3'>
              <button className='bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white p-2 rounded-md'>Broadcast a Request</button>
              <button className='bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white p-3 rounded-md' ><LuSettings2 />
              </button>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <FaRegHeart className="text-black text-lg cursor-pointer" />
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

          <div className="flex justify-center mt-8 gap-2">
            <div className=' flex gap-3 bg-white shadow-2xl rounded-xl'>
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white rounded-md disabled:opacity-50 flex items-center gap-3"
              >
                <FaChevronLeft />
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2  ${currentPage === i + 1 ? 'bg-[#27A8E2]/10  text-[#4147f2] border-2 border-[#4147f2]' : 'bg-white'}`}
                >
                  {i + 1}


                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white text-[#4147f2] flex items-center gap-3 rounded-md disabled:opacity-50"
              >
                Next
                <FaChevronRight color='#4147f2' />

              </button>
            </div>


          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
