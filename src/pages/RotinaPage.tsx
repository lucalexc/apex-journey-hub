import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sunrise, Sun, Moon, Clock, Bed, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

function TimeInput24h({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d]/g, "");
    if (raw.length > 4) raw = raw.slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + ":" + raw.slice(2);
    }
    // Validate
    if (raw.includes(":")) {
      const [h, m] = raw.split(":");
      const hNum = parseInt(h, 10);
      const mNum = parseInt(m || "0", 10);
      if (hNum > 23) return;
      if (m && m.length === 2 && mNum > 59) return;
    }
    onChange(raw);
  };

  return (
    <Input
      ref={inputRef}
      inputMode="numeric"
      maxLength={5}
      placeholder="HH:MM"
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
}

type Period = "morning" | "afternoon" | "night";

interface RoutineItem {
  id: string;
  name: string;
  period: Period;
  time: string;
  done: boolean;
}

const periodConfig = {
  morning: { label: "Manhã", range: "05h – 12h", icon: Sunrise },
  afternoon: { label: "Tarde", range: "12h – 18h", icon: Sun },
  night: { label: "Noite", range: "18h – 23h", icon: Moon },
} as const;

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <span className="text-5xl mb-4 block">⏰</span>
      <h2 className="text-xl font-bold text-foreground">Sua rotina está vazia</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-xs">Organize seu dia em blocos de manhã, tarde e noite.</p>
      <Button onClick={onAdd} className="mt-6 gap-2 rounded-xl">
        <Plus className="h-4 w-4" /> Criar primeiro bloco
      </Button>
    </motion.div>
  );
}

