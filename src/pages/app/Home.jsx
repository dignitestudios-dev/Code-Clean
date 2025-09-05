import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Herotwo from "../../components/app/LandingPage/Dashboard/Herotwo";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaShieldAlt,
  FaStar,
  FaRegHeart,
  FaChevronRight,
  FaChevronLeft,
  FaSpinner,
  FaHeart,
} from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { awardIcon, LocationIcon, WorkIcon } from "../../assets/export";
import BroadCastModal from "../../components/app/Profile/BroadCastModal";
import Filter from "../../components/global/Filter";
import { useNavigate } from "react-router";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchallservices } from "../../redux/slices/users.slice";

const itemsPerPage = 6;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [data, setData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage); // Dynamically calculate total pages based on the fetched data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfessionals = data.slice(startIndex, startIndex + itemsPerPage); // Slice data for pagination
  const { allservices, allservicesloading } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  useEffect(() => {
    dispatch(fetchallservices(currentPage)); // pass page to API
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (allservices && allservices.data) {
      setData(allservices.data); // use only the providers array
    }
  }, [allservices]);


  return (
    <div>
      <Navbar />
      <Herotwo />
      <div className="mx-auto max-w-[87em] mt-6">
        <div className="px-10 py-8">
          <div className="flex gap-3 justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-[600]">
                Hire Top-Rated Professionals
              </h1>
              <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white px-4 py-0 rounded-xl text-sm">
                {data?.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-2 rounded-md"
              >
                Broadcast a Request
              </button>
              <button
                onClick={() => setIsFilter(!isFilter)}
                className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-3 rounded-md"
              >
                <LuSettings2 />
              </button>
            </div>
          </div>
          {/* Show loading spinner when data is being fetched */}
          {allservicesloading ? (
            <div className="flex justify-center items-center pt-10 pb-10">
              <img src="/spinner.gif" height={100} width={100} alt="Loading..." />
            </div>
          ) : (
            <>
              {isFilter && <Filter />}

              {currentProfessionals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentProfessionals.map((pro, idx) => (
                    <div key={idx} className="p-5 rounded-xl shadow-xl bg-white hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={pro?.avatar ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${pro.avatar}` : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"}
                            alt={pro.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h2
                              className="font-semibold text-md text-gray-800 cursor-pointer"
                              onClick={() => navigate("/service-provider", { state: { id: pro.id } })}
                            >
                              {pro.name}
                            </h2>
                            <div className="flex items-center text-sm text-yellow-500">
                              <FaStar className="mr-1" />
                              {pro.rating}
                            </div>
                          </div>
                        </div>
                        {pro?.is_favorite ? (
                          <FaHeart
                            onClick={() => navigate("/favorites")}
                            className="text-red-500 cursor-pointer"
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => navigate("/favorites")}
                            className="text-gray-500 cursor-pointer"
                          />
                        )}
                      </div>

                      <div className="text-sm text-gray-600 space-y-1 mb-4">
                        <div className="text-sm text-gray-600 space-y-1 mb-2">
                          <div className="flex items-center gap-2">
                            <img src={LocationIcon} alt="LocationIcon" className="w-3" />
                            Location: {pro.city}, {pro.state}, {pro.country}
                          </div>
                          <div className="flex items-center gap-2 ">
                            <img src={WorkIcon} alt="WorkIcon" className="w-3" />
                            Experience: {pro.experience} yrs
                          </div>
                          <div className="flex items-center gap-2">
                            <img src={awardIcon} alt="AwardIcon" className="w-3" />
                            Job Success: {pro.complete_jobs} jobs
                          </div>
                        </div>
                      </div>

                      <hr className="mb-2" />

                      <h3 className="font-semibold text-[#00034A] mb-1">Biography</h3>
                      <p className="text-sm text-gray-700 line-clamp-3">{pro.biography}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-20">
                  <p className="text-gray-500 text-lg font-semibold">No Data Found</p>
                </div>
              )}

              {/* Pagination bhi tabhi dikhana jab data ho */}
              {currentProfessionals.length > 0 && (
                <div className="flex justify-center mt-8 gap-2">
                  <div className=' flex gap-3 bg-white shadow-2xl rounded-xl'>
                    {/* <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white text-[16px] text-[#B7B7B7] font-[500] rounded-md disabled:opacity-50 flex items-center gap-2"
                    >
                      <FaChevronLeft size={20} />
                      Previous
                    </button> */}


                    <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white text-[16px] text-[#B7B7B7] font-[500] rounded-md disabled:opacity-50 flex items-center gap-2"

                    >
                      <FaChevronLeft size={20} />
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-[#00034A]/10 text-[#00034A] border-2 border-[#27A8E2]' : 'bg-white'}`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    {/* <button
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white flex items-center gap-2 rounded-md disabled:opacity-50"
                    >
                      Next
                      <FaChevronRight color='#00034A' size={10} />
                    </button> */}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(p + 1, allservices?.last_page || 1))}
                      disabled={currentPage === allservices?.last_page}
                      className="px-4 py-2 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white flex items-center gap-2 rounded-md disabled:opacity-50"

                    >
                      Next
                      <FaChevronRight color='#00034A' size={10} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
      <BroadCastModal custombooking={isOpen} setCustombooking={setIsOpen} />
    </div>
  );
};

export default Home;
