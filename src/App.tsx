import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import LandingView from "./components/LandingView";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");

  // Synchronize path state with window location hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/contact" || hash === "#contact") {
        setCurrentPath("/contact");
      } else {
        setCurrentPath("/");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run once on initialization
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update document title and description meta for SEO validation
  useEffect(() => {
    if (currentPath === "/contact") {
      document.title = "Get a Free Roofing Estimate Today | Bryant Roofing Houston County, Texas";
      // Update meta description
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        "content",
        "Get a fast, no-obligation premium roofing estimate. Serving Houston County, Texas homeowners with Owens Corning materials, certified local roofing crews, and direct insurance claiming assistance."
      );
    } else {
      document.title = "Bryant Roofing | Houston County, Texas' Premier Roofing Experts";
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        "content",
        "Licensed, insured roofing experts delivering premier residential replacements, leaking leak repairs, and storm damage claim restoration throughout Houston County, Texas. Fast quotes in 24 hours."
      );
    }
  }, [currentPath]);

  // Inject JSON-LD Schema markup dynamically inside head (LocalBusiness & RoofingContractor SEO)
  useEffect(() => {
    const id = "roofing-schema-jsonld";
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.setAttribute("type", "application/ld+json");
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RoofingContractor",
        "name": "Bryant Roofing Professionals",
        "image": "/hero_roof.png",
        "url": window.location.origin,
        "telephone": "+14783020319",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Houston County",
          "addressLocality": "Crockett",
          "addressRegion": "TX",
          "postalCode": "75835",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.3180,
          "longitude": -95.4566
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "07:00",
          "closes": "19:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "452"
        }
      });
      document.head.appendChild(script);
    }
  }, []);

  const handleNavigate = (path: string) => {
    if (path === "/contact") {
      window.location.hash = "#/contact";
    } else {
      window.location.hash = "#/";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-orange-500 selection:text-white" id="roofing-app-root">
      
      {/* 🚀 Sticky Header Switch Modes */}
      {currentPath !== "/contact" && (
        <Header currentPath={currentPath} onNavigate={handleNavigate} />
      )}

      {/* Core Dynamic Content Stage */}
      <main className="flex-grow flex flex-col">
        {currentPath === "/contact" ? (
          <LandingView onNavigate={handleNavigate} />
        ) : (
          <HomeView onNavigate={handleNavigate} onOpenQuickEstimate={() => handleNavigate("/contact")} />
        )}
      </main>

      {/* Footer block */}
      {currentPath !== "/contact" && (
        <Footer currentPath={currentPath} onNavigate={handleNavigate} />
      )}
    </div>
  );
}
