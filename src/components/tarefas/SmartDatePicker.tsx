import { useState } from "react";
import {
  format,
  addDays,
  isToday,
  isTomorrow,
  nextSaturday,
  nextMonday,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, Repeat, Sun, Calendar as CalendarFolder, Sofa, ArrowRight, Ban } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface SmartDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function SmartDatePicker({ value, onChange }: SmartDatePickerProps) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const tomorrow = addDays(today, 1);
  // "Mais tarde esta semana" = 2 days from now (mid-week)
  const laterThisWeek = addDays(today, 2);
  const weekend = nextSaturday(today);
  const nextWeekMonday = nextMonday(addDays(today, 6));

  const shortcuts = [
    {
      icon: Sun,
      label: "Amanhã",
      hint: format(tomorrow, "EEE", { locale: ptBR }),
      date: tomorrow,
      iconColor: "text-amber-500",
    },
    {
      icon: CalendarFolder,
      label: "Mais tarde esta semana",
      hint: format(laterThisWeek, "EEE", { locale: ptBR }),
      date: laterThisWeek,
      iconColor: "text-blue-500",
    },
    {
      icon: Sofa,
      label: "Próximo fim de semana",
      hint: format(weekend, "EEE", { locale: ptBR }),
      date: weekend,
      iconColor: "text-purple-500",
    },
    {
      icon: ArrowRight,
      label: "Próxima semana",
      hint: format(nextWeekMonday, "EEE", { locale: ptBR }),
      date: nextWeekMonday,
      iconColor: "text-emerald-500",
    },
    {
      icon: Ban,
      label: "Sem vencimento",
      hint: "",
      date: undefined as Date | undefined,
      iconColor: "text-slate-400",
    },
  ];

  const pick = (date: Date | undefined) => {
    onChange(date);
    setOpen(false);
  };

  const displayLabel = () => {
    if (!value) return "Data de vencimento";
    if (isToday(value)) return "Hoje";
    if (isTomorrow(value)) return "Amanhã";
    return format(value, "dd 'de' MMMM", { locale: ptBR });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-colors hover:bg-slate-50",
            value ? "text-blue-600" : "text-slate-600"
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{displayLabel()}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 z-[9999] bg-white border border-slate-200 shadow-2xl rounded-xl max-h-[70vh] overflow-y-auto overflow-x-hidden"
        side="bottom"
        align="center"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={24}
      >
        {/* Section 1: Quick Shortcuts */}
        <div className="py-1">
          {shortcuts.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => pick(s.date)}
              className="w-full flex justify-between items-center px-3 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700"
            >
              <span className="flex items-center gap-2.5">
                <s.icon className={cn("h-4 w-4", s.iconColor)} />
                <span>{s.label}</span>
              </span>
              {s.hint && (
                <span className="text-xs text-slate-400 capitalize">{s.hint}</span>
              )}
            </button>
          ))}
        </div>

        <div className="border-b border-slate-100" />

        {/* Section 2: Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => pick(date)}
            locale={ptBR}
            initialFocus
            className="p-3 pointer-events-auto"
            modifiersClassNames={{
              selected: "!bg-blue-600 !text-white hover:!bg-blue-700",
              today: "bg-blue-50 text-blue-600 font-semibold",
            }}
          />
        </div>

        <div className="border-b border-slate-100" />

        {/* Section 3: Footer Actions */}
        <div className="p-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Clock className="h-3.5 w-3.5" />
            Hora
          </button>
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Repeat className="h-3.5 w-3.5" />
            Repetir
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
