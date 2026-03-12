import { FadeUp } from "./HeroSection";
import { Gamepad2, Users, TrendingUp } from "lucide-react";

const retentionPoints = [
  {
    icon: Gamepad2,
    title: "Gamificação real",
    desc: "Fases desbloqueáveis, XP e progresso visual mantêm você jogando.",
  },
  {
    icon: Users,
    title: "Accountability embutido",
    desc: "Check-ins diários criam o hábito antes da motivação acabar.",
  },
  {
    icon: TrendingUp,
    title: "Progresso mensurável",
    desc: "Gráficos e dados que provam que você está evoluindo de verdade.",
  },
];

export default function ObjectionSection() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Copy */}
          <div>
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
                Você já tentou outros apps e{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  desistiu em 3 dias.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Nós sabemos. O problema não é você — é que os apps tradicionais
                não foram feitos para reter. O MetaTask usa o{" "}
                <span className="text-foreground font-semibold">
                  Efeito de Retenção
                </span>{" "}
                para tornar a desistência mais difícil que a consistência.
              </p>
            </FadeUp>
          </div>

          {/* Right — Retention cards */}
          <div className="space-y-4">
            {retentionPoints.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={0.1 * (i + 1)}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/[0.06] hover:border-primary/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
