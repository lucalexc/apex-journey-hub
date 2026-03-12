import { useState } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofBar from "@/components/landing/SocialProofBar";
import BentoSection from "@/components/landing/BentoSection";
import ObjectionSection from "@/components/landing/ObjectionSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaFinalSection from "@/components/landing/CtaFinalSection";
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <LandingNavbar onLogin={() => openAuth("login")} onSignup={() => openAuth("signup")} />
      <HeroSection onSignup={() => openAuth("signup")} />
      <SocialProofBar />
      <BentoSection />
      <ObjectionSection />
      <FaqSection onSignup={() => openAuth("signup")} />
      <CtaFinalSection onSignup={() => openAuth("signup")} />
      <LandingFooter />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} />
    </div>
  );
}
