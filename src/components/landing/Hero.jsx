import React, { useRef } from "react";
import { gsap } from "gsap";
import heroBG from './../../assets/heroBG.png';
import { FaPhoneAlt } from "react-icons/fa";

const Hero = () => {
  const phoneIconRef = useRef(null);

  // Identity animation from your CardNav
  const handlePhoneHover = () => {
    if (!phoneIconRef.current) return;
    gsap.fromTo(
      phoneIconRef.current,
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
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-[#0F2854]">
      {/* Background Layer 
          - Shifted slightly left (40%) to balance the left-aligned text
      */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-in-out bg-[position:60%_center] lg:bg-[position:45%_center]"
        style={{
          backgroundImage: `url(${heroBG})`,
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:from-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1400px] pt-20 mx-auto px-8 md:px-16 lg:px-24 select-none">
        <div className="max-w-2xl text-left ">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#F8FBFF] leading-[0.9] tracking-normal uppercase">
            GROW <br />
            BEYOND <br />
            LIMITS
          </h1>
          
          <p className="mt-2 text-lg md:text-xl text-gray-200 max-w-lg font-medium leading-tight">
            We drive growth through Strategic Marketing, 
            Web Solutions & Data Insights for your business.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Primary Button - Phone Icon now explicitly flexed for all screens */}
            <button 
              onMouseEnter={handlePhoneHover}
              className="group flex items-center justify-center gap-2 px-6 py-4 bg-[#F8FBFF] text-[#0F2854] font-bold hover:cursor-pointer rounded-lg transition-colors duration-300 shadow-xl sm:w-72"
            >
              <div ref={phoneIconRef} className="flex items-center justify-center">
                <FaPhoneAlt className="text-sm" />
              </div>
              <span className="whitespace-nowrap uppercase">LET'S PLAN YOUR GROWTH</span>
            </button>
            
            {/* Secondary Button - Removed excessive scale on hover */}
            <button className="flex items-center justify-center px-6 py-4 border-2 border-[#F8FBFF] text-[#F8FBFF] font-bold rounded-lg hover:bg-[#F8FBFF]/30 hover:cursor-pointer transition-colors duration-300 uppercase tracking-wide sm:w-72">
              EXPLORE OUR SERVICES
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0F2854] to-transparent opacity-60" />
    </section>
  );
};

export default Hero;