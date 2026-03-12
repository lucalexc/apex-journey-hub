import { FadeUp } from "./HeroSection";
import { Clock, Map, Moon } from "lucide-react";

interface BentoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
}

function BentoCard({ icon, title, description, className = "", dark, children }: BentoCardProps) {
  return (
    <div
      className={`flex flex-col h-full w-full overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-7 sm:p-8 relative ${
        dark
          ? "bg-foreground border-foreground/80 text-primary-foreground"
          : "bg-card border-border hover:border-primary/30 hover:shadow-primary/[0.08]"
      } ${className}`}
    >
      <div className={`flex items-center gap-2 mb-4 ${dark ? "text-blue-400" : "text-primary"}`}>
        {icon}
      </div>
      <h3 className={`text-lg sm:text-xl font-bold mb-2 ${dark ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h3>
      <p className={`text-sm sm:text-base leading-relaxed flex-1 ${dark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        {description}
      </p>
      {children}
    </div>
  );
}

export default function BentoSection() {
  return (
    <section className="py-24 md:py-36 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
              Projetado para quem{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                joga sério.
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Três pilares que nenhum app de tarefas possui.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(250px,_auto)] gap-6">
          <FadeUp delay={0.1} className="md:col-span-2">
            <BentoCard
              icon={<Clock className="w-6 h-6" />}
              title="Rotina Milimétrica"
              description="Sua vida dividida entre Manhã, Tarde e Noite com blocos inteligentes. Sem listas infinitas — apenas o que importa agora."
              className="h-full"
            >
              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Manhã", "Tarde", "Noite"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl bg-muted border border-border p-3 text-center"
                  >
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                    <div className="mt-2 h-1.5 rounded-full bg-primary/20">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.random() * 60 + 30}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </FadeUp>

          <FadeUp delay={0.2}>
            <BentoCard
              icon={<Map className="w-5 h-5" />}
              title="Mapa de Missões"
              description="25 fases de evolução com checkpoints e desbloqueios. Você enxerga exatamente onde está e para onde vai."
              className="h-full"
            >
              <div className="mt-5 flex items-center justify-center">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 80,80 20,80 10,35"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                    />
                    <polygon
                      points="50,25 75,40 70,70 30,70 25,40"
                      fill="hsl(var(--primary) / 0.1)"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </BentoCard>
          </FadeUp>

          <FadeUp delay={0.3} className="md:col-span-3">
            <BentoCard
              icon={<Moon className="w-5 h-5" />}
              title="Check-in Noturno"
              description="Encerre o dia com reflexão guiada. O sistema calibra amanhã baseado no que você viveu hoje."
              dark
              className="h-full"
            >
              <div className="mt-5 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-primary-foreground/10">
                  <div className="h-full w-3/4 rounded-full bg-blue-400" />
                </div>
                <span className="text-xs text-primary-foreground/50">75%</span>
              </div>
            </BentoCard>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}