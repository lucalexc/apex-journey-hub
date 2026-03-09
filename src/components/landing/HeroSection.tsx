import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-person.jpg";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { FadeUp };

interface HeroSectionProps {
  onSignup: () => void;
}

export default function HeroSection({ onSignup }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <FadeUp>
              <Badge className="mb-6 text-sm font-medium px-4 py-1.5 gap-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                <Sparkles className="w-3.5 h-3.5" /> O primeiro RPG da vida real.
              </Badge>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
                Pare de anotar tarefas.{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Comece a engenhar a sua vida.
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="max-w-lg text-base sm:text-lg text-slate-500 leading-relaxed mb-10">
                A maioria dos aplicativos foca em lembrar você de comprar pão. O MetaTask é um sistema de 25 fases desenhado para forjar o seu caráter, organizar sua biologia e construir o seu legado.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-base font-bold h-14"
                  onClick={onSignup}
                >
                  Desbloquear Minha Vida — R$&nbsp;18/mês <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
                <span className="text-sm text-slate-400 self-center">Cancele quando quiser.</span>
              </div>
            </FadeUp>
          </div>

          {/* Right: Hero image + floating cards */}
          <FadeUp delay={0.4} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">
              <img src={heroImg} alt="Pessoa no topo da montanha ao nascer do sol" className="w-full h-auto object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
            </div>

            {/* Floating mock cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-4 bottom-16 bg-white border border-slate-200 rounded-2xl p-4 shadow-lg shadow-slate-200/60"
            >
              <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 mb-2" />
              <p className="text-xs font-bold text-slate-900">Fase 1: Necrológio</p>
              <p className="text-[11px] text-slate-500">Descubra como quer ser lembrado.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-4 top-16 bg-white border border-slate-200 rounded-2xl p-4 shadow-lg shadow-slate-200/60"
            >
              <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 mb-2" />
              <p className="text-xs font-bold text-slate-900">Ciclo Circadiano</p>
              <p className="text-[11px] text-slate-500">22:30 → 06:30 · 8h de sono</p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
