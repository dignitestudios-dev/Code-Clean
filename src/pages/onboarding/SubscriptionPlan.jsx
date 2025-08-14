import React, { useEffect } from 'react';
import { Button } from '../../components/global/GlobalButton';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../../redux/slices/provider.slice';

const SubscriptionPlans = ({handleNext}) => {
    const dispatch=useDispatch();
    const {plans}=useSelector((state)=>state?.provider)
  useEffect(()=>{
    dispatch(getPlans());
  },[])
     console.log(plans,"plans")
    const plansSub = [
        {
            id: 'plan-01',
            name: 'Plan 01',
            type: 'Enterprise',
            price: '$800.00',
            features: [
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here'
            ]
        },
        {
            id: 'plan-02',
            name: 'Plan 02',
            type: 'Enterprise',
            price: '$800.00',
            features: [
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here'
            ]
        },
        {
            id: 'plan-03',
            name: 'Plan 03',
            type: 'Enterprise',
            price: '$800.00',
            features: [
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here'
            ]
        },
        {
            id: 'plan-04',
            name: 'Plan 04',
            type: 'Enterprise',
            price: '$800.00',
            features: [
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here',
                'Feature text goes here'
            ]
        }
    ];


    return (
        <div className="min-h-screen w-full py-4 ">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2">
                        Subscription Plan
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4 md:px-0">
                       Please add your Government ID card to verify your account
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 w-full sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {plans&&plans?.map((plan,index) => (
                        <div
                            key={plan?.id}
                            style={{
                                boxShadow: "6px 6px 54px 0px #0000000A"
                            }}
                            className="bg-[#FFFFFF] rounded-[14px] border border-[#F4F4F4] shadow-md hover:shadow-lg transition-shadow duration-300 p-3 sm:p-4 md:p-6 lg:p-8"
                        >
                            {/* Plan? Header */}
                            <div className="mb-4 sm:mb-5 md:mb-6">
                                <h3 className="text-base sm:text-lg md:text-[12px] font-[500] text-[#181818] mb-1">
                                   Plan {index+1}
                                </h3>
                                <p className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent text-xs sm:text-sm md:text-[12px] font-[500] mb-2 sm:mb-3"> {plan?.name}</p>
                                <p className="text-xl sm:text-2xl md:text-3xl lg:text-23px font-bold text-[#0099DE]">${plan?.amount}</p>
                            </div>

                            {/* Features */}
                            <div className="mb-6 sm:mb-7 md:mb-8">
                               <p  className="text-[#181818B2] text-xs sm:text-sm md:text-[12px] font-[400] mb-1 sm:mb-2">
                                        {plan.description}
                                    </p>
                            </div>

                            <Button onClick={handleNext} text={"Buy Now"}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlans;