import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Meta {
  id: string;
  title: string;
  target: number;
  current: number;
}

interface MetaCardProps {
  meta: Meta;
  onIncrement: (id: string) => void;
  onClick: (meta: Meta) => void;
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6"
    >
      <span className="text-5xl mb-4 block">🎯</span>
      <h2 className="text-xl font-bold text-foreground">Nenhuma meta ainda</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-xs">
        Defina metas quantitativas e acompanhe seu progresso diariamente.
      </p>
      <Button onClick={onAdd} className="mt-6 gap-2 rounded-xl">
        <Plus className="h-4 w-4" />
        Criar primeira meta
      </Button>
    </motion.div>
  );
}

function MetaCard({ meta, onIncrement, onClick }: MetaCardProps) {
  const percent = Math.min(Math.round((meta.current / meta.target) * 100), 100);
  const isDone = meta.current >= meta.target;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(meta)}
      className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col gap-4 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">{meta.title}</h3>
        </div>
        {isDone && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-phase-done uppercase">
            <Sparkles className="h-3 w-3" /> Concluída
          </span>
        )}
      </div>

      <div className="text-center py-2">
        <p className="text-3xl font-bold text-foreground text-mono">
          {meta.current} <span className="text-muted-foreground text-lg font-normal">/ {meta.target}</span>
        </p>
      </div>

      <Progress value={percent} className="h-2 bg-secondary" />

      <Button
        variant="outline"
        size="sm"
        className="w-full rounded-xl gap-1"
        onClick={(e) => {
          e.stopPropagation();
          onIncrement(meta.id);
        }}
        disabled={isDone}
      >
        <Plus className="h-4 w-4" />
        {isDone ? "Meta atingida! 🎉" : "Registrar progresso"}
      </Button>
    </motion.div>
  );
}

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [open, setOpen] = useState(false);
  const [editingMeta, setEditingMeta] = useState<Meta | null>(null);
  
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const handleOpenNew = () => {
    setEditingMeta(null);
    setTitle("");
    setTarget("");
    setOpen(true);
  };

  const handleOpenEdit = (meta: Meta) => {
    setEditingMeta(meta);
    setTitle(meta.title);
    setTarget(meta.target.toString());
    setOpen(true);
  };

  const handleSave = () => {
    if (!title.trim() || !target.trim() || Number(target) <= 0) return;
    
    if (editingMeta) {
      setMetas((prev) =>
        prev.map((m) =>
          m.id === editingMeta.id
            ? { ...m, title: title.trim(), target: Number(target) }
            : m
        )
      );
      toast({ title: "Meta atualizada!" });
    } else {
      const newMeta: Meta = {
        id: crypto.randomUUID(),
        title: title.trim(),
        target: Number(target),
        current: 0,
      };
      setMetas((prev) => [...prev, newMeta]);
      toast({ title: "Meta criada!", description: `"${newMeta.title}" adicionada com sucesso.` });
    }
    setOpen(false);
  };

  const handleIncrement = (id: string) => {
    setMetas((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const next = m.current + 1;
        if (next >= m.target) {
          toast({ title: "🎉 Meta concluída!", description: `Você completou "${m.title}"!` });
        }
        return { ...m, current: next };
      })
    );
  };

  return (
    <div className="w-full h-full px-4 py-6 md:px-8 md:py-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Metas</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Acompanhe seu progresso quantitativo.</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2 rounded-xl hidden sm:flex">
          <Plus className="h-4 w-4" />
          <span>Nova Meta</span>
        </Button>
        <Button onClick={handleOpenNew} size="icon" className="rounded-full h-12 w-12 bg-blue-600 text-white hover:bg-blue-700 shadow-xl fixed bottom-20 right-4 z-40 sm:hidden">
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {metas.length === 0 ? (
        <EmptyState onAdd={handleOpenNew} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {metas.map((meta) => (
              <MetaCard key={meta.id} meta={meta} onIncrement={handleIncrement} onClick={handleOpenEdit} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-screen h-[100dvh] max-w-full m-0 rounded-none p-6 sm:h-auto sm:w-full sm:max-w-md sm:rounded-2xl border-slate-200 shadow-xl flex flex-col pt-12 sm:pt-6">
          <DialogHeader>
            <DialogTitle>{editingMeta ? "Editar Meta" : "Nova Meta"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Título da Meta</Label>
              <Input id="meta-title" placeholder='Ex: "Ler 30 páginas"' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-target">Alvo de Repetições</Label>
              <Input id="meta-target" type="number" min={1} placeholder="30" value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="mt-auto sm:mt-0 pt-6 sm:pt-0">
            <Button variant="ghost" className="w-full sm:w-auto hover:bg-slate-100 text-slate-600 font-medium mb-2 sm:mb-0" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!title.trim() || !target.trim() || Number(target) <= 0} className="w-full sm:w-auto h-12 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
