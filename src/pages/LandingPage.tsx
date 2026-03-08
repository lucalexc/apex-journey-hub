import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  Moon,
  Sun,
  Clock,
  BookOpen,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/* ── animation helpers ── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── navbar ── */
function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <span className="text-xl font-extrabold tracking-tight">
          Meta<span className="text-primary">Task</span>
        </span>
        <div className="flex items-center gap-4">
          <a href="/missoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Fazer Login
          </a>
          <Button size="sm" className="rounded-full px-5 font-semibold" asChild>
            <a href="/missoes">Começar Jornada</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

/* ── hero ── */
function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <Badge variant="secondary" className="mb-6 text-sm font-medium px-4 py-1.5 gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> O primeiro RPG da vida real.
          </Badge>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Pare de anotar tarefas.{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Comece a engenhar a sua vida.
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
            A maioria dos aplicativos foca em lembrar você de comprar pão. O MetaTask é um sistema de 25 fases desenhado para forjar o seu caráter, organizar sua biologia e construir o seu legado.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 text-base font-bold h-14 shadow-lg shadow-primary/25" asChild>
              <a href="/missoes">
                Desbloquear Minha Vida — R$&nbsp;18/mês <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </Button>
            <span className="text-sm text-muted-foreground">Cancele quando quiser.</span>
          </div>
        </FadeUp>

        {/* floating mockup cards */}
        <FadeUp delay={0.5} className="mt-16 md:mt-24">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="grid grid-cols-3 gap-4 px-4">
              <MockCard title="Fase 1: Necrológio" sub="Descubra como quer ser lembrado." accent="from-primary/80 to-blue-400/80" />
              <MockCard title="Ciclo Circadiano" sub="22:30 → 06:30 · 8h de sono" accent="from-indigo-500/80 to-violet-400/80" className="translate-y-6" />
              <MockCard title="Check de Leitura" sub="2 páginas hoje · 14 streak" accent="from-emerald-500/80 to-teal-400/80" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function MockCard({ title, sub, accent, className = "" }: { title: string; sub: string; accent: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md p-4 sm:p-5 shadow-card text-left ${className}`}>
      <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${accent} mb-3`} />
      <p className="text-xs sm:text-sm font-bold leading-tight">{title}</p>
      <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">{sub}</p>
    </div>
  );
}

/* ── pain section ── */
function PainSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            O cemitério da produtividade.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Você já baixou dezenas de apps. Criou listas infinitas. E no fim do dia, sente que não fez nada de útil.{" "}
            <span className="text-foreground font-semibold">O problema não é a falta de tempo. É a falta de um mapa.</span>{" "}
            O MetaTask substitui a ansiedade de uma tela em branco por um roteiro de amadurecimento.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── features bento grid ── */
function FeaturesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Projetado para quem joga sério.
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 text-base sm:text-lg">
            Cada pilar do MetaTask foi calibrado para atacar uma falha real dos apps tradicionais.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-5">
          <FadeUp delay={0.1}>
            <BentoCard
              icon={<Mountain className="w-6 h-6" />}
              title="Uma jornada de 25 fases."
              description="Do Necrológio ao Legado. Você só desbloqueia o próximo nível da vida quando provar que dominou o atual."
              large
            />
          </FadeUp>
          <div className="flex flex-col gap-5">
            <FadeUp delay={0.2}>
              <BentoCard
                icon={<><Moon className="w-5 h-5" /><Sun className="w-5 h-5" /></>}
                title="Ciclo Circadiano Integrado."
                description="Não adianta ter força de vontade se você dorme mal. O sistema cobra e calibra suas horas de sono."
              />
            </FadeUp>
            <FadeUp delay={0.3}>
              <BentoCard
                icon={<Clock className="w-5 h-5" />}
                title="O Fim das Listas Infinitas."
                description="Sua rotina dividida logicamente entre Manhã, Tarde e Noite. Foco total, zero distração."
              />
            </FadeUp>
          </div>
          <FadeUp delay={0.35} className="md:col-span-2">
            <BentoCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Biblioteca Gamificada."
              description="Desbloqueie conhecimento prático através de checks diários de leitura."
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ icon, title, description, large = false }: { icon: React.ReactNode; title: string; description: string; large?: boolean }) {
  return (
    <div
      className={`group rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm p-7 sm:p-9 transition-shadow hover:shadow-card-hover ${
        large ? "md:row-span-2 flex flex-col justify-center min-h-[260px]" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-primary mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

/* ── pricing ── */
function PricingSection() {
  const benefits = [
    "Acesso às 25 Fases de Missões",
    "Gestor de Rotina e Ciclo de Sono",
    "Raio-X Biológico e Teste de Temperamento",
    "Acesso à Biblioteca Gamificada",
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-md mx-auto px-6">
        <FadeUp>
          <div className="relative rounded-3xl border border-primary/20 bg-card p-8 sm:p-10 shadow-2xl shadow-primary/5 text-center overflow-hidden">
            {/* glow ring */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <Badge variant="secondary" className="mb-5 text-xs font-semibold">Acesso Integral</Badge>

            <div className="flex items-end justify-center gap-1 mb-6">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">R$&nbsp;18</span>
              <span className="text-muted-foreground text-lg mb-1">/mês</span>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-left mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="w-full rounded-full font-bold h-13 text-base" asChild>
              <a href="/missoes">Assinar Agora</a>
            </Button>

            <p className="text-xs text-muted-foreground mt-4">7 dias de garantia incondicional.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── footer ── */
function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-bold text-foreground">
          Meta<span className="text-primary">Task</span>
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
        </div>
        <span>© {new Date().getFullYear()} MetaTask. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

/* ── page ── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <PainSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
