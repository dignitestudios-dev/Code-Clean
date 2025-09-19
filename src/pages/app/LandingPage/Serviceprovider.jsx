import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCheck, FaStar } from "react-icons/fa";
import Navbar from "../../../components/layout/Navbar";
import { HeroBg, stripe } from "../../../assets/export";

import { GoTrash } from "react-icons/go";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaCalendarAlt, FaCheck, FaMapMarkerAlt, FaRegCalendarAlt, FaRegHeart, FaStar } from 'react-icons/fa';
import { SlTarget } from "react-icons/sl";
import { LuPen, LuPenLine } from "react-icons/lu"
import { AiOutlineClockCircle } from "react-icons/ai";
import Navbar from '../../../components/layout/Navbar';
import { HeroBg, stripe, imageone, imagetwo, imagethree, EditIcon } from "../../../assets/export"
import { usertwo } from "../../../assets/export"
import { GoHeart, GoTrash } from 'react-icons/go';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router';
import { RxCross2 } from "react-icons/rx";
import {
  fetchallservices,
  fetchDailyAvailability,
  getPaymentMethoduser,
  HireServiceProvider,
  RequestCustomService,
} from "../../../redux/slices/users.slice";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@react-google-maps/api";
import { ErrorToast } from "../../../components/global/Toaster";

