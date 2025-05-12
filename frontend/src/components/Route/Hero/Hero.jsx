import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative min-h-[70vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/background mrk.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center w-11/12 max-w-3xl">
        <h1 className="text-[35px] text-white font-bold font-[cursive] drop-shadow-md mb-4 animate-slideInLeft">
          MRK Engineering Works & Fabricators
        </h1>
        <p className="text-lg text-white text-opacity-85 font-[cursive] drop-shadow-md mb-4">
          We provide high-quality engineering and fabrication solutions for
          industrial and residential projects. Our services ensure durability,
          precision, and innovation. Experience top-notch craftsmanship and
          tailored solutions with MRK Engineering Works & Fabricators.
        </p>
        <Link to="/products">
          <button className="mt-4 bg-blue-500 px-6 py-2 rounded text-white text-lg font-[cursive] transition-all duration-300 hover:bg-blue-700">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slideInLeft {
            animation: slideInLeft 1.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
