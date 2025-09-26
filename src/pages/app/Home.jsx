import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Herotwo from "../../components/app/LandingPage/Dashboard/Herotwo";
import {
  FaStar,
  FaRegHeart,
  FaChevronRight,
  FaChevronLeft,
  FaHeart,
} from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { awardIcon, LocationIcon, WorkIcon } from "../../assets/export";
import BroadCastModal from "../../components/app/Profile/BroadCastModal";
import Filter from "../../components/global/Filter";
import { useNavigate } from "react-router";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallservices,
  unfavoriteProvider,
} from "../../redux/slices/users.slice";
const SkeletonCard = () => (
  <div className="p-5 rounded-xl shadow-xl bg-white animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-300 rounded w-32"></div>
      <div className="h-3 bg-gray-300 rounded w-28"></div>
      <div className="h-3 bg-gray-300 rounded w-24"></div>
    </div>

    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
  </div>
);

const itemsPerPage = 6;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [data, setData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage); // Dynamically calculate total pages based on the fetched data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfessionals = data.slice(
    startIndex,
    startIndex + itemsPerPage
  ); // Slice data for pagination
  const { allservices, allservicesloading } = useSelector(
    (s) => s.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [pending, setPending] = useState({}); // { [id]: true }

  const onToggleFavorite = async (pro) => {
    if (!pro?.id || pending[pro?.id]) return;
    setPending((p) => ({ ...p, [pro?.id]: true }));
    try {
      const result = await dispatch(unfavoriteProvider(pro?.id)).unwrap();
      const nextVal =
        typeof result?.is_favorite === "boolean"
          ? result.is_favorite
          : !pro?.is_favorite;
      setData((prev) =>
        prev.map((x) => (x.id === pro?.id ? { ...x, is_favorite: nextVal } : x))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setPending((p) => {
        const { [pro?.id]: _, ...rest } = p;
        return rest;
      });
    }
  };

  useEffect(() => {
    dispatch(fetchallservices("/users/providers")); // pass page to API
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


          <div
            className="
    flex flex-col sm:flex-row
    gap-4 sm:gap-3
    justify-between
    items-start sm:items-center
    mb-6 sm:mb-10
    w-full
  "
          >
            {/* Left: Title + count */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h1
                className="
        font-semibold
        text-2xl leading-7
        sm:text-3xl sm:leading-8
      "
              >
                Hire Top-Rated Professionals
              </h1>

              <span
                className="
        bg-gradient-to-r from-[#00034A] to-[#27A8E2]
        text-white
        px-3 py-0.5 sm:px-4 sm:py-0
        rounded-lg sm:rounded-xl
        text-xs sm:text-sm
        inline-flex items-center
      "
              >
                {data?.length ?? 0}
              </span>
            </div>

            {/* Right: Actions */}
            <div
              className="
      flex w-full sm:w-auto
      flex-col sm:flex-row
      items-stretch sm:items-center
      gap-2 sm:gap-3
    "
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="
        bg-gradient-to-r from-[#00034A] to-[#27A8E2]
        text-white
        px-4 py-2
        rounded-md
        w-full sm:w-auto
        text-sm sm:text-base
      "
              >
                Broadcast a Request
              </button>

              <button
                onClick={() => setIsFilter(!isFilter)}
                className="
        bg-gradient-to-r from-[#00034A] to-[#27A8E2]
        text-white
        p-2 sm:p-3
        rounded-md
        w-full sm:w-auto
        inline-flex items-center justify-center
      "
                aria-label="Open filters"
                title="Filters"
              >
                <LuSettings2 className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {isFilter && <Filter endPoint={"providers/filter"} setIsFilter={setIsFilter} />}
          {/* Show loading spinner when data is being fetched */}
          {allservicesloading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              {currentProfessionals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentProfessionals.map((pro, idx) => {
                    const isFav = !!pro?.is_favorite;
                    const isPend = !!pending[pro?.id];

                    return (
                      <div
                        key={pro?.id ?? idx}
                        className="p-5 rounded-xl shadow-xl bg-white hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                pro?.avatar
                                  ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${pro?.avatar}`
                                  : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
                              }
                              alt={pro?.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h2
                                className="font-semibold text-md text-gray-800 cursor-pointer"
                                onClick={() =>
                                  navigate("/service-provider", {
                                    state: { id: pro?.id },
                                  })
                                }
                              >
                                {pro?.name}
                              </h2>
                              <div className="flex items-center text-sm text-yellow-500">
                                <FaStar className="mr-1" />
                                {pro?.rating}
                              </div>
                            </div>
                          </div>

                          {/* ❤️ FAVORITE TOGGLE BUTTON */}
                          <button
                            type="button"
                            onClick={() => onToggleFavorite(pro)}
                            disabled={isPend}
                            aria-label={isFav ? "Unfavorite" : "Favorite"}
                            className={`transition ${isPend
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:scale-110"
                              }`}
                            title={
                              isPend
                                ? "Updating…"
                                : isFav
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                            }
                          >
                            {isPend ? (
                              <svg
                                className="h-5 w-5 animate-spin"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"
                                ></path>
                              </svg>
                            ) : isFav ? (
                              <FaHeart className="text-red-500" />
                            ) : (
                              <FaRegHeart className="text-gray-500" />
                            )}
                          </button>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1 mb-4">
                          <div className="text-sm text-gray-600 space-y-1 mb-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={LocationIcon}
                                alt="LocationIcon"
                                className="w-3"
                              />
                              Location: {pro?.city}, {pro?.state},{" "}
                              {pro?.country}
                            </div>
                            <div className="flex items-center gap-2 ">
                              <img
                                src={WorkIcon}
                                alt="WorkIcon"
                                className="w-3"
                              />
                              Experience: {pro?.experience} yrs
                            </div>
                            <div className="flex items-center gap-2">
                              <img
                                src={awardIcon}
                                alt="AwardIcon"
                                className="w-3"
                              />
                              Job Success: {pro?.complete_jobs} jobs
                            </div>
                          </div>
                        </div>

                        <hr className="mb-2" />

                        <h3 className="font-semibold text-[#00034A] mb-1">
                          Biography
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {pro?.biography}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center py-20">
                  <p className="text-gray-500 text-lg font-semibold">
                    No Data Found
                  </p>
                </div>
              )}

              {/* Pagination bhi tabhi dikhana jab data ho */}
              {currentProfessionals.length > 0 && (
                <div className="flex justify-center mt-8 gap-2">
                  <div className=" flex gap-3 bg-white shadow-2xl rounded-xl">
                    {/* <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white text-[16px] text-[#B7B7B7] font-[500] rounded-md disabled:opacity-50 flex items-center gap-2"
                    >
                      <FaChevronLeft size={20} />
                      Previous
                    </button> */}

                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
                        className={`px-4 py-2 ${currentPage === i + 1
                            ? "bg-[#00034A]/10 text-[#00034A] border-2 border-[#27A8E2]"
                            : "bg-white"
                          }`}
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
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(p + 1, allservices?.last_page || 1)
                        )
                      }
                      disabled={currentPage === allservices?.last_page}
                      className="px-4 py-2 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white flex items-center gap-2 rounded-md disabled:opacity-50"
                    >
                      Next
                      <FaChevronRight color="#00034A" size={10} />
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
