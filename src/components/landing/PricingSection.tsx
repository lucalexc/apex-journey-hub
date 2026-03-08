import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { FadeUp } from "./HeroSection";

interface PricingSectionProps {
  onSignup: () => void;
}

const benefits = [
  "Acesso às 25 Fases de Missões",
  "Gestor de Rotina e Ciclo de Sono",
  "Raio-X Biológico e Teste de Temperamento",
  "Acesso à Biblioteca Gamificada",
];

export default function PricingSection({ onSignup }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24 md:py-36 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-md mx-auto px-6">
        <FadeUp>
          <div className="rounded-3xl border border-primary/20 bg-[hsl(var(--landing-card))] p-8 sm:p-10 shadow-2xl shadow-primary/5 text-center overflow-hidden relative">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <Badge className="mb-5 text-xs font-semibold bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              Acesso Integral
            </Badge>

            <div className="flex items-end justify-center gap-1 mb-6">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[hsl(var(--landing-fg))]">
                R$&nbsp;18
              </span>
              <span className="text-[hsl(var(--landing-muted))] text-lg mb-1">/mês</span>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-left mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[hsl(var(--landing-fg))]">{b}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="w-full rounded-full font-bold h-13 text-base"
              onClick={onSignup}
            >
              Assinar Agora
            </Button>

            <p className="text-xs text-[hsl(var(--landing-muted))] mt-4">7 dias de garantia incondicional.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
