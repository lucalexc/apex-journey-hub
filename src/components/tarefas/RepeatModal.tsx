import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

export interface RepeatConfig {
  count: number;
  period: "dia" | "semana" | "mês";
}

interface RepeatModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (config: RepeatConfig | undefined) => void;
  initialConfig?: RepeatConfig;
}

const periods: { value: RepeatConfig["period"]; label: string }[] = [
  { value: "dia", label: "ao dia" },
  { value: "semana", label: "na semana" },
  { value: "mês", label: "ao mês" },
];

export function RepeatModal({ open, onClose, onSave, initialConfig }: RepeatModalProps) {
  const [count, setCount] = useState(1);
  const [period, setPeriod] = useState<RepeatConfig["period"]>("semana");

  useEffect(() => {
    if (initialConfig) {
      setCount(initialConfig.count);
      setPeriod(initialConfig.period);
    } else {
      setCount(1);
      setPeriod("semana");
    }
  }, [initialConfig, open]);

  const handleCountChange = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1 && num <= 99) setCount(num);
    if (val === "") setCount(1);
  };

  const handleSave = () => {
    onSave({ count, period });
    onClose();
  };

  const handleRemove = () => {
    onSave(undefined);
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-card border border-border rounded-2xl shadow-xl w-[90vw] max-w-xs p-6 space-y-5"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              <Repeat className="h-5 w-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Repetição</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={count}
                  onChange={(e) => handleCountChange(e.target.value)}
                  className="w-16 h-12 text-center text-xl font-bold rounded-xl border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground font-medium">vezes</span>
              </div>

              <div className="flex gap-2">
                {periods.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPeriod(p.value)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      period === p.value
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                🔁 {count}x/{period === "dia" ? "dia" : period === "semana" ? "sem" : "mês"}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              {initialConfig && (
                <Button variant="ghost" onClick={handleRemove} className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 text-xs px-3">
                  Remover
                </Button>
              )}
              <div className="flex-1" />
              <Button variant="ghost" onClick={onClose} className="rounded-xl text-muted-foreground">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Salvar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
