import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import {
  awardIcon,
  HearIcon,
  LocationIcon,
  WorkIcon,
} from "../../../assets/export";
const users = [
  {
    name: "Mike Smith",
    rating: 4.9,
    location: "Florida, United States",
    experience: "5 yrs",
    success: "45+",
    bio: "We are seeking a dedicated and customer-oriented Customer Support Agent to join our team.",
    img: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Justin Cruz",
    rating: 4.4,
    location: "Florida, United States",
    experience: "2 yrs",
    success: "20+",
    bio: "We are seeking a dedicated and customer-oriented Customer Support Agent to join our team.",
    img: "https://randomuser.me/api/portraits/men/30.jpg",
  },
  {
    name: "John Doe",
    rating: 4.4,
    location: "Florida, United States",
    experience: "8 yrs",
    success: "100+",
    bio: "We are seeking a dedicated and customer-oriented Customer Support Agent to join our team.",
    img: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    name: "Justin Cruz",
    rating: 4.4,
    location: "Florida, United States",
    experience: "2 yrs",
    success: "20+",
    bio: "We are seeking a dedicated and customer-oriented Customer Support Agent to join our team.",
    img: "https://randomuser.me/api/portraits/men/30.jpg",
  },
  {
    name: "Emily Johnson",
    rating: 4.7,
    location: "Florida, United States",
    experience: "2 yrs",
    success: "20+",
    bio: "We are looking for a proactive Customer Support Specialist who can...",
    img: "https://randomuser.me/api/portraits/women/40.jpg",
  },
];

const ProfessionalCleanersSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [showLeftGradient, setShowLeftGradient] = useState(false);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params?.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const handleSlideChange = (swiper) => {
    setShowLeftGradient(swiper.activeIndex > 2);
  };

  return (
    <div className="relative  w-full  py-8">
      <div className="pointer-events-none w-[300px] absolute left-0 top-0 h-full  bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[300px] bg-gradient-to-l from-white via-white/50 to-transparent z-10" />
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-[350px]"
         onSlideChange={handleSlideChange}
        initialSlide={2} // 👈 Optional: starts at 2nd real slide
        centeredSlides={true} // 👈 Centers active slide
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.2, // 👈 Show part of the next slide
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {users.map((user, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white lg:h-[290px]  rounded-xl shadow-lg p-4 relative">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={user.img}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={user.name}
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">{user.name}</h2>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaStar className="mr-1 text-yellow-400" />
                      {user.rating}
                    </div>
                  </div>
                </div>
                <img
                  src={HearIcon}
                  alt="HearIcon"
                  className="cursor-pointer w-[20px]"
                />
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-2">
                <div className="flex items-center gap-2">
                  <img src={LocationIcon} alt="LocationIcon" className="w-3" />
                  Location: {user.location}
                </div>
                <div className="flex items-center gap-2 ">
                  <img src={WorkIcon} alt="LocationIcon" className="w-3" />
                  Experience: {user.experience}
                </div>
                <div className="flex items-center gap-2">
                  <img src={awardIcon} alt="LocationIcon" className="w-3" />
                  Job Success: {user.success}
                </div>
              </div>

              <div className="text-sm">
                <p>
                  <span className="font-bold text-[#00034A]">Biography</span>
                </p>
                <p className="text-gray-500">{user.bio.slice(0, 100)}...</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-10 gap-4">
        <button
          ref={prevRef}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-center ${
            showLeftGradient
              ? "bg-gradient text-white"
              : "bg-[#FFFFFF] text-black "
          }`}
          // disabled={!showLeftGradient}
        >
          <MdOutlineKeyboardArrowLeft size={25} />
        </button>
        <button
          ref={nextRef}
          style={{
            background:
              "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-center text-white"
        >
          <MdKeyboardArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCleanersSlider;
