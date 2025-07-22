import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { linkdin, Logo, twitter } from "../../assets/export";
import { facebook } from "../../assets/export";
import TermsConditionModal from "../global/TermsCondition";
import PrivacyPolicyModal from "../global/PrivacyPolicy";

const Footer = () => {
  const [isOpen, setIsOpen] = useState("");
  const [isOpentwo, setIsOpentwo] = useState("");

  return (
    <footer className="bg-[#F5FCFF] text-blue-900 mt-5 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Logo */}
          <div className="flex flex-col items-center md:items-center">
            <img src={Logo} alt="CodeClean Logo" className="h-[10em] mb-2" />
          </div>

          {/* Middle: Social Links */}
          <div className="text-center md:ml-20">
            <h4 className="font-semibold text-[22px] mb-3 pt-[2.6em]">
              Find us on{" "}
              <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent">
                Social Media
              </span>
            </h4>
            <div className="flex gap-4 justify-center">
              <a href="#">
                <img src={facebook} className="h-10 w-auto" alt="" />

              </a>
              <a href="#">
                <img src={linkdin} className="h-10 w-auto" alt="" />

              </a>
              <a href="#">
                <img src={twitter} className="h-10 w-auto" alt="" />

              </a>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-[19px] pt-10 mb-2">
              We’re always happy to help.
            </h4>
            <a
              href="mailto:info@codeclean.com"
              className="bg-gradient-to-r from-[#00034A]  font-extralight  to-[#27A8E2] bg-clip-text text-transparent"
            >
              info@codeclean.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-blue-200" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-2">
          <p className="bg-gradient-to-r from-[#00034A] font-extralight to-[#27A8E2] bg-clip-text text-transparen">
            Copyright © 2024 CodeClean. All rights reserved.
          </p>
          <div className="flex gap-4 bg-gradient-to-r  font-extralight  from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">
            <a onClick={() => {
              setIsOpen(true)
            }} className="hover:underline cursor-pointer">
              Terms of Services
            </a>
            <TermsConditionModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">|</span>
            <a onClick={()=>{
              setIsOpentwo(true)
            }} className="hover:underline cursor-pointer">
              Privacy Policy
            </a>
            <PrivacyPolicyModal isOpen={isOpentwo} setIsOpen={setIsOpentwo}/>
            <span className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparen">|</span>
            <a href="#faq" className="hover:underline">
              FAQs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
