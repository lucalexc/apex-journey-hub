import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Wind, Globe, Waves, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { questions as temperamentQuestions, temperamentResults, type TemperamentResult } from "@/data/quem-sou";

const elementIcons: Record<string, React.ReactNode> = {
  Fogo: <Flame className="h-8 w-8" />,
  Ar: <Wind className="h-8 w-8" />,
  Terra: <Globe className="h-8 w-8" />,
  Água: <Waves className="h-8 w-8" />,
};

const elementColors: Record<string, string> = {
  Fogo: "text-destructive",
  Ar: "text-primary",
  Terra: "text-xp",
  Água: "text-primary",
};

export function TemperamentTab() {
  const [result, setResult] = useState<TemperamentResult | null>(null);
  const [step, setStep] = useState(-1); // -1 = intro, 0-4 = questions
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStart = () => setStep(0);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (newAnswers.length >= temperamentQuestions.length) {
      // Tally
      const counts: Record<string, number> = {};
      newAnswers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(temperamentResults[winner]);
      setStep(-1);
      toast({ title: `Você é ${winner}! ${temperamentResults[winner].emoji}`, description: "Resultado calculado com sucesso." });
    } else {
      setStep(newAnswers.length);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(-1);
    setAnswers([]);
  };

  // Result Dashboard
  if (result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
        <Card className="border-border/50 shadow-card overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 via-transparent to-primary/10 p-8 text-center space-y-4">
            <div className={`inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-card shadow-card-hover mx-auto ${elementColors[result.element]}`}>
              {elementIcons[result.element]}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Seu temperamento</p>
              <h2 className="text-3xl font-bold text-foreground mt-1">{result.type}</h2>
              <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                Elemento: {result.element} {result.emoji}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">{result.description}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">💪 Seus maiores talentos</h3>
              <ul className="space-y-2">
                {result.strengths.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-xp shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">⚠️ Seus piores defeitos</h3>
              <ul className="space-y-2">
                {result.weaknesses.map((w) => (
                  <li key={w} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" /> {w}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="rounded-xl gap-2" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Refazer teste
          </Button>
        </div>
      </motion.div>
    );
  }

  // Quiz flow
  if (step >= 0) {
    const q = temperamentQuestions[step];
    const progress = ((step + 1) / temperamentQuestions.length) * 100;
    
    // Mapeamento dos tipos do array novo para os tipos do temperamentResults
    const typeMap: Record<string, string> = {
      "colerico": "Colérico",
      "sanguineo": "Sanguíneo",
      "melancolico": "Melancólico",
      "fleumatico": "Fleumático"
    };

    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Pergunta {step + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-lg font-semibold text-foreground">{q.pergunta}</h3>
                <div className="space-y-3">
                  {q.opcoes.map((opt) => (
                    <Button
                      key={opt.texto}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-5 rounded-xl text-sm font-normal hover:bg-primary/5 hover:border-primary/30 transition-all text-wrap"
                      onClick={() => handleAnswer(typeMap[opt.tipo] || opt.tipo)}
                    >
                      {opt.texto}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Intro / CTA
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
      <Card className="border-border/50 shadow-card max-w-md w-full">
        <CardContent className="p-8 text-center space-y-5">
          <div className="text-5xl">🧪</div>
          <h3 className="text-xl font-bold text-foreground">Descubra seu Temperamento</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Faça a análise do seu temperamento predominante. São 5 perguntas rápidas baseadas na teoria clássica dos 4 temperamentos.
          </p>
          <Button onClick={handleStart} className="rounded-xl gap-2 px-6">
            Iniciar Teste
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
