import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { format, isToday, isBefore, startOfDay, addDays, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SmartDatePicker } from "@/components/tarefas/SmartDatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: Date | undefined;
  done: boolean;
  timeSpent?: number; // Time in seconds
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onClick: (task: Task) => void;
  onTimeUpdate?: (id: string, timeSpent: number) => void;
}

const projects = ["Pessoal", "Trabalho", "Saúde", "Estudos"];
const projectColors: Record<string, string> = {
  Pessoal: "bg-primary/10 text-primary",
  Trabalho: "bg-amber-100 text-amber-700",
  Saúde: "bg-emerald-100 text-emerald-700",
  Estudos: "bg-violet-100 text-violet-700",
};

function EmptyState({ onAdd, message }: { onAdd: () => void; message: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[40vh] text-center px-6">
      <span className="text-5xl mb-4 block">✅</span>
      <h2 className="text-lg font-bold text-foreground">Nenhuma tarefa aqui</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-xs">{message}</p>
      <Button onClick={onAdd} className="mt-6 gap-2 rounded-xl">
        <Plus className="h-4 w-4" /> Nova Tarefa
      </Button>
    </motion.div>
  );
}

function TaskCard({ task, onToggle, onClick, onTimeUpdate }: TaskCardProps) {
  const isOverdue = task.dueDate && isBefore(task.dueDate, startOfDay(new Date())) && !task.done;
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(task.timeSpent || 0);

  // Focus Timer Logic
  useState(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && !task.done) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, task.done]);

  const handleTimerToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.done) return;
    
    if (isTimerActive) {
      // Stopping timer
      setIsTimerActive(false);
      if (onTimeUpdate) {
        onTimeUpdate(task.id, elapsed);
      }
    } else {
      // Starting timer
      setIsTimerActive(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      onClick={() => onClick(task)}
      className={cn(
        "flex flex-col gap-3 bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all relative overflow-hidden",
        isTimerActive && "ring-2 ring-blue-500 shadow-blue-500/20"
      )}
    >
      {/* Animated active background pulse */}
      {isTimerActive && (
        <div className="absolute inset-0 bg-blue-500/5 animate-pulse rounded-xl pointer-events-none" />
      )}

      <div className="flex items-center gap-3 relative z-10">
        <Checkbox 
          checked={task.done} 
          onCheckedChange={() => {
            if (isTimerActive) setIsTimerActive(false);
            onToggle(task.id);
          }} 
          onClick={(e) => e.stopPropagation()}
          className="rounded-full h-5 w-5 shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium text-foreground transition-all", task.done && "line-through opacity-50")}>{task.title}</p>
        </div>
        
        {/* Timer UI inside Card */}
        <div className="flex items-center gap-2 shrink-0">
          {(elapsed > 0 || isTimerActive) && (
            <span className={cn(
              "text-xs font-mono font-bold tracking-wider",
              isTimerActive ? "text-blue-600 font-black" : "text-muted-foreground"
            )}>
              {formatTime(elapsed)}
            </span>
          )}
          
          <button
            onClick={handleTimerToggle}
            disabled={task.done}
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-colors border",
              isTimerActive 
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" 
                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:text-blue-600",
              task.done && "opacity-50 cursor-not-allowed"
            )}
          >
            {isTimerActive ? (
               <div className="w-3 h-3 bg-current rounded-[2px]" /> // Stop Square
            ) : (
               <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-current border-b-[5px] border-b-transparent ml-0.5" /> // Play Triangle
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1 relative z-10 pl-8">
        <div className="flex items-center gap-2 shrink-0">
          {task.dueDate && (
            <span className={`text-[11px] font-semibold ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}>
              {format(task.dueDate, "dd MMM", { locale: ptBR })}
            </span>
          )}
          <Badge variant="secondary" className={`text-[10px] border-0 px-1.5 py-0 h-4 ${projectColors[task.project] || ""}`}>
            #{task.project}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}

export default function TarefasPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("Pessoal");
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleOpenNew = () => {
    setEditingTask(null);
    setTitle("");
    setProject("Pessoal");
    setDueDate(undefined);
    setOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setProject(task.project);
    setDueDate(task.dueDate);
    setOpen(true);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? { ...t, title: title.trim(), project, dueDate }
            : t
        )
      );
      toast({ title: "Tarefa atualizada!" });
    } else {
      const newTask: Task = { id: crypto.randomUUID(), title: title.trim(), project, dueDate, done: false, timeSpent: 0 };
      setTasks((prev) => [...prev, newTask]);
      toast({ title: "Tarefa criada!", description: `"${newTask.title}" adicionada.` });
    }
    setOpen(false);
  };

  const handleTimeUpdate = (id: string, timeSpent: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, timeSpent } : t));
  };

  const handleToggle = (id: string) => {
    setTasks((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const next = !t.done;
      if (next) toast({ title: "Tarefa concluída! ✅" });
      return { ...t, done: next };
    }));
  };

  const today = startOfDay(new Date());
  const in7 = addDays(today, 7);

  const todayTasks = tasks.filter((t) => t.dueDate && isToday(t.dueDate));
  const next7Tasks = tasks.filter((t) => t.dueDate && isAfter(t.dueDate, today) && !isAfter(t.dueDate, in7));

  const renderList = (list: Task[], msg: string) =>
    list.length === 0 ? (
      <EmptyState onAdd={handleOpenNew} message={msg} />
    ) : (
      <div className="space-y-2">
        <AnimatePresence>
          {list.map((t) => (
            <TaskCard 
              key={t.id} 
              task={t} 
              onToggle={handleToggle} 
              onClick={handleOpenEdit} 
              onTimeUpdate={handleTimeUpdate} 
            />
          ))}
        </AnimatePresence>
      </div>
    );

  return (
    <div className="w-full h-full px-4 py-6 md:px-8 md:py-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6 border-b border-transparent">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Tarefas</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Sua central de ação.</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2 rounded-xl hidden sm:flex">
          <Plus className="h-4 w-4" />
          <span>Nova Tarefa</span>
        </Button>
        <Button onClick={handleOpenNew} size="icon" className="rounded-full h-12 w-12 bg-blue-600 text-white hover:bg-blue-700 shadow-xl fixed bottom-20 right-4 z-40 sm:hidden">
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      <Tabs defaultValue="entrada" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="entrada" className="flex-1">Entrada</TabsTrigger>
          <TabsTrigger value="hoje" className="flex-1">Hoje</TabsTrigger>
          <TabsTrigger value="proximos" className="flex-1">Próximos 7 dias</TabsTrigger>
        </TabsList>
        <TabsContent value="entrada">{renderList(tasks, "Adicione sua primeira tarefa para começar a organizar seus projetos.")}</TabsContent>
        <TabsContent value="hoje">{renderList(todayTasks, "Nenhuma tarefa para hoje. Aproveite ou planeje algo!")}</TabsContent>
        <TabsContent value="proximos">{renderList(next7Tasks, "Sem tarefas nos próximos 7 dias. Que tal planejar a semana?")}</TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-screen h-[100dvh] max-w-full m-0 rounded-none p-6 sm:h-auto sm:w-full sm:max-w-md sm:rounded-2xl border-slate-200 shadow-xl flex flex-col pt-12 sm:pt-6">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>O que precisa ser feito?</Label>
              <Input placeholder="Descreva a tarefa..." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Projeto</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {projects.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <SmartDatePicker value={dueDate} onChange={setDueDate} />
            </div>
          </div>
          <DialogFooter className="mt-auto sm:mt-0 pt-6 sm:pt-0">
            <Button variant="ghost" className="w-full sm:w-auto hover:bg-slate-100 text-slate-600 font-medium mb-2 sm:mb-0" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!title.trim()} className="w-full sm:w-auto h-12 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
