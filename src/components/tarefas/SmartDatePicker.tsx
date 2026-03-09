import { useState } from "react";
import { format, addDays, isToday, isTomorrow, nextSaturday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sun, Sunrise, Sofa, Ban, Clock, Repeat, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SmartDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function SmartDatePicker({ value, onChange }: SmartDatePickerProps) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeekend = nextSaturday(today);

  const shortcuts = [
    {
      icon: Sun,
      label: "Hoje",
      hint: format(today, "EEE", { locale: ptBR }),
      date: today,
      color: "text-emerald-400",
    },
    {
      icon: Sunrise,
      label: "Amanhã",
      hint: format(tomorrow, "EEE", { locale: ptBR }),
      date: tomorrow,
      color: "text-amber-400",
    },
    {
      icon: Sofa,
      label: "Próximo fim de semana",
      hint: format(nextWeekend, "dd MMM", { locale: ptBR }),
      date: nextWeekend,
      color: "text-blue-400",
    },
    {
      icon: Ban,
      label: "Sem vencimento",
      hint: "",
      date: undefined as Date | undefined,
      color: "text-muted-foreground",
    },
  ];

  const selectShortcut = (date: Date | undefined) => {
    onChange(date);
    setOpen(false);
  };

  const selectFromCalendar = (date: Date | undefined) => {
    onChange(date);
    if (date) setOpen(false);
  };

  const displayLabel = () => {
    if (!value) return "Selecione uma data";
    if (isToday(value)) return "Hoje";
    if (isTomorrow(value)) return "Amanhã";
    return format(value, "dd 'de' MMMM", { locale: ptBR });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-border bg-background/50",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[9999] w-[min(360px,95vw)] p-0 border-border bg-popover shadow-2xl max-h-[60vh] overflow-y-auto overflow-x-hidden"
        side="bottom"
        align="center"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={24}
      >
        <div className="flex flex-col">
          {/* Quick shortcuts */}
          <div className="shrink-0 p-2 space-y-0.5">
            {shortcuts.map((s) => (
              <button
                key={s.label}
                onClick={() => selectShortcut(s.date)}
                className="flex h-8 items-center w-full gap-2.5 px-3 py-1.5 rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
              >
                <s.icon className={cn("h-4 w-4", s.color)} />
                <span className="flex-1 text-left truncate">{s.label}</span>
                {s.hint && (
                  <span className="text-xs text-muted-foreground capitalize shrink-0">{s.hint}</span>
                )}
              </button>
            ))}
          </div>

          <div className="border-t border-border" />

          {/* Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={value}
              onSelect={selectFromCalendar}
              initialFocus
              className="p-2 pointer-events-auto"
              locale={ptBR}
            />
          </div>

          <div className="border-t border-border" />

          {/* Time & Repeat */}
          <div className="shrink-0 p-2 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 h-8 border-border text-muted-foreground hover:text-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <Clock className="h-3.5 w-3.5" /> Hora
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 h-8 border-border text-muted-foreground hover:text-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <Repeat className="h-3.5 w-3.5" /> Repetir
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