const Serviceprovider = () => {
  const dispatch = useDispatch();
  const [servicetype, setServicetype] = useState(false);
  const [requestservice, setRequestservice] = useState(false);
  const [requestservicetwo, setRequestservicetwo] = useState(false);
  const [requestservicethree, setRequestservicethree] = useState(false);
  const [requestservicefour, setRequestservicefour] = useState(false);
  const [requestservicefive, setRequestservicefive] = useState(false);
  const [bookingconfirm, setBookingconfirm] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [bookrequestsend, setBookrequestsend] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate("");
  const location = useLocation();
  const { id } = location.state || {};
  const [paymentmethoduser, setPaymentmethoduser] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // New state for selected card

  const handleCardSelect = (card) => {
    setSelectedCard(card); // Set the selected card
  };

  const fromViewProfile = location.state?.fromViewProfile || false;
  const providerId = location.state?.id;
  const [showrating, setShowrating] = useState(false);
  const [custombooking, setCustombooking] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    lat: "",
    long: "",
    city: "",
    state: "",
    country: "",
    location: "",
    description: "",
    payment_method_id: "",
    price: 0,
    images: [],
  });

  const handlePlaceChangeds = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setLocations(place.formatted_address); // Set the location with the formatted address

        // Geocoding to get lat, long, city, state, country
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: place.formatted_address },
          (results, status) => {
            if (status === "OK" && results[0]) {
              const addressComponents = results[0].address_components;
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();

              let city = "";
              let state = "";
              let country = "";

              // Loop through address components and extract city, state, country
              addressComponents.forEach((component) => {
                const types = component.types;
                if (types.includes("locality")) city = component.long_name;
                if (types.includes("administrative_area_level_1"))
                  state = component.long_name;
                if (types.includes("country")) country = component.long_name;
              });

              // Update the form data with location details
              setFormData((prev) => ({
                ...prev,
                lat,
                long: lng,
                city,
                state,
                country,
                location: place.formatted_address, // Set the full address in form data
              }));
            }
          }
        );
      }
    }
  };

  const handleSubmit = () => {
    const customserviceData = {
      service_provider_id: id,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      lat: formData.lat,
      long: formData.long,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      location: formData.location,
      description: formData.description,
      payment_method_id: selectedCard.id,
      amount: formData.price,
      images: formData.images,
    };
    // Dispatch the action to submit the form
    dispatch(RequestCustomService({ customserviceData }));
  };

  const [custombookingtwo, setCustombookingtwo] = useState(false);
  const [custombookingthree, setCustombookingthree] = useState(false);
  const { allservices, paymentMethoduser,hireProviderLoading } = useSelector((s) => s.user);


  const handleOnLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handleNextStep = () => {
    // Check if the required fields are filled
    if (!selectedDate) {
      ErrorToast("Please select a date.");
      return; // Stop further processing
    }

    if (!selectedTime) {
      ErrorToast("Please select a time.");
      return; // Stop further processing
    }

    if (!duration || duration === "") {
      ErrorToast("Please enter the duration.");
      return; // Stop further processing
    }

    // Proceed if all fields are valid
    setRequestservicetwo(true);
    setRequestservice(false);
  };

  const handleNextSteptwo = () => {
    // Validate job location
    if (!locations) {
      ErrorToast("Please enter a job location.");
      return; // Stop further processing
    }

    // Validate job description
    if (!description || description.trim() === "") {
      ErrorToast("Please provide a job description.");
      return; // Stop further processing
    }

    // Validate uploaded images (optional, but should handle the case if any are uploaded)
    if (files.length > 0 && files.some((file) => !file.file)) {
      ErrorToast("There was an error with your uploaded images.");
      return; // Stop further processing if there's an issue with files
    }

    // Proceed if all fields are valid
    setRequestservicethree(true);
    setRequestservicetwo(false);
  };

  const handlePlaceChangeded = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) return;

    // Get Latitude & Longitude
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    // Initialize variables
    let city = "";
    let state = "";
    let country = "";
    let postalCode = "";

    // Loop through address components
    place.address_components.forEach((component) => {
      const types = component.types;

      if (types.includes("locality")) {
        city = component.long_name;
      }

      if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }

      if (types.includes("country")) {
        country = component.long_name;
      }

      if (types.includes("postal_code")) {
        postalCode = component.long_name;
      }
    });

    // Update state
    setFormData((prev) => ({
      ...prev,
      lat,
      long: lng,
      city,
      state,
      country,
      postalCode,
      location: place.formatted_address, // full address
    }));

    // Optional: update input field
    setLocations(place.formatted_address);
  };

  const autocompleteRef = useRef(null);

  const handleOnLoads = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  console.log(allservices,"allService")

  useEffect(() => {
    dispatch(fetchallservices("/users/providers")); // pass page to API
  }, [dispatch]);

  const alldata = allservices?.data;

  useEffect(() => {
    if (alldata && id) {
      // Step 1: Find the provider jiska id match kare
      const provider = alldata.find((item) => item.id === id);
      // Step 2: Agar mila to uske services ko state me set karo
      if (provider) {
        setData(provider || []);
      }
    }
  }, [alldata, id]);

  const handleDurationChange = (e) => {
    const value = e.target.value;

    // Validate if the entered value is more than 15
    if (parseInt(value) > 15 && value !== "") {
      ErrorToast("Duration cannot be more than 15");
      return;
    }

        setDuration(value);
    };



    // const handleInputChange = (e) => {
    //     const { name, value, files } = e.target;
    //     if (name === "file") {
    //         setFormData({ ...formData, file: files[0] });
    //     } else {
    //         setFormData({ ...formData, [name]: value });
    //     }   
    // };


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "duration") {
      // Allow only numeric input for duration
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

      // Validate the duration
      if (parseInt(numericValue) > 15 && numericValue !== "") {
        ErrorToast("Duration cannot be more than 15");
        return; // Prevent further state update if validation fails
      }

      // Update the form data with the validated duration
      setFormData({
        ...formData,
        [name]: numericValue, // Only update numeric value
      });
    } else if (name === "file") {
      // Handle file input (e.g., updating the file in form data)
      setFormData({ ...formData, file: files[0] });
    } else {
      // Handle other input fields normally
      setFormData({ ...formData, [name]: value });
    }
  };


  const togglePopup = () => {
    setServicetype(!servicetype);
  };

  const [duration, setDuration] = useState("");
  const [locations, setLocations] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Get selected files

    const updatedFiles = selectedFiles.map((file) => {
      const fileType = file.type.split("/")[0]; // Check file type (image)
      let preview = null;

      // Convert size to KB (if size > 1024 bytes)
      const sizeInKB = (file.size / 1024).toFixed(3); // Size in KB, rounded to 3 decimal places

      return new Promise((resolve) => {
        if (fileType === "image") {
          // If it's an image, create a preview
          const reader = new FileReader();
          reader.onloadend = () => {
            preview = reader.result; // Base64 image preview
            resolve({
              file, // Actual file object
              preview, // Keep preview only for UI
              name: file.name,
              size: `${sizeInKB}KB`,
            });
          };
          reader.readAsDataURL(file); // Read image as base64
        } else {
          // For non-image files
          resolve({
            file,
            preview: null,
            name: file.name,
            size: `${sizeInKB}KB`,
          });
        }
      });
    });

    Promise.all(updatedFiles).then((resolvedFiles) => {
      // Keep preview for UI
      setFiles((prevFiles) => [...prevFiles, ...resolvedFiles]);

      // Only store name & size in formData.images
      setFormData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          ...resolvedFiles.map((f) => ({
            name: f.name,
            size: f.size,
          })),
        ],
      }));
    });
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); 
  };

  const [services, setServices] = useState({});

    useEffect(() => {
        // Initialize the services with quantity 0
        const initialServices = data?.services?.reduce((acc, service) => {
            acc[service.id] = 1; // or any default quantity you prefer
            return acc;
        }, {});
        setServices(initialServices);
    }, [data?.services]);

  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelect = (time) => {
    setSelectedTime(time);
  };

  const handleIncrement = (service) => {
    setServices((prev) => ({
      ...prev,
      [service.id]: prev[service.id] < 10 ? prev[service.id] + 1 : 10, 
    }));
  };

  const handleDecrement = (service) => {
    setServices((prev) => ({
      ...prev,
      [service.id]: prev[service.id] > 0 ? prev[service.id] - 1 : 1, 
    }));
  };

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

  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
  };
  const handleNext = () => {
    setRequestservicefive(true);
    setRequestservicefour(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if less than 10
    const day = d.getDate().toString().padStart(2, "0"); // Get day and pad with zero if less than 10
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time) => {
    // Extract hour and minute parts from the time string
    const [hours, minutes] = time.split(":");
    const period = time.slice(-2).toUpperCase(); // AM/PM part

    let formattedHours = parseInt(hours);

    // Convert PM time to 24-hour format, except for 12 PM which remains as 12
    if (period === "PM" && formattedHours !== 12) {
      formattedHours += 12;
    }
    // Convert 12 AM to 00 for 24-hour format
    else if (period === "AM" && formattedHours === 12) {
      formattedHours = 0;
    }

    // Return time in 24-hour format (HH:mm), no AM/PM suffix
    return `${formattedHours.toString().padStart(2, "0")}:${minutes.slice(
      0,
      2
    )}`;
  };

  const handleHireNow = () => {
    const formattedDate = formatDate(selectedDate);
    const formattedTime = formatTime(selectedTime);

    const serviceData = data?.services?.map((service) => ({
      service_id: service.id,
      quantity: services[service.id] || 0, // Use the current quantity from your services state
    }));

    const providerData = {
      title: "Service Request",
      date: formattedDate, // Formatting the date
      time: formattedTime, // You can replace this with selectedTime if you're using it
      location: locations,
      duration: duration,
      city: formData.city || "Default City",
      state: formData.state || "Default State",
      country: formData.country || "Default Country",
      lat: formData.lat || 0, // Dynamically set latitude from formData
      long: formData.long || 0, // Dynamically set longitude from formData
      description: description,
      payment_method_id: selectedCard.id,
      services: serviceData,
    };

    const payload = {
      userId: id, // Ensure userId is available from the location or state
      providerData,
    };


    dispatch(HireServiceProvider(payload)); // Dispatch the action
  };

  useEffect(() => {
    dispatch(getPaymentMethoduser());
  }, [dispatch]);

  useEffect(() => {
    if (paymentMethoduser) {
      setPaymentmethoduser(paymentMethoduser);
    }
  }, [paymentMethoduser]);

  const handleFileChangeimage = (e) => {
    const selectedFiles = Array.from(e.target.files); // Get selected files

    // Check if the number of files exceeds 3
    if (selectedFiles.length + files.length > 3) {
      ErrorToast("You can upload a maximum of 3 images.");
      return; // Prevent further action if the limit is exceeded
    }

    const updatedFiles = selectedFiles.map((file) => {
      const fileType = file.type.split("/")[0]; // Check file type (image)
      let preview = null;

      return new Promise((resolve) => {
        if (fileType === "image") {
          // If it's an image, create a preview
          const reader = new FileReader();
          reader.onloadend = () => {
            preview = reader.result; // Base64 image preview
            resolve({
              file, // Actual file object
              preview, // Preview for UI
              name: file.name,
              size: `${(file.size / 1024).toFixed(3)}KB`, // File size in KB
            });
          };
          reader.readAsDataURL(file); // Read image as base64
        } else {
          resolve({
            file,
            preview: null,
            name: file.name,
            size: `${(file.size / 1024).toFixed(3)}KB`,
          });
        }
      });
    });

    // Wait for all promises to resolve before updating the state
    Promise.all(updatedFiles).then((resolvedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...resolvedFiles]);
    });
  };

  const handleRemoveFileimage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove file at the specified index
  };

  const { dailyAvailability } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchDailyAvailability(providerId));
  }, [dispatch]);

  const [todaytime, setTodaytime] = useState("");

    useEffect(() => {
        if (dailyAvailability) {
            // Filter out the available slots
            const availableSlots = dailyAvailability?.slots?.filter(slot => slot.status === "Available");
            setTodaytime(availableSlots || []); // Set only available slots
        }
    }, [dailyAvailability]);



  return (
    <>
      <Navbar />
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
      <div className="max-w-6xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl -mt-[16em]">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-[18em]">
            <img
              src={
                data?.avatar
                  ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${data.avatar}`
                  : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
              }
              alt="Profile"
              className="w-80 h-100 rounded-xl object-cover"
            />

            {/* Certificates */}
            <div className="mt-4 border-t-2 pt-3">
              <h3 className="font-semibold text-lg mb-2">Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-h-[400px] overflow-y-auto">
                {data?.certificates?.map((certificate, i) => (
                  <div key={i} className="space-y-1 border-t-2 pt-3">
                    <h4 className="font-medium">{certificate.name}</h4>
                    <p className="text-sm text-blue-600">
                      {certificate.institution}
                    </p>
                    <p className="text-sm text-gray-600">
                      {certificate.description}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {certificate.date_of_completion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold capitalize">
                  {data.name}
                </h2>
                <p className="text-gray-500">
                  {data.experience || "0 Year Experience"} + Years Experience
                </p>
                <div className="flex items-center text-yellow-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.max(1, Math.round(Number(data?.rating || 0)))
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-medium">
                    {data?.rating ? data.rating : "0"}
                  </span>
                </div>
              </div>
              <div className="space-y-4 text-right">
                {!fromViewProfile && (
                  <button
                    onClick={() => {
                      setServicetype(true);
                    }}
                    className="bg-gradient-to-r mt-1 from-[#00034A] to-[#27A8E2] text-white px-14 py-2 rounded-md ml-auto"
                  >
                    Hire Now
                  </button>
                )}
              </div>
            </div>
            {/* Bio */}
            <div className="mt-4 text-sm text-gray-700 border-t-2 pt-3">
              <h3 className="font-semibold mb-1 text-black">Biography</h3>
              <p className="pt-1 text-sm">{data.biography || "No Biography"}</p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600 border-t-2 pt-3">
                <div>
                  <span className="font-semibold">Location</span>
                  <br />
                  {data.city} {data.country}
                </div>
                <div>
                  <span className="font-semibold">Distance</span>
                  <br />
                  {data?.distance && data.distance > 0 ? data.distance : "0"}
                </div>
                <div>
                  <span className="font-semibold">Completed Job</span>
                  <br />
                  {data.complete_jobs | "No complete_jobs"}+ Job Success
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-6 border-t-2 pt-3">
              <h3 className="font-semibold text-lg mb-4">
                Service Details and Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {data?.services?.map((service, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-3 rounded-md border flex flex-col justify-between h-[250px]"
                  >
                    <div>
                      <h4 className="font-semibold capitalize text-[12px] mb-2">
                        {service.title}
                      </h4>
                      <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1">
                        <li>{service.description}</li>
                        {/* If service has multiple descriptions, map over them */}
                        {Array.isArray(service.description) &&
                          service.description.map((line, j) => (
                            <li key={j}>{line}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="text-blue-600 font-bold text-sm mt-auto">
                      ${service.amount}
                    </div>{" "}
                    {/* Fixed price at the bottom */}
                  </div>
                ))}
              </div>
            </div>
            {/* Reviews */}
            <div className="mt-4 border-t-2 pt-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg mb-2">Rating & Reviews</h3>
                {data?.reviews?.length > 1 && (
                  <span
                    className="text-blue-600 underline text-[13px] cursor-pointer"
                    onClick={() => setShowrating(true)}
                  >
                    View More
                  </span>
                )}
              </div>
              <div className="">
                {data?.reviews?.length > 0 ? (
                  data.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="mb-4 bg-gray-50 p-4 rounded-md border"
                    >
                      <p className="font-medium">
                        {review.name || "Anonymous"}
                      </p>
                      <div className="flex items-center text-yellow-500 mb-1">
                        {[...Array(Math.round(Number(review.rating || 0)))].map(
                          (_, i) => (
                            <FaStar key={i} />
                          )
                        )}
                        <span className="ml-2 text-gray-700 font-medium">
                          {review.rating || "0"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {review.text || "No review content provided."}
                      </p>
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
                    selectRange={false}
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileDisabled={({ date }) =>
                      date < new Date().setHours(0, 0, 0, 0)
                    }
                    tileClassName={({ date: d, view }) => {
                      if (view === "month") {
                        const today = new Date();
                        const isSelected =
                          selectedDate &&
                          d.toDateString() === selectedDate.toDateString();
                        if (isSelected)
                          return "bg-[#00034A] text-white rounded-lg"; // Styling for selected date
                      }
                      return "hover:bg-blue-100 rounded-lg"; // Default hover style
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
                {todaytime.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(slot.time)} // Use slot.time as the time to select
                    className={`px-4 py-2 rounded-lg border text-sm transition 
                ${
                  selectedTime === slot.time
                    ? "bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white"
                    : "bg-white text-gray-800"
                }`}
                  >
                    {slot.time} {/* Display the available time */}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Duration</h3>
              <div className="w-full">
                <input
                  type="number"
                  value={duration}
                  onChange={handleDurationChange} // Update the state with validation
                  placeholder="0"
                  className={`w-full border rounded-lg px-4 py-2 pr-10 ${
                    parseInt(duration) > 15 ? "border-red-500" : ""
                  }`} // Add red border if duration is greater than 15
                  required
                />
              </div>
            </div>

            {/* Footer Button */}
            <button
              onClick={handleNextStep}
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
                  <Autocomplete
                    onLoad={handleOnLoads}
                    onPlaceChanged={handlePlaceChangeded}
                  >
                    <input
                      type="text"
                      value={locations}
                      onChange={(e) => setLocations(e.target.value)}
                      placeholder="Abc, suite CN"
                      className="w-full border rounded-lg px-4 py-2 pr-10"
                    />
                  </Autocomplete>

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
                    onChange={handleFileChangeimage}
                    className="hidden"
                    id="fileInput"
                    multiple
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-gray-500"
                  >
                    Upload "document name"
                    <br />
                    <span className="text-xs text-gray-400">
                      Up to 3 images (JPG, PNG)
                    </span>
                  </label>
                </div>

                {/* Preview Images */}
                {files.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="h-[120px] w-[120px] object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFileimage(index)}
                          className="absolute top-0 right-0 bg-white p-1 rounded-full text-gray-500 hover:text-red-500"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optionally, display a message if there are already 3 images */}
                {files.length === 3 && (
                  <p className="text-xs text-gray-500 mt-2">
                    You can upload a maximum of 3 images.
                  </p>
                )}
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
                onClick={handleNextSteptwo}
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
                {data?.services?.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-800 capitalize">
                      {service.title}
                    </span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleDecrement(service)}
                        className="text-xl text-gray-500 p-1 rounded-[6px] bg-gray-300 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span>{services[service.id] || 0}</span>{" "}
                      {/* Display the current quantity */}
                      <button
                        onClick={() => handleIncrement(service)}
                        className="text-xl text-gray-500 p-1 bg-gray-300 rounded-[6px] hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
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
                  <h3 className="font-semibold text-gray-800">{data.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{data.rating}</span>
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
                          {selectedDate
                            ? `${selectedDate.toLocaleDateString()}`
                            : "No date selected"}
                        </div>
                      )}
                    </div>

                    <div>
                      <div>
                        <span className="font-medium text-gray-800">Time</span>
                      </div>
                      <p className="text-gray-600">
                        {" "}
                        {selectedTime || "No Time"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                  <div>
                    <span className="font-medium text-gray-800">Location</span>
                    <p className="text-gray-600 mt-2 truncate max-w-xs">
                      {locations || "No Location"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex justify-between border-t-[2px] pt-3 border-slate-200">
                <div>
                  <div className="font-medium text-gray-800">Description</div>
                  <p className="text-gray-600 mt-2 truncate max-w-xs">
                    {description || "No description"}
                  </p>
                </div>
              </div>

              {/* Cleaning Services */}
              <div className=" flex justify-between border-t-[2px] pt-3 border-slate-200">
                <div className="">
                  <div className="font-medium text-gray-800">
                    Cleaning Services
                  </div>
                  <div className="flex justify-between space-x-10 mt-2 text-sm">
                    {data?.services?.map((service, i) => (
                      <div key={i} className="border-r-2 pr-3">
                        <div className="text-sm capitalize">
                          {service.title} <br></br>
                          {services[service.id] || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                            <h2 className="text-2xl font-bold text-gray-800">Request Service</h2>
                            <button
                                onClick={() => setRequestservicefive(false)}
                                className="text-gray-500 hover:text-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                                    <span className="font-medium text-gray-800">Attached Stripe</span>
                                    {paymentmethoduser?.payment_methods && paymentmethoduser?.payment_methods.map((card) => (
                                        <div
                                            key={card.id}
                                            className={`flex justify-between items-center border cursor-pointer rounded mt-2 p-2 mb-2 ${selectedCard?.id === card.id ? 'bg-blue-100 border-blue-500' : ''}`}
                                            onClick={() => handleCardSelect(card)} // Set the card as selected when clicked
                                        >
                                            <div className="flex gap-3">
                                                <span className="text-gray-700">**** **** **** **{card.last_digits}</span>
                                                <img src={stripe} className="h-6" alt={card.brand} />
                                            </div>

                                            <button className="text-blue-500 hover:text-blue-700 text-lg" onClick={() => {
                                                navigate("/app/payment-method");
                                            }}>
                                                <MdOutlineEdit />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                                <div className='w-full bg-[#F3F3F3] p-3 rounded-[10px]'>
                                    <div className='w-full border-b-[1px] pb-[3px]'>
                                        <span className="font-medium text-gray-800">Payment Summary</span>
                                    </div>
                                    <div className="text-gray-600 mt-2">
                                        <div className='flex justify-between'>
                                            <p>Subtotal: </p>
                                            $ {data?.services?.reduce((total, service) => {
                                                return total + service.amount * (services[service.id] || 0);
                                            }, 0)}
                                        </div>
                                        <div className='flex justify-between pt-3'>
                                            <p className='text-black font-[500]'>Total: </p>
                                            $ {data?.services?.reduce((total, service) => {
                                                return total + service.amount * (services[service.id] || 0);
                                            }, 0)}
                                        </div>
                                    </div>
                                </div>
                            </div>

              {/* Action Buttons */}
              <div className="pt-6 pb-3">
                <button
                  onClick={() => {
                    // Validation: Check if a payment method is selected
                    if (!selectedCard) {
                      ErrorToast("Please select a payment method.");
                      return; // Prevent further execution if validation fails
                    }

                    setBookrequestsend(true); // Show loading modal
                    setRequestservicefive(false); // Close current modal

                    handleHireNow(); // Proceed with booking

                    setDuration("");
                    setSelectedTime("");
                    selectedDate("");
                    setLocations("");
                    setDescription("");
                  }}
                  className="w-full bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
                >
                  {hireProviderLoading ? "Processing..." : "Book Now"}{" "}
                  {/* Loading state for the button */}
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

      {/* Booking Request Sent Modal */}
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
            <button
              onClick={() => {
                setBookrequestsend(false); // Close the booking modal
                navigate("/Home"); // Navigate to booking details
              }}
              className="w-full mt-4 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
            >
              View Booking Details
            </button>
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
              {data?.reviews?.length > 0 ? (
                data.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <p className="font-semibold">
                      {review.name || "Anonymous"}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-yellow-400 ${
                            i < Math.floor(review.rating) ? "" : "opacity-50"
                          }`}
                        />
                      ))}
                      <span className="ml-1 font-medium text-sm">
                        {review.rating || "0"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {review.text || "No review content provided."}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No reviews yet.</p>
              )}
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
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium">Title*</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter your title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2 focus:outline-none"
                />
              </div>

              {/* Service Description */}
              <div>
                <label className="block mb-1 font-medium">
                  Service Description*
                </label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Briefly explain the service required"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Upload Images{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer border border-dashed rounded p-6 text-center w-full block hover:bg-gray-50 transition"
                >
                  <div className="text-gray-700 font-medium">Upload Images</div>
                  <p className="text-sm text-gray-500 mt-1">
                    Up to 20MB JPG, PNG
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept="image/*" // Accept only images
                    onChange={handleFileChange}
                    multiple // Allow multiple file selection
                    className="hidden"
                  />
                </label>

                {/* Display uploaded images */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="relative flex justify-center items-center"
                    >
                      {/* Display Image Preview */}
                      <img
                        src={file.preview} // Image preview
                        alt={file.fileName}
                        className="h-[10em] w-48 object-cover rounded-md"
                      />
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)} // Function to remove the file
                        className="absolute top-0 right-0 bg-white rounded-full p-1 text-gray-600 hover:text-gray-900"
                      >
                        <span className="text-xl">×</span> {/* Cross button */}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Date*</label>
                  <div className="flex items-center border rounded px-2">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full py-2 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Time*</label>
                  <div className="flex items-center border rounded px-2">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full py-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 font-medium">Location*</label>
                <div className="relative mt-1">
                  <Autocomplete
                    onLoad={handleOnLoad}
                    onPlaceChanged={handlePlaceChangeds}
                  >
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                      required
                      className="w-full border rounded p-2 focus:outline-none"
                    />
                  </Autocomplete>

                  <span className="absolute right-3 top-2.5 text-blue-500">
                    <IoLocationOutline size={20} />
                  </span>
                </div>
              </div>

              {/* Price & Duration */}
              <div className="flex justify-between">
                {/* Price */}
                <div>
                  <label className="block mb-1 font-medium">
                    Proposed Price*
                  </label>
                  <div className="flex items-center border rounded px-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter amount"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full py-2 ml-1 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block mb-1 font-medium">Duration*</label>
                  <div className="flex items-center border rounded px-2">
                    <span className="text-gray-500">
                      <IoTimeOutline />
                    </span>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Enter Duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full py-2 ml-1 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-1 font-medium">Payment Method</label>
                {paymentmethoduser?.payment_methods &&
                  paymentmethoduser?.payment_methods.map((card) => (
                    <div
                      key={card.id}
                      className={`flex justify-between items-center border cursor-pointer rounded p-2 mb-2 
              ${
                selectedCard?.id === card.id
                  ? "bg-blue-100 border-blue-500"
                  : ""
              } 
            `} // Highlight the selected card with a background
                      onClick={() => handleCardSelect(card)} // Set the card as selected when clicked
                    >
                      <div className="flex gap-3">
                        <span className="text-gray-700">
                          **** **** **** **{card.last_digits}
                        </span>
                        <img src={stripe} className="h-6" alt={card.brand} />
                      </div>

                      <button className="text-red-500 hover:text-red-700 text-lg">
                        <GoTrash />
                      </button>
                    </div>
                  ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (
                      !formData.title ||
                      !formData.description ||
                      !formData.date ||
                      !formData.time ||
                      !formData.location ||
                      !formData.price ||
                      !formData.duration
                    ) {
                      ErrorToast("Please fill out all required fields.");
                      return;
                    }
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
                      {formData.title || "No Title"}
                    </h4>
                    <p className="text-gray-600">
                      {formData.description || "No Description"}
                    </p>
                  </div>
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
                    {formData.location || "No Location"}
                  </p>
                </div>
              </div>

              <hr />

              {/* Uploaded photos */}
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-500">
                    Uploaded photos
                  </h4>
                </div>
                <div className="flex gap-3">
                  {files.length > 0 ? (
                    files.map((fileObj, index) => (
                      <div
                        key={index}
                        className="relative flex justify-center items-center"
                      >
                        {/* Display Image Preview */}
                        <img
                          src={fileObj.preview} // Image preview
                          alt="Preview"
                          className="h-[10em] w-48 object-cover rounded-md"
                        />

                        {/* Remove Button */}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No Image</p>
                  )}
                </div>
              </div>

              <hr />

              {/* Price & Time */}
              <div className="flex justify-between gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-600">
                    Proposed Price
                  </h4>
                  <p className="font-semibold mt-1">${formData.price}</p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-600">
                        Preferred Date & Time
                      </h4>
                      <p className="font-semibold mt-1">
                        {formData.date || "No Date"} |{" "}
                        {formData.time || "No Time"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src="https://www.w3schools.com/w3images/avatar2.png"
                  alt="User Avatar"
                  className="h-[3em] w-auto rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{data.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{data.rating}</span>
                  </div>
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
                  {selectedCard && (
                    <div
                      key={selectedCard.id}
                      className="text-gray-600 bg-[#F3F3F3] rounded-[10px] p-3 w-full mt-2 flex items-center justify-between"
                    >
                      <div className="flex gap-4">
                        <span>**** **** **** **{selectedCard.last_digits}</span>
                        <img
                          src={stripe}
                          className="w-auto h-6"
                          alt={selectedCard.brand}
                        />
                      </div>

                      <MdDelete color="red" />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                <div className="w-full bg-[#F3F3F3] p-3 rounded-[10px]">
                  <div className="w-full border-b-[1px] pb-[3px]">
                    <span className="font-medium text-gray-800">
                      Payment Summary
                    </span>
                  </div>
                  <div className="text-gray-600 mt-2">
                    <div className="flex justify-between">
                      <p>Subtotal: </p>
                      <p>${formData.price}</p>
                    </div>
                    <div className="flex justify-between pt-3">
                      <p className="text-black font-[500]">Total: </p>
                      <p className="text-black font-[500]">${formData.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 pb-3">
                <button
                  className="w-full bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
                  onClick={() => {
                    handleSubmit(); // Call your submit function here
                  }}
                >
                  Send request to service provider
                </button>

                <div
                  className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => {
                    setCustombookingthree(false);
                    setCustombookingtwo(true); // Go back to the second step
                  }}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Serviceprovider;
