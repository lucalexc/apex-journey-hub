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

function TaskCard({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const isOverdue = task.dueDate && isBefore(task.dueDate, startOfDay(new Date())) && !task.done;

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border">
      <Checkbox checked={task.done} onCheckedChange={() => onToggle(task.id)} className="rounded-full h-5 w-5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-foreground ${task.done ? "line-through opacity-50" : ""}`}>{task.title}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {task.dueDate && (
          <span className={`text-xs font-medium ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}>
            {format(task.dueDate, "dd MMM", { locale: ptBR })}
          </span>
        )}
        <Badge variant="secondary" className={`text-[10px] border-0 ${projectColors[task.project] || ""}`}>
          #{task.project}
        </Badge>
      </div>
    </motion.div>
  );
}

export default function TarefasPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("Pessoal");
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleSave = () => {
    if (!title.trim()) return;
    const newTask: Task = { id: crypto.randomUUID(), title: title.trim(), project, dueDate, done: false };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setProject("Pessoal");
    setDueDate(undefined);
    setOpen(false);
    toast({ title: "Tarefa criada!", description: `"${newTask.title}" adicionada.` });
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
      <EmptyState onAdd={() => setOpen(true)} message={msg} />
    ) : (
      <div className="space-y-2">
        <AnimatePresence>{list.map((t) => <TaskCard key={t.id} task={t} onToggle={handleToggle} />)}</AnimatePresence>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tarefas</h1>
          <p className="text-sm text-muted-foreground mt-1">Sua central de ação.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nova Tarefa</span>
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
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!title.trim()}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
