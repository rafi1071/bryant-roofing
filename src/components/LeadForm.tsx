import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Hammer, 
  Wrench, 
  CloudLightning, 
  ClipboardCheck, 
  MapPin, 
  User, 
  Phone as PhoneIcon, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  Clock,
  ShieldCheck
} from "lucide-react";

interface LeadFormProps {
  onSuccess?: (data: any) => void;
  sourceCity?: string;
  sourceType?: string;
}

export default function LeadForm({ onSuccess, sourceCity = "Houston County", sourceType = "Ad Landing Page" }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const issues = [
    { id: "replacement", label: "Roof Replacement", desc: "Full roof tear-off & upgrade", icon: Hammer },
    { id: "repair", label: "Leaking / Repair", desc: "Fix active leak or minor damage", icon: Wrench },
    { id: "storm", label: "Storm Damage Claim", desc: "Wind, hail, or tree damage", icon: CloudLightning },
    { id: "inspection", label: "Free Roof Audit", desc: "Certified 21-point checkup", icon: ClipboardCheck },
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1 && !selectedIssue) {
      newErrors.issue = "Please select a roofing service type to proceed.";
    }
    if (currentStep === 2) {
      if (!address.trim()) {
        newErrors.address = "Property address is required to calculate estimate.";
      } else if (address.trim().length < 5) {
        newErrors.address = "Please enter a valid complete property address.";
      }
    }
    if (currentStep === 3) {
      if (!name.trim()) {
        newErrors.name = "Full name is required.";
      }
      if (!phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(phone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      if (!email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    // Simulate API request saving the lead
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess({
          selectedIssue,
          address,
          notes,
          name,
          phone,
          email,
          city: sourceCity,
          source: sourceType,
          timestamp: new Date().toISOString()
        });
      }
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border-2 border-green-500 shadow-2xl p-8 text-center relative overflow-hidden"
        id="lead-success-container"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
        
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-200">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 mb-3">
          <Clock className="w-3.5 h-3.5" /> Fast Desk Routing Active
        </span>

        <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
          Your Free Estimate Request Has Been Received!
        </h3>
        
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          Thank you, <strong className="text-slate-900">{name}</strong>. We have dispatched your property information (<span className="text-slate-800">{address}</span>) to our certified roofing evaluator representing <strong className="text-slate-900">{sourceCity}</strong>.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 max-w-md mx-auto mb-6 text-left">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">What happens next?</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
              <span><strong>Call Confirmation:</strong> We will call you within 15 minutes at <strong className="text-slate-900">{phone}</strong> to confirm your inspection.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
              <span><strong>Drone Pre-Audit:</strong> We compile HD satellite imagery of your roof before arriving on site.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-medium">Need immediate response? Skip the queue:</p>
          <a 
            href="tel:+14783020319" 
            className="inline-flex items-center justify-center gap-3 w-full max-w-xs bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            id="lead-success-call-btn"
          >
            <PhoneIcon className="w-5 h-5 fill-current animate-pulse" />
            <span>Call Now: (478) 302-0319</span>
          </a>
          <p className="text-[10px] text-slate-400">Available 24/7 for emergency leaks & storm tarping</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8" id="roofing-lead-form">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
          <span className="font-semibold text-slate-700">Project Estimation Progress</span>
          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 text-[10px]">Step {step} of 3</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange-500"
            initial={{ width: "33.3%" }}
            animate={{ width: `${step * 33.33}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">What type of project is this?</h3>
                <p className="text-xs text-slate-500">Pick the primary service required for your home in {sourceCity}.</p>
              </div>

              {errors.issue && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium">
                  {errors.issue}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {issues.map((issue) => {
                  const Icon = issue.icon;
                  const isSelected = selectedIssue === issue.id;
                  return (
                    <button
                      key={issue.id}
                      type="button"
                      onClick={() => {
                        setSelectedIssue(issue.id);
                        setErrors({});
                        // Auto-advance to increase speed for active users
                        setTimeout(() => {
                          setStep(2);
                        }, 250);
                      }}
                      className={`flex items-start text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected 
                          ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500" 
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className={`p-2 rounded-lg mr-3 ${isSelected ? "bg-orange-500 text-white" : "bg-slate-50 text-slate-600"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{issue.label}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{issue.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-orange-500" /> Secure SSL Encryption
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-1.5 transition-colors"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">Where is your property located?</h3>
                <p className="text-xs text-slate-500">We need your address to prepare detailed high-def local roofing estimates.</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <label htmlFor="address-input" className="sr-only">Property Address</label>
                  <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    id="address-input"
                    type="text"
                    required
                    placeholder="Enter Property Street Address, City, Zip"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors({});
                    }}
                    className={`w-full bg-slate-50 hover:bg-slate-50/70 focus:bg-white text-slate-800 text-sm pl-11 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all ${
                      errors.address ? "border-red-500 focus:border-red-500" : "border-slate-100 focus:border-orange-500"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-red-500 font-medium mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="notes-textarea" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Roofing Details or Damage Description (Optional)
                  </label>
                  <textarea
                    id="notes-textarea"
                    rows={3}
                    placeholder="E.g., Hail damage, leaking attic near chimney, 15-year old roof shingle loss"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-50/70 focus:bg-white text-slate-800 text-sm p-4 rounded-xl border-2 border-slate-100 outline-none focus:border-orange-500 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-1.5 transition-colors"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">Who should we send the estimate to?</h3>
                <p className="text-xs text-slate-500">Provide your contact info. We never sell your data or spam. Fully secure.</p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="full-name" className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 w-4 text-slate-400" />
                    <input
                      id="full-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`w-full bg-slate-50 focus:bg-white text-slate-850 text-sm pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition-all ${
                        errors.name ? "border-red-500" : "border-slate-100 focus:border-orange-500"
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>
                </div>

                {/* Phone & Email side-by-side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone-number" className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3.5 top-3.5 w-4 w-4 text-slate-400" />
                      <input
                        id="phone-number"
                        type="tel"
                        required
                        placeholder="(478) 555-0199"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        className={`w-full bg-slate-50 focus:bg-white text-slate-850 text-sm pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          errors.phone ? "border-red-500" : "border-slate-100 focus:border-orange-500"
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email-address" className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 w-4 text-slate-400" />
                      <input
                        id="email-address"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        className={`w-full bg-slate-50 focus:bg-white text-slate-850 text-sm pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition-all ${
                          errors.email ? "border-red-500" : "border-slate-100 focus:border-orange-500"
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-950 flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span><strong>Instant Action Applied:</strong> Submitting completes your request and routes it to an estimator assigned to <strong>{address || `${sourceCity} area`}</strong>. Wait timer is under 15 minutes.</span>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-slate-500 hover:text-slate-900 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold py-3 px-6 rounded-lg text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Submit Request <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
