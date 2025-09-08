import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/layout/Navbar'
import { HeroBg, ListingEmpty, OneYear, SixMonth, ThreeMonth, user } from '../../../assets/export'
import { useNavigate } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import { Button } from '../../../components/global/GlobalButton'
import BroadCastModal from '../../../components/app/Profile/BroadCastModal'
import BroadcastServiceRequests from '../../../components/app/Profile/BroadCastServiceRequest'
import DeleteServiceModal from '../../../components/app/Profile/DeleteServiceModal'
import RestrictedModal from '../../../components/app/Profile/RestrictedModal'
import EditProfileModal from '../../../components/app/Profile/EditProfileModal'
import ProfileUpdatedModal from '../../../components/app/Profile/ProfileUpdateModal'
import Footer from '../../../components/layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../../redux/slices/users.slice'
import { getProfile } from '../../../redux/slices/provider.slice'

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate("")
    const [custombooking, setCustombooking] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isRestrict, setIsRestrict] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const { userProfile, isLoading } = useSelector((state) => state.user);
    const [userdata, Setuserdata] = useState();
    const [serviceUser, setserviceUser] = useState();
    const { user_data } = useSelector((state) => state.auth);
    const { provider_data, getprofileloading } = useSelector((state) => state.provider);

    useEffect(() => {
        // Check if user role is 'service_provider' and prevent multiple calls if already loading
        if (user_data?.role === "service_provider" && !getprofileloading) {
            dispatch(getProfile());
        }
    }, [dispatch, user_data, getprofileloading]); // Dependencies

    console.log(provider_data, "provider_data")
    console.log(user_data, "Userrrrrrrr")

    useEffect(() => {
        if (provider_data) {
            setserviceUser(provider_data);
        }
    }, [provider_data])


    console.log(serviceUser, "serviceUser")

    // useEffect(() => {
    //     if (!userProfile && !isLoading) {
    //         dispatch(fetchUserProfile());
    //     }
    // }, [dispatch, userProfile, isLoading]);

    useEffect(() => {
        // Check if user role is "service_provider" and prevent fetch if true
        if (user_data?.role !== "service_provider" && !userProfile && !isLoading) {
            dispatch(fetchUserProfile()); // Only dispatch if role is not "service_provider"
        }
    }, [dispatch, user_data, userProfile, isLoading]);

    useEffect(() => {
        if (userProfile) {
            Setuserdata(userProfile);
        }
    }, [userProfile])


    return (
        <div>
            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
            </div>
            <div className='h-full px-10 lg:px-40  -mt-80 bottom-0 items-center gap-3 '>
                <div className='flex items-center gap-2 mb-6'>
                    <button type="button" onClick={() => navigate("/home")} >
                        <FaArrowLeft color='white' size={16} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white">Profile</h1>
                </div>
                <div className='bg-[#F9FAFA] shadow-lg mb-48 rounded-[8px] p-10 mt-3' >
                    <div className='flex items-center justify-between' >
                        <div className='flex items-center gap-3 justify-between' >
                            {userdata?.avatar ? (
                                <img
                                    src={userdata?.avatar ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${userdata.avatar}` : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"}
                                    className="w-[80px] h-[80px] rounded-full object-cover border-2"
                                    alt={userdata.name || "User Avatar"}
                                />
                            ) : (
                                <span className="bg-blue-600 rounded-full w-[80px] h-[80px] flex items-center justify-center text-white text-2xl font-bold">
                                    {userdata?.name
                                        ? userdata.name
                                            .split(" ")
                                            .map(word => word[0])
                                            .join("")
                                            .toUpperCase()
                                        : ""}
                                </span>
                            )}

                            <div>
                                <h3 className="text-[24px] font-medium">
                                    {isLoading ? (
                                        <div className="animate-pulse bg-gray-200 h-6 w-40 rounded"></div>
                                    ) : (
                                        <>
                                            {userdata && Object.keys(userdata).length > 0
                                                ? userdata.name
                                                : "No User Name"}
                                        </>
                                    )}
                                </h3>



                            </div>
                        </div>
                        <div>
                            <Button onClick={() => setIsProfile(!isProfile)} text={"Edit profile"} />
                        </div>
                    </div>
                    <div className='grid grid-cols-12 gap-4 mt-10' >
                        <div className="rounded-2xl col-span-8 shadow-sm border px-4 py-5">
                            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

                            {/* Conditional Rendering for Loading State */}
                            {isLoading ? (
                                <div className="w-[80px] h-[80px] flex justify-center items-center">
                                    <div className="loader"></div> {/* Spinner */}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Check role and render the appropriate data */}
                                    {user_data?.role === "service_provider" ? (
                                        // Show provider data for service providers
                                        <>
                                            <div>
                                                <p className="text-base font-medium text-black">Email Address</p>
                                                <p className="text-gray-500 mt-1">
                                                    {provider_data?.email ? provider_data.email : "No Email Found"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium text-black">Phone Number</p>
                                                <p className="text-gray-500 mt-1">
                                                    {provider_data?.phone_number ? provider_data.phone_number : "00000000000"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium text-black">Location</p>
                                                <p className="text-gray-500 mt-1">
                                                    {provider_data?.address ? provider_data.address : "No Address"}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        // Show user data for regular users
                                        <>
                                            <div>
                                                <p className="text-base font-medium text-black">Email Address</p>
                                                <p className="text-gray-500 mt-1">
                                                    {userdata?.email ? userdata.email : "No Email Found"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium text-black">Phone Number</p>
                                                <p className="text-gray-500 mt-1">
                                                    {userdata?.phone_number ? userdata.phone_number : "00000000000"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium text-black">Location</p>
                                                <p className="text-gray-500 mt-1">
                                                    {userdata?.address ? userdata.address : "No Address"}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>


                        <div className='rounded-2xl col-span-4 shadow-sm border px-4 py-5' >
                            <h2 className="text-2xl font-semibold mb-6">Earned badges</h2>
                            <div className='flex items-center gap-2' >
                                {
                                    [OneYear, ThreeMonth, SixMonth]?.map((item, i) => (
                                        <img src={item} className='w-[80px] h-[80px]' alt="" srcset="" />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="hidden bg-gray-50 py-4 px-4">
                        <div className=" mx-auto">
                            {/* Header */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-12">
                                Broadcast Service Requests
                            </h1>

                            {/* Empty State Container */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16">
                                <div className="text-center">
                                    {/* Document Icon */}
                                    <div className="mb-8">
                                        <div className="relative inline-block">
                                            <img src={ListingEmpty} className='w-[180px]' alt="" srcset="" />
                                        </div>
                                    </div>

                                    {/* Main Message */}
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        You don't have added any broadcast service request!
                                    </h2>

                                    {/* Description */}
                                    <p className="text-gray-500 mb-8 leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => setCustombooking(!custombooking)}
                                        className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Broadcast a Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BroadcastServiceRequests setCustombooking={setCustombooking} setIsRestrict={setIsRestrict} setIsOpen={setIsOpen} />
                </div>
            </div>
            <BroadCastModal custombooking={custombooking} setCustombooking={setCustombooking} />
            <DeleteServiceModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <RestrictedModal isOpen={isRestrict} setIsOpen={setIsRestrict} />
            <EditProfileModal
                isOpen={isProfile}
                setIsOpen={setIsProfile}
                setUpdateProfile={setUpdateProfile}
                updateProfile={updateProfile}
            />

            <ProfileUpdatedModal
                isOpen={updateProfile}
                setIsOpen={(val) => setUpdateProfile(val)} // ensure this is a function
            />
            <Footer />
        </div>
    )
}
