import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import {
  HeroBg,
  ServiceImg1,
  ServiceImg2,
  ServiceImg3,
} from "../../../assets/export";
import Navbar from "../../layout/Navbar";
import { useNavigate } from "react-router";
import Footer from "../../layout/Footer";
import { useEffect, useState } from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import Filter from "../../global/Filter";
import { LuSettings2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiscoverJobs,
  getFilteredJobs,
} from "../../../redux/slices/provider.slice";
import Pagination from "../../global/Pagination";
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "available":
      return "bg-green-100 text-green-600";
    case "rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600"; // fallback
  }
};
export default function DiscoverJobs() {
  const navigate = useNavigate("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const dispatch = useDispatch();
  const { discoverJobs, isLoading } = useSelector((state) => state?.provider);
  useEffect(() => {
    dispatch(getDiscoverJobs("provider/discover/jobs"));
  }, []);

  const sliceBaseUrl = (url) => {
    if (!url) return null;
    try {
      const base = "https://api.codecleanpros.com/api/";
      return url.startsWith(base) ? url.replace(base, "") : url;
    } catch {
      return url;
    }
  };

  console.log(discoverJobs,"discoverJobs")

  const handlePageChange = (url) => {
    const cleanUrl = sliceBaseUrl(url);
    if (cleanUrl) {
      dispatch(getDiscoverJobs(cleanUrl));
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-5 lg:px-40   -mt-60 bottom-0 items-center gap-3 ">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate("/app/landing")}>
              <FaArrowLeft color="white" size={16} />
            </button>
            <h1 className="text-2xl font-semibold text-white">Discover Jobs</h1>
          </div>
          <div>
            <div className="flex items-center gap-4 ">
              <div className="relative flex items-center">
                <div className="absolute left-1">
                  <CiSearch color="white" size={20} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      await dispatch(
                        getDiscoverJobs(
                          `provider/discover/jobs?search=${searchTerm}`
                        )
                      );
                    }
                  }}
                  className="bg-[#FFFFFF4D] blur-[40] outline-none p-2 px-7 rounded-[8px] text-white"
                />
              </div>

              {/* <button
                onClick={() => setIsFilter(!isFilter)}
                className="bg-[#FFFFFF4D] text-white p-3 rounded-md"
              >
                <LuSettings2 />
              </button> */}
            </div>
            <div className="relative top-12 left-20">
              {isFilter && <Filter endPoint={""} setIsFilter={setIsFilter} />}
            </div>
          </div>
        </div>

        <div className="bg-[#F9FAFA] shadow-lg mb-48 rounded-[8px] p-10 mt-3">
          {/* Service Request Cards */}
          <div className="space-y-6 mb-4">
            {isLoading ? (
              // Skeleton loader (show while fetching data)
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
                >
                  <div className="p-6">
                    {/* Title + Status */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-6 w-40 bg-gray-300 rounded"></div>
                          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-200 rounded"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* Images placeholder */}
                    <div className="flex gap-3 mb-4">
                      <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>

                    {/* Price & Date */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-12">
                        <div>
                          <div className="h-4 bg-gray-200 w-24 mb-2 rounded"></div>
                          <div className="h-6 bg-gray-300 w-16 rounded"></div>
                        </div>
                        <div>
                          <div className="h-4 bg-gray-200 w-32 mb-2 rounded"></div>
                          <div className="h-6 bg-gray-300 w-20 rounded"></div>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : discoverJobs?.data?.length > 0 ? (
              discoverJobs?.data.map((request) => (
                <div
                  key={request.request_id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header with title and actions */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {request.title}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <CiLocationOn color="#00034A" />
                          {request.location}
                        </div>
                      </div>
                    </div>

                    {/* Images */}
                    {request.images && request.images.length > 0 && (
                      <div className="flex gap-3 mb-4">
                        {request.images.map((image, index) => (
                          <div
                            key={index}
                            className="w-20 h-15 bg-gray-200 rounded-lg overflow-hidden"
                          >
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
                          <p className="text-sm text-gray-500 mb-1">
                            Proposed Price
                          </p>
                          <p className="text-xl font-semibold text-gray-900">
                            {request.amount}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Preferred Date & Time
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            {request?.date} |   {request?.time}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          navigate(
                            `/discover-detail/${request.request_id}?id=${request.request_id}`
                          )
                        }
                        className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg">No service requests found.</p>
              </div>
            )}
          </div>
        <Pagination
          links={discoverJobs?.links}
          onPageChange={handlePageChange}
        />
        </div>
      </div>
      <Footer />
    </div>
  );
}
