import React, { useState } from 'react'
import Navbar from '../../../components/layout/Navbar'
import { HeroBg } from '../../../assets/export'
import { FaArrowLeft } from 'react-icons/fa'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import TermsConditionModal from '../../../components/global/TermsCondition';
import PrivacyPolicyModal from '../../../components/global/PrivacyPolicy';
import ChangedPassword from '../../../components/app/Settings/ChangePassword';
import PasswordUpdateModal from '../../../components/onboarding/PasswordUpdateModal';
import NotificationSettings from '../../../components/app/Settings/NotificationSettings';
import Footer from '../../../components/layout/Footer';
import { useNavigate } from 'react-router';
import LogOutModal from '../../../components/global/LogoutModal';
import ReportAnIssueModal from '../../../components/app/Settings/ReportAnIssueModal';

export default function Settings() {
    const [activeModal, setActiveModal] = useState("");
    const [isOpen, setIsOpen] = useState("");
    const navigate = useNavigate("");
    const [successFullUpdate, SetSuccessfulUpdate] = useState(false)
    const menuItems = [
        { label: 'Notification Settings', color: 'text-gray-800' },
        { label: 'Subscription', color: 'text-gray-800' },
        { label: 'Payment Method', color: 'text-gray-800' },
        { label: 'Change Password', color: 'text-gray-800' },
        { label: 'Report An Issue', color: 'text-gray-800' },
        { label: 'Terms & Conditions', color: 'text-gray-800' },
        { label: 'Privacy Policy', color: 'text-gray-800' },
        { label: 'Log Out', color: 'text-red-500' }
    ];

    const handleItemClick = (item) => {
        setIsOpen(!isOpen);
        setActiveModal(item);

    };

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
                    <button type="button" onClick={() => navigate("/app/landing")} >
                        <FaArrowLeft color='white' size={16} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white">Settings</h1>
                </div>
                <div className='bg-[#F9FAFA] shadow-lg flex flex-col gap-3 mb-48 rounded-[8px] p-4 mt-3' >
                    {menuItems?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => item?.label == "Payment Method" ? navigate("/app/payment-method") :item?.label == "Subscription" ? navigate("/app/subscription"):handleItemClick(item.label)}
                            className="flex items-center justify-between rounded-[12px] px-6 py-4 bg-[#FFFFFF] border-b border-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                        >
                            <span className={`text-[14px] font-medium ${item.color}`}>
                                {item.label}
                            </span>
                            <MdOutlineKeyboardArrowRight size={20} className=" text-[#181818]" />
                        </div>
                    ))}

                </div>
            </div>
            {activeModal == "Terms & Conditions" && <TermsConditionModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            {activeModal == "Privacy Policy" && <PrivacyPolicyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            {activeModal == "Change Password" && <ChangedPassword isOpen={isOpen} setIsOpen={setIsOpen} SetSuccessfulUpdate={SetSuccessfulUpdate} successFullUpdate={successFullUpdate} />}
            {activeModal == "Notification Settings" && <NotificationSettings isOpen={isOpen} setIsOpen={setIsOpen} SetSuccessfulUpdate={SetSuccessfulUpdate} successFullUpdate={successFullUpdate} />}
            {activeModal == "Log Out" && <LogOutModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            {activeModal == "Report An Issue" && <ReportAnIssueModal isOpen={isOpen} setIsOpen={setIsOpen} />}

            <PasswordUpdateModal isOpen={successFullUpdate} setIsOpen={SetSuccessfulUpdate} />

            <Footer />
        </div>
    )
}
