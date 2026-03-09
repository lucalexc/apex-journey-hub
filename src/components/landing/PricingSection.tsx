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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <Badge className="mb-4 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
              Preço Simples
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Invista na engenharia da sua vida.
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">
              Escolha o plano que cabe na sua jornada. Cancele quando quiser.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Monthly — Anchor (Light Card) */}
          <FadeUp delay={0.1}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 flex flex-col shadow-md shadow-slate-100">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
                Mensal
              </p>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                  R$&nbsp;18
                </span>
                <span className="text-slate-400 text-lg mb-1">/mês</span>
              </div>

              <ul className="space-y-3 text-sm sm:text-base mb-10 flex-1">
                {sharedBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full font-semibold h-12 text-base"
                onClick={onSignup}
              >
                Assinar Mensal
              </Button>
            </div>
          </FadeUp>

          {/* Annual — Dark Premium Highlight */}
          <FadeUp delay={0.2}>
            <div className="h-full rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 flex flex-col relative shadow-[0_0_60px_rgba(37,99,235,0.15)] md:scale-[1.03] origin-center">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-blue-600 text-white border-0 px-4 py-1">
                Recomendado · 20% OFF
              </Badge>

              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-6">
                Anual
              </p>

              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  R$&nbsp;172
                </span>
                <span className="text-slate-400 text-lg mb-1">/ano</span>
              </div>
              <p className="text-sm text-slate-400 mb-8">
                Equivale a <span className="font-semibold text-blue-400">R$&nbsp;14,30/mês</span>
              </p>

              <ul className="space-y-3 text-sm sm:text-base mb-10 flex-1">
                {[...sharedBenefits, annualExtra].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full rounded-full font-bold h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.5)]"
                onClick={onSignup}
              >
                Assinar Plano Anual
              </Button>

              <p className="text-xs text-slate-400 mt-4 text-center">
                7 dias de garantia incondicional.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
