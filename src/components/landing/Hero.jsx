import React from "react";
import heroBG from './../../assets/heroBG.png';

const Hero = () => {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0F2854]"
    >
      {/* Background Layer */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${heroBG})`,
          /* 'cover' ensures no white space, 
             'contain' would show the whole image but leave gaps.
             We use 'cover' with 'center' but add a focus point if needed.
          */
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay: Using a gradient instead of a flat color 
          makes the "center shrinking" effect feel more balanced 
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

      {/* Hero Content */}
      

      {/* Decorative Bottom Element for Balance */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0F2854] to-transparent" />
    </section>
  );
};

export default Hero;