import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Hammer, 
  Wrench, 
  ClipboardCheck, 
  Layers, 
  Home, 
  Building, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  FileCheck, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles,
  Calendar,
  Zap,
  Building2,
  FileText,
  PhoneCall,
  ArrowRight
} from "lucide-react";
import Logo from "./Logo";

interface LandingViewProps {
  onNavigate?: (path: string) => void;
}

export default function LandingView({ onNavigate }: LandingViewProps) {
  const [step, setStep] = useState(1);
  const [animDirection, setAnimDirection] = useState(1); // 1 = forward, -1 = backward
  
  // Questionnaire States
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [roofAge, setRoofAge] = useState<string>("");
  const [leakStatus, setLeakStatus] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [ownership, setOwnership] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  // Contact States
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const TOTAL_STEPS = 8;

  // Options Configurations with descriptive icons
  const serviceOptions = [
    { id: "replacement", label: "Full Roof Replacement", desc: "Complete shingle, metal, or flat tear-off & upgrade", icon: Hammer },
    { id: "repair", label: "Leak & Repair Service", desc: "Targeted localized repair or water intrusion fix", icon: Wrench },
    { id: "inspection", label: "Professional Drone Inspection", desc: "Drone-guided 21-point certification audit", icon: ClipboardCheck },
    { id: "gutters", label: "Gutter System Upgrade", desc: "Seamless aluminum gutters & leaf guards installation", icon: Layers }
  ];

  const materialOptions = [
    { id: "shingle", label: "Asphalt Shingle", desc: "Traditional 3-Tab or premium high-def Architectural", icon: Home },
    { id: "metal", label: "Standing Seam Metal", desc: "Heavy-duty modern metal panel structural grid", icon: Layers },
    { id: "tile_slate", label: "Clay Tile / Slate / Clay", desc: "Premium Mediterranean tile or solid hand-cut slates", icon: Building },
    { id: "flat_tpo", label: "Flat Roof (TPO / Rubber)", desc: "Heat-welded membranes for commercial/low-slope", icon: Building2 }
  ];

  const ageOptions = [
    { id: "under_5", label: "Under 5 Years", desc: "Relatively new roof structure", icon: Clock },
    { id: "5_10", label: "5 to 10 Years", desc: "Midway through initial service life", icon: Calendar },
    { id: "11_20", label: "11 to 20 Years", desc: "Approaching standard replacement age", icon: ShieldAlert },
    { id: "over_20", label: "Over 20 Years (Overdue!)", desc: "Highly prone to leaks & shingle decay", icon: AlertCircle },
    { id: "unsure", label: "Don't Know / Unsure", desc: "Need field inspector to evaluate", icon: FileText }
  ];

  const leakOptions = [
    { id: "active", label: "Yes, Active Leaking!", desc: "Water currently entering attic, ceilings, or walls", badge: "URGENT", icon: AlertCircle },
    { id: "suspected", label: "No Leaks, Storm Damage Check", desc: "Suspicious storms, hail strikes, or high winds recently", badge: "RECOMMENDED", icon: ShieldAlert },
    { id: "none", label: "No Active Leaks", desc: "Structure is dry, planning preventative replacement", badge: "PREVENTATIVE", icon: ShieldCheck }
  ];

  const timelineOptions = [
    { id: "immediate", label: "Immediate (Within 2 weeks)", desc: "Need swift contracting or storm tarping support", priority: "HIGH", icon: Zap },
    { id: "one_month", label: "Within 30 Days", desc: "Planning project startup in the brief term", priority: "MEDIUM", icon: Clock },
    { id: "three_months", label: "1 to 3 Months", desc: "Flexible timeline or coordinating insurance adjusters", priority: "NORMAL", icon: Calendar },
    { id: "estimating", label: "Researching / Estimating", desc: "Checking market pricing & custom options", priority: "NORMAL", icon: FileText }
  ];

  const ownershipOptions = [
    { id: "owner", label: "I am the Homeowner", desc: "Looking to protect my personal high investment", icon: User },
    { id: "manager", label: "I am a Property Manager", desc: "Coordinating multi-family or commercial structures", icon: Building2 },
    { id: "buyer_under_contract", label: "Under Contract (Buyer/Seller)", desc: "Need swift quotes to finalize transition contingencies", icon: FileCheck }
  ];

  const validateStep = (currentStep: number) => {
    const tempErrors: Record<string, string> = {};
    
    if (currentStep === 1 && !selectedService) tempErrors.service = "Please select a required service to proceed.";
    if (currentStep === 2 && !selectedMaterial) tempErrors.material = "Please specify a roof material to proceed.";
    if (currentStep === 3 && !roofAge) tempErrors.age = "Please select your estimated roof age.";
    if (currentStep === 4 && !leakStatus) tempErrors.leak = "Please specify active leak status.";
    if (currentStep === 5 && !timeline) tempErrors.timeline = "Please select your priority timeline.";
    if (currentStep === 6 && !ownership) tempErrors.ownership = "Please select your property relationship.";
    if (currentStep === 7) {
      if (!address.trim()) {
        tempErrors.address = "Property location street address is required.";
      } else if (address.trim().length < 8) {
        tempErrors.address = "Please enter a valid complete Texas street address.";
      }
    }
    if (currentStep === 8) {
      if (!name.trim()) tempErrors.name = "Full name is required.";
      if (!phone.trim()) {
        tempErrors.phone = "Phone number is required for estimator coordination.";
      } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(phone)) {
        tempErrors.phone = "Please enter a valid active phone number.";
      }
      if (!email.trim()) {
        tempErrors.email = "Email address is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "Please enter a valid email address.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setAnimDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setAnimDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleOptionSelect = (setter: Function, val: string) => {
    setter(val);
    setErrors({});
    setTimeout(() => {
      setAnimDirection(1);
      setStep((prev) => prev + 1);
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(8)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const getSelectedLabel = (id: string, options: any[]) => {
    const match = options.find(o => o.id === id);
    return match ? match.label : "Awaiting selection...";
  };

  const isActiveEmergencyRoute = leakStatus === "active" && timeline === "immediate";

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0
    })
  };

  return (
    <div className="absolute inset-0 min-h-screen bg-white text-slate-900 flex flex-col z-50 overflow-y-auto font-sans" id="full-fullscreen-questionnaire">
      
      {/* 🚀 Vibrant Bryant Red Top Header */}
      <header className="relative z-10 border-b border-red-200 bg-red-700 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between text-white shadow-md">
        <Logo variant="landing" />

        <button 
          onClick={() => onNavigate && onNavigate("/")}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-red-800 hover:bg-red-900 active:bg-red-950 px-4 py-2 rounded-xl transition-all border border-red-650 cursor-pointer shadow-sm"
        >
          <span>Exit to Homepage</span>
        </button>
      </header>

      {/* ⚙️ Progress Tracker bar in red and white */}
      {!isSubmitted && (
        <div className="relative z-10 w-full bg-slate-50 border-b border-slate-200 px-4 py-3 text-slate-700">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span>Step <strong className="text-red-600">{step}</strong> of {TOTAL_STEPS}</span>
            </div>
            
            <div className="flex-1 max-w-md mx-4 h-2 bg-slate-200 rounded-full overflow-hidden block">
              <div 
                className="h-full bg-red-650 transition-all duration-300"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>

            <div className="text-[10px] font-black text-red-700 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded border border-red-200">
              {Math.round((step / TOTAL_STEPS) * 100)}% Done
            </div>
          </div>
        </div>
      )}

      {/* Main Container Stage */}
      <main className="relative z-10 flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {isSubmitted ? (
          /* SUCCESS SCREEN */
          <motion.div 
            initial={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl space-y-6"
          >
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 border border-red-200">
              <CheckCircle2 className="w-10 h-10 text-red-600" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 border border-red-200 text-red-700 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-red-600" /> Diagnosis Dispatched
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Roofing Diagnostic Logged!
            </h2>
            
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900 font-black">{name}</strong>. Your full project diagnostics have been logged and assigned to the local Texas service desk representing <strong className="text-red-750 font-bold uppercase">{address || "your region"}</strong>.
            </p>

            {/* Compiled Diagnostic Dossier */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left space-y-3.5 max-w-xl mx-auto">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-red-600" /> Compiled Estimating Dossier
              </h3>
              
              <ul className="text-xs space-y-2.5 text-slate-700">
                <li className="flex justify-between items-center bg-white p-2 rounded border border-slate-150">
                  <span className="text-slate-500 uppercase tracking-wider font-semibold">Service Type:</span>
                  <span className="font-extrabold text-slate-900 uppercase">{selectedService === "replacement" ? "Full Replacement" : selectedService === "repair" ? "Leak / Repair" : selectedService === "inspection" ? "Professional Audit" : "Gutters Upgrade"}</span>
                </li>
                <li className="flex justify-between items-center bg-white p-2 rounded border border-slate-150">
                  <span className="text-slate-500 uppercase tracking-wider font-semibold">Target Material:</span>
                  <span className="font-extrabold text-slate-900">{getSelectedLabel(selectedMaterial, materialOptions)}</span>
                </li>
                <li className="flex justify-between items-center bg-white p-2 rounded border border-slate-150">
                  <span className="text-slate-500 uppercase tracking-wider font-semibold">Address Checked:</span>
                  <span className="font-mono text-slate-800 text-[11px] text-right truncate max-w-xs">{address}</span>
                </li>
                {isActiveEmergencyRoute && (
                  <li className="flex items-center gap-2 text-red-705 bg-red-50 border border-red-200 p-2.5 rounded">
                    <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="font-black uppercase text-[10px] tracking-wider">Fast-Track Priority Emergency Protocol Triggered!</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl border border-red-200 p-5 text-left max-w-xl mx-auto space-y-3">
              <h4 className="text-xs font-extrabold text-red-750 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-600" /> Next Steps & Dispatch Routing:
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center font-bold font-mono text-[11px] shrink-0">1</span>
                  <span><strong>15-Minute Call Back:</strong> Owner Jason or one of our licensed inspectors will call <strong className="text-slate-900 font-bold">{phone}</strong> shortly to confirm access coordinates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center font-bold font-mono text-[11px] shrink-0">2</span>
                  <span><strong>Satellite Assessment:</strong> We will cross-reference GAF satellite thermal and dimensional maps for your exact coordinates (<span className="text-red-700 font-mono text-[11px] font-semibold">{address}r</span>).</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Need instant help? Reach our dispatch desk directly:</p>
              <a 
                href="tel:+14783020319" 
                className="inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 hover:scale-[1.02] text-white font-black uppercase py-4 px-8 rounded-xl shadow-lg transition-all cursor-pointer"
                id="success-direct-hq-call"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                <span>Call Dispatch Now: (478) 302-0319</span>
              </a>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                Open 24 Hours. Servicing Houston County, Texas with GAF Lifetime Warranty standards.
              </p>
            </div>
          </motion.div>
        ) : (
          /* CORE INTERACTIVE QUESTIONNAIRE - RED & WHITE STREAMLINED GRID */
          <div className="w-full max-w-2xl mx-auto">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait" custom={animDirection}>
                
                {/* STEP 1: SERVICE SELECTOR */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Texas Certified Estimator</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        What is the primary roofing service you require?
                      </h2>
                      <p className="text-xs text-slate-500">
                        Select an option below to route your inquiry to our residential shingle or metal team.
                      </p>
                    </div>

                    {errors.service && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{errors.service}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                      {serviceOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedService === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedService(opt.id);
                              handleOptionSelect(setSelectedService, opt.id);
                            }}
                            className={`flex items-center text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative group ${
                              isSelected 
                                ? "border-red-600 bg-red-50/50 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`p-3 rounded-xl mr-4 shrink-0 transition-colors ${
                              isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-6">
                              <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">{opt.label}</h3>
                              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{opt.desc}</p>
                            </div>
                            
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-red-600 bg-red-600" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono uppercase font-bold">
                        <ShieldCheck className="w-4 h-4 text-red-605" /> Accredited Texas Business
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm Option</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: MATERIAL SELECTOR WITH ICONS */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">GAF Materials Certification</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        Which roofing material protects your building currently?
                      </h2>
                      <p className="text-xs text-slate-500">
                        This guarantees we assign the appropriate shingle mockups, steel profiles, or commercial membranes.
                      </p>
                    </div>

                    {errors.material && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{errors.material}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                      {materialOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedMaterial === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedMaterial(opt.id);
                              handleOptionSelect(setSelectedMaterial, opt.id);
                            }}
                            className={`flex items-center text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative group ${
                              isSelected 
                                ? "border-red-600 bg-red-50/50 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`p-3 rounded-xl mr-4 shrink-0 transition-colors ${
                              isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-6">
                              <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">{opt.label}</h3>
                              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{opt.desc}</p>
                            </div>
                            
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-red-600 bg-red-600" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm & Next</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: ROOF AGE SELECTOR WITH ICONS */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Structural Decay Factor</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        How old is your current shingle or metal roof?
                      </h2>
                      <p className="text-xs text-slate-500">
                        This evaluates material wear patterns caused by local Texas sun rays and seasonal wind damage.
                      </p>
                    </div>

                    {errors.age && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{errors.age}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                      {ageOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = roofAge === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setRoofAge(opt.id);
                              handleOptionSelect(setRoofAge, opt.id);
                            }}
                            className={`flex items-center text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative group ${
                              isSelected 
                                ? "border-red-600 bg-red-50/50 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`p-3 rounded-xl mr-4 shrink-0 transition-colors ${
                              isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-6">
                              <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">{opt.label}</h3>
                              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{opt.desc}</p>
                            </div>
                            
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-red-600 bg-red-600" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm & Next</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: ACTIVE LEAKS WITH ICONS */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Water Intrusion Metric</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        Do you currently experience any water leaks?
                      </h2>
                      <p className="text-xs text-slate-500">
                        Active water flow damages roof deck sheeting. Immediate response is dispatched accordingly.
                      </p>
                    </div>

                    {errors.leak && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{errors.leak}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                      {leakOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = leakStatus === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setLeakStatus(opt.id);
                              handleOptionSelect(setLeakStatus, opt.id);
                            }}
                            className={`flex items-center text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative group ${
                              isSelected 
                                ? "border-red-600 bg-red-50/50 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`p-3 rounded-xl mr-4 shrink-0 transition-colors ${
                              isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-6">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">{opt.label}</h3>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                  opt.id === "active" ? "bg-red-100 text-red-700" :
                                  opt.id === "suspected" ? "bg-amber-100 text-amber-700" :
                                  "bg-slate-100 text-slate-600"
                                }`}>
                                  {opt.badge}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{opt.desc}</p>
                            </div>
                            
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-red-600 bg-red-600" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm & Next</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: PROJECT TIMELINE WITH ICONS */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Scheduling Priority</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        What is your ideal project startup timeline?
                      </h2>
                      <p className="text-xs text-slate-500">
                        This arranges logistical support and material ordering priority on our dispatch board.
                      </p>
                    </div>

                    {errors.timeline && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{errors.timeline}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                      {timelineOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = timeline === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setTimeline(opt.id);
                              handleOptionSelect(setTimeline, opt.id);
                            }}
                            className={`flex items-center text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative group ${
                              isSelected 
                                ? "border-red-600 bg-red-50/50 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`p-3 rounded-xl mr-4 shrink-0 transition-colors ${
                              isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-6">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">{opt.label}</h3>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                                  opt.priority === "HIGH" ? "bg-red-100 text-red-700" :
                                  opt.priority === "MEDIUM" ? "bg-amber-100 text-amber-700 font-semibold" :
                                  "bg-slate-100 text-slate-500"
                                }`}>
                                  {opt.priority} PRIORITY
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{opt.desc}</p>
                            </div>
                            
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-red-600 bg-red-600" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm & Next</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: RELATIONSHIP OWNERSHIP */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Texas Legal Guard</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        What is your relationship to the property?
                      </h2>
                      <p className="text-xs text-slate-500">
                        This ensures compliant permitting and contract authorization representation.
                      </p>
                    </div>

                    {errors.ownership && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{errors.ownership}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                      {ownershipOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = ownership === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setOwnership(opt.id);
                              handleOptionSelect(setOwnership, opt.id);
                            }}
                            className={`flex items-center text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative group ${
                              isSelected 
                                ? "border-red-600 bg-red-50/50 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`p-3 rounded-xl mr-4 shrink-0 transition-colors ${
                              isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-6">
                              <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">{opt.label}</h3>
                              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{opt.desc}</p>
                            </div>
                            
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-red-600 bg-red-600" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm & Next</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 7: PROPERTY GEOMETRICS LOCATION AND DETAILS */}
                {step === 7 && (
                  <motion.div
                    key="step7"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Satellite Coordinates Mapping</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        Where is your property located in Houston County, Texas?
                      </h2>
                      <p className="text-xs text-slate-500">
                        We compile preliminary satellite structural layout profiles for this exact address so we can bring correct sample material dimensions.
                      </p>
                    </div>

                    {errors.address && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{errors.address}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4.5 w-5 h-5 text-red-600" />
                        <input
                          id="full-address-wizard"
                          type="text"
                          required
                          placeholder="Street Address, City, TX, Zip Code"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            if (errors.address) setErrors({});
                          }}
                          className="w-full bg-slate-50 focus:bg-white border-2 border-slate-200 focus:border-red-600 text-slate-900 rounded-xl py-4 pl-12 pr-4 outline-none font-bold text-sm transition-all shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="notes-wizard" className="block text-xs font-black uppercase tracking-widest text-slate-500">
                          Damage details, specifications, or custom requests (Optional)
                        </label>
                        <textarea
                          id="notes-wizard"
                          placeholder="E.g., Hail dents detected on west valley, missing ridge shingle, interested in architectural mockups..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          className="w-full bg-slate-50 focus:bg-white border-2 border-slate-200 focus:border-red-600 text-slate-900 rounded-xl py-3 px-4 outline-none font-medium text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white hover:scale-[1.01] text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm Address</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 8: CONTACT INFORMATION */}
                {step === 8 && (
                  <motion.div
                    key="step8"
                    custom={animDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className="space-y-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-sm"
                  >
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest text-red-600 block">Texas Dispatch Desk</span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        Who should we contact to coordinate the dispatch?
                      </h2>
                      <p className="text-xs text-slate-500">
                        Your physical diagnostics report will be generated and texted/emailed to your coordinates.
                      </p>
                    </div>

                    {(errors.name || errors.phone || errors.email) && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold space-y-1">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="font-extrabold uppercase">Dossier Missing Parameters:</span>
                        </div>
                        <ul className="list-disc pl-5 text-[11px] space-y-0.5 text-red-650">
                          {errors.name && <li>{errors.name}</li>}
                          {errors.phone && <li>{errors.phone}</li>}
                          {errors.email && <li>{errors.email}</li>}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name-wizard" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
                          First & Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                          <input
                            id="name-wizard"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors({});
                            }}
                            className="w-full bg-slate-50 focus:bg-white border-2 border-slate-200 focus:border-red-600 text-slate-900 rounded-xl py-3 pl-11 pr-4 outline-none font-bold text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone-wizard" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
                            Active Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                            <input
                              id="phone-wizard"
                              type="tel"
                              required
                              placeholder="(478) 555-0199"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                if (errors.phone) setErrors({});
                              }}
                              className="w-full bg-slate-50 focus:bg-white border-2 border-slate-200 focus:border-red-600 text-slate-900 rounded-xl py-3 pl-11 pr-4 outline-none font-bold text-sm transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email-wizard" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                            <input
                              id="email-wizard"
                              type="email"
                              required
                              placeholder="john@example.com"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({});
                              }}
                              className="w-full bg-slate-50 focus:bg-white border-2 border-slate-200 focus:border-red-600 text-slate-900 rounded-xl py-3 pl-11 pr-4 outline-none font-bold text-sm transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-red-600" /> Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="bg-red-650 hover:bg-red-700 active:bg-red-800 disabled:bg-slate-300 text-white hover:scale-[1.01] active:scale-95 text-xs font-black uppercase tracking-wider py-4 px-8 rounded-xl inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white ring-transparent border-t-transparent animate-spin rounded-full inline-block" />
                            <span>Submitting Diagnostics...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Dossier & Request Estimate</span> <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>

            {/* Back to Home Link below the questionnaire */}
            <div className="text-center mt-6">
              <button 
                onClick={() => onNavigate && onNavigate("/")} 
                className="text-xs font-black uppercase tracking-wider text-slate-500 hover:text-red-750 cursor-pointer inline-flex items-center gap-1.5 transition-colors"
              >
                <span>← Or, Return to Main Homepage Overview</span>
              </button>
            </div>

          </div>
        )}
      </main>

      {/* 🛡️ Strict Professional Credential Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50 py-4 text-center text-slate-500 text-[10px] font-mono mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-450 leading-none">
          <p>© {new Date().getFullYear()} Bryant Roofing Professionals. Licensed & fully insured Texas contractor.</p>
          <p className="flex items-center gap-2">
            <span>Powered by GAF Certified Frameworks</span>
            <span>•</span>
            <span className="text-red-600 font-extrabold flex items-center gap-0.5"><ShieldCheck className="w-3 h-3" /> LIFETIME GUARANTEE</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
