import { ShieldAlert, Phone, Mail, MapPin, Star, Award, Shield } from "lucide-react";
import { SERVICE_AREAS } from "../data";
import Logo from "./Logo";

interface FooterProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Footer({ currentPath, onNavigate }: FooterProps) {
  const isLandingPage = currentPath === "/contact";

  // List of professional industry organizations
  const associations = [
    { label: "GAF Master Elite", desc: "Top 2% Certified Contractors" },
    { label: "Owens Corning", desc: "Preferred Roofing Platinum" },
    { label: "NRCA Member", desc: "National Roofing Contractors" },
    { label: "HAAG Certified", desc: "Elite Storm Damage Inspectors" }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 font-sans" id="app-footer">
      
      {/* Upper Certified Organizations banner */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
            {associations.map((assoc, index) => (
              <div key={index} className="flex flex-col items-center justify-center border-r last:border-0 border-slate-900 px-4">
                <div className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center mb-2.5">
                  {index % 2 === 0 ? (
                    <Award className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Shield className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <h4 className="text-white font-bold text-xs tracking-tight uppercase">{assoc.label}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{assoc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand/Trust Section */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="footer" />
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We operate with high-level integrity, elite speed, and heavy-duty warranties. Serving Houston County, Texas homeowners and businesses with master-certified materials and transparent pricing.
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-slate-400 font-medium">State Licensure:</span>
              <strong className="text-white">RLQA0059381</strong>
            </div>

            {/* BBB and Star ratings info */}
            <div className="flex items-center gap-3 pt-2">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <div>
                  <span className="block font-bold text-xs text-white">4.9 / 5 Rating</span>
                  <span className="block text-[9px] text-slate-500">Based on 450+ physical reviews</span>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2 flex-col items-start leading-[1]">
                <span className="text-[10px] uppercase font-mono text-orange-500 font-bold">A+ BBB Grade</span>
                <span className="text-[9px] text-slate-500">Accredited Member</span>
              </div>
            </div>
          </div>

          {/* Conditional Services and Areas columns (only for homepage, removed in landing page mode) */}
          {!isLandingPage ? (
            <>
              {/* Quick Navigation Pages Column */}
              <div className="md:col-span-3 space-y-4 font-sans">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Service Focus</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="#services" className="hover:text-orange-500 transition-colors">Residential Replacements</a></li>
                  <li><a href="#services" className="hover:text-orange-500 transition-colors">Leak Detection & Repairs</a></li>
                  <li><a href="#services" className="hover:text-orange-500 transition-colors">Standing Seam Metal Roofs</a></li>
                  <li><a href="#services" className="hover:text-orange-500 transition-colors">Industrial Commercial TPO</a></li>
                  <li><a href="#services" className="hover:text-orange-500 transition-colors">Insurance Claim Restorations</a></li>
                </ul>
              </div>

              {/* Service Areas Column */}
              <div className="md:col-span-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Texas Communities Served</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  {SERVICE_AREAS.map((area) => (
                    <button
                      key={area.city}
                      onClick={() => {
                        // Scroll to header or top or trigger change in header state if needed
                        const el = document.getElementById("hero-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-left hover:text-orange-500 transition-colors cursor-pointer"
                    >
                      • {area.city}, {area.state} ({area.zipCodes[0]}+)
                    </button>
                  ))}
                  <span className="text-slate-500 leading-none col-span-2 text-[10px] mt-1 italic">
                    And all surrounding Houston County, Texas neighborhoods
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Lightweight trust footer for Ad Landing Mode */
            <div className="md:col-span-8 flex flex-col md:flex-row justify-between gap-8 py-4 bg-slate-900/30 p-6 rounded-2xl border border-slate-900">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Contact Despatched</h4>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>Emergency Response Line: <strong>(478) 302-0319</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-orange-500" />
                    <span>Estimates: <strong>jason@bryantroofing.net</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>HQ Office: <strong>Crockett, TX 75835</strong></span>
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-w-xs">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-[11px] text-slate-400 flex items-start gap-2 leading-relaxed">
                  <ShieldAlert className="w-4.5 h-4.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Paid Ads Lead Guarantees:</strong> Any booked estimate reserves local priority siding & roofing queue slot. Highly competitive rates.
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Legal Disclaimer Line */}
        <div className="pt-8 mt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Bryant Roofing Professionals. All rights reserved. Licensed & fully insured Texas contractor. 
          </p>
          <div className="flex gap-4">
            <button onClick={() => onNavigate("/")} className="hover:text-white transition-colors cursor-pointer">Homepage</button>
            <button onClick={() => onNavigate("/contact")} className="hover:text-white transition-colors cursor-pointer font-bold text-orange-500">Contact Landing Page</button>
            <span className="text-slate-800">|</span>
            <span className="hover:text-white">Privacy Statement</span>
            <span className="hover:text-white">Terms of Deal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
