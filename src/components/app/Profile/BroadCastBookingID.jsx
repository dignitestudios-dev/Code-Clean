import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HeroBg } from "../../../assets/export";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestDetails } from "../../../redux/slices/users.slice";

export default function BroadCastBookingID() {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the dynamic `id`
  const dispatch = useDispatch();
  const { requestDetails, requestisLoading } = useSelector(
    (state) => state.user
  );
  const [data, setData] = useState();

  useEffect(() => {
    const url = "/user/bookings"; // You can define the URL here dynamically if needed
    dispatch(fetchRequestDetails({ id, url })); // Pass both id and url
  }, [dispatch, id]);


  console.log(data, "data")

  useEffect(() => {
    if (requestDetails) {
      setData(requestDetails); // Set data when fetched from the store
    }
  }, [requestDetails]);
  console.log(data, "datadetail");
  // Skeleton Loader Component (only for the content part)
  const SkeletonLoader = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Skeleton for title */}
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>

          {/* Skeleton for status */}
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

          {/* Skeleton for description */}
          <div className="h-24 bg-gray-200 rounded animate-pulse mb-6"></div>

          {/* Skeleton for price */}
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>

          {/* Skeleton for date */}
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-10 lg:px-40 -mt-80 bottom-0 items-center gap-3">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={16} />
          </button>
          <h1 className="text-2xl font-semibold text-white">
            Broadcast booking details
          </h1>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg mb-48 rounded-[8px] p-10 mt-3">
          {/* Service Request Cards */}
          <div className="space-y-6">
            {/* Check if data is loading, if so show Skeleton */}
            {requestisLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Header with title and actions */}
                  <div className="flex justify-between items-start mb-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {data?.title}
                        </h2>
                      </div>
                      <div className="mt-0">
                    <p
  className={`text-xs font-semibold ${
    data?.status === "pending" || data?.status === "waiting"
      ? "text-white bg-yellow-300 rounded-xl capitalize w-[8em] flex text-center justify-center"
      : data?.status === "completed"
      ? "bg-green-500 text-white rounded-xl capitalize w-[8em] flex text-center justify-center"
      : data?.status === "cancelled"
      ? "bg-red-500 text-white rounded-xl capitalize w-[8em] flex text-center justify-center"
      : "text-green-500"
  }`}
>
  {data?.status}
</p>


                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <CiLocationOn color="#00034A" />
                    {data?.location}
                  </div>
                  {/* Images */}
                  {data?.images && data?.images?.length > 0 && (
                    <div className="flex gap-3 mb-4">
                      {data?.images.map((image, index) => (
                        <div
                          key={index}
                          className="w-40 h-15 bg-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400">
                            <img
                              src={import.meta.env.VITE_APP_AWS_URL + image}
                              alt="images/"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {data?.description}
                  </p>

                  {/* Price and Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-12">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Proposed Price
                        </p>
                        <p className="text-xl font-semibold text-gray-900">
                          ${data?.total_payment}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Preferred Date & Time
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                          {data?.date} | {data?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
