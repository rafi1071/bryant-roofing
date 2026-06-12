import React, { useState } from "react";
import { Project } from "../types";
import { Calendar, Shield, Clock, HardHat, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioCardProps {
  project: Project;
  key?: string;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  const [viewState, setViewState] = useState<"after" | "before">("after");

  return (
    <div 
      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
      id={`portfolio-project-${project.id}`}
    >
      {/* Before/After Media Stage */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          {viewState === "after" ? (
            <motion.img
              key="after-img"
              src={project.afterImage}
              alt={`${project.title} - After`}
              className="absolute inset-0 w-full h-full object-cover select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              referrerPolicy="no-referrer"
            />
          ) : (
            <motion.img
              key="before-img"
              src={project.beforeImage}
              alt={`${project.title} - Before`}
              className="absolute inset-0 w-full h-full object-cover select-none brightness-75 contrast-95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>

        {/* Dynamic Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 bg-slate-900/90 backdrop-blur-md text-white font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
            <HardHat className="w-3 h-3 text-orange-500" /> {project.type}
          </span>
        </div>

        {/* Before / After Selector Controls (Floating Overlay) */}
        <div className="absolute bottom-4 right-4 z-10 flex bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-xl">
          <button
            type="button"
            onClick={() => setViewState("before")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wide cursor-pointer ${
              viewState === "before"
                ? "bg-orange-500 text-white shadow-mdScale"
                : "text-slate-350 hover:text-white"
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setViewState("after")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wide cursor-pointer ${
              viewState === "after"
                ? "bg-orange-500 text-white shadow-mdScale"
                : "text-slate-350 hover:text-white"
            }`}
          >
            After Photo
          </button>
        </div>

        {/* View Indicator Badge */}
        <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Viewing: {viewState}
        </div>
      </div>

      {/* Content Space */}
      <div className="p-6 space-y-4">
        <div>
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{project.location}</span>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors mt-0.5">
            {project.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Custom Specifications Grid */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Clock className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wider">Duration</span>
            <span className="text-xs font-bold text-slate-800">{project.specs.duration}</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Shield className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wider">Warranty</span>
            <span className="text-[10px] font-bold text-slate-800 leading-tight block truncate" title={project.specs.warranty}>
              {project.specs.warranty.split(" ")[0]} Year Guarantee
            </span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Calendar className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wider">Completed</span>
            <span className="text-xs font-bold text-slate-800">{project.completedDate}</span>
          </div>
        </div>

        {/* Shingle Spec footer */}
        <div className="bg-slate-900/5 text-slate-700 p-2 px-3 rounded-lg text-xs font-semibold flex justify-between items-center text-[11px]">
          <span>Material:</span>
          <span className="text-slate-900 font-bold font-mono">{project.specs.material}</span>
        </div>
      </div>
    </div>
  );
}
