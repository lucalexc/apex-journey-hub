import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HeroSectionProps {
  onSignup: () => void;
}

export default function HeroSection({ onSignup }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/[0.06] blur-[160px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <Badge className="mb-6 text-sm font-medium px-4 py-1.5 gap-1.5 bg-accent text-accent-foreground border-border hover:bg-accent/80">
            <Sparkles className="w-3.5 h-3.5" /> O Motor de Evolução Pessoal
          </Badge>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-foreground">
            Pare de anotar tarefas.{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Comece a engenhar a sua vida.
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.16}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            Substitua a ansiedade de uma tela em branco por um roteiro de
            amadurecimento testado em 25 fases — do autoconhecimento ao legado.
          </p>
        </FadeUp>

        <FadeUp delay={0.24}>
          <Button
            size="lg"
            className="rounded-full px-10 text-base font-bold h-14 shadow-[0_4px_20px_0_hsl(var(--primary)/0.35)]"
            onClick={onSignup}
          >
            Começar Minha Jornada — R$&nbsp;18/mês
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Cancele quando quiser · 7 dias de garantia incondicional
          </p>
        </FadeUp>

        {/* Floating dashboard mockup */}
        <FadeUp delay={0.35}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 mx-auto max-w-3xl"
          >
            <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-primary/[0.08] overflow-hidden p-1">
              <div className="rounded-xl bg-muted/50 p-6 sm:p-8">
                {/* Mock dashboard skeleton */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                  <div className="ml-4 h-3 w-40 rounded-full bg-border" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-20 rounded-xl bg-card border border-border" />
                  <div className="h-20 rounded-xl bg-card border border-border" />
                  <div className="h-20 rounded-xl bg-card border border-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-xl bg-card border border-border" />
                  <div className="h-32 rounded-xl bg-primary/10 border border-primary/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
