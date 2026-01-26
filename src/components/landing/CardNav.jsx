import {APP_CONFIG} from "../../config/app.config.js";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import logoWhite from "./../../assets/logo-white.png";

const CardNav = ({
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power4.inOut",
  baseColor = "#0F2854",
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const phoneRef = useRef(null);

  const BASE_HEIGHT = 80;

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

  /**
   * DYNAMIC HEIGHT CALCULATION
   * Measures the actual rendered height of the content container
   */
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return BASE_HEIGHT;

    const contentEl = navEl.querySelector(".card-nav-content");
    if (!contentEl) return BASE_HEIGHT;

    // Temporarily reset styles to measure real height
    const prev = {
      visibility: contentEl.style.visibility,
      position: contentEl.style.position,
      display: contentEl.style.display,
      height: contentEl.style.height
    };

    Object.assign(contentEl.style, {
      visibility: "hidden",
      position: "absolute",
      display: "flex",
      height: "auto"
    });

    // Capture the height + padding offsets
    const contentHeight = contentEl.offsetHeight;

    // Restore original styles
    Object.assign(contentEl.style, prev);

    // Return Base (header) + Content + Bottom Padding (24px)
    return BASE_HEIGHT + contentHeight;
  };

  const createTimeline = () => {
    if (!navRef.current) return null;

    // Initialize state
    gsap.set(navRef.current, { height: BASE_HEIGHT, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navRef.current, {
      height: () => calculateHeight(), // Use function call to get fresh value
      duration: 0.6,
      ease,
    }).to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08,
      },
      "-=0.3"
    );

    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = createTimeline();
    return () => tlRef.current?.kill();
  }, [items]);

  useLayoutEffect(() => {
    const onResize = () => {
      if (!tlRef.current) return;
      
      // If menu is open during resize, we recalculate and snap to new height
      if (isExpanded) {
        gsap.to(navRef.current, {
          height: calculateHeight(),
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        tlRef.current.kill();
        tlRef.current = createTimeline();
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      setIsHamburgerOpen(false);
      tl.reverse().eventCallback("onReverseComplete", () =>
        setIsExpanded(false)
      );
    }
  };

  return (
    <div className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-[99] top-3 md:top-4 ${className} select-none`}>
      <nav
        ref={navRef}
        className="block rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md transition-shadow duration-300"
        style={{ backgroundColor: baseColor }}
      >
        {/* Main Header Row */}
        <div className="h-[80px] flex items-center justify-between px-6 md:px-10 text-[#F8FBFF]">
          {/* Hamburger Toggle */}
          <div
            role="button"
            onClick={toggleMenu}
            className="flex flex-col justify-center items-start gap-[6px] cursor-pointer group w-10"
          >
            <span className={`h-[2px] bg-white transition-all duration-300 ${isHamburgerOpen ? "w-7 translate-y-[8px] rotate-45" : "w-7"}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${isHamburgerOpen ? "opacity-0" : "w-5"}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${isHamburgerOpen ? "w-7 -translate-y-[8px] -rotate-45" : "w-7"}`} />
          </div>

          {/* Logo Branding */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <img src={logoWhite} alt={logoAlt} className="h-10 md:h-12 w-auto object-contain" />
            <div className="hidden md:flex flex-col leading-tight border-l border-white/20 pl-3">
              <h1 className="text-2xl font-bold tracking-wide">BRIDGE</h1>
              <p className="text-s tracking-[0.2em] opacity-70">Solutions</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center">
            <button
              className="group flex items-center justify-center gap-2 px-5 py-2.5 font-bold rounded-lg text-xs md:text-sm uppercase transition-all border-2 border-white/20 bg-white/10 hover:bg-white hover:text-[#0F2854] hover:cursor-pointer shadow-md"
              onMouseEnter={handleHover}
              onClick={
              () =>
                  window.open(
                      APP_CONFIG.calendly.meeting,
                      "_blank"
                  )
              }
            >
              <FaPhoneAlt ref={phoneRef} />
              <span className="hidden lg:inline ml-1 tracking-wide">Free 1:1 Call</span>
            </button>
          </div>
        </div>

        {/* Expanded Content: The source for dynamic height */}
        <div
          className={`card-nav-content w-full p-6 md:p-8 flex flex-col md:flex-row gap-4 ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {(items || []).map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex-1 rounded-2xl p-6 shadow-lg flex flex-col justify-between min-h-[200px]"
              style={{
                backgroundColor: item.bgColor || "rgba(255,255,255,0.05)",
                color: item.textColor || "#FFFFFF",
              }}
            >
              <div className="text-xl font-bold mb-6">{item.label}</div>
              <div className="flex flex-col gap-3">
                {item.links?.map((lnk, j) => (
                  <a
                    key={j}
                    href={lnk.href}
                    className="flex items-center justify-between group text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {lnk.label}
                    <GoArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;