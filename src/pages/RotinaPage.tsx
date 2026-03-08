import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sunrise, Sun, Moon, Clock, Bed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

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

function CircadianCard() {
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [editing, setEditing] = useState(false);

  const sleepDuration = (() => {
    if (!wakeTime || !sleepTime) return null;
    const [wH, wM] = wakeTime.split(":").map(Number);
    const [sH, sM] = sleepTime.split(":").map(Number);
    let wakeMin = wH * 60 + wM;
    let sleepMin = sH * 60 + sM;
    let diff = wakeMin - sleepMin;
    if (diff <= 0) diff += 1440;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h${m > 0 ? ` ${m}m` : ""}`;
  })();

  if (!editing && !wakeTime && !sleepTime) {
    return (
      <motion.button
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setEditing(true)}
        className="w-full flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 mb-6 text-left hover:bg-accent/50 transition-colors"
      >
        <Bed className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Definir horário de sono</span>
      </motion.button>
    );
  }

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
        {sleepDuration && (
          <Badge variant="secondary" className="ml-auto text-xs font-mono">
            ⏱️ {sleepDuration} de sono
          </Badge>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Acordar</Label>
          <div className="relative">
            <Sunrise className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={wakeTime}
              onChange={(e) => { setWakeTime(e.target.value); setEditing(false); }}
              className="pl-10 bg-card"
            />
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Dormir</Label>
          <div className="relative">
            <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={sleepTime}
              onChange={(e) => { setSleepTime(e.target.value); setEditing(false); }}
              className="pl-10 bg-card"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RotinaPage() {
  const [items, setItems] = useState<RoutineItem[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [period, setPeriod] = useState<Period>("morning");
  const [time, setTime] = useState("07:00");

  const handleSave = () => {
    if (!name.trim()) return;
    const newItem: RoutineItem = { id: crypto.randomUUID(), name: name.trim(), period, time, done: false };
    setItems((prev) => [...prev, newItem].sort((a, b) => a.time.localeCompare(b.time)));
    setName("");
    setPeriod("morning");
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
              <Label>Nome do Hábito</Label>
              <Input placeholder='Ex: "Tomar Água"' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="morning">Manhã (05h–12h)</SelectItem>
                   <SelectItem value="afternoon">Tarde (12h–18h)</SelectItem>
                   <SelectItem value="night">Noite (18h–23h)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Horário</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
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
