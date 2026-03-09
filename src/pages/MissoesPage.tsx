import { motion } from "framer-motion";
import { Check, Lock, ChevronRight, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { missionPhases, type MissionPhase } from "@/data/missions";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function PhaseCardCompleted({ phase, index }: { phase: MissionPhase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="relative flex items-stretch gap-6"
    >
      {/* Timeline connector */}
      <div className="relative flex flex-col items-center shrink-0 w-12">
        <div className="relative z-10 w-10 h-10 mt-2 rounded-full bg-phase-done flex items-center justify-center shadow-card">
          <Check className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="absolute top-12 bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 bg-phase-done/30" />
      </div>

      <div className="flex-1 bg-card rounded-2xl p-4 shadow-card opacity-70 hover:opacity-100 transition-opacity mt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-phase-done uppercase tracking-wide">Fase {phase.id}</p>
            <h3 className="text-sm font-semibold text-foreground mt-0.5">{phase.title}</h3>
          </div>
          <Badge variant="secondary" className="text-[10px] bg-phase-done/10 text-phase-done border-0">
            Concluída
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}

function PhaseCardActive({ phase, index }: { phase: MissionPhase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const xpPercent = Math.round((phase.xpCurrent / phase.xpTotal) * 100);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 200 }}
      className="relative flex items-stretch gap-6"
    >
      <div className="relative flex flex-col items-center shrink-0 w-12">
        <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-primary/20">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="absolute top-12 bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 bg-border" />
      </div>

      <div className="flex-1 bg-card rounded-3xl p-6 shadow-card-hover border border-primary/20 ring-1 ring-primary/5">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Fase {phase.id}</p>
          <Badge className="text-[10px] bg-primary text-primary-foreground border-0 animate-pulse">
            Fase Atual
          </Badge>
        </div>
        <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Progresso XP</span>
            <span className="font-bold text-foreground">{phase.xpCurrent} / {phase.xpTotal} XP</span>
          </div>
          <Progress value={xpPercent} className="h-2.5 bg-secondary" />
        </div>

        <Button asChild className="w-full mt-4 h-12 rounded-xl text-sm font-semibold gap-2">
          <Link to={`/missoes/${phase.id}`}>
            Continuar Missão
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

function PhaseCardLocked({ phase, index }: { phase: MissionPhase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="relative flex items-stretch gap-6"
    >
      <div className="relative flex flex-col items-center shrink-0 w-12">
        <div className="relative z-10 w-10 h-10 mt-2 rounded-full bg-muted flex items-center justify-center">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
        {index < missionPhases.length - 1 && (
          <div className="absolute top-12 bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 bg-border/50" />
        )}
      </div>

      <div className="flex-1 glass-locked rounded-2xl p-4 cursor-not-allowed mt-1 flex flex-col justify-center">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fase {phase.id}</p>
        <h3 className="text-sm font-semibold text-muted-foreground mt-0.5">{phase.title}</h3>
        <p className="text-xs text-muted-foreground/70 mt-1">Complete a fase anterior para desbloquear</p>
      </div>
    </motion.div>
  );
}

export default function MissoesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">Mapa de Missões</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sua jornada de transformação em 25 fases. Avance no seu ritmo.
        </p>
      </motion.div>

      <div className="space-y-6">
        {missionPhases.map((phase, i) => {
          if (phase.status === "completed") return <PhaseCardCompleted key={phase.id} phase={phase} index={i} />;
          if (phase.status === "active") return <PhaseCardActive key={phase.id} phase={phase} index={i} />;
          return <PhaseCardLocked key={phase.id} phase={phase} index={i} />;
        })}
      </div>
    </div>
  );
}
