import React from 'react'
import { ChoosUs } from '../../../assets/export'

export default function ChooseUs() {
  return (
     <section id='whyus' className="bg-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-28">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <p className="text-[#26A7E2] font-medium mb-2">Why Choose Us?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            Seamless, Secure, and <br />
            Hassle-Free{" "}
            <span className="text-[#26A7E2]">Service Booking</span>
          </h2>
          <p className="text-gray-600 mb-4">
            We make finding and hiring trusted service providers effortless.
            All professionals on our platform are verified and
            background-checked, ensuring reliability and quality service.
          </p>
          <p className="text-gray-600">
            Our smart location-based matching connects you with the nearest
            available providers for faster response times. With seamless
            in-app communication, you can easily chat with service providers
            to discuss details before booking. Plus, our secure payment
            system ensures hassle-free transactions with transparent pricing
            and multiple payment options. Experience convenience, reliability,
            and efficiency—all in one place.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2">
          <img
            src={ChoosUs}
            alt="Service Team"
            className="w-full h-auto object-cover "
          />
        </div>
      </div>
    </section>
  )
}
