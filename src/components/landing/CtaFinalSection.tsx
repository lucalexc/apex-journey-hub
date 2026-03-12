import { FadeUp } from "./HeroSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface CtaFinalSectionProps {
  onSignup: () => void;
}

export default function CtaFinalSection({ onSignup }: CtaFinalSectionProps) {
  return (
    <section className="py-24 md:py-36 bg-foreground relative overflow-hidden">
      {/* Ambient glow on dark bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.12] blur-[180px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground mb-6">
            Sua evolução não aceita mais{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              adiamentos.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-primary-foreground/60 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Comece agora com risco zero. Se em 7 dias o sistema não mudar sua
            perspectiva, devolvemos 100% do valor — sem perguntas.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Button
            size="lg"
            className="rounded-full px-10 text-base font-bold h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_24px_0_hsl(var(--primary)/0.5)]"
            onClick={onSignup}
          >
            Desbloquear Acesso Imediato
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>

          <div className="mt-6 flex items-center justify-center gap-2 text-primary-foreground/40 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Garantia incondicional de 7 dias · Cancele quando quiser</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
