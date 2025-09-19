import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../../components/layout/Navbar";
import { FaArrowLeft, FaCheck, FaStar } from "react-icons/fa";
import {
  badgesImage,
  EditWhiteIcon,
  HeroBg,
  imageone,
  stripe,
  usertwo,
} from "../../../assets/export";
import Calendar from "react-calendar";
import { IoLocationOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { SlTarget } from "react-icons/sl";
import { GoTrash } from "react-icons/go";
import { LuPenLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import ProviderEditProfile from "../../../components/Serviceprovider/profile/ProviderEditProfile";
import ProviderEditServices from "../../../components/Serviceprovider/profile/EditServicesDetail";
import ProviderEditCertificate from "../../../components/Serviceprovider/profile/EditCertificateDetail";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../hooks/utils/Utils";
import { getProviderProfile } from "../../../redux/slices/auth.slice";

const ServiceproviderProfile = () => {
  const { user_data } = useSelector((state) => state.auth);
  const { badges } = useSelector((state) => state.provider);
  const [servicetype, setServicetype] = useState(false);
  const [requestservice, setRequestservice] = useState(false);
  const [requestservicetwo, setRequestservicetwo] = useState(false);
  const [requestservicethree, setRequestservicethree] = useState(false);
  const [requestservicefour, setRequestservicefour] = useState(false);
  const [requestservicefive, setRequestservicefive] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [bookingconfirm, setBookingconfirm] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [bookrequestsend, setBookrequestsend] = useState(false);
  const navigate = useNavigate("");
  const location = useLocation();
  const fromViewProfile = location.state?.fromViewProfile || false;
  const [showrating, setShowrating] = useState(false);
  const [custombooking, setCustombooking] = useState(false);
  const [isModalType, setIsModalType] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    file: null,
  });
  const [custombookingtwo, setCustombookingtwo] = useState(false);
  const [custombookingthree, setCustombookingthree] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const togglePopup = () => {
    setServicetype(!servicetype);
  };

  const [locations, setLocations] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const [services, setServices] = useState({
    bathroom: 2,
    bedroom: 4,
    kitchen: 1,
    fullHome: 0,
  });

  const handleIncrement = (service) => {
    setServices((prev) => ({ ...prev, [service]: prev[service] + 1 }));
  };

  const handleDecrement = (service) => {
    setServices((prev) => ({ ...prev, [service]: prev[service] - 1 }));
  };

  const reviews = new Array(5).fill({
    name: "Mike Smith",
    rating: 4.5,
    text: "The standard Lorem Ipsum passage, used since the Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  const [user, setUser] = useState({
    name: "John Doe",
    rating: 4.9,
    date: "26 Dec, 2024",
    time: "08:00pm",
    locations: "936 Kiehn Route West Ned Tennessee",
    description:
      "The standard Lorem Ipsum passage, m ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod The standard Lorem Ipsum passage, used since the, sed do eiusmod The standard Lorem Ipsum passage.",
    services: {
      bathroom: "02",
      bedroom: "04",
      kitchen: "01",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProviderProfile())
  }, [dispatch])

  const [editMode, setEditMode] = useState(false);

  const handleEdit = (field) => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };
  const handleNext = () => {
    setRequestservicefive(true);
    setRequestservicefour(false);
  };

  return (
    <>
      <Navbar type={"serviceprovider"} />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      >
        <div className="flex items-center gap-3 ml-[11em]">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={20} />
          </button>
          <h2 className="text-white text-[30px] mt-0 font-bold leading-[48px] capitalize">
            Service Provider
          </h2>
        </div>
      </div>
      <div className="px-10 lg:px-40">
        <div className=" mx-auto px-6 py-10 bg-white shadow-md rounded-xl -mt-[16em]">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-[18em]">
              <img
                src={
                  user_data?.avatar
                    ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${user_data?.avatar}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3AH9WTlcacKErfpKhk-lJ7serN0eQje6Qg&s"
                }
                alt="John Doe"
                className="w-60 h-100 rounded-xl object-cover"
              />
              {/* Certificates */}
              <div className="mt-4 border-t-2 pt-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Certificates</h3>
                  <div className="w-[50px]">
                    <button
                      onClick={() => {
                        setIsModalType("editCertificate");
                        setEditProfile(true);
                      }}
                      className="bg-gradient-to-r mt-1 from-[#00034A] to-[#27A8E2] p-3 rounded-[8px]"
                    >
                      {" "}
                      <img
                        src={EditWhiteIcon}
                        className="w-[15px]"
                        alt="editIcon"
                      />{" "}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {user_data?.certificates &&
                    user_data.certificates.length > 0 ? (
                    user_data.certificates.slice(0, 2).map((item, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="font-medium text-gradient">
                          {item?.name}
                        </h4>
                        <p className="text-sm text-[#919191]">
                          {item?.institution}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item?.description}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {formatDate(item?.date_of_completion)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm col-span-1">
                      No certificates found
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{user_data?.name}</h2>
                  <p className="text-gray-500">
                    {user_data?.experience}+ Years Experience
                  </p>
                  <div className="flex items-center text-yellow-500 mt-1">
                    {[...Array(7)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="ml-2 text-gray-700 font-medium">4.5</span>
                  </div>
                </div>
                <div className="space-y-4 text-right">
                  {!fromViewProfile && (
                    <button
                      onClick={() => {
                        setIsModalType("editprofile");
                        setEditProfile(true);
                      }}
                      className="bg-gradient-to-r mt-1 from-[#00034A] to-[#27A8E2] text-white px-8 py-2 rounded-[12px] ml-auto"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Earned Badges */}
              <div className="mt-4 text-sm text-gray-700 border-t-2 pt-3">
                <h3 className="font-semibold mb-1 text-black">Earned Badges</h3>
                <div className="mt-2 grid grid-cols-10 gap-4">
                  {badges?.alloted_badges?.map((item, i) => (
                    <img
                      key={i}
                      src={import.meta.env.VITE_APP_AWS_URL + item?.url}
                      alt="badgesImage"
                    />
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4 text-sm text-gray-700 border-t-2 pt-3">
                <h3 className="font-semibold mb-1 text-black">Biography</h3>
                <p className="pt-1 text-sm">
                  {user_data?.biography || "No Bio"}
                </p>
                <div className="mt-4 grid grid-cols-5 gap-5 text-sm text-[#787878] border-t-2 pt-3">
                  <div>
                    <span className="font-semibold">Location</span>
                    <br />
                    <span className="text-[#181818] font-[500]">
                      {" "}
                      {user_data?.state}, {user_data?.country}{" "}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Working Radius</span>
                    <br />
                    <span className="text-[#181818] font-[500]">
                      {" "}
                      {user_data?.working_radius} miles
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Completed Job</span>
                    <br />
                    <span className="text-[#181818] font-[500]">
                      {" "}
                      {user_data?.complete_jobs}+ Job Success
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Working Hours</span>
                    <br />
                    <span className="text-[#181818] font-[500]">
                      {" "}
                      09:00 AM - 05:00 PM{" "}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Working Days</span>
                    <br />
                    <span className="text-[#181818] font-[500]">
                      {" "}
                      Monday - Friday
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6 border-t-2 pt-3">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-lg ">
                    Service Details and Pricing
                  </h3>
                  <div className="w-[50px]">
                    <button
                      onClick={() => {
                        setIsModalType("editservice");
                        setEditProfile(true);
                      }}
                      className="bg-gradient-to-r mt-1 from-[#00034A] to-[#27A8E2] p-3 rounded-[8px]"
                    >
                      {" "}
                      <img
                        src={EditWhiteIcon}
                        className="w-[15px]"
                        alt="editIcon"
                      />{" "}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {user_data?.services && user_data.services.length > 0 ? (
                    user_data.services.slice(0, 4).map((service, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-3 rounded-md border flex flex-col justify-between h-[250px]"
                      >
                        {/* Added flex and height */}
                        <div>
                          <h4 className="font-semibold text-[12px] mb-2">
                            {service?.title}
                          </h4>
                          <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1">
                            {service?.description}
                          </ul>
                        </div>
                        <div className="text-[#27A8E2] font-bold text-lg mt-auto">
                          {service.amount}
                        </div>
                        {/* Fixed price at the bottom */}
                      </div>
                    ))
                  ) : (
                    <p className="col-span-4 text-center text-gray-500 text-sm">
                      No services found
                    </p>
                  )}
                </div>
              </div>
              {/* Reviews */}
              <div className="mt-4 border-t-2 pt-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg mb-2">
                    Rating & Reviews
                  </h3>
                  {user_data?.reviews?.length > 1 && (
                    <span
                      className="text-blue-600 underline text-[13px] cursor-pointer"
                      onClick={() => setShowrating(true)}
                    >
                      View More
                    </span>
                  )}
                </div>
                {user_data?.reviews?.length > 0 ? (
                  user_data.reviews.slice(0, 1).map((review, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 p-4 mt-4 rounded-md border"
                    >
                      <div className="mb-4">
                        <p className="font-medium">
                          {review.name || "Anonymous"}
                        </p>
                        <div className="flex items-center text-yellow-500 mb-1">
                          {[
                            ...Array(Math.round(Number(review.rating || 0))),
                          ].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                          <span className="ml-2 text-gray-700 font-medium">
                            {review.rating || "0"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {review.text || "No review content provided."}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {servicetype && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-[40em] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Choose Your Service Type
              </h2>
              <button onClick={togglePopup} className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setRequestservice(true);
                  setServicetype(false);
                }}
              >
                <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2] mb-2">
                  Request Service
                </h3>

                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Select from the provider’s listed services</li>
                  <li>Choose date & time</li>
                  <li>View pricing upfront</li>
                  <li>Confirm and proceed to booking</li>
                </ul>
              </div>
              <div
                className="bg-gray-100 p-4 rounded-lg cursor-pointer"
                onClick={() => {
                  setServicetype(false);
                  setCustombooking(true);
                }}
              >
                <h3 className="font-semibold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2] mb-2">
                  Request Custom Service
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Describe specific service needs</li>
                  <li>Set budget and preferred timing</li>
                  <li>Wait for provider approval & price adjustment</li>
                  <li>Confirm after agreement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {requestservice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[35em] h-[46em] overflow-auto shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Request Service
              </h2>
              <button
                onClick={() => setRequestservice(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Date Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Date</h3>
              <div className="rounded-xl p-4 border-2">
                <h4 className="text-base font-medium mb-1">Select Date</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Choose the perfect date for the task deadline
                </p>
                {/* You can use a calendar component like react-calendar here */}
                <div className="bg-white text-center py-0 rounded-lg text-black  flex justify-center">
                  <Calendar
                    selectRange={true}
                    onChange={setDateRange}
                    value={dateRange}
                    tileDisabled={({ date }) => date < startOfToday}
                    tileClassName={({ date: d, view }) => {
                      if (view === "month") {
                        const [start, end] = dateRange;
                        const today = new Date();
                        const isPast = d < new Date().setHours(0, 0, 0, 0);
                        const isInRange =
                          start && end && d >= start && d <= end;
                        const isSelected =
                          d.toDateString() === start?.toDateString() ||
                          d.toDateString() === end?.toDateString();

                        if (isSelected)
                          return "bg-[#00034A] text-white rounded-lg";
                        if (isInRange)
                          return "bg-[#dbeafe] text-black rounded-lg";
                        if (isPast) return "text-gray-400";
                      }
                      return "hover:bg-blue-100 rounded-lg";
                    }}
                    className="w-full !border-0 text-1xl [&_.react-calendar__tile]:py-2 [&_.react-calendar__tile]:rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Time</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  "09:00AM",
                  "10:00AM",
                  "11:00AM",
                  "12:00PM",
                  "01:00PM",
                  "02:00PM",
                  "03:00PM",
                  "04:00PM",
                ].map((time, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded-lg border text-sm ${idx === 0
                      ? "bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white"
                      : idx % 2 === 0
                        ? "bg-pink-100 text-gray-800"
                        : "bg-white"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Button */}
            <button
              onClick={() => {
                setRequestservicetwo(true);
                setRequestservice(false);
              }}
              className="w-full mt-4 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
            >
              Next
            </button>

            {/* Progress Bar */}
            <div className="mt-6 flex justify-center space-x-2">
              <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
              <div className="h-1 w-12 bg-gray-200 rounded-full" />
              <div className="h-1 w-12 bg-gray-200 rounded-full" />
              <div className="h-1 w-12 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {requestservicetwo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[35em] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Request Service
              </h2>
              <button
                onClick={() => setRequestservicetwo(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Job Location</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    placeholder="Abc, suite CN"
                    className="w-full border rounded-lg px-4 py-2 pr-10"
                  />
                  <span className="absolute right-3 top-2.5 text-blue-500">
                    <IoLocationOutline size={20} />
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-semibold text-gray-700">
                  Upload Images{" "}
                  <span className="text-sm text-gray-400">(Optional)</span>
                </label>
                <div className="border-dashed border-2 border-gray-300 p-20 rounded-lg text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-gray-500"
                  >
                    Upload "document name"
                    <br />
                    <span className="text-xs text-gray-400">
                      Upto 20mbps JPG, PNG
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-semibold">Job Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your Job"
                  className="w-full border rounded-lg px-4 py-2 h-28"
                />
              </div>

              <button
                onClick={() => {
                  setRequestservicethree(true);
                  setRequestservicetwo(false);
                }}
                className="w-full mt-4 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
              >
                Next
              </button>

              <div
                onClick={() => {
                  setRequestservice(true);
                  setRequestservicetwo(false);
                }}
                className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer"
              >
                Back
              </div>

              {/* Progress Bar */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gray-200 rounded-full" />
                <div className="h-1 w-12 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {requestservicethree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[35em] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Request Service
              </h2>
              <button
                onClick={() => setRequestservicethree(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Service Selection */}
            <div className="space-y-8">
              <h3 className="font-semibold text-gray-700">
                Select Services You Want
              </h3>
              <div className="space-y-4">
                {["bathroom", "bedroom", "kitchen", "fullHome"].map(
                  (service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-800 capitalize">
                        {service.replace(/([A-Z])/g, " $1")}
                      </span>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleDecrement(service)}
                          className="text-xl text-gray-500 p-1 rounded-[6px] bg-gray-300 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span>{services[service]}</span>
                        <button
                          onClick={() => handleIncrement(service)}
                          className="text-xl text-gray-500 p-1 bg-gray-300 rounded-[6px] hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              <button
                onClick={() => {
                  setRequestservicefour(true);
                  setRequestservicethree(false);
                }}
                className="w-full mt-6 bg-gradient-to-r  from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
              >
                Next
              </button>

              <div
                onClick={() => {
                  setRequestservicethree(false);
                  setRequestservicetwo(true);
                }}
                className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer"
              >
                Back
              </div>

              {/* Progress Bar */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {requestservicefour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[35em] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Request Service
              </h2>
              <button
                onClick={() => setRequestservicefour(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Review Section */}
            <div className="space-y-4">
              <h3>Review Details</h3>
              <div className="flex items-center space-x-3">
                <img
                  src="https://www.w3schools.com/w3images/avatar2.png"
                  alt="User Avatar"
                  className="h-[3em] w-auto rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{user.rating}</span>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="">
                <div className="flex justify-between gap-4 items-center border-t-[2px] pt-3 border-slate-200">
                  <div className="flex gap-6">
                    <div>
                      <span className="font-medium text-gray-800">Date</span>

                      {editMode ? (
                        <input
                          type="date"
                          value={user.date}
                          onChange={(e) =>
                            setUser({ ...user, date: e.target.value })
                          }
                          className="text-gray-600"
                        />
                      ) : (
                        <div className="text-gray-600 flex items-center">
                          {user.date}
                        </div>
                      )}
                    </div>

                    <div>
                      <div>
                        <span className="font-medium text-gray-800">Time</span>
                      </div>
                      {user.time}
                    </div>
                  </div>

                  <RiEditLine
                    size={24}
                    onClick={() => handleEdit("date")}
                    className="text-[#00034A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                  <div>
                    <span className="font-medium text-gray-800">Location</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={user.locations}
                        onChange={(e) =>
                          setUser({ ...user, locations: e.target.value })
                        }
                        className="text-gray-600"
                      />
                    ) : (
                      <div className="text-gray-600 flex items-center">
                        {user.locations}
                      </div>
                    )}
                  </div>
                  <RiEditLine
                    size={24}
                    onClick={() => handleEdit("location")}
                    className="text-[#00034A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex justify-between border-t-[2px] pt-3 border-slate-200">
                <div>
                  <div className="font-medium text-gray-800">Description</div>
                  {editMode ? (
                    <textarea
                      value={user.description}
                      onChange={(e) =>
                        setUser({ ...user, description: e.target.value })
                      }
                      className="text-gray-600 mt-2"
                    />
                  ) : (
                    <p className="text-gray-600 mt-2 truncate max-w-xs">
                      {user.description}
                    </p>
                  )}
                </div>
                <RiEditLine
                  size={24}
                  onClick={() => handleEdit("description")}
                  className="text-[#00034A] cursor-pointer"
                />
              </div>

              {/* Cleaning Services */}
              <div className=" flex justify-between border-t-[2px] pt-3 border-slate-200">
                <div className="">
                  <div className="font-medium text-gray-800">
                    Cleaning Services
                  </div>
                  <div className="flex justify-between space-x-10 mt-2 text-sm">
                    <div className="text-sm border-r-2 pr-3">
                      Bathroom Cleaning <br></br>
                      {user.services.bathroom}
                    </div>
                    <div className="border-r-2 pr-3">
                      Bedroom Cleaning <br></br>
                      {user.services.bedroom}
                    </div>
                    <div>
                      Kitchen Cleaning <br></br>
                      {user.services.kitchen}
                    </div>
                  </div>
                </div>

                <RiEditLine
                  size={24}
                  onClick={() => handleEdit("services")}
                  className="text-[#00034A] cursor-pointer"
                />
              </div>

              <div className="pt-10 pb-3">
                <button
                  className="w-full bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
                  onClick={() => {
                    handleSave(); // Ensure this is triggered
                    handleNext(); // Ensure this is triggered
                  }}
                >
                  {editMode ? "Save" : "Next"}
                </button>
                <div
                  className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => {
                    setRequestservicefour(false);
                    setRequestservicethree(true);
                  }}
                >
                  Back
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {requestservicefive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[35em] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Request Service
              </h2>
              <button
                onClick={() => setRequestservicefive(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Payment Method</h3>
              <p className="text-slate-400">
                The amount will be held in escrow via Stripe. Once the job is
                successfully completed, the payment will be released to the
                service provider.
              </p>

              {/* Payment Method Info */}
              <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                <div className="w-full">
                  <span className="font-medium text-gray-800">
                    Attached Stripe
                  </span>
                  <div className="text-gray-600 bg-[#F3F3F3] rounded-[10px] p-3 w-full mt-2 flex items-center justify-between">
                    <div className="flex gap-4">
                      <span>**** **** **** **72</span>
                      <img src={stripe} className="w-auto h-6" alt="" />
                    </div>

                    <MdDelete color="red" />
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                <div className="w-full bg-[#F3F3F3] p-3 rounded-[10px]">
                  <div className="w-full border-b-[1px] pb-[3px]">
                    <span className="font-medium text-gray-800 ">
                      Payment Summary
                    </span>
                  </div>
                  <div className="text-gray-600 mt-2">
                    <div className="flex justify-between">
                      <p>Subtotal: </p>
                      <p>$790</p>
                    </div>
                    <div className="flex justify-between pt-3">
                      <p className="text-black font-[500]">Total: </p>
                      <p className="text-black font-[500]">$790</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 pb-3">
                <button
                  className="w-full bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
                  onClick={() => {
                    setBookrequestsend(true);
                    setRequestservicefive(false);
                    setInterval(() => {
                      setBookingconfirm(true);
                      setBookrequestsend(false);
                      setInterval(() => {
                        navigate("/booking-details"); // Navigate after interval
                      }, 2000);
                    }, 3000);
                  }}
                >
                  Book Now
                </button>

                <div
                  className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => {
                    setRequestservicefive(false);
                    setRequestservicefour(true);
                  }}
                >
                  Back
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 flex justify-center space-x-2">
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
                <div className="h-1 w-12 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {bookrequestsend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-10 md:w-[26em] shadow-2xl text-center">
            {/* Checkmark Icon */}
            <div className="mb-4 flex justify-center items-center">
              <div className="bg-gradient-to-r from-[#27A8E2] to-[#00034A] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                <FaCheck color="white" size={30} />
              </div>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Booking Request Sent!
            </h2>
            {/* Message */}
            <p className="text-gray-600 text-sm mb-4">
              Your booking request has been sent to [Provider Name]. You will be
              notified once they confirm.
            </p>
          </div>
        </div>
      )}

      {bookingconfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 md:w-[30em] shadow-2xl text-center">
            {/* Checkmark Icon */}
            <div className="mb-4 flex justify-center items-center">
              <div className="bg-gradient-to-r from-[#27A8E2] to-[#00034A] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                <FaCheck color="white" size={30} />
              </div>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Booking Confirmed!
            </h2>
            {/* Message */}
            <p className="text-gray-600 text-sm mb-4">
              Great news! [Service Provider Name] has accepted your booking
              request. The payment has now been securely held in escrow. Once
              the job is completed, the funds will be released to the service
              provider.
            </p>
          </div>
        </div>
      )}

      {showrating && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-[40rem] max-h-[60em] rounded-lg overflow-hidden shadow-lg relative">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Rating & Reviews</h2>
              <button
                onClick={() => setShowrating(false)}
                className="text-gray-600 hover:text-black"
              >
                <RxCross2 />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-4 py-2 space-y-6 h-[60vh]">
              {user_data?.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-semibold">{review.user_name}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-yellow-400 ${i < Math.floor(review.rating) ? "" : "opacity-50"
                          }`}
                      />
                    ))}
                    <span className="ml-1 font-medium text-sm">
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {custombooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-[36em] rounded-lg shadow-lg p-0 pt-6 pb-6 relative max-h-[43rem] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b-[1px] pb-3 pl-6 pr-6">
              <h2 className="text-[24px] font-semibold">
                Request Custom Service
              </h2>
              <button onClick={() => setCustombooking(false)}>
                <RxCross2 size={26} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4 pl-6 pr-6">
              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">
                  Service Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Briefly explain the service required"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="block mb-1 font-medium">
                  Upload Images{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>

                <label
                  htmlFor="file-upload"
                  className="cursor-pointer border border-dashed rounded p-6 text-center w-full block hover:bg-gray-50 transition"
                >
                  <div className="text-gray-700 font-medium">
                    Upload “document name”
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Upto 20mbps JPG, PNG
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Date & Time */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Date</label>
                  <div className="flex items-center border rounded px-2">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full py-2 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Time</label>
                  <div className="flex items-center border rounded px-2">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full py-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none"
                />
                <div className="flex items-center mt-2 text-black cursor-pointer">
                  <SlTarget className="mr-1" />
                  <span className="text-sm">Use my current Location</span>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block mb-1 font-medium">Proposed Price</label>
                <div className="flex items-center border rounded px-2">
                  <span className="text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter amount"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full py-2 ml-1 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-1 font-medium">Payment Method</label>
                <div className="flex justify-between items-center border rounded p-2">
                  <div className="flex gap-3">
                    <span className="text-gray-700">**** **** **** **72</span>
                    <img src={stripe} className="h-6" alt="" />
                  </div>

                  <button className="text-red-500 hover:text-red-700 text-lg">
                    <GoTrash />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setCustombooking(false);
                    setCustombookingtwo(true);
                  }}
                  className="w-[30em] flex justify-center mt-2 bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-2 rounded-[10px] font-semibold hover:opacity-90"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {custombookingtwo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-[36em] rounded-lg shadow-lg pt-6 pb-6 relative max-h-[43rem] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b-[1px] pb-3 px-6">
              <h2 className="text-[24px] font-semibold">
                Request Custom Service
              </h2>
              <button onClick={() => setCustombookingtwo(false)}>
                <RxCross2 size={26} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 px-6 text-sm text-gray-800">
              {/* Review Details */}
              <div className="space-y-1">
                <h3 className="font-bold text-[16px]">Review Details</h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[15px]">
                      Deep Cleaning for a 2-Bedroom Apartment
                    </h4>
                    <p className="text-gray-600">
                      The standard Lorem Ipsum passage, m ipsum dolor sit amet,
                      cetcetur adipiscing elit, sed do eiusmodThe standard Lorem
                      Ipsum passage, used since the, sed do eiusmodThe standard
                      Lorem Ipsum passage.
                    </p>
                  </div>
                  <button className="text-[#27A8E2] text-sm ml-2 mt-1">
                    <LuPenLine className="text-[#3338ca]" size={20} />
                  </button>
                </div>
              </div>

              <hr />

              {/* Location */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">
                    Location
                  </h4>
                  <p className="font-semibold mt-1">
                    936 Kiehn Route West Ned Tennessee
                  </p>
                </div>
                <button className="text-[#27A8E2] text-sm ml-2 mt-1">
                  <LuPenLine className="text-[#3338ca]" size={20} />
                </button>
              </div>

              <hr />

              {/* Uploaded photos */}
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-500">
                    Uploaded photos
                  </h4>
                  <button className="text-[#27A8E2] text-sm ml-2">
                    <LuPenLine className="text-[#3338ca]" size={20} />
                  </button>
                </div>
                <div className="flex gap-3">
                  {[1, 2, 3].map((_, i) => (
                    <img
                      key={i}
                      src={imageone}
                      className="h-20 w-28 rounded object-cover"
                      alt="uploaded"
                    />
                  ))}
                </div>
              </div>

              <hr />

              {/* Price & Time */}
              <div className="flex justify-between gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-600">
                    Proposed Price
                  </h4>
                  <p className="font-semibold mt-1">$300</p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-600">
                        Preferred Date & Time
                      </h4>
                      <p className="font-semibold mt-1">Saturday, 10 AM</p>
                    </div>
                    <button className="text-[#27A8E2] text-sm ml-2 mt-1">
                      <LuPenLine className="text-[#3338ca]" size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-12 h-12 rounded-full"
                  alt="user"
                />
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="flex items-center text-yellow-500">
                    <FaStar className="mr-1" /> 4.9
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setCustombookingthree(true);
                    setCustombookingtwo(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-2 rounded-[10px] font-semibold hover:opacity-90"
                >
                  Next
                </button>
                <button
                  className="text-gray-600 underline"
                  onClick={() => {
                    setCustombooking(true);
                    setCustombookingtwo(false);
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {custombookingthree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-0 md:w-[35em] shadow-2xl pt-4 pb-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b-[1px] pb-3 px-6">
              <h2 className="text-[24px] font-semibold">
                Request Custom Service
              </h2>
              <button onClick={() => setCustombookingthree(false)}>
                <RxCross2 size={26} />
              </button>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4 pl-6 pr-6">
              <h3 className="text-sm font-semibold">Payment Method</h3>
              <p className="text-slate-400">
                The amount will be held in escrow via Stripe. Once the job is
                successfully completed, the payment will be released to the
                service provider.
              </p>

              {/* Payment Method Info */}
              <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                <div className="w-full">
                  <span className="font-medium text-gray-800">
                    Attached Stripe
                  </span>
                  <div className="text-gray-600 bg-[#F3F3F3] rounded-[10px] p-3 w-full mt-2 flex items-center justify-between">
                    <div className="flex gap-4">
                      <span>**** **** **** **72</span>
                      <img src={stripe} className="w-auto h-6" alt="" />
                    </div>

                    <MdDelete color="red" />
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                <div className="w-full bg-[#F3F3F3] p-3 rounded-[10px]">
                  <div className="w-full border-b-[1px] pb-[3px]">
                    <span className="font-medium text-gray-800 ">
                      Payment Summary
                    </span>
                  </div>
                  <div className="text-gray-600 mt-2">
                    <div className="flex justify-between">
                      <p>Subtotal: </p>
                      <p>$790</p>
                    </div>
                    <div className="flex justify-between pt-3">
                      <p className="text-black font-[500]">Total: </p>
                      <p className="text-black font-[500]">$790</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 pb-3">
                <button
                  className="w-full bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
                  onClick={() => {
                    setBookrequestsend(true);
                    setCustombookingthree(false);
                    setInterval(() => {
                      setBookrequestsend(false);
                      setBookingconfirm(true);
                      setInterval(() => {
                        navigate("/custom-booking-details");
                      }, 2000);
                    }, 3000);
                  }}
                >
                  Send request to service provider
                </button>

                <div
                  className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => {
                    setCustombookingthree(false);
                    setCustombookingtwo(true);
                  }}
                >
                  Back
                </div>
              </div>

              {/* Progress Bar */}
            </div>
          </div>
        </div>
      )}

      {isModalType == "editprofile" && (
        <ProviderEditProfile isOpen={editProfile} setIsOpen={setEditProfile} />
      )}
      {isModalType == "editservice" && (
        <ProviderEditServices isOpen={editProfile} setIsOpen={setEditProfile} />
      )}
      {isModalType == "editCertificate" && (
        <ProviderEditCertificate
          isOpen={editProfile}
          setIsOpen={setEditProfile}
        />
      )}
    </>
  );
};

export default ServiceproviderProfile;
