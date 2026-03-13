import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

interface TimePickerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (time: string) => void;
  initialTime?: string;
}

export function TimePickerModal({ open, onClose, onSave, initialTime }: TimePickerModalProps) {
  const [hours, setHours] = useState("08");
  const [minutes, setMinutes] = useState("00");

  useEffect(() => {
    if (initialTime) {
      const [h, m] = initialTime.split(":");
      setHours(h || "08");
      setMinutes(m || "00");
    }
  }, [initialTime, open]);

  const handleSave = () => {
    const h = hours.padStart(2, "0");
    const m = minutes.padStart(2, "0");
    onSave(`${h}:${m}`);
    onClose();
  };

  const handleHoursChange = (val: string) => {
    const num = val.replace(/\D/g, "").slice(0, 2);
    if (num === "" || (parseInt(num) >= 0 && parseInt(num) <= 23)) setHours(num);
  };

  const handleMinutesChange = (val: string) => {
    const num = val.replace(/\D/g, "").slice(0, 2);
    if (num === "" || (parseInt(num) >= 0 && parseInt(num) <= 59)) setMinutes(num);
  };

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-card border border-border rounded-2xl shadow-xl w-[90vw] max-w-xs p-6 space-y-5"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Definir Horário</h3>
            </div>

            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={hours}
                onChange={(e) => handleHoursChange(e.target.value)}
                onBlur={() => setHours(hours.padStart(2, "0"))}
                className="w-16 h-14 text-center text-2xl font-bold rounded-xl border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={2}
                placeholder="08"
              />
              <span className="text-2xl font-bold text-muted-foreground">:</span>
              <input
                type="text"
                inputMode="numeric"
                value={minutes}
                onChange={(e) => handleMinutesChange(e.target.value)}
                onBlur={() => setMinutes(minutes.padStart(2, "0"))}
                className="w-16 h-14 text-center text-2xl font-bold rounded-xl border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={2}
                placeholder="00"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="ghost" onClick={onClose} className="flex-1 rounded-xl text-muted-foreground">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Salvar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
