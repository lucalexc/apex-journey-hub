import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LandingNavbarProps {
  onLogin: () => void;
  onSignup: () => void;
}

const navLinks = [
  { label: "Jornada", href: "#features" },
  { label: "Biologia", href: "#features" },
  { label: "Metas", href: "#features" },
  { label: "Biblioteca", href: "#features" },
  { label: "Preço", href: "#pricing" },
];

export default function LandingNavbar({ onLogin, onSignup }: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          Meta<span className="text-primary">Task</span>
        </span>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onLogin}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:inline"
          >
            Fazer Login
          </button>
          <Button
            size="sm"
            className="rounded-full px-5 font-semibold"
            onClick={onSignup}
          >
            Começar Jornada — R$&nbsp;18/mês
          </Button>
        </div>
      </div>
    </nav>
  );
}
