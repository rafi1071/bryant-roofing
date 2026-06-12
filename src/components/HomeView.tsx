import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  Calendar, 
  ArrowRight, 
  Phone, 
  Star, 
  MapPin, 
  Users, 
  DollarSign, 
  Activity,
  ChevronRight,
  Hammer,
  Wrench,
  Building,
  CloudLightning,
  ClipboardCheck,
  ShieldAlert
} from "lucide-react";
import { SERVICES, PROJECTS, REVIEWS, SERVICE_AREAS } from "../data";
import PortfolioCard from "./PortfolioCard";
import FaqAccordion from "./FaqAccordion";
import { FAQS } from "../data";

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenQuickEstimate: () => void;
}

export default function HomeView({ onNavigate, onOpenQuickEstimate }: HomeViewProps) {
  const [selectedCity, setSelectedCity] = useState(SERVICE_AREAS[0]);

  // Map service icon names to lucide react components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Hammer": return Hammer;
      case "Wrench": return Wrench;
      case "Building": return Building;
      case "CloudLightning": return CloudLightning;
      case "ClipboardCheck": return ClipboardCheck;
      case "ShieldAlert": return ShieldAlert;
      default: return Hammer;
    }
  };

  return (
    <div className="font-sans" id="home-view-container">
      
      {/* 1. Hero Entry Block */}
      <section 
        id="hero-section"
        className="relative bg-slate-900 text-white pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden"
      >
        {/* Ambient Dark Background Graphic overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 pointer-events-none"
          style={{ 
            backgroundImage: `url('/hero_roof.png')` 
          }}
        />
        <div className="absolute inset-0 bg-slate-950/65 pointer-events-none" />
        
        {/* Subtle orange ambient glow */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <ShieldCheck className="w-4 h-4" /> Owens Corning Platinum Certified Contractor
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                Trusted Roofing Experts Serving <span className="text-orange-500">Homeowners & Businesses</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-350 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Owned and operated by local roofing specialist Jason. Licensed, insured, and delivering premium roof replacements, leak repairs, inspections, and storm damage restoration with absolute speed and lifetime warranties.
              </p>

              {/* Dynamic local SEO text based on selected city */}
              <div className="bg-slate-950/60 backdrop-blur-md p-3.5 px-4 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-xl mx-auto lg:mx-0 flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Active Roofing Crews currently operating in <strong className="text-white">{selectedCity.city}, {selectedCity.state}</strong>. Complete cleanup guaranteed.</span>
              </div>

              {/* Buttons panel */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate("/contact")}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  id="hero-get-estimate-btn"
                >
                  Get Free Estimate
                </button>
                <a
                  href="#services"
                  className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-750 active:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl border border-slate-750 transition-colors"
                >
                  View Services
                </a>
              </div>

              {/* Responsive Micro Trust stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="block text-xl md:text-2xl font-black text-orange-500">100%</span>
                  <span className="block text-[10px] text-slate-400 capitalize">Financing Approved</span>
                </div>
                <div>
                  <span className="block text-xl md:text-2xl font-black text-white">4.9 ★</span>
                  <span className="block text-[10px] text-slate-400 capitalize">450+ Verified Reviews</span>
                </div>
                <div>
                  <span className="block text-xl md:text-2xl font-black text-white">24 Hr</span>
                  <span className="block text-[10px] text-slate-400 capitalize">Emergency Dispatch</span>
                </div>
              </div>

            </div>

            {/* Right Form / Bullet points Columns */}
            <div className="lg:col-span-5 bg-slate-950/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 text-left">
              <h3 className="text-lg font-bold text-white tracking-tight mb-4 flex items-center justify-between">
                <span>Request Free Estimate</span>
                <span className="text-[10px] uppercase font-mono font-bold text-green-500 flex items-center gap-1 bg-green-500/10 py-1 px-2.5 rounded-full">
                  ● Online Slot Available
                </span>
              </h3>
              
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Take inside of 15 seconds to request your physical property inspection and certified pricing report. All inspections include full diagnostic photo logs.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => onNavigate("/contact")}
                  className="w-full bg-slate-900 border-2 border-dashed border-slate-800 hover:border-orange-500 text-left p-4 rounded-xl cursor-pointer group hover:bg-slate-900/50 transition-all"
                >
                  <span className="block text-xs font-bold text-slate-400 group-hover:text-orange-400 uppercase tracking-widest text-[10px]">Step 1</span>
                  <span className="block text-sm font-bold text-white mt-1 flex justify-between items-center">
                    <span>Select Roofing Project Type</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-slate-350 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Free multi-point physical roof inspection</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-350 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Owens Corning material match check</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-350 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Insurance-approved pricing software logs</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate("/contact")}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer"
                  id="hero-form-launch-button"
                >
                  Launch Step-By-Step Estimator <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Strip */}
      <section className="bg-slate-950 border-t border-slate-900 text-white py-6" id="trust-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 text-center">
            
            <div className="flex items-center gap-2 shrink-0">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Licensed & Fully Insured</span>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <Award className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Manufacturer Certified</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Warranty Backed (50 Yrs)</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">A+ BBB Accredited</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-orange-400 bg-orange-500/5 py-1 px-3 border border-orange-500/10 rounded-full">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">Financing Available</span>
            </div>

          </div>
        </div>
      </section>


      {/* 3. Services Grid Section */}
      <section id="services" className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/60 p-1 px-3.5 rounded-full inline-block">Elite Roof Solutions</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Comprehensive Roofing Services Crafted For Enduring Protection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We leverage premium certified materials, heavy-duty weather barriers, and specialized, manufacturer-trained crews for every build. Zero shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = getServiceIcon(service.iconName);
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                  id={`service-${service.id}`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-slate-900 group-hover:bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-slate-950/10 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-3 space-y-2 border-t border-dashed border-slate-50">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => onNavigate("/contact")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 group-hover:text-orange-600 cursor-pointer hover:underline"
                    >
                      Book Estimate For This Service <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 4. Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Grid Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-orange-100 rounded-full blur-2xl pointer-events-none" />
              
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
                
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 block">The Bryant Standard</span>
                <h3 className="text-2xl font-black tracking-tight leading-snug">Roofing Done Right. No Exceptions.</h3>
                
                <p className="text-xs text-slate-355 leading-relaxed">
                  Owned and operated by Jason, we don't subcontract your peace of mind. Every technician on our crew is fully background-checked, drug-tested, and certified weekly on latest safety standards.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">In-House Master Crews</h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">We never rely on temporary laborers. Highly coordinated certified teams.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-500">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">Transparent Line-By-Line Pricing</h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">Every quotation maps exact shingle box, underlayer & labor parameters.</p>
                    </div>
                  </div>
                </div>

                {/* Call Out banner */}
                <div className="bg-orange-500 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-orange-100">Need Tarping Fast?</span>
                    <span className="block font-sans font-black text-xs min-[340px]:text-sm">24 HOUR STABILIZATION</span>
                  </div>
                  <a href="tel:+14783020319" className="bg-white text-slate-900 font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1 shadow hover:bg-slate-50">
                    <Phone className="w-3.5 h-3.5 fill-current text-slate-900" /> (478) 302-0319
                  </a>
                </div>
              </div>
            </div>

            {/* Why choose lists */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">Uncompromised Reliability</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Why Houston County & Warner Robins Property Owners Choose Bryant Roofing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                A new roof represents an important investment. We structure our service to protect that capital with high warranties, premium materials, and flawless communication.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    Fast Response Times
                  </h4>
                  <p className="text-xs text-slate-650 pl-4 leading-normal">
                    Estimates back on location in under 24 hours. Leaks stopped immediately.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    Experienced Crews
                  </h4>
                  <p className="text-xs text-slate-650 pl-4 leading-normal">
                    Weekly training schedules and continuous Owens Corning Preferred certifications.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    Transparent Pricing
                  </h4>
                  <p className="text-xs text-slate-650 pl-4 leading-normal">
                    What we quote is what you pay. Zero undisclosed surcharges or decking overrides.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    High-Quality Materials
                  </h4>
                  <p className="text-xs text-slate-650 pl-4 leading-normal">
                    Premium granules and structural warranties featuring heavy-duty architectural options.
                  </p>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="/avatar_marcus.png" alt="Roof replacements" referrerPolicy="no-referrer" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="/avatar_sarah.png" alt="Roof repairs" referrerPolicy="no-referrer" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="/avatar_daniel.png" alt="Metal roofing" referrerPolicy="no-referrer" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">Excellent Customer Reviews (4.9 / 5 Rating)</span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">Approved by homeowners and commercial site managers.</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Portfolio Section (Interactive Before & After) */}
      <section id="portfolio" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-center md:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">Unmatched Artistry</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Our Recent Roofing Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Witness real transformations. Drag or press the toggle buttons inside each listing to compare deteriorated roofing against our heavy architectural finish replacements.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg cursor-pointer"
              >
                Book Your Transformation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-900">
            {PROJECTS.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>


      {/* 6. Customer Testimonial Reviews Segment */}
      <section id="reviews" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/60 p-1 px-3.5 rounded-full inline-block">Homeowner Voice</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Honest Feedback From Real Local Clients
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We gather independent verified surveys on completion. Read what residents in Houston County think.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div 
                key={review.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm relative flex flex-col justify-between"
                id={`customer-testimonial-review-${review.id}`}
              >
                <div className="space-y-4">
                  {/* Stars block */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 text-amber-500 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-650 italic leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center gap-3">
                  <img 
                    src={review.avatarUrl} 
                    alt={review.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block font-bold text-xs text-slate-950 flex items-center gap-1">
                      {review.name}
                      {review.verified && (
                        <span className="inline-block w-4 h-4 text-[9px] bg-green-500 text-white font-black text-center rounded-full" title="Verified Customer">✓</span>
                      )}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{review.location} • {review.projectType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Stats summary block */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-sm font-black text-slate-900 block">★★★★★ 4.9/5 Average Rating</span>
              <span className="text-slate-500 text-xs block">Based on Hundreds of Verified Homeowner Reviews in Houston County, Texas</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-lg active:scale-95 transition-all cursor-pointer"
              >
                Leave A Review
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 7. Local SEO Service Area Dynamic Section (Extremely powerful conversion) */}
      <section id="service-areas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual/Text Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-50 p-1 px-3 py-1 rounded inline-block">Local SEO Roofing</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Proudly Serving Houston County & Warner Robins
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We maintain active roofing crews stationed in different municipal hubs across our service areas. Select your city to check typical response times and find localized material guides.
              </p>

              {/* Service Areas selector buttons */}
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-2.5">
                {SERVICE_AREAS.map((area) => {
                  const isActive = selectedCity.slug === area.slug;
                  return (
                    <button
                      key={area.slug}
                      onClick={() => setSelectedCity(area)}
                      className={`font-semibold text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isActive 
                          ? "border-orange-500 bg-orange-50/30 text-orange-950 font-bold" 
                          : "border-slate-100 hover:border-slate-350 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="block text-xs">{area.city}</span>
                      <span className="block text-[9px] text-slate-400 font-normal uppercase tracking-wide">Zip:{area.zipCodes[0]}+</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic City Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                <span className="text-[10px] uppercase font-bold text-orange-500">Local Area Highlight: {selectedCity.city}, {selectedCity.state}</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Homeowners in <strong>{selectedCity.city}</strong> are eligible for custom Owens Corning siding & roofing warranty packages. Since atmospheric humidity levels in our local area can increase rot risk, we include custom moss-resistant granules and synthetic dual-membrane underlayment at zero surplus markup.
                </p>
                <div className="flex gap-4 text-[11px] font-mono text-slate-500">
                  <span>Coverage: <strong>{selectedCity.zipCodes.join(", ")}</strong></span>
                  <span>Avg Response: <strong>&lt; 90 min</strong></span>
                </div>
              </div>

            </div>

            {/* Simulated Map visual column with Callout */}
            <div className="lg:col-span-6">
              <div className="relative h-80 rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-md flex items-center justify-center">
                {/* Visual Placeholder grid suggesting local geo map rendering */}
                <div className="absolute inset-0 bg-slate-900 flex flex-col justify-between p-6 leading-normal text-white">
                  <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url('/hero_roof.png')` }} />
                  <div className="absolute inset-0 bg-slate-950/75 pointer-events-none" />
                  
                  <div className="z-10 flex justify-between items-start">
                    <span className="bg-orange-500 text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                      BRYANT ACTIVE ZONE
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">GEO COORDINATE ENCODED</span>
                  </div>

                  <div className="z-10 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 self-center text-center max-w-sm">
                    <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2 animate-bounce" />
                    <h4 className="font-bold text-sm text-white">Houston County & Warner Robins Dispatch</h4>
                    <p className="text-[10.5px] text-slate-350 mt-1">Our field engineers are certified on local structural codes in {selectedCity.city}. Ready to inspect.</p>
                  </div>

                  <div className="z-10 flex justify-between items-center text-[10px] text-slate-500">
                    <span>Active Trucks: 12 Units deployed</span>
                    <span>Fully bonded certified</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 8. FAQ Section */}
      <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/60 p-1 px-3.5 rounded-full inline-block">Frequently Asked</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Roofing Pricing & Process Questions Answered
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-normal">
              Get standard industry facts transparently. No jargon, just clear guidelines.
            </p>
          </div>

          <FaqAccordion faqs={FAQS} />

        </div>
      </section>


      {/* 9. Final Conversion CTA Section */}
      <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden" id="final-cta">
        <div className="absolute inset-0 bg-cover bg-center scale-105 pointer-events-none" style={{ backgroundImage: `url('/hero_roof.png')` }} />
        <div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-6">
          <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-orange-500/20">
            No Obligation • Fully Secured
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready For Your Free Roofing Estimate?
          </h2>
          
          <p className="text-sm sm:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed font-normal">
            Secure your elite, physical roof inspection from certified master roofers representing Houston County, Texas. Our detailed estimates include high-definition photographic error reports.
          </p>

          <div className="pt-4 flex flex-col xs:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="w-full xs:w-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl shadow-xl shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              id="final-cta-get-estimate"
            >
              Get Free Estimate Today
            </button>
            <a
              href="tel:+14783020319"
              className="w-full xs:w-auto bg-slate-800 hover:bg-slate-755 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl border border-slate-750 inline-flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4 fill-current text-orange-500" />
              <span>(478) 302-0319</span>
            </a>
          </div>

          <p className="text-[10px] text-slate-500">
            *Offers active for Houston County & Warner Robins neighborhoods.
          </p>
        </div>
      </section>

    </div>
  );
}
