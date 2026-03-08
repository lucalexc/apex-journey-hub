import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { layers } from "@/data/quem-sou";

export function LayersTab() {
  const [currentLayer, setCurrentLayer] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleSetLayer = (id: number) => {
    setCurrentLayer(id);
    toast({ title: `Camada ${id} selecionada ✅`, description: `Você está na camada: ${layers.find((l) => l.id === id)?.title}` });
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-foreground">As 12 Camadas da Personalidade</h3>
        <p className="text-sm text-muted-foreground mt-1">Identifique em qual estágio de maturidade você está operando</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-4 bottom-4 w-px bg-border" />

        {layers.slice().reverse().map((layer, i) => {
          const isActive = currentLayer === layer.id;
          const isExpanded = expanded === layer.id;

          return (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="relative pl-14 mb-2"
            >
              {/* Node */}
              <div className={`absolute left-3.5 top-4 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isActive
                  ? "bg-primary border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                  : "bg-card border-border"
              }`}>
                {isActive && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>

              <button
                onClick={() => toggleExpand(layer.id)}
                className={`w-full text-left rounded-xl p-4 transition-all border ${
                  isActive
                    ? "bg-primary/5 border-primary/30 shadow-card-hover"
                    : "bg-card border-border/50 shadow-card hover:shadow-card-hover hover:border-primary/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      {layer.id}
                    </span>
                    <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                      {layer.title}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-medium bg-xp/10 text-xp px-2 py-0.5 rounded-full">
                        Nível Atual
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{layer.description}</p>
                      {!isActive && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-3 rounded-lg text-xs gap-1.5 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                          onClick={(e) => { e.stopPropagation(); handleSetLayer(layer.id); }}
                        >
                          <Check className="h-3 w-3" /> Atualmente estou nesta camada
                        </Button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
