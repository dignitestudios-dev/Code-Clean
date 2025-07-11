import React, { useState } from 'react';
import { FaArrowLeft, FaCheck, FaRegHeart, FaStar } from 'react-icons/fa';
import Navbar from '../../../components/layout/Navbar';
import { HeroBg } from "../../../assets/export"
import { usertwo } from "../../../assets/export"
import { GoHeart } from 'react-icons/go';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoLocationOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdDelete } from 'react-icons/md';
import { stripe } from "../../../assets/export";
import { useNavigate } from 'react-router';



const Serviceprovider = () => {
    const [servicetype, setServicetype] = useState(false);
    const [requestservice, setRequestservice] = useState(false);
    const [requestservicetwo, setRequestservicetwo] = useState(false);
    const [requestservicethree, setRequestservicethree] = useState(false);
    const [requestservicefour, setRequestservicefour] = useState(false);
    const [requestservicefive, setRequestservicefive] = useState(false);
    const [bookingconfirm, setBookingconfirm] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [bookrequestsend, setBookrequestsend] = useState(false);
    const navigate = useNavigate("");

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const togglePopup = () => {
        setServicetype(!servicetype);
    };

    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
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

    const [user, setUser] = useState({
        name: 'John Doe',
        rating: 4.9,
        date: '26 Dec, 2024',
        time: '08:00pm',
        location: '936 Kiehn Route West Ned Tennessee',
        description:
            'The standard Lorem Ipsum passage, m ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod The standard Lorem Ipsum passage, used since the, sed do eiusmod The standard Lorem Ipsum passage.',
        services: {
            bathroom: "02",
            bedroom: "04",
            kitchen: "01",
        },
    });

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
    }


    return (
        <>
            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em]"
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
                <div className='flex items-center gap-3 ml-[11em]'>
                    <button type="button" cla onClick={() => navigate(-1)} >
                        <FaArrowLeft color='white' size={20} />
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
                            src={usertwo}
                            alt="John Doe"
                            className="w-80 h-100 rounded-xl object-cover"
                        />
                        {/* Certificates */}
                        <div className="mt-4 border-t-2 pt-3">
                            <h3 className="font-semibold text-lg mb-2">Certificates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className='space-y-1'>
                                    <h4 className="font-medium">Certification Title</h4>
                                    <p className="text-sm text-blue-600">Institution Name</p>
                                    <p className='text-sm text-gray-600'>Lorem ipsum dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.</p>
                                    <p className="text-sm text-gray-400 mt-1">20/Oct/2021</p>
                                </div>
                                <div className='space-y-1 border-t-2 pt-3'>
                                    <h4 className="font-medium">Certification Title</h4>
                                    <p className="text-sm text-blue-600">Institution Name</p>
                                    <p className='text-sm text-gray-600'>Lorem ipsum dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.</p>
                                    <p className="text-sm text-gray-400 mt-1">20/Oct/2021</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold">John Doe</h2>
                                <p className="text-gray-500">5+ Years Experience</p>
                                <div className="flex items-center text-yellow-500 mt-1">
                                    {[...Array(7)].map((_, i) => <FaStar key={i} />)}
                                    <span className="ml-2 text-gray-700 font-medium">4.5</span>
                                </div>
                            </div>
                            <div className='space-y-4 text-right'>
                                <FaRegHeart size={20} className="ml-auto" /> {/* This will push the heart icon to the right */}
                                <button onClick={() => { setServicetype(true); }} className="bg-gradient-to-r mt-1 from-[#00034A] to-[#27A8E2] text-white px-14 py-2 rounded-md ml-auto">
                                    Hire Now
                                </button>
                            </div>


                        </div>

                        {/* Bio */}
                        <div className="mt-4 text-sm text-gray-700 border-t-2 pt-3">
                            <h3 className="font-semibold mb-1 text-black">Biography</h3>
                            <p className='pt-1 text-sm'>
                                The standard Lorem Ipsum passage, m ipsum dolor sit amet, cectetur adipiscing elit, sed do eiusmThe standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, cectetur adipiscing elit, sed do eiusmThe standard Lorem Ipsum passage.
                            </p>
                            <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600 border-t-2 pt-3">
                                <div>
                                    <span className="font-semibold">Location</span><br />
                                    Florida, United States
                                </div>
                                <div>
                                    <span className="font-semibold">Distance</span><br />
                                    20 miles
                                </div>
                                <div>
                                    <span className="font-semibold">Completed Job</span><br />
                                    45+ Job Success
                                </div>
                            </div>
                        </div>


                        {/* Pricing */}
                        <div className="mt-6 border-t-2 pt-3">
                            <h3 className="font-semibold text-lg mb-4">Service Details and Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    { title: 'Bathroom Cleaning', desc: ['Deep cleaning of sinks, tubs, and showers', 'Disinfection of toilets and faucets', 'Mirror and glass polishing', 'Floor scrubbing and mopping'], price: '$120' },
                                    { title: 'Bedroom Cleaning', desc: ['Dusting and wiping surfaces', 'Bed making and linen changing', 'Floor vacuuming and mopping', 'Closet and furniture cleaning'], price: '$100' },
                                    { title: 'Kitchen Cleaning', desc: ['Deep cleaning of sinks, tubs, and showers', 'Disinfection of toilets and faucets', 'Mirror and glass polishing', 'Floor scrubbing and mopping'], price: '$150' },
                                    { title: 'Full Home Deep Cleaning', desc: ['Includes all rooms', 'Sanitization of high-touch areas', 'Custom add-ons available'], price: '$120' },
                                ].map((service, i) => (
                                    <div key={i} className="bg-gray-50 p-3 rounded-md border flex flex-col justify-between h-[250px]"> {/* Added flex and height */}
                                        <div>
                                            <h4 className="font-semibold text-[12px] mb-2">{service.title}</h4>
                                            <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1">
                                                {service.desc.map((line, j) => <li key={j}>{line}</li>)}
                                            </ul>
                                        </div>
                                        <div className="text-blue-600 font-bold text-lg mt-auto">{service.price}</div> {/* Fixed price at the bottom */}
                                    </div>
                                ))}
                            </div>

                        </div>
                        {/* Reviews */}
                        <div className="mt-4 border-t-2 pt-3">
                            <div className='flex justify-between items-center'>
                                <h3 className="font-semibold text-lg mb-2">Rating & Reviews</h3>
                                <span className='text-blue-600 underline text-[13px]'>View More</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md border">
                                <p className="font-medium">Mike Smith</p>
                                <div className="flex items-center text-yellow-500 mb-1">
                                    {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                                    <span className="ml-2 text-gray-700 font-medium">4.5</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    The standard Lorem Ipsum passage, used since the Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {servicetype && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-8 w-[40em] shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Choose Your Service Type</h2>
                            <button onClick={togglePopup} className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200" onClick={() => {
                                setRequestservice(true);
                                setServicetype(false);
                            }} >
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
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00034A] to-[#27A8E2] mb-2">
                                    Request Custom Service</h3>
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
                    <div className="bg-white rounded-xl p-6 md:w-[35em] shadow-2xl">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Request Service</h2>
                            <button onClick={() => setRequestservice(false)} className="text-gray-500 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Date Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Select Date</h3>
                            <div className="rounded-xl p-4 border-2">
                                <h4 className="text-base font-medium mb-1">Select Date</h4>
                                <p className="text-sm text-gray-500 mb-3">Choose the perfect date for the task deadline</p>
                                {/* You can use a calendar component like react-calendar here */}
                                <div className="bg-white text-center py-0 rounded-lg text-black  flex justify-center">
                                    <Calendar
                                        selectRange={true}
                                        onChange={setDateRange}
                                        value={dateRange}
                                        tileDisabled={({ date }) => date < startOfToday}
                                        tileClassName={({ date: d, view }) => {
                                            if (view === 'month') {
                                                const [start, end] = dateRange;
                                                const today = new Date();
                                                const isPast = d < new Date().setHours(0, 0, 0, 0);
                                                const isInRange = start && end && d >= start && d <= end;
                                                const isSelected = d.toDateString() === start?.toDateString() || d.toDateString() === end?.toDateString();

                                                if (isSelected) return 'bg-[#00034A] text-white rounded-lg';
                                                if (isInRange) return 'bg-[#dbeafe] text-black rounded-lg';
                                                if (isPast) return 'text-gray-400';
                                            }
                                            return 'hover:bg-blue-100 rounded-lg';
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
                                {['09:00AM', '10:00AM', '11:00AM', '12:00PM', '01:00PM', '02:00PM', '03:00PM', '04:00PM'].map((time, idx) => (
                                    <button
                                        key={idx}
                                        className={`px-4 py-2 rounded-lg border text-sm ${idx === 0
                                            ? 'bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white'
                                            : idx % 2 === 0
                                                ? 'bg-pink-100 text-gray-800'
                                                : 'bg-white'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer Button */}
                        <button onClick={() => {
                            setRequestservicetwo(true);
                            setRequestservice(false);
                        }} className="w-full mt-4 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold">
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
                            <h2 className="text-2xl font-bold text-gray-800">Request Service</h2>
                            <button onClick={() => setRequestservicetwo(false)} className="text-gray-500 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Abc, suite CN"
                                        className="w-full border rounded-lg px-4 py-2 pr-10"
                                    />
                                    <span className="absolute right-3 top-2.5 text-blue-500">
                                        <IoLocationOutline size={20} />

                                    </span>
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <label className="font-semibold text-gray-700">Upload Images <span className="text-sm text-gray-400">(Optional)</span></label>
                                <div className="border-dashed border-2 border-gray-300 p-20 rounded-lg text-center cursor-pointer">
                                    <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" id="fileInput" />
                                    <label htmlFor="fileInput" className="cursor-pointer text-gray-500">
                                        Upload "document name"<br />
                                        <span className="text-xs text-gray-400">Upto 20mbps JPG, PNG</span>
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

                            <button onClick={() => {
                                setRequestservicethree(true);
                                setRequestservicetwo(false);
                            }}
                                className="w-full mt-4 bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold">
                                Next
                            </button>

                            <div onClick={() => {
                                setRequestservice(true);
                                setRequestservicetwo(false);
                            }} className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer">Back</div>

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
                            <h2 className="text-2xl font-bold text-gray-800">Request Service</h2>
                            <button onClick={() => setRequestservicethree(false)} className="text-gray-500 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Service Selection */}
                        <div className="space-y-8">
                            <h3 className="font-semibold text-gray-700">Select Services You Want</h3>
                            <div className='space-y-4'>
                                {['bathroom', 'bedroom', 'kitchen', 'fullHome'].map((service, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-gray-800 capitalize">{service.replace(/([A-Z])/g, ' $1')}</span>
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

                            <div onClick={() => {
                                setRequestservicethree(false)
                                setRequestservicetwo(true)
                            }} className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer">
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
                            <h2 className="text-2xl font-bold text-gray-800">Request Service</h2>
                            <button onClick={() => setRequestservicefour(false)} className="text-gray-500 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Review Section */}
                        <div className="space-y-4">
                            <h3>Review Details</h3>
                            <div className="flex items-center space-x-3">

                                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User Avatar" className="h-[3em] w-auto rounded-full" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-500">★</span>
                                        <span>{user.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div className=''>
                                <div className="flex justify-between gap-4 items-center border-t-[2px] pt-3 border-slate-200">
                                    <div className='flex gap-6'>
                                        <div>
                                            <span className="font-medium text-gray-800">Date</span>

                                            {editMode ? (
                                                <input
                                                    type="date"
                                                    value={user.date}
                                                    onChange={(e) => setUser({ ...user, date: e.target.value })}
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

                                    <RiEditLine size={24} onClick={() => handleEdit('date')} className='text-[#00034A] cursor-pointer' />

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
                                                value={user.location}
                                                onChange={(e) => setUser({ ...user, location: e.target.value })}
                                                className="text-gray-600"
                                            />
                                        ) : (
                                            <div className="text-gray-600 flex items-center">
                                                {user.location}
                                            </div>
                                        )}
                                    </div>
                                    <RiEditLine size={24} onClick={() => handleEdit('location')} className='text-[#00034A] cursor-pointer' />

                                </div>
                            </div>

                            {/* Description */}
                            <div className='flex justify-between border-t-[2px] pt-3 border-slate-200'>
                                <div>
                                    <div className="font-medium text-gray-800">Description</div>
                                    {editMode ? (
                                        <textarea
                                            value={user.description}
                                            onChange={(e) => setUser({ ...user, description: e.target.value })}
                                            className="text-gray-600 mt-2"
                                        />
                                    ) : (
                                        <p className="text-gray-600 mt-2 truncate max-w-xs">{user.description}</p>
                                    )}
                                </div>
                                <RiEditLine size={24} onClick={() => handleEdit('description')} className='text-[#00034A] cursor-pointer' />

                            </div>

                            {/* Cleaning Services */}
                            <div className=' flex justify-between border-t-[2px] pt-3 border-slate-200'>
                                <div className=''>
                                    <div className="font-medium text-gray-800">Cleaning Services</div>
                                    <div className="flex justify-between space-x-10 mt-2 text-sm">
                                        <div className='text-sm border-r-2 pr-3'>
                                            Bathroom Cleaning <br></br>
                                            {user.services.bathroom}
                                        </div>
                                        <div className='border-r-2 pr-3'>
                                            Bedroom Cleaning <br></br>
                                            {user.services.bedroom}
                                        </div>
                                        <div >
                                            Kitchen Cleaning <br></br>
                                            {user.services.kitchen}
                                        </div>
                                    </div>
                                </div>

                                <RiEditLine size={24} onClick={() => handleEdit('services')} className='text-[#00034A] cursor-pointer' />

                            </div>

                            <div className='pt-10 pb-3'>
                                <button
                                    className="w-full bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white py-2 rounded-full font-semibold"
                                    onClick={() => {
                                        handleSave();  // Ensure this is triggered
                                        handleNext();  // Ensure this is triggered
                                    }}

                                >
                                    {editMode ? 'Save' : 'Next'}
                                </button>
                                <div className="text-center mt-2 text-sm font-medium text-gray-500 cursor-pointer" onClick={() => {
                                    setRequestservicefour(false)
                                    setRequestservicethree(true);
                                }}>
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
                            <p className='text-slate-400'>The amount will be held in escrow via Stripe. Once the job is successfully completed, the payment will be released to the service provider.</p>

                            {/* Payment Method Info */}
                            <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                                <div className='w-full'>
                                    <span className="font-medium text-gray-800">Attached Stripe</span>
                                    <div className="text-gray-600 bg-[#F3F3F3] rounded-[10px] p-3 w-full mt-2 flex items-center justify-between">
                                        <div className='flex gap-4'>
                                            <span>**** **** **** **72</span>
                                            <img src={stripe} className='w-auto h-6' alt="" />
                                        </div>

                                        <MdDelete color='red' />

                                    </div>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="flex justify-between items-center border-t-[2px] pt-3 border-slate-200">
                                <div className='w-full bg-[#F3F3F3] p-3 rounded-[10px]'>
                                    <div className='w-full border-b-[1px] pb-[3px]'>
                                        <span className="font-medium text-gray-800 ">Payment Summary</span>
                                    </div>
                                    <div className="text-gray-600 mt-2">
                                        <div className='flex justify-between'>
                                            <p>Subtotal: </p>
                                            <p>$790</p>
                                        </div>
                                        <div className='flex justify-between pt-3'>
                                            <p className='text-black font-[500]'>Total: </p>
                                            <p className='text-black font-[500]'>$790</p>
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
                                        setRequestservicefive(false)
                                        setRequestservicefour(true)
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
                                <FaCheck color='white' size={30} />
                            </div>
                        </div>
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Request Sent!</h2>
                        {/* Message */}
                        <p className="text-gray-600 text-sm mb-4">
                            Your booking request has been sent to [Provider Name]. You will be notified once they confirm.
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
                                <FaCheck color='white' size={30} />
                            </div>
                        </div>
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                        {/* Message */}
                        <p className="text-gray-600 text-sm mb-4">
                            Great news! [Service Provider Name] has accepted your booking request. The payment has now been securely held in escrow. Once the job is completed, the funds will be released to the service provider.
                        </p>
                    </div>
                </div>
            )}


        </>
    );
};

export default Serviceprovider;
