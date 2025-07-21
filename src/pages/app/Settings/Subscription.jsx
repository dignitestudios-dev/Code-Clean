import React, { useState } from "react";
import Footer from "../../../components/layout/Footer";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../../../components/layout/Navbar";
import { useNavigate } from "react-router";
import { HeroBg } from "../../../assets/export";
import { Button } from "../../../components/global/GlobalButton";
import UpdgradePlane from "../../../components/app/Settings/UpgradePlane";
import CancelSubscription from "../../../components/app/Settings/CancelSubscription";

export default function Subscription() {
  const navigate = useNavigate("");
  const [activeTab, setActiveTab] = useState("billing");
  const [SubscriptionModal, setSubscriptionModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const invoiceData = [
    {
      date: "Feb 19, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Feb 07, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Feb 02, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Jan 30, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Feb 07, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Feb 02, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Jan 30, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Feb 07, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Feb 02, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
    {
      date: "Jan 30, 2024",
      description: "Subscription plan",
      total: "$150.00",
      status: "Paid",
    },
  ];

  const plans = [
    { id: "01", name: "Enterprise", price: "$800.00", isActive: true },
    { id: "02", name: "Enterprise", price: "$800.00", isActive: false },
    { id: "03", name: "Enterprise", price: "$800.00", isActive: false },
    { id: "05", name: "Enterprise", price: "$800.00", isActive: false },
  ];

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
          <div className="bg-[white] flex flex-col gap-3 pt-6 rounded-[16px] mt-3">
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
                      Dec 29, 2024
                    </p>
                  </div>

                  {/* Invoice Total Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-gradient font-medium mb-2">
                      Invoice Total
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">$150.00</p>
                  </div>
                </div>

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
                  {invoiceData.map((invoice, index) => (
                    <div key={index} className="py-4 hover:bg-gray-50">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="text-sm text-gray-900">
                          {invoice.date}
                        </div>
                        <div className="text-sm text-gray-900">
                          {invoice.description}
                        </div>
                        <div className="text-sm text-gray-900">
                          {invoice.total}
                        </div>
                        <div className="text-sm text-gray-900">
                          {invoice.status}
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Plan {plan.id}
                        </h3>
                        <p className="text-gradient font-medium mb-4">
                          {plan.name}
                        </p>
                        <p className="text-3xl font-bold text-[#0099DE] mb-6">
                          {plan.price}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="mb-8 space-y-2">
                        {[...Array(6)].map((_, i) => (
                          <p key={i} className="text-gray-600">
                            Feature text goes here
                          </p>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        {plan.isActive ? (
                          <button
                            onClick={() => {
                              setSubscriptionModal("cancel");
                              setIsOpen(!isOpen);
                            }}
                            className="w-full bg-[#EE313126] text-red-600 py-3 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors"
                          >
                            Cancel Subscription
                          </button>
                        ) : (
                          <Button
                            text={"Upgrade Plan"}
                            onClick={() => {
                              setSubscriptionModal("upgrade");
                              setIsOpen(!isOpen);
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
        </div>
      </div>
      {SubscriptionModal == "upgrade" && (
        <UpdgradePlane isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {SubscriptionModal == "cancel" && (
        <CancelSubscription isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Footer />
    </div>
  );
}
