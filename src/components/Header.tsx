import React, { useState, useEffect } from "react";
import { Phone, ShieldCheck, MapPin, Menu, X } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLandingPage = currentPath === "/contact";

  // Navigation Links for standard brand homepage
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "#services" },
    { label: "Recent Projects", path: "#portfolio" },
    { label: "Why Choose Us", path: "#why-us" },
    { label: "Reviews", path: "#reviews" },
    { label: "FAQs", path: "#faqs" },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith("#")) {
      e.preventDefault();
      onNavigate("/"); // Navigate to home
      setTimeout(() => {
        const id = path.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      onNavigate(path);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isLandingPage 
          ? "bg-slate-900 border-b border-slate-800 text-white py-3.5" 
          : "bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-900 border-b border-slate-100"
      }`}
      id="main-app-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={(e) => handleLinkClick(e, "/")}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <Logo variant={isLandingPage ? "light" : "dark"} />
            </button>
          </div>

          {/* Conditional Layout */}
          {!isLandingPage ? (
            <>
              {/* Desktop Brand Navigation */}
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-slate-650 hover:text-orange-500"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-4">
                <a 
                  href="tel:+14783020319"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight py-2 px-3.5 rounded-lg border transition-all text-slate-800 border-slate-200 hover:bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500 fill-current animate-pulse" />
                  <span>(478) 302-0319</span>
                </a>
                
                <button
                  onClick={(e) => handleLinkClick(e, "/contact")}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4.5 rounded-lg shadow-md hover:shadow-orange-500/10 cursor-pointer active:scale-[0.98] transition-all"
                >
                  Get Free Estimate
                </button>
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg cursor-pointer text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            /* Ad Landing Header: No Navigation Distractions, strictly Focused on Lead Generation */
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-800/60 py-1.5 px-3 rounded-lg border border-slate-700/50">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Licensed & Fully Insured Contractor</span>
              </div>
              <a 
                href="tel:+14783020319" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 fill-current animate-pulse" />
                <span className="hidden xs:inline">Click To Call:</span>
                <span>(478) 302-0319</span>
              </a>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Drawer navigation (for standard brand homepage only) */}
      {!isLandingPage && isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 text-slate-900 shadow-2xl overflow-hidden py-4 px-4 space-y-4">
          <div className="flex flex-col gap-3 font-sans">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="text-left py-2 px-3 rounded hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-orange-500"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-200 flex flex-col md:flex-row gap-3 font-sans">
            <a 
              href="tel:+14783020319" 
              className="bg-slate-50 text-center py-2.5 rounded-lg border border-slate-200 text-xs font-bold flex items-center justify-center gap-2 text-slate-800 hover:bg-slate-100"
            >
              <Phone className="w-4 h-4 text-orange-500 fill-current" />
              <span>(478) 302-0319</span>
            </a>
            <button
              onClick={(e) => handleLinkClick(e, "/contact")}
              className="bg-orange-500 text-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white shadow-lg"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
