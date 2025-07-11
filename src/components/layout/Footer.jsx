import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Logo } from "../../assets/export";
const Footer = () => {
  return (
    <footer className="bg-[#F5FCFF] text-blue-900 mt-5 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img src={Logo} alt="CodeClean Logo" className="h-20 mb-2" />
          </div>

          {/* Middle: Social Links */}
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-3">
              Find us on{" "}
              <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent">
                Social Media
              </span>
            </h4>
            <div className="flex gap-4 justify-center">
              <a
                href="#"
                className="border border-blue-400 text-[#27A8E2] rounded-full p-2 hover:bg-blue-100 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="border border-blue-400 text-[#27A8E2] rounded-full p-2 hover:bg-blue-100 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="border border-blue-400 text-[#27A8E2] rounded-full p-2 hover:bg-blue-100 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-2">
              We’re always happy to help.
            </h4>
            <a
              href="mailto:info@codeclean.com"
              className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
            >
              info@codeclean.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-blue-200" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-2">
          <p className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">
            © 2024 CodeClean. All rights reserved.
          </p>
          <div className="flex gap-4 bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">
            <a href="#" className="hover:underline">
              Terms of Services
            </a>
            <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">|</span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">|</span>
            <a href="#" className="hover:underline">
              FAQs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
