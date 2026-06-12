import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "footer" | "landing";
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ variant = "light", className = "", iconOnly = false }: LogoProps) {
  // Red color matching the Bryant Roofing Logo Red: #c90e19
  const logoRed = "#c90e19";

  // Text color based on theme variant
  let textColorClass = "text-white";
  if (variant === "dark") {
    textColorClass = "text-slate-950";
  } else if (variant === "footer") {
    textColorClass = "text-white";
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 🏠 Beautiful Custom SVG Roof Icon matching the uploaded logo */}
      <svg
        viewBox="0 0 100 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 shrink-0 drop-shadow-md"
        aria-hidden="true"
      >
        {/* Left Roof Plane with Chimney */}
        <path
          d="M 15 45 L 27 33 L 27 15 L 35 15 L 35 25 L 50 10 L 50 18 L 23 45 Z"
          fill={logoRed}
        />
        {/* Right Roof Plane (separated by parallel diagonal gap) */}
        <path
          d="M 54 10 L 89 45 L 81 45 L 54 18 Z"
          fill={logoRed}
        />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`block font-black tracking-tight leading-none text-lg ${textColorClass}`}>
            BRYANT <span className="text-[#c90e19]">ROOFING</span>
          </span>
          <span className={`block text-[9px] uppercase tracking-widest font-black mt-0.5 ${
            variant === "dark" ? "text-slate-500" : "text-slate-400"
          }`}>
            {variant === "landing" ? "Texas Dispatch Hub" : "Texas' Elite Contractor"}
          </span>
        </div>
      )}
    </div>
  );
}
