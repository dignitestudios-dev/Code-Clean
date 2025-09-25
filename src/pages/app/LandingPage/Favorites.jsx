import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaHeart,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { HeroBg } from "../../../assets/export";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getuserfavorites, unfavoriteProvider } from "../../../redux/slices/users.slice";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // pull from redux
  const { favoritesData, favoritesLoading } = useSelector((state) => state.user);

  // local state (start with empty array to avoid map crash)
  const [data, setData] = useState([]);
  const [pending, setPending] = useState({}); // { [id]: true }


  useEffect(() => {
    // fetch favorites on mount
    dispatch(getuserfavorites());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(favoritesData)) {
      setData(favoritesData);
    } else {
      setData([]); // keep it an array
    }
  }, [favoritesData]);

  // helpers
  const buildLocation = (pro) => {
    const parts = [pro?.city, pro?.state, pro?.country].filter(Boolean);
    return parts.join(", ") || "—";
  };

  const formatExperience = (years) => {
    const y = Number(years) || 0;
    return `${y} ${y === 1 ? "yr" : "yrs"}`;
  };


  const onUnfavorite = async (pro) => {
    if (!pro?.id || pending[pro.id]) return;

    // lock this card
    setPending((p) => ({ ...p, [pro.id]: true }));

    try {
      await dispatch(unfavoriteProvider(pro.id)).unwrap();

      // ✅ remove ONLY after API success
      setData((prev) => prev.filter((x) => x.id !== pro.id));

      // optional: agar aap slice me SuccessToast nahi dikha rahe to yahan SuccessToast("Removed from favorites")
    } catch (err) {
      console.error("Unfavorite failed:", err);
      // optional: ErrorToast("Could not remove from favorites. Please try again.");
    } finally {
      // unlock cleanly
      setPending((p) => {
        const { [pro.id]: _ignore, ...rest } = p;
        return rest;
      });
    }
  };



  const getCompleted = (pro) =>
    typeof pro?.completed_jobs === "number"
      ? pro.completed_jobs
      : typeof pro?.complete_jobs === "number"
        ? pro.complete_jobs
        : 0;


  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39,168,226,1) -20.45%, rgba(0,3,74,0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex items-center gap-3 px-40">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[30px] mt-0 font-bold leading-[48px] capitalize">
            Favorites
          </h2>
        </div>
      </div>
  <div className="px-40" >

      <div className="bg-[#F9FAFA] p-6 rounded-2xl mx-auto  -mt-[16em] mb-[4em]">
        {/* favoritesLoading state */}
        {favoritesLoading && (

          <div className="flex justify-center items-center pt-10 pb-10">
            <img src="/spinner.gif" height={100} width={100} alt="Loading..." />
          </div>
        )}

        {/* empty state */}
        {!favoritesLoading && data.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-[#00034A]">
              No favorites yet
            </h3>
            <p className="text-gray-600 mt-1">
              When you favorite a professional, they’ll show up here.
            </p>
          </div>
        )}

        {/* cards */}
        {!favoritesLoading && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((pro, idx) => {
              const name = pro?.name || "Unnamed";
              const ratingNum = Number(pro?.rating);
              const rating =
                !isNaN(ratingNum) && isFinite(ratingNum)
                  ? ratingNum.toFixed(1)
                  : "0.0";
              const location = buildLocation(pro);
              const experience = formatExperience(pro?.experience);
              const completed = getCompleted(pro);
              const bio =
                pro?.biography ||
                "No biography provided by this professional yet.";
              const isPending = !!pending[pro?.id];
              return (
                <div
                  key={pro?.id ?? idx}
                  className="p-5 rounded-xl shadow-xl bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pro?.avatar ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${pro.avatar}` : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"}
                        alt={pro.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="font-semibold text-md text-gray-800">
                          {name}
                        </h2>
                        <div className="flex items-center text-sm text-yellow-500">
                          <FaStar className="mr-1" />
                          {rating}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onUnfavorite(pro)}
                      disabled={isPending}
                      aria-label="Remove from favorites"
                      className={`transition ${isPending ? "opacity-70 cursor-not-allowed" : "hover:scale-110"}`}
                      title={isPending ? "Removing…" : "Remove from favorites"}
                    >
                      {isPending ? (
                        // lightweight inline spinner (no external asset)
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"></path>
                        </svg>
                      ) : (
                        <FaHeart className="text-lg text-red-600" />
                      )}
                    </button>

                  </div>

                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#4147f2]" />
                        <span className="font-medium text-gray-700">
                          Location
                        </span>
                      </div>
                      <span className="text-right">{location}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-[#4147f2]" />
                        <span className="font-medium text-gray-700">
                          Experience
                        </span>
                      </div>
                      <span>{experience}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-[#4147f2]" />
                        <span className="font-medium text-gray-700">
                          Job Success
                        </span>
                      </div>
                      <span>{`${completed}+`}</span>
                    </div>
                  </div>

                  <hr className="mb-2" />
                  <h3 className="font-semibold text-[#00034A] mb-1">
                    Biography
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-3">{bio}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
  </div>

      <Footer />
    </div>
  );
};

export default Favorites;
