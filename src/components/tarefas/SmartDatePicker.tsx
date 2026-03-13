import { useState } from "react";
import {
  format,
  addDays,
  isToday,
  isTomorrow,
  nextSaturday,
  nextMonday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, Repeat, Sun, Calendar as CalendarFolder, Sofa, ArrowRight, Ban, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface SmartDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  onTimeClick?: () => void;
  onRepeatClick?: () => void;
  time?: string;
  hasRepeat?: boolean;
}

export function SmartDatePicker({ value, onChange, onTimeClick, onRepeatClick, time, hasRepeat }: SmartDatePickerProps) {
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors hover:bg-secondary/50",
            value ? "text-primary" : "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{displayLabel()}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent 
        side="right" 
        sideOffset={16} 
        align="start" 
        avoidCollisions={true}
        className="pointer-events-auto w-72 bg-card border border-border shadow-xl rounded-xl p-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-[9999]"
      >
        <PopoverPrimitive.Arrow className="fill-card" />
        
        <div className="flex justify-end pt-2 pr-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="pb-0.5">
          {shortcuts.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => pick(s.date)}
              className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-secondary/50 transition-colors text-[13px] text-foreground"
            >
              <span className="flex items-center gap-2">
                <s.icon className={cn("h-3.5 w-3.5", s.iconColor)} />
                <span>{s.label}</span>
              </span>
              {s.hint && (
                <span className="text-[11px] text-muted-foreground capitalize">{s.hint}</span>
              )}
            </button>
          ))}
        </div>

        <div className="border-b border-border" />

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => pick(date)}
            locale={ptBR}
            initialFocus
            className="p-2 !text-xs"
            classNames={{
              months: "flex flex-col space-y-2",
              month: "space-y-2",
              caption: "flex justify-center pt-0.5 relative items-center",
              caption_label: "text-xs font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-border text-foreground",
              nav_button_previous: "absolute left-0",
              nav_button_next: "absolute right-0",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[11px]",
              row: "flex w-full mt-1",
              cell: "h-8 w-8 text-center text-[12px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-secondary transition-colors inline-flex items-center justify-center",
              day_range_end: "day-range-end",
              day_selected: "!bg-primary !text-primary-foreground hover:!bg-primary/90 focus:!bg-primary focus:!text-primary-foreground",
              day_today: "bg-primary/10 text-primary font-semibold",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_hidden: "invisible",
            }}
          />
        </div>

        <div className="border-b border-border" />

        <div className="p-2 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              onTimeClick?.();
            }}
            className={cn(
              "flex-1 border text-[12px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors",
              time ? "border-primary/30 text-primary bg-primary/5" : "border-border text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Clock className="h-3 w-3" />
            {time || "Hora"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              onRepeatClick?.();
            }}
            className={cn(
              "flex-1 border text-[12px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors",
              hasRepeat ? "border-primary/30 text-primary bg-primary/5" : "border-border text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Repeat className="h-3 w-3" />
            Repetir
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
