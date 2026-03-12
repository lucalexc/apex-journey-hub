import { FadeUp } from "./HeroSection";
import { Shield, TrendingUp, Brain, Target } from "lucide-react";

const badges = [
  { icon: Brain, label: "Neurociência aplicada" },
  { icon: Target, label: "Foco em resultados" },
  { icon: TrendingUp, label: "Evolução contínua" },
  { icon: Shield, label: "Método validado" },
];

export default function SocialProofBar() {
  return (
    <section className="py-12 border-y border-border bg-card/50">
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Metodologia baseada em princípios usados por executivos de alta
            performance
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-muted-foreground/60"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
