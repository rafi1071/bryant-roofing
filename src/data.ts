import { Service, Review, Project, FAQItem, ServiceArea } from "./types";

export const SERVICES: Service[] = [
  {
    id: "replacement",
    title: "Roof Replacement",
    description: "Complete tear-off and installation of premium architectural shingles, metal, or tile roofing designed to last 30+ years.",
    iconName: "Hammer",
    benefits: ["Owen's Corning Platinum Warranty", "Complete Clean-Up Guarantee", "Flexible Financing Options Available"]
  },
  {
    id: "repair",
    title: "Roof Repair",
    description: "Proactive, reliable repair services for isolated leaks, missing shingles, pipe boot damage, and dry rot.",
    iconName: "Wrench",
    benefits: ["24-Hour Emergency Dispatch", "Perfect-Match Material Guarantee", "All Repairs Under Workmanship Warranty"]
  },
  {
    id: "commercial",
    title: "Commercial Roofing",
    description: "Flat-roof systems, TPO, PVC, and liquid-applied coatings engineered for industrial and retail properties.",
    iconName: "Building",
    benefits: ["Minimal Business Disruption", "Certified Flat Roof Specialists", "15, 20 & 30-Year Commercial Warranties"]
  },
  {
    id: "storm",
    title: "Storm Damage Repair",
    description: "Comprehensive assistance with hail, heavy wind, and fallen tree damage including complete tarping support.",
    iconName: "CloudLightning",
    benefits: ["Direct Insurance Claim Assistance", "Complimentary Inspection Report", "Rapid Response Stabilization"]
  },
  {
    id: "inspection",
    title: "Roof Inspection",
    description: "Multi-point physical evaluation assessing shingle granulation, flashings, ventilation, and structure health.",
    iconName: "ClipboardCheck",
    benefits: ["High-Definition Photo Logs", "Detailed Certified Action Report", "Ideal for Real Estate Transfers"]
  },
  {
    id: "emergency",
    title: "Emergency Roofing",
    description: "Immediate tarping, structural stabilization, and emergency mitigation services available 24/7.",
    iconName: "ShieldAlert",
    benefits: ["On-Site in 90 Minutes or Less", "Prevent Secondary Water Damage", "Emergency Claim Documentation"]
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { city: "Crockett", state: "TX", slug: "crockett", zipCodes: ["75835"] },
  { city: "Houston County", state: "TX", slug: "houston-county", zipCodes: ["75844", "75851", "75847", "75849"] }
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "Complete Architectural Shingle Upgrade",
    type: "Roof Replacement",
    description: "Replaced an aging, leak-prone organic shingle roof with GAF Timberline HDZ High-Definition Shingles in Charcoal Gray. Replaced all rotted decking and installed new baffle ridge ventilation.",
    beforeImage: "/project1_before.png", // weathered shingle look
    afterImage: "/project1_after.png", // pristine clean roof
    location: "Crockett, TX",
    completedDate: "May 2026",
    specs: {
      duration: "2 Days",
      warranty: "50-Year Golden Pledge Lifetime Warranty",
      material: "GAF Timberline HDZ (Charcoal)"
    }
  },
  {
    id: "proj2",
    title: "Standing Seam Matte Black Metal Installation",
    type: "Modern Metal Upgrade",
    description: "Reengineered a low-slope residential contemporary roof with custom-fabricated 24-gauge standing seam metal panels. Includes integrated snow guards and custom coping cap.",
    beforeImage: "/project2_before.png", // metal panel prep work on roof deck
    afterImage: "/project2_after.png", // beautiful metal panel structure
    location: "Houston County, TX",
    completedDate: "April 2026",
    specs: {
      duration: "3 Days",
      warranty: "40-Year Finish, Limited Lifetime Material Warranty",
      material: "24-Gauge Standing Seam Metal"
    }
  },
  {
    id: "proj3",
    title: "Insurance Restored Storm & Hail Overhaul",
    type: "Storm Damage Restoration",
    description: "Assisted homeowner with safe claim documentation for widespread 1.5\" hail impact damage. Fully replaced roof structure, seamless standard gutters, and side premium flashings at zero out-of-pocket overhead.",
    beforeImage: "/project3_before.png", // weathered frame before
    afterImage: "/project3_after.png", // pristine house exterior
    location: "Crockett, TX",
    completedDate: "June 2026",
    specs: {
      duration: "1 Day",
      warranty: "15-Year Workmanship Warranty",
      material: "CertainTeed Landmark Premium (Weathered Wood)"
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Marcus G.",
    location: "Crockett, TX",
    rating: 5,
    text: "Bryant Roofing were phenomenal. Our roof was hit by hail in early spring. They arrived the same day for a drone inspection, documented the exact damage, worked hand-in-hand with our insurance adjuster, and handled the complete replacement in less than 48 hours. Zero mess left behind!",
    date: "1 week ago",
    avatarUrl: "/avatar_marcus.png",
    projectType: "Full Shingle Roof Replacement",
    verified: true
  },
  {
    id: "rev2",
    name: "Sarah L.",
    location: "Houston County, TX",
    rating: 5,
    text: "Excellent service from start to finish! The estimator was super professional and actually showed me high-definition before and after photos. The quote was transparent and they had great zero-interest monthly financing options. Their workers were highly respectful of my landscape roses.",
    date: "3 weeks ago",
    avatarUrl: "/avatar_sarah.png",
    projectType: "Minor Valley Leak & Flashing Repair",
    verified: true
  },
  {
    id: "rev3",
    name: "Daniel K.",
    location: "Crockett, TX",
    rating: 5,
    text: "Truly premium craftsmanship. Best pricing on architectural shingles. Honest communication, prompt answers, and a gorgeous heavy-duty guarantee. I couldn't be happier with my roof upgrade. Recommend to all homeowners choosing trusted roofers.",
    date: "1 month ago",
    avatarUrl: "/avatar_daniel.png",
    projectType: "Storm Restoration & Shingle Upgrade",
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "How much does a roof replacement cost?",
    answer: "A residential roof replacement typically ranges between $6,500 and $18,500 depending on the size of your home, the pitch of your roof, and the roofing material chosen (e.g., architectural asphalt shingles vs. standing seam metal). We provide completely transparent, line-by-line detailed physical quotes at no cost so you know exactly where every dollar is spent.",
    category: "Cost & Estimates"
  },
  {
    id: "faq2",
    question: "Do you offer financing?",
    answer: "Yes, we offer multiple flexible siding and roofing financing options to fit almost any monthly budget, including 0% interest-free, no-payment options for up to 12 months, and low APR multi-year payment plans. Prequalification is fast, completely secure, and won't affect your credit score.",
    category: "Financing"
  },
  {
    id: "faq3",
    question: "How quickly can you inspect my roof?",
    answer: "We usually dispatch a licensed, certified inspector within 24 to 48 hours of your request. If your roof has an active leak, a safety hazard, or heavy storm damage, we can arrange emergency tarping and inspections within 2-3 hours of contact to prevent further damage.",
    category: "Timing"
  },
  {
    id: "faq4",
    question: "Do you work with insurance claims?",
    answer: "Absolutely. We specialize in insurance-backed storm damage claims. We will provide high-definition drone reports, structural photo logs, and professional estimations using industry-standard pricing software (like Xactimate) used by adjusters so your insurance carrier receives everything required to approve your full claim.",
    category: "Insurance"
  },
  {
    id: "faq5",
    question: "How long does installation take?",
    answer: "The vast majority of residential homes (up to 3,500 sq ft) are fully completed in just 1 to 2 days! This includes taking off the old tiles or shingles, re-decking any dry rot, replacing flashings, installing the waterproofing base barrier, building the system shingles, and a clean vacuum sweep of your yard using heavy magnets.",
    category: "Process"
  }
];
