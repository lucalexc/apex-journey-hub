import { useState } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import PricingSection from "@/components/landing/PricingSection";
import FaqSection from "@/components/landing/FaqSection";
import LandingFooter from "@/components/landing/LandingFooter";
import AuthModal from "@/components/AuthModal";

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--landing-bg))] text-[hsl(var(--landing-fg))] overflow-x-hidden relative">
      {/* Hero glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[hsl(var(--landing-glow))] blur-[160px] pointer-events-none" />
      {/* Pricing glow */}
      <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[hsl(var(--landing-glow))] blur-[140px] pointer-events-none" />

      <LandingNavbar onLogin={() => openAuth("login")} onSignup={() => openAuth("signup")} />
      <HeroSection onSignup={() => openAuth("signup")} />
      <PainSection />
      <FeaturesSection />
      <SocialProofSection />
      <PricingSection onSignup={() => openAuth("signup")} />
      <FaqSection onSignup={() => openAuth("signup")} />
      <LandingFooter />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} />
    </div>
  );
}
