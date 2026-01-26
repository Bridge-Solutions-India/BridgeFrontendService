import React, { useRef } from "react";
import { gsap } from "gsap";
import logoWhite from "../../assets/logo-white.png";
import {
  FaPhoneAlt,
  FaLinkedinIn,
  FaInstagram,
  FaRegEnvelope,
} from "react-icons/fa";
import { APP_CONFIG } from "../../config/app.config.js";

export default function Footer() {
  const phoneRef = useRef(null);

  const handleHover = () => {
    if (!phoneRef.current) return;
    gsap.fromTo(
      phoneRef.current,
      { rotation: -10 },
      {
        rotation: 10,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
      },
    );
  };

  return (
    <footer className="bg-[#031226] text-white py-16">
      <div className="w-[92%] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logoWhite}
                alt="Bridge Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight font-montserrat border-l border-white/20 pl-3">
                <h1 className="text-2xl font-bold tracking-wide">BRIDGE</h1>
                <p className="text-s tracking-[0.2em] opacity-70">
                  Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Helping Businesses reach their Target Audience Beyond Limitations
              through Strategic Digital Marketing and Software Solutions.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <span className="font-semibold text-gray-400">PHONE :</span> +91
                97514 45916
              </p>
              <p>
                <span className="font-semibold text-gray-400">EMAIL :</span>{" "}
                contactbridgesolutions@gmail.com
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Who Are we",
                "Our services",
                "Contact Us",
                "Blogs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Connect with us</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Ready to discuss your growth strategy? Book a personalized
              consultation with us for free.
            </p>
            <button
              onMouseEnter={handleHover}
              className="bg-transparent border-2 border-[#1CD2FF] text-[#1CD2FF] hover:bg-[#1CD2FF] hover:text-[#031226] cursor-pointer px-6 py-3 rounded-md flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-[#1CD2FF]/30 text-sm font-semibold"
              onClick={
                () =>
                    window.open(
                        APP_CONFIG.calendly.meeting,
                        "_blank"
                    )
              }
            >
              <FaPhoneAlt ref={phoneRef} className="h-4 w-4" />
              Schedule Call Now
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Bridge Solutions. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            {/* LinkedIn */}
            <a
              href={APP_CONFIG.socials.linkedIn}
              target="_blank"
              className="text-[#1CD2FF] hover:text-white"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedinIn className="h-6 w-6" />
            </a>
            {/* X (Twitter) */}
            <a
              href={APP_CONFIG.socials.twitter}
              target="_blank"
              className="text-[#1CD2FF] hover:text-white"
            >
              <span className="sr-only">X</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                <path
                  fillRule="evenodd"
                  d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={APP_CONFIG.socials.instagram}
              target="_blank"
              className="text-[#1CD2FF] hover:text-white"
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </a>
            {/* Email */}
            <a
              href="mailto:contactbridgesolutions@gmail.com"
              className="text-[#1CD2FF] hover:text-white"
            >
              <span className="sr-only">Email</span>
              <FaRegEnvelope className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
