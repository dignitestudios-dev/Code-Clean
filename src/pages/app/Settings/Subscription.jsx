import React, { useEffect, useState } from "react";
import Footer from "../../../components/layout/Footer";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../../../components/layout/Navbar";
import { useNavigate } from "react-router";
import { HeroBg } from "../../../assets/export";
import { Button } from "../../../components/global/GlobalButton";
import UpdgradePlane from "../../../components/app/Settings/UpgradePlane";
import CancelSubscription from "../../../components/app/Settings/CancelSubscription";
import { getBillings, getPlans } from "../../../redux/slices/provider.slice";
import { useDispatch, useSelector } from "react-redux";
import { RiLoader5Line } from "react-icons/ri";
import Pagination from "../../../components/global/Pagination";
import SkeletonRows from "../../../components/global/Skellyton";

export default function Subscription() {
  const navigate = useNavigate("");
  const [activeTab, setActiveTab] = useState("billing");
  const [SubscriptionModal, setSubscriptionModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlane, setSelectedPlane] = useState(null);
  const dispatch = useDispatch();
  const { plans, billings, isLoading } = useSelector(
    (state) => state?.provider
  );
  useEffect(() => {
    dispatch(getBillings("/billings"));
    dispatch(getPlans());
  }, []);

  console.log(billings, "billings");
  const sliceBaseUrl = (url) => {
    if (!url) return null;
    try {
      const base = "https://api.codecleanpros.com/api/";
      return url.startsWith(base) ? url.replace(base, "") : url;
    } catch {
      return url;
    }
  };

  const handlePageChange = (url) => {
    const cleanUrl = sliceBaseUrl(url);
    if (cleanUrl) {
      dispatch(getBillings(cleanUrl));
    }
  };
  return (
    <div>
      <Navbar type="serviceprovider" />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-40   -mt-80 bottom-0 items-center gap-3 ">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate("/app/settings")}>
            <FaArrowLeft color="white" size={16} />
          </button>
          <h1 className="text-2xl font-semibold text-white">Subscription</h1>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg p-5 rounded-[8px]">
          <div className="bg-[white] mb-3 flex flex-col gap-3 pt-6 rounded-[16px] mt-3">
            <div className="mb-8 border-b border-[#E2E2E2] px-10">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`font-semibold pb-2 border-b ${
                    activeTab === "billing"
                      ? "text-gradient border-[#181818]"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  Billing
                </button>
                <button
                  onClick={() => setActiveTab("plan")}
                  className={`font-medium pb-2 border-b-2 ${
                    activeTab === "plan"
                      ? "text-gradient border-[#181818]"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  Plan
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === "billing" && (
              <>
                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-6 mb-8">
                  {/* Next Invoice Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-gradient font-medium mb-2">
                      Next Invoice Issue Date
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {isLoading ? (
                        <span className="h-6 w-40 bg-gray-200 rounded animate-pulse inline-block" />
                      ) : (
                        billings?.next_invoice_date
                      )}
                    </p>
                  </div>

                  {/* Invoice Total Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-gradient font-medium mb-2">
                      Invoice Total
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {isLoading ? (
                        <span className="h-6 w-28 bg-gray-200 rounded animate-pulse inline-block" />
                      ) : (
                        `$ ${billings?.total_invoice_amount}`
                      )}
                    </p>
                  </div>
                </div>

                {/* Table Header */}
                <div className="bg-[#D2E8F4] rounded-[3px] px-10 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-sm font-medium text-[#082166]">
                      Date
                    </div>
                    <div className="text-sm font-medium text-[#082166]">
                      Description
                    </div>
                    <div className="text-sm font-medium text-[#082166]">
                      Invoice Total
                    </div>
                    <div className="text-sm font-medium text-[#082166]">
                      Status
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y px-10 divide-gray-200">
                  {isLoading ? (
                    // Skeleton Rows
                    <SkeletonRows count={3} />
                  ) : (
                    billings?.billings?.data?.map((invoice, index) => (
                      <div key={index} className="py-4 hover:bg-gray-50">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div className="text-sm text-gray-900">
                            {invoice.date}
                          </div>
                          <div className="text-sm text-gray-900">
                            {invoice.description}
                          </div>
                          <div className="text-sm text-gray-900">
                            {invoice.amount}
                          </div>
                          <div className="text-sm text-gray-900">
                            {invoice.status}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === "plan" && (
              <>
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Subscription Plan
                  </h2>
                  <p className="text-lg text-gray-600">
                    Update or cancel your subscription plan
                  </p>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {plans &&
                    plans?.map((plan, index) => (
                      <div
                        key={plan?.id}
                        style={{
                          boxShadow: "6px 6px 54px 0px #0000000A",
                        }}
                        className="bg-[#FFFFFF] rounded-[14px] border border-[#F4F4F4] shadow-md hover:shadow-lg transition-shadow duration-300 p-3 sm:p-4 md:p-6 lg:p-8"
                      >
                        {/* Plan? Header */}
                        <div className="mb-4 sm:mb-5 md:mb-6">
                          <h3 className="text-base sm:text-lg md:text-[12px] font-[500] text-[#181818] mb-1">
                            Plan {index + 1}
                          </h3>
                          <p className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent text-xs sm:text-sm md:text-[12px] font-[500] mb-2 sm:mb-3">
                            {" "}
                            {plan?.name}
                          </p>
                          <p className="text-xl sm:text-2xl md:text-3xl lg:text-23px font-bold text-[#0099DE]">
                            ${plan?.amount}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="mb-6 sm:mb-7 md:mb-8">
                          <p className="text-[#181818B2] text-xs sm:text-sm md:text-[12px] font-[400] mb-1 sm:mb-2">
                            {plan.description}
                          </p>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto">
                          {plan?.is_subscribed ? (
                            <button
                              onClick={() => {
                                setSubscriptionModal("cancel");
                                setIsOpen(!isOpen);
                                setSelectedPlane(plan);
                              }}
                              className="w-full bg-[#EE313126] text-red-600 py-3 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors"
                            >
                              <div className="flex justify-center text-center w-full items-center">
                                <span className="mr-1 text-nowrap">
                                  Cancel Subscription
                                </span>
                              </div>
                            </button>
                          ) : (
                            <Button
                              text={"Upgrade Plan"}
                              onClick={() => {
                                setSubscriptionModal("upgrade");
                                setIsOpen(!isOpen);
                                setSelectedPlane(plan);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
          {activeTab === "billing" &&billings?.billings?.length>0 && (
            <Pagination
              onPageChange={handlePageChange}
              links={billings?.billings?.links}
            />
          )}
        </div>
      </div>
      {SubscriptionModal == "upgrade" && (
        <UpdgradePlane
          selectedPlane={selectedPlane}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {SubscriptionModal == "cancel" && (
        <CancelSubscription
          selectedPlane={selectedPlane}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <Footer />
    </div>
  );
}
