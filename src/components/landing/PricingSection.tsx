import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { FadeUp } from "./HeroSection";

interface PricingSectionProps {
  onSignup: () => void;
}

const sharedBenefits = [
  "Acesso às 25 Fases de Missões",
  "Gestor de Rotina e Ciclo de Sono",
  "Raio-X Biológico e Teste de Temperamento",
  "Acesso à Biblioteca Gamificada",
];

const annualExtra = "Acesso antecipado a novas fases";

export default function PricingSection({ onSignup }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24 md:py-36 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[hsl(var(--landing-glow))] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <Badge className="mb-4 text-xs font-semibold bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              Preço Simples
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[hsl(var(--landing-fg))]">
              Invista na engenharia da sua vida.
            </h2>
            <p className="mt-4 text-[hsl(var(--landing-muted))] max-w-lg mx-auto">
              Escolha o plano que cabe na sua jornada. Cancele quando quiser.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Monthly — Anchor */}
          <FadeUp delay={0.1}>
            <div className="h-full rounded-3xl border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card))] p-8 sm:p-10 flex flex-col">
              <p className="text-sm font-semibold text-[hsl(var(--landing-muted))] uppercase tracking-wider mb-6">
                Mensal
              </p>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[hsl(var(--landing-fg))]">
                  R$&nbsp;18
                </span>
                <span className="text-[hsl(var(--landing-muted))] text-lg mb-1">/mês</span>
              </div>

              <ul className="space-y-3 text-sm sm:text-base mb-10 flex-1">
                {sharedBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[hsl(var(--landing-fg))]">{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full font-semibold h-12 text-base border-[hsl(var(--landing-card-border))] text-[hsl(var(--landing-fg))] hover:bg-[hsl(var(--landing-card-border))]"
                onClick={onSignup}
              >
                Assinar Mensal
              </Button>
            </div>
          </FadeUp>

          {/* Annual — Highlight */}
          <FadeUp delay={0.2}>
            <div className="h-full rounded-3xl border border-[hsl(var(--landing-card-highlight-border))] bg-[hsl(var(--landing-card))] p-8 sm:p-10 flex flex-col relative shadow-[0_0_40px_hsl(var(--landing-glow))] md:scale-[1.03] origin-center">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-primary text-primary-foreground border-0 px-4 py-1">
                Recomendado · 20% OFF
              </Badge>

              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                Anual
              </p>

              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[hsl(var(--landing-fg))]">
                  R$&nbsp;172
                </span>
                <span className="text-[hsl(var(--landing-muted))] text-lg mb-1">/ano</span>
              </div>
              <p className="text-sm text-[hsl(var(--landing-muted))] mb-8">
                Equivale a <span className="font-semibold text-primary">R$&nbsp;14,30/mês</span>
              </p>

              <ul className="space-y-3 text-sm sm:text-base mb-10 flex-1">
                {[...sharedBenefits, annualExtra].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[hsl(var(--landing-fg))]">{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full rounded-full font-bold h-14 text-lg"
                onClick={onSignup}
              >
                Assinar Plano Anual
              </Button>

              <p className="text-xs text-[hsl(var(--landing-muted))] mt-4 text-center">
                7 dias de garantia incondicional.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