function RoutineCard({ item, onToggle }: { item: RoutineItem; onToggle: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm border border-border transition-opacity ${item.done ? "opacity-50" : ""}`}
    >
      <Checkbox
        checked={item.done}
        onCheckedChange={() => onToggle(item.id)}
        className="rounded-full h-5 w-5"
      />
      <span className="text-sm font-mono text-muted-foreground w-14 shrink-0">{item.time}</span>
      <span className={`text-sm font-medium text-foreground ${item.done ? "line-through" : ""}`}>{item.name}</span>
    </motion.div>
  );
}

function useSleepDuration(wakeTime: string, sleepTime: string) {
  if (!wakeTime || !sleepTime) return null;
  const [wH, wM] = wakeTime.split(":").map(Number);
  const [sH, sM] = sleepTime.split(":").map(Number);
  let diff = (wH * 60 + wM) - (sH * 60 + sM);
  if (diff <= 0) diff += 1440;
  return { hours: Math.floor(diff / 60), minutes: diff % 60, total: diff / 60 };
}

function SleepFeedback({ hours, minutes, total }: { hours: number; minutes: number; total: number }) {
  const label = `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  if (total < 7) return <p className="text-sm font-medium text-destructive">⚠️ {label} de sono. Abaixo do recomendado (7h a 9h).</p>;
  if (total > 9) return <p className="text-sm font-medium" style={{ color: "hsl(25 95% 53%)" }}>⚠️ {label} de sono. Acima do recomendado (7h a 9h).</p>;
  return <p className="text-sm font-medium" style={{ color: "hsl(142 71% 45%)" }}>✅ {label} de sono. Perfeito! Dentro do ideal.</p>;
}

function CircadianCard() {
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const sleep = useSleepDuration(wakeTime, sleepTime);

  const handleConfirm = () => {
    if (!wakeTime || !sleepTime) return;
    setIsEditing(false);
    setConfirmed(true);
    toast({ title: "Horários confirmados!", description: `Acordar: ${wakeTime} · Dormir: ${sleepTime}` });
  };

  // Initial empty state
  if (!confirmed && !isEditing) {
    return (
      <motion.button
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsEditing(true)}
        className="w-full flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 mb-6 text-left hover:bg-accent/50 transition-colors"
      >
        <Bed className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Definir horário de sono</span>
      </motion.button>
    );
  }

  // Read mode
  if (confirmed && !isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 mb-6 border border-border"
        style={{ background: "hsl(var(--sleep-card))" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5" style={{ color: "hsl(var(--sleep-card-foreground))" }} />
            <h3 className="text-sm font-semibold" style={{ color: "hsl(var(--sleep-card-foreground))" }}>Ciclo Circadiano</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex items-center gap-6 mb-3">
          <div className="flex items-center gap-2">
            <Sunrise className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Acordar:</span>
            <span className="text-sm font-bold text-foreground font-mono">{wakeTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Dormir:</span>
            <span className="text-sm font-bold text-foreground font-mono">{sleepTime}</span>
          </div>
        </div>
        {sleep && <SleepFeedback hours={sleep.hours} minutes={sleep.minutes} total={sleep.total} />}
      </motion.div>
    );
  }

  // Edit mode
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 mb-6 border border-border"
      style={{ background: "hsl(var(--sleep-card))" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Bed className="h-5 w-5" style={{ color: "hsl(var(--sleep-card-foreground))" }} />
        <h3 className="text-sm font-semibold" style={{ color: "hsl(var(--sleep-card-foreground))" }}>Ciclo Circadiano</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Acordar</Label>
          <div className="relative">
            <Sunrise className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <TimeInput24h value={wakeTime} onChange={setWakeTime} className="pl-10 bg-card" />
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Dormir</Label>
          <div className="relative">
            <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <TimeInput24h value={sleepTime} onChange={setSleepTime} className="pl-10 bg-card" />
          </div>
        </div>
      </div>
      {sleep && <div className="mb-4"><SleepFeedback hours={sleep.hours} minutes={sleep.minutes} total={sleep.total} /></div>}
      <Button onClick={handleConfirm} disabled={!wakeTime || !sleepTime} className="rounded-xl">Confirmar Horários</Button>
    </motion.div>
  );
}

export default function RotinaPage() {
  const [items, setItems] = useState<RoutineItem[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("07:00");

  function getPeriodByTime(t: string): Period {
    const [h] = t.split(":").map(Number);
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 18) return "afternoon";
    return "night";
  }

  const inferredPeriod = getPeriodByTime(time);
  const periodFeedback = {
    morning: "☀️ Manhã",
    afternoon: "☀️ Tarde",
    night: "🌙 Noite",
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const period = getPeriodByTime(time);
    const newItem: RoutineItem = { id: crypto.randomUUID(), name: name.trim(), period, time, done: false };
    setItems((prev) => [...prev, newItem].sort((a, b) => a.time.localeCompare(b.time)));
    setName("");
    setTime("07:00");
    setOpen(false);
    toast({ title: "Bloco criado!", description: `"${newItem.name}" adicionado à ${periodConfig[period].label}.` });
  };

  const handleToggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };

  const hasItems = items.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rotina</h1>
          <p className="text-sm text-muted-foreground mt-1">Organize seu dia em blocos de foco.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Bloco</span>
        </Button>
      </motion.div>

      <CircadianCard />

      {!hasItems ? (
        <EmptyState onAdd={() => setOpen(true)} />
      ) : (
        <div className="space-y-8">
          {(["morning", "afternoon", "night"] as Period[]).map((p) => {
            const cfg = periodConfig[p];
            const periodItems = items.filter((i) => i.period === p);
            if (periodItems.length === 0) return null;
            return (
              <section key={p}>
                <div className="flex items-center gap-2 mb-3">
                  <cfg.icon className="h-4 w-4 text-muted-foreground" />
                   <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                     {cfg.label} <span className="font-normal">({cfg.range})</span>
                   </h2>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {periodItems.map((item) => (
                      <RoutineCard key={item.id} item={item} onToggle={handleToggle} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Novo Bloco de Rotina</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nome da Atividade</Label>
              <Input placeholder='Ex: "Tomar Água"' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Horário</Label>
              <TimeInput24h value={time} onChange={setTime} />
              {time.length === 5 && (
                <Badge variant="secondary" className="mt-1.5 text-xs font-normal">
                  Será alocado no bloco da {periodFeedback[inferredPeriod]}
                </Badge>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!name.trim()}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
