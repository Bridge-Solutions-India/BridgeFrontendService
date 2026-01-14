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

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    if (window.innerWidth > 768) return 320;

    const contentEl = navEl.querySelector(".card-nav-content");
    if (!contentEl) return 300;

    const prev = {
      visibility: contentEl.style.visibility,
      position: contentEl.style.position,
      display: contentEl.style.display,
    };

    Object.assign(contentEl.style, {
      visibility: "visible",
      position: "static",
      display: "flex",
    });

    const height = BASE_HEIGHT + contentEl.scrollHeight + 20;

    Object.assign(contentEl.style, prev);
    return height;
  };

  const createTimeline = () => {
    if (!navRef.current) return null;

    gsap.set(navRef.current, { height: BASE_HEIGHT, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navRef.current, {
      height: calculateHeight,
      duration: 0.5,
      ease,
    }).to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.2"
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
      const progress = tlRef.current.progress();
      tlRef.current.kill();
      tlRef.current = createTimeline();
      if (isExpanded) tlRef.current.progress(progress || 1);
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
    <div
      className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-[99] top-3 md:top-4 ${className} select-none caret-transparent`}
    >
      <nav
        ref={navRef}
        className="block rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-sm select-none caret-transparent"
        style={{ backgroundColor: baseColor }}
      >
        {/* Main Header Row */}
        <div
          className={`h-[80px] flex items-center justify-between px-6 md:px-10 text-[#F8FBFF] select-none caret-transparent`}
        >
          {/* Hamburger Menu Toggle */}
          <div
            role="button"
            onClick={toggleMenu}
            className="flex flex-col justify-center items-start gap-[5px] cursor-pointer group w-10 select-none caret-transparent"
          >
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${
                isHamburgerOpen ? "w-7 translate-y-[7px] rotate-45" : "w-7"
              }`}
            />
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${
                isHamburgerOpen ? "opacity-0" : "w-5"
              }`}
            />
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${
                isHamburgerOpen ? "w-7 -translate-y-[7px] -rotate-45" : "w-7"
              }`}
            />
          </div>

          {/* Centered Logo & Branding */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 select-none caret-transparent">
            <img
              src={logoWhite}
              alt={logoAlt}
              className="h-10 md:h-12 w-auto object-contain"
            />

            {/* Text only visible on medium and larger screens */}
            <div className="hidden md:flex flex-col leading-tight font-montserrat border-l border-white/20 pl-3 select-none caret-transparent">
              <h1 className="text-xl md:text-2xl font-bold tracking-wide select-none caret-transparent">
                BRIDGE
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-70 select-none caret-transparent">
                Solutions
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-[10px] text-sm uppercase transition-all duration-300 select-none caret-transparent border-3 border-[#F8FBFF] bg-[#0F2854] text-[#F8FBFF] hover:bg-[#F8FBFF] hover:text-[#0F2854]"
              onMouseEnter={handleHover}
            >
              <FaPhoneAlt ref={phoneRef} className="w-4 h-4" />
              {/* Show text only on large screens */}
              <span className="hidden lg:inline">FREE 1:1 CALL</span>
            </button>
          </div>
        </div>

        {/* Expanded Card Content */}
        <div
          className={`card-nav-content absolute inset-x-0 top-[80px] p-6 flex flex-col md:flex-row gap-4 select-none caret-transparent ${
            isExpanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {(items || []).slice(0, 3).map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex-1 rounded-xl p-6 transition-transform hover:-translate-y-1 shadow-sm flex flex-col justify-between min-h-[180px] select-none caret-transparent"
              style={{
                backgroundColor: item.bgColor || "#1A3A6D",
                color: item.textColor || "#FFFFFF",
              }}
            >
              <div>
                <div className="text-2xl font-bold mb-4 select-none caret-transparent">
                  {item.label}
                </div>
              </div>
              <div className="flex flex-col gap-2 select-none caret-transparent">
                {item.links?.map((lnk, j) => (
                  <a
                    key={j}
                    href={lnk.href}
                    className="flex items-center justify-between group text-sm font-medium opacity-90 hover:opacity-100 select-none caret-transparent"
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