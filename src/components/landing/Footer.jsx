import React, { useRef } from "react";
import { gsap } from "gsap";
import logoWhite from "../../assets/logo-white.png";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
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
      }
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
                <p className="text-xs tracking-[0.3em] uppercase opacity-70">
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
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
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
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.9c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:contactbridgesolutions@gmail.com"
              className="text-[#1CD2FF] hover:text-white"
            >
              <span className="sr-only">Email</span>
              <FaEnvelope className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
