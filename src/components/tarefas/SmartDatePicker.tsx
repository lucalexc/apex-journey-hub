import { useState } from "react";
import { createPortal } from "react-dom";
import {
  format,
  addDays,
  isToday,
  isTomorrow,
  nextSaturday,
  nextMonday,
} from "date-fns";
  addDays,
  isToday,
  isTomorrow,
  nextSaturday,
  nextMonday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, Repeat, Sun, Calendar as CalendarFolder, Sofa, ArrowRight, Ban, X } from "lucide-react";
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
  const laterThisWeek = addDays(today, 2);
  const weekend = nextSaturday(today);
  const nextWeekMonday = nextMonday(addDays(today, 6));

  const shortcuts = [
    { icon: Sun, label: "Amanhã", hint: format(tomorrow, "EEE", { locale: ptBR }), date: tomorrow, iconColor: "text-amber-500" },
    { icon: CalendarFolder, label: "Mais tarde esta semana", hint: format(laterThisWeek, "EEE", { locale: ptBR }), date: laterThisWeek, iconColor: "text-blue-500" },
    { icon: Sofa, label: "Próximo fim de semana", hint: format(weekend, "EEE", { locale: ptBR }), date: weekend, iconColor: "text-purple-500" },
    { icon: ArrowRight, label: "Próxima semana", hint: format(nextWeekMonday, "EEE", { locale: ptBR }), date: nextWeekMonday, iconColor: "text-emerald-500" },
    { icon: Ban, label: "Sem vencimento", hint: "", date: undefined as Date | undefined, iconColor: "text-slate-400" },
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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-colors hover:bg-slate-50",
          value ? "text-blue-600" : "text-slate-600"
        )}
      >
        <CalendarIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">{displayLabel()}</span>
      </button>

      {/* Centered overlay modal */}
      {open && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* DatePicker Card - Centered */}
          <div className="relative w-72 bg-white border border-slate-200 shadow-2xl rounded-xl max-h-[80vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-in fade-in-0 zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Section 1: Shortcuts */}
            <div className="pt-2 pb-0.5">
              {shortcuts.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => pick(s.date)}
                  className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-slate-50 transition-colors text-[13px] text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <s.icon className={cn("h-3.5 w-3.5", s.iconColor)} />
                    <span>{s.label}</span>
                  </span>
                  {s.hint && (
                    <span className="text-[11px] text-slate-400 capitalize">{s.hint}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="border-b border-slate-100" />

            {/* Section 2: Compact Calendar */}
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => pick(date)}
                locale={ptBR}
                initialFocus
                className="p-2 pointer-events-auto !text-xs"
                classNames={{
                  months: "flex flex-col space-y-2",
                  month: "space-y-2",
                  caption: "flex justify-center pt-0.5 relative items-center",
                  caption_label: "text-xs font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-slate-200 text-slate-600",
                  nav_button_previous: "absolute left-0",
                  nav_button_next: "absolute right-0",
                  table: "w-full border-collapse",
                  head_row: "flex",
                  head_cell: "text-slate-500 rounded-md w-8 font-normal text-[11px]",
                  row: "flex w-full mt-1",
                  cell: "h-8 w-8 text-center text-[12px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-slate-100 transition-colors inline-flex items-center justify-center",
                  day_range_end: "day-range-end",
                  day_selected: "!bg-blue-600 !text-white hover:!bg-blue-700 focus:!bg-blue-600 focus:!text-white",
                  day_today: "bg-blue-50 text-blue-600 font-semibold",
                  day_outside: "text-slate-300 opacity-50",
                  day_disabled: "text-slate-300 opacity-50",
                  day_hidden: "invisible",
                }}
              />
            </div>

            <div className="border-b border-slate-100" />

            {/* Section 3: Footer */}
            <div className="p-2 flex gap-2">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="flex-1 border border-slate-200 text-slate-500 hover:bg-slate-50 text-[12px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Clock className="h-3 w-3" />
                Hora
              </button>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="flex-1 border border-slate-200 text-slate-500 hover:bg-slate-50 text-[12px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Repeat className="h-3 w-3" />
                Repetir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
