import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, BookOpen, Headphones, ShoppingCart, Play, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Book } from "@/data/books";

type Tab = "video" | "read" | "audio" | "buy";

interface BookDetailModalProps {
  book: Book;
  open: boolean;
  onClose: () => void;
  completedMissions: string[];
  onToggleMission: (missionId: string) => void;
}

const actionButtons: { tab: Tab; icon: React.ElementType; label: string }[] = [
  { tab: "video", icon: PlayCircle, label: "Assistir Resumo" },
  { tab: "read", icon: BookOpen, label: "Ler Digital" },
  { tab: "audio", icon: Headphones, label: "Ouvir Áudio" },
  { tab: "buy", icon: ShoppingCart, label: "Comprar na Amazon" },
];

export default function BookDetailModal({ book, open, onClose, completedMissions, onToggleMission }: BookDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("video");
  const allDone = book.missions.length > 0 && book.missions.every(m => completedMissions.includes(m.id));

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="book-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="book-modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-screen h-[100dvh] max-w-full m-0 rounded-none sm:h-auto sm:w-full sm:max-w-4xl bg-white border border-border sm:rounded-2xl shadow-lg shadow-slate-200/50 sm:my-4 sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-4 sm:right-4 z-10 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
              {/* Cover */}
              <div className="flex-shrink-0 w-40 md:w-52 mx-auto md:mx-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover rounded-xl shadow-lg shadow-slate-300/50"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{book.title}</h2>
                  {allDone && (
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Conhecimento Aplicado
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{book.author}</p>
                <Badge variant="secondary" className="mt-3 text-xs bg-slate-100 text-slate-600 border-slate-200">{book.category}</Badge>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{book.synopsis}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {actionButtons.map(({ tab, icon: Icon, label }) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        activeTab === tab
                          ? "bg-accent border-primary/20 text-accent-foreground"
                          : "bg-white border-border text-slate-600 hover:bg-accent hover:text-accent-foreground hover:border-primary/20"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Dynamic Content Area */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === "video" && (
                  <motion.div key="video" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <VideoTab book={book} completedMissions={completedMissions} onToggleMission={onToggleMission} allDone={allDone} />
                  </motion.div>
                )}
                {activeTab === "read" && (
                  <motion.div key="read" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <PlaceholderTab icon={BookOpen} title="Versão Digital" description="Em breve você poderá ler o resumo completo diretamente aqui. Fique ligado!" />
                  </motion.div>
                )}
                {activeTab === "audio" && (
                  <motion.div key="audio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <PlaceholderTab icon={Headphones} title="Audiobook" description="O audiobook estará disponível em breve. Ouça o resumo enquanto treina ou dirige!" />
                  </motion.div>
                )}
                {activeTab === "buy" && (
                  <motion.div key="buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <BuyTab book={book} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Sub-components ── */

function VideoTab({ book, completedMissions, onToggleMission, allDone }: { book: Book; completedMissions: string[]; onToggleMission: (id: string) => void; allDone: boolean }) {
  return (
    <>
      {/* Video Player */}
      <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
        <img src={book.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md" />
        <div className="relative flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
          <span className="text-sm text-white/60">Assistir resumo em vídeo</span>
        </div>
      </div>

      {/* Missions */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-foreground">🎯 Plano de Ação: {book.title}</h3>
          {allDone && (
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px]">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Completo
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Complete as missões práticas para aplicar o conhecimento do livro.
        </p>
        <div className="space-y-3">
          {book.missions.map((mission) => {
            const checked = completedMissions.includes(mission.id);
            return (
              <label
                key={mission.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  checked
                    ? "bg-emerald-50/50 border-emerald-200"
                    : "bg-white border-border hover:border-primary/20 hover:bg-accent/50"
                }`}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggleMission(mission.id)}
                  className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className={`text-sm leading-relaxed ${checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {mission.text}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

function PlaceholderTab({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="w-16 h-16 text-slate-200 mb-4" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
    </div>
  );
}

function BuyTab({ book }: { book: Book }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingCart className="w-16 h-16 text-slate-200 mb-4" />
      <h3 className="text-lg font-semibold text-foreground">Comprar na Amazon</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm mb-4">
        Tenha a versão física de "{book.title}" para aprofundar seu conhecimento.
      </p>
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors shadow-[0_4px_14px_0_rgba(37,99,235,0.35)]"
      >
        <ShoppingCart className="w-4 h-4" />
        Comprar na Amazon
      </a>
    </div>
  );
}
