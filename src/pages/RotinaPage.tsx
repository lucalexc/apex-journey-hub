import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sunrise, Sun, Moon, Clock, Bed, Pencil, Trophy, Download, Send, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";

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

const defaultItems: RoutineItem[] = [
  { id: "1", name: "Acordar & Hidratar", period: "morning", time: "05:30", done: true },
  { id: "2", name: "Treino de Força", period: "morning", time: "06:00", done: true },
  { id: "3", name: "Leitura 20 min", period: "morning", time: "07:15", done: true },
  { id: "4", name: "Trabalho Profundo", period: "morning", time: "08:30", done: false },

  { id: "5", name: "Almoço Saudável", period: "afternoon", time: "12:30", done: false },
  { id: "6", name: "Reunião de Alin.", period: "afternoon", time: "14:00", done: false },

  { id: "7", name: "Jantar Leve", period: "night", time: "19:00", done: false },
  { id: "8", name: "Desligar Telas", period: "night", time: "21:30", done: false },
];

function RoutineCard({ item, onToggle }: { item: RoutineItem; onToggle: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100 transition-opacity ${item.done ? "opacity-60" : ""}`}
    >
      <Checkbox
        checked={item.done}
        onCheckedChange={() => onToggle(item.id)}
        className={`rounded-full h-5 w-5 ${item.done ? "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" : ""}`}
      />
      <span className="text-xs font-mono text-slate-400 font-medium w-10 shrink-0">{item.time}</span>
      <span className={`text-sm font-semibold flex-1 ${item.done ? "text-slate-400 line-through decoration-slate-300" : "text-slate-700"}`}>
        {item.name}
      </span>
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

  if (!confirmed && !isEditing) {
    return (
      <motion.button
        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsEditing(true)}
        className="w-full flex items-center gap-3 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm p-4 mb-8 text-left hover:bg-slate-50 transition-colors"
      >
        <Bed className="h-5 w-5 text-slate-400" />
        <span className="text-sm font-medium text-slate-500">Definir ciclo circadiano e criar compromisso com o sono</span>
      </motion.button>
    );
  }

  if (confirmed && !isEditing) {
    return (
      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-5 mb-8 border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-slate-700" />
            <h3 className="text-sm font-semibold text-slate-800">Ciclo Circadiano Definido</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
        <div className="flex items-center gap-6 mb-3">
          <div className="flex items-center gap-2">
            <Sunrise className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-500">Acordar:</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{wakeTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-500">Dormir:</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{sleepTime}</span>
          </div>
        </div>
        {sleep && <SleepFeedback hours={sleep.hours} minutes={sleep.minutes} total={sleep.total} />}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-5 mb-8 border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bed className="h-5 w-5 text-slate-700" />
        <h3 className="text-sm font-semibold text-slate-800">Definir Ciclo de Sono</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs font-semibold text-slate-600">Acordar</Label>
          <div className="relative">
            <Sunrise className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <TimeInput24h value={wakeTime} onChange={setWakeTime} className="pl-10 border-slate-200 bg-slate-50" />
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs font-semibold text-slate-600">Dormir</Label>
          <div className="relative">
            <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <TimeInput24h value={sleepTime} onChange={setSleepTime} className="pl-10 border-slate-200 bg-slate-50" />
          </div>
        </div>
      </div>
      {sleep && <div className="mb-4"><SleepFeedback hours={sleep.hours} minutes={sleep.minutes} total={sleep.total} /></div>}
      <Button onClick={handleConfirm} disabled={!wakeTime || !sleepTime} className="rounded-xl w-full">Confirmar Horários</Button>
    </motion.div>
  );
}

export default function RotinaPage() {
  const [items, setItems] = useState<RoutineItem[]>(defaultItems);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [time, setTime] = useState("07:00");

  function getPeriodByTime(t: string): Period {
    const [h] = t.split(":").map(Number);
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 18) return "afternoon";
    return "night";
  }

  const inferredPeriod = getPeriodByTime(time);
  const periodFeedback = { morning: "☀️ Manhã", afternoon: "☀️ Tarde", night: "🌙 Noite" };

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

  const doneCount = items.filter(i => i.done).length;
  const totalCount = items.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const handleDownloadImage = useCallback(() => {
    const node = document.getElementById("export-card");
    if (!node) return;
    
    // Convert to image
    toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: "#fff" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `metatask-vitoria-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
        toast({ title: "Imagem baixada com sucesso! 🏆" });
      })
      .catch((err) => {
        toast({ title: "Erro ao exportar imagem", variant: "destructive", description: err instanceof Error ? err.message : "Um erro ocorreu" });
        console.error(err);
      });
  }, []);

  const handleShareWhatsApp = () => {
    const text = "Dá uma olhada no meu progresso de hoje. Construa sua rotina no MetaTask: https://metatask.app";
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      {/* Banner de Growth */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
        className="mb-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Você está dominando o seu dia.</h2>
          <p className="text-slate-300 text-sm font-medium">Compartilhe seu progresso e inspire outras pessoas a saírem da inércia.</p>
        </div>
        <Button 
          onClick={() => setShareOpen(true)}
          className="bg-white text-slate-900 font-bold hover:bg-slate-100 rounded-xl px-6 h-12 shrink-0 transition-transform active:scale-95 shadow-xl shadow-white/10"
        >
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Compartilhar Vitória
        </Button>
      </motion.div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Minha Rotina</h1>
          <p className="text-sm text-slate-500 mt-1">Sua máquina diária de progresso.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2 rounded-xl h-10 px-4 bg-slate-900 text-white hover:bg-slate-800 font-bold">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Bloco</span>
        </Button>
      </div>

      <CircadianCard />

      {/* Blocos em 3 Colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["morning", "afternoon", "night"] as Period[]).map((p) => {
          const cfg = periodConfig[p];
          const periodItems = items.filter((i) => i.period === p);

          return (
            <div key={p} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                  <cfg.icon className="h-4 w-4 text-slate-600" />
                </div>
                 <div>
                   <h2 className="text-sm font-bold text-slate-800">{cfg.label}</h2>
                   <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">{cfg.range}</p>
                 </div>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {periodItems.length === 0 ? (
                    <p className="text-sm font-medium text-slate-400 text-center py-6 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">Livre</p>
                  ) : (
                    periodItems.map((item) => (
                      <RoutineCard key={item.id} item={item} onToggle={handleToggle} />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Criar Bloco */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border-slate-200 bg-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Novo Bloco de Rotina</DialogTitle>
            <DialogDescription className="text-slate-500">Adicione um novo hábito ao seu dia.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Nome da Atividade</Label>
              <Input placeholder='Ex: "Tomar Água"' value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-50 border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Horário</Label>
              <TimeInput24h value={time} onChange={setTime} className="bg-slate-50 border-slate-200 w-32" />
              {time.length === 5 && (
                <Badge variant="outline" className="mt-2 text-[10px] font-semibold bg-slate-100 text-slate-500 border-0 uppercase tracking-widest">
                  {periodFeedback[inferredPeriod]}
                </Badge>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="hover:bg-slate-100 text-slate-600 font-medium" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!name.trim()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Compartilhar (Growth) */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-[400px] w-[90vw] rounded-3xl p-6 bg-slate-50 border-slate-200 space-y-0 gap-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-center text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Inspire sua rede
            </DialogTitle>
          </DialogHeader>

          {/* O CARD EXPORTÁVEL (Efeito Strava) */}
          <div 
            id="export-card" 
            className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-sm border border-slate-200 aspect-[4/5] flex flex-col mx-auto w-full max-w-[320px]"
          >
             {/* Cabeçalho */}
             <div className="text-center mb-6">
               <p className="text-blue-600 font-extrabold text-[10px] tracking-[0.2em] uppercase mb-1">
                 {new Date().toLocaleDateString('pt-BR')}
               </p>
               <h3 className="text-[22px] font-black text-slate-900 leading-[1.1] tracking-tight">Rotina de<br/>Alta Performance</h3>
             </div>

             {/* Progresso */}
             <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 mb-6 text-center">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">Constância do Dia</p>
               <div className="flex items-end justify-center gap-1.5">
                 <span className="text-3xl font-black text-blue-600 leading-none">{progressPercent}%</span>
                 <span className="text-slate-500 font-bold text-[10px] uppercase mb-1 tracking-wider">Concluído</span>
               </div>
               <div className="h-2 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                 <div className="h-full bg-blue-600 transition-all duration-1000 origin-left" style={{ width: `${progressPercent}%` }} />
               </div>
             </div>

             {/* Vitórias */}
             <div className="flex-1 mt-1">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-3 px-1 text-center">Minhas Vitórias</p>
               <ul className="space-y-2">
                 {items.filter(i => i.done).slice(0, 4).map(v => (
                   <li key={v.id} className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl border border-white shadow-sm">
                     <div className="bg-green-100 p-1 rounded-full shrink-0"><Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3}/></div>
                     <span className="font-bold text-slate-800 text-[13px] truncate">{v.name}</span>
                   </li>
                 ))}
                 {items.filter(i => i.done).length === 0 && (
                   <div className="text-center py-4 bg-white/50 rounded-xl border border-white/50">
                     <p className="text-[11px] text-slate-400 font-medium">O dia está só começando...</p>
                   </div>
                 )}
               </ul>
             </div>

             {/* Rodapé da Imagem */}
             <div className="pt-6 mt-6 flex flex-col items-center justify-center border-t border-slate-200/50">
                <span className="font-black text-slate-900 text-lg tracking-tight">Meta<span className="text-blue-600">Task</span></span>
                <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">metatask.app</span>
             </div>
          </div>

          {/* Ações reais do usuário */}
          <div className="space-y-3 pt-2">
            <Button onClick={handleDownloadImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 font-bold gap-2 text-[15px] shadow-lg shadow-blue-500/20">
              <Download className="w-5 h-5 opacity-90" /> Baixar Imagem (PNG)
            </Button>
            <Button onClick={handleShareWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl h-14 font-bold gap-2 text-[15px] shadow-lg shadow-[#25D366]/20">
              <Send className="w-5 h-5 opacity-90" /> Enviar no WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
