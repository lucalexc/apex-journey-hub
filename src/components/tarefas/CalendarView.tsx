import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  format,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: Date | undefined;
  done: boolean;
  timeSpent?: number;
  time?: string;
  repeat?: { count: number; period: string };
}

const projectDotColors: Record<string, string> = {
  Pessoal: "bg-primary",
  Trabalho: "bg-amber-500",
  Saúde: "bg-emerald-500",
  Estudos: "bg-violet-500",
};

interface CalendarViewProps {
  tasks: Task[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onDayClick: (date: Date) => void;
}

export function CalendarView({ tasks, currentMonth, onMonthChange, onDayClick }: CalendarViewProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { locale: ptBR });
  const calEnd = endOfWeek(monthEnd, { locale: ptBR });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const tasksByDay = useMemo(() => {
    const map = new Map<string, Task[]>();
    tasks.forEach((t) => {
      if (t.dueDate) {
        const key = format(t.dueDate, "yyyy-MM-dd");
        const list = map.get(key) || [];
        list.push(t);
        map.set(key, list);
      }
    });
    return map;
  }, [tasks]);

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const prevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    onMonthChange(d);
  };

  const nextMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    onMonthChange(d);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      {/* Month header */}
      <div className="flex items-center justify-between px-1">
        <button onClick={prevMonth} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="text-sm font-semibold text-foreground capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h3>
        <button onClick={nextMonth} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayTasks = tasksByDay.get(key) || [];
          const inMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);

          return (
            <button
              key={key}
              onClick={() => onDayClick(day)}
              className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-start p-1 sm:p-1.5 transition-all border border-transparent hover:border-border hover:bg-secondary/50 relative min-h-[48px] sm:min-h-[64px]",
                !inMonth && "opacity-30",
                today && "bg-primary/5 border-primary/20"
              )}
            >
              <span
                className={cn(
                  "text-xs font-medium leading-none",
                  today ? "text-primary font-bold" : "text-foreground"
                )}
              >
                {format(day, "d")}
              </span>
              {dayTasks.length > 0 && (
                <div className="flex flex-wrap gap-0.5 mt-1 justify-center max-w-full">
                  {dayTasks.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        t.done ? "bg-muted-foreground/30" : (projectDotColors[t.project] || "bg-primary")
                      )}
                    />
                  ))}
                  {dayTasks.length > 3 && (
                    <span className="text-[8px] text-muted-foreground font-medium">+{dayTasks.length - 3}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
