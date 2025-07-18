import React, { useState } from 'react'
import { CupIcon, FifthYear, FourthYear, HeroBg, LockDarkIcon, LockIcon, OneHalf, OneYear, SixMonth, ThreeMonth, ThreeYear, TickIcon, TwoYear } from '../../../assets/export'
import { FaArrowLeft } from 'react-icons/fa'
import Navbar from '../../../components/layout/Navbar'
import BadgeModal from '../../../components/app/Badge/BadgeModal'
import Footer from '../../../components/layout/Footer'

export default function Badgesp() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState(null);
    const BagdeData = [
        {
            icon: ThreeMonth,
            title: "Code 3 Months Clean",
            bio: "You’ve just unlocked the 3 Months Clean badge! Keep it up Consistency is the first step to greatness."
        },
        {
            icon: SixMonth,
            title: "Code 6 Months Clean",
            bio: "You’ve just unlocked the 6 Months Clean badge! Half a year of excellence — we see your effort!"
        },
        {
            icon: OneYear,
            title: "Code 1 Year Clean",
            bio: "You’ve just unlocked the 1 Year Clean badge! A full year of spotless service — truly impressive."
        },
        // {
        //     icon: OneHalf,
        //     title: "Congratulations",
        //     bio: "You’ve just unlocked the 1.5 Years Clean badge! Your dedication keeps shining through."
        // },
        // {
        //     icon: TwoYear,
        //     title: "Congratulations",
        //     bio: "You’ve just unlocked the 2 Years Clean badge! Two years of trust and responsibility — outstanding!."
        // },
        // {
        //     icon: ThreeYear,
        //     title: "Congratulations",
        //     bio: "You’ve just unlocked the 3 Years Clean badge! You’re setting the gold standard!"
        // },
        // {
        //     icon: FourthYear,
        //     title: "Congratulations",
        //     bio: "You’ve just unlocked the 4 Years Clean badge! You’ve built a reputation that speaks volumes."
        // },
        // {
        //     icon: FifthYear,
        //     title: "Congratulations",
        //     bio: "You’ve just unlocked the 5 Years Clean badge! Half a decade of excellence — legendary!"
        // },
    ]
    const LockBagdeData = [
        {
            icon: OneHalf,
            title: "Code 1.5 Year Clean",
            bio: "Lorem ipsum dolor sit amet consectetur. Dictumst justo elementum at purus."
        },
        {
            icon: TwoYear,
            title: "Code 2 Years Clean",
            bio: "Lorem ipsum dolor sit amet consectetur. Dictumst justo elementum at purus."
        },
        {
            icon: ThreeYear,
            title: "Code 3 Years Clean",
            bio: "Lorem ipsum dolor sit amet consectetur. Dictumst justo elementum at purus."
        },
        {
            icon: FourthYear,
            title: "Code 4 Years Clean",
            bio: "Lorem ipsum dolor sit amet consectetur. Dictumst justo elementum at purus."
        },
        {
            icon: FifthYear,
            title: "Code 5 Years Clean",
            bio: "Lorem ipsum dolor sit amet consectetur. Dictumst justo elementum at purus."
        },
    ]

    return (
        <>
            <Navbar type="serviceprovider" />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
            </div>
            <div className='h-full px-40   -mt-80 bottom-0 items-center gap-3 '>

                <h3 className='font-semibold text-[#FFFFFF]  text-[32px]' >Badges</h3>
                <div className='bg-white shadow-lg mb-48 rounded-[8px] p-10 mt-3' >

                    <h3 className='flex items-center gap-2 text-[#000000] font-[700] text-[24px] '  >
                        <img src={CupIcon} className='w-4' alt="CupIcon" /> Badges You've Earned</h3>
                    <div className='mt-8 grid gap-3 grid-cols-3 '>
                        {
                            BagdeData?.map((item, i) => (
                                <div className='flex items-center gap-3 cursor-pointer' onClick={() => {
                                    setCurrentDetail(item);
                                    setIsOpen(!isOpen)
                                }}  >
                                    <div className='w-[140px] h-[100px] rounded-[50%] border-2 border-[#D18537]'>
                                        <img src={item?.icon} className='w-20 mx-auto mt-3 ' alt="CupIcon" />
                                    </div>
                                    <div className='mt-3 w-full'>
                                        <h3 className='text-[#000000] flex items-center gap-1 text-[18px] font-bold'>{item?.title} <img src={TickIcon} className='w-4' alt="" srcset="" />  </h3>
                                        <p className='text-[12px] font-[500] text-[#00000075]'>{item?.bio}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <h3 className='flex items-center mt-40 gap-2 text-[#000000]  font-[700] text-[24px] '  >
                        <img src={LockIcon} className='w-4' alt="CupIcon" /> Badges You Can Still Earn</h3>
                    <div className='mt-8 grid gap-3 gap-y-6 grid-cols-3 '>
                        {
                            LockBagdeData?.map((item, i) => (
                                <div className='flex items-center gap-3 '  >
                                    <div className='w-[140px] h-[100px] rounded-[50%] border-2 border-[#8f9090] border-dashed'>
                                        <img src={item?.icon} className='w-20 mx-auto mt-3 opacity-40 ' alt="CupIcon" />
                                    </div>
                                    <div className='mt-3 w-full'>
                                        <h3 className='text-[#000000] flex items-center gap-1 text-[18px] font-bold'>{item?.title} <img src={LockDarkIcon} className='w-4' alt="" srcset="" />  </h3>
                                        <p className='text-[12px] font-[500] text-[#00000075]'>{item?.bio}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <BadgeModal isOpen={isOpen} setIsOpen={setIsOpen} detail={currentDetail} />
            <Footer />
        </>

    )
}
