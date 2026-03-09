import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Save, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { layerQuizQuestions, layerResults, type LayerResult } from "@/data/layers-quiz";

type Phase = "intro" | "quiz" | "result";

export function LayersTab() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [result, setResult] = useState<LayerResult | null>(null);

  const handleStart = () => {
    setPhase("quiz");
    setStep(0);
    setScores({});
  };

  const handleAnswer = (layer: number) => {
    const newScores = { ...scores, [layer]: (scores[layer] || 0) + 1 };
    setScores(newScores);

    if (step + 1 >= layerQuizQuestions.length) {
      // Calculate winner — on tie, pick lowest layer
      let maxScore = 0;
      let winnerLayer = 4;
      for (const [layerStr, score] of Object.entries(newScores)) {
        const l = Number(layerStr);
        if (score > maxScore || (score === maxScore && l < winnerLayer)) {
          maxScore = score;
          winnerLayer = l;
        }
      }
      setResult(layerResults[winnerLayer]);
      setPhase("result");
      toast({
        title: `Camada ${winnerLayer} identificada! 🎯`,
        description: `Você está na camada: ${layerResults[winnerLayer].title}`,
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setPhase("intro");
    setStep(0);
    setScores({});
    setResult(null);
  };

  // ── Result Screen ──
  if (phase === "result" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <Card className="border border-border bg-card shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 via-transparent to-primary/10 p-8 md:p-10 text-center space-y-5">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-primary/10 mx-auto">
              <Layers className="h-9 w-9 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Seu nível atual</p>
              <h2 className="text-3xl font-bold text-foreground">
                Camada {result.id}: {result.title}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {result.description}
            </p>
          </div>

          <CardContent className="p-6 md:p-8 space-y-4 border-t border-border">
            <div className="bg-primary/5 rounded-xl p-5 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">🚀 Como evoluir para a próxima camada</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.nextStep}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Refazer análise
          </Button>
          <Button
            className="rounded-xl gap-2"
            onClick={() => toast({ title: "Perfil salvo! ✅", description: "Sua camada foi registrada com sucesso." })}
          >
            <Save className="h-4 w-4" /> Salvar meu perfil
          </Button>
        </div>
      </motion.div>
    );
  }

  // ── Quiz Flow ──
  if (phase === "quiz") {
    const q = layerQuizQuestions[step];
    const progress = ((step + 1) / layerQuizQuestions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Pergunta {step + 1} de {layerQuizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="border border-border bg-card shadow-lg shadow-slate-200/50 rounded-2xl">
              <CardContent className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                  {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.layer)}
                      className="w-full text-left rounded-xl border border-border bg-card p-4 text-sm text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-[0.98]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── Intro / CTA ──
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center"
    >
      <Card className="border border-border bg-card shadow-lg shadow-slate-200/50 rounded-2xl max-w-md w-full">
        <CardContent className="p-8 text-center space-y-5">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mx-auto">
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Em qual degrau da maturidade você está?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Responda a 5 perguntas profundas para descobrir a sua Camada da Personalidade atual e o que você precisa fazer para avançar.
          </p>
          <Button onClick={handleStart} className="rounded-xl gap-2 px-6">
            Iniciar Análise <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
