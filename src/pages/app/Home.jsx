import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Herotwo from '../../components/app/LandingPage/Dashboard/Herotwo';
import { FaMapMarkerAlt, FaBriefcase, FaShieldAlt, FaStar, FaRegHeart, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { LuSettings2 } from 'react-icons/lu';
import { awardIcon, LocationIcon, WorkIcon } from '../../assets/export';
import BroadCastModal from '../../components/app/Profile/BroadCastModal';
import Filter from '../../components/global/Filter';
import { useNavigate } from 'react-router';
import Footer from '../../components/layout/Footer';
import { useSelector } from 'react-redux';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const totalPages = Math.ceil(professionalsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfessionals = professionalsData.slice(startIndex, startIndex + itemsPerPage);
  const navigate = useNavigate();
  const {user,user_data,accessToken} = useSelector((state)=>state.auth);

  console.log(user_data,"user_data")


  return (
    <div>
      <Navbar />
      <Herotwo />
      <div className='mx-auto max-w-[87em] mt-6'>
        <div className="px-10 py-8">
          <div className='flex gap-3 justify-between items-center mb-10'>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl font-[600]'>Hire Top-Rated Professionals</h1>
              <span className='bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white px-4 py-0 rounded-xl text-sm'>1,358</span>
            </div>
            <div className='flex items-center gap-3'>
              <button onClick={() => setIsOpen(!isOpen)} className='bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-2 rounded-md'>Broadcast a Request</button>
              <button onClick={()=>setIsFilter(!isFilter)} className='bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-3 rounded-md' ><LuSettings2 />
              </button>
              {/* Filter fields */}
            </div>


          </div>
          {
            isFilter && (
             <Filter/>
            )
          }

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
                      <h2 className="font-semibold text-md text-gray-800 cursor-pointer" onClick={()=>{
                        navigate("/service-provider")
                      }}>{pro.name}</h2>
                      <div className="flex items-center text-sm text-yellow-500">
                        <FaStar className="mr-1" />
                        {pro.rating}
                      </div>
                    </div>
                  </div>
                  <FaRegHeart onClick={()=>{
                        navigate("/favorites")
                      }} className="text-black text-lg cursor-pointer" />
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <div className="text-sm text-gray-600 space-y-1 mb-2">
                    <div className="flex items-center gap-2">
                      <img src={LocationIcon} alt="LocationIcon" className="w-3" />
                      Location: {pro.location}
                    </div>
                    <div className="flex items-center gap-2 ">
                      <img src={WorkIcon} alt="LocationIcon" className="w-3" />
                      Experience: {pro.experience}
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={awardIcon} alt="LocationIcon" className="w-3" />
                      Job Success: {pro.success}
                    </div>
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
                className="px-4 py-2 bg-white text-[16px] text-[#B7B7B7] font-[500]  rounded-md disabled:opacity-50 flex items-center gap-2"
              >
                <FaChevronLeft size={10} />
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2  ${currentPage === i + 1 ? 'bg-[#00034A]/10  text-[#00034A] border-2 border-[#27A8E2] bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent' : 'bg-white'}`}
                >
                  {i + 1}


                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent flex items-center gap-2 rounded-md disabled:opacity-50"
              >
                Next
                <FaChevronRight color='#00034A' size={10} />

              </button>
            </div>


          </div>
        </div>
            <Footer />

      </div>
      <BroadCastModal custombooking={isOpen} setCustombooking={setIsOpen} />
    
    </div>
  );
};

export default Home;
