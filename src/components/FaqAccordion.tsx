import React, { useState } from "react";
import { FAQItem } from "../types";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqAccordionProps {
  faqs: FAQItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>("faq1"); // default leave the first one open

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto" id="roofing-faq-accordion">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div 
            key={faq.id}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen 
                ? "border-orange-500 bg-orange-50/10 shadow-md" 
                : "border-slate-100 bg-white hover:border-slate-300 shadow-sm"
            }`}
            id={`faq-item-${faq.id}`}
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex items-center justify-between p-5 text-left font-sans font-semibold text-slate-900 gap-4 cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? "text-orange-500" : "text-slate-400"}`} />
                <span className="text-sm sm:text-base tracking-tight text-slate-950 font-bold">{faq.question}</span>
              </div>
              <div className={`p-1.5 rounded-full ${isOpen ? "bg-orange-500 text-white" : "bg-slate-50 text-slate-500"}`}>
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-650 leading-relaxed border-t border-dashed border-slate-100">
                    <p className="mt-4 text-slate-600 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
