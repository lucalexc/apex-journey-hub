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

const actionButtons: { tab: Tab; icon: React.ElementType; label: string; accent?: string }[] = [
  { tab: "video", icon: PlayCircle, label: "Assistir Resumo", accent: "text-primary" },
  { tab: "read", icon: BookOpen, label: "Ler Digital" },
  { tab: "audio", icon: Headphones, label: "Ouvir Áudio" },
  { tab: "buy", icon: ShoppingCart, label: "Comprar na Amazon", accent: "text-amber-400" },
];

export default function BookDetailModal({ book, open, onClose, completedMissions, onToggleMission }: BookDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("video");
  const allDone = book.missions.every(m => completedMissions.includes(m.id));

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="book-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="book-modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
              {/* Cover with reflection */}
              <div className="flex-shrink-0 w-40 md:w-52 mx-auto md:mx-0">
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-cover rounded-xl shadow-lg"
                  />
                  {/* Reflection */}
                  <div
                    className="w-full aspect-[2/3] mt-1 rounded-xl overflow-hidden opacity-20 pointer-events-none"
                    style={{ transform: "scaleY(-1)" }}
                  >
                    <img
                      src={book.cover}
                      alt=""
                      className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{book.title}</h2>
                  {allDone && (
                    <Badge className="bg-[hsl(var(--xp-bar))]/20 text-[hsl(var(--xp-bar))] border-[hsl(var(--xp-bar))]/30 shrink-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Conhecimento Aplicado
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{book.author}</p>
                <Badge variant="secondary" className="mt-3 text-xs">{book.category}</Badge>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{book.synopsis}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {actionButtons.map(({ tab, icon: Icon, label, accent }) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        activeTab === tab
                          ? "bg-primary/15 border-primary/30 text-primary"
                          : "bg-secondary/50 border-border hover:bg-secondary text-foreground"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${activeTab === tab ? "text-primary" : accent || "text-foreground"}`} />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="border-border" />

            {/* Dynamic Content Area */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === "video" && (
                  <motion.div key="video" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                      <img src={book.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md" />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                          <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                        </div>
                        <span className="text-sm text-muted-foreground">Assistir resumo em vídeo</span>
                      </div>
                    </div>

                    {/* Missions */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        🎯 Plano de Ação: {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Complete as missões práticas para aplicar o conhecimento do livro.
                      </p>
                      <div className="space-y-3">
                        {book.missions.map((mission) => {
                          const checked = completedMissions.includes(mission.id);
                          return (
                            <label
                              key={mission.id}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                                checked
                                  ? "bg-[hsl(var(--xp-bar))]/10 border-[hsl(var(--xp-bar))]/20"
                                  : "bg-secondary/30 border-border hover:bg-secondary/50"
                              }`}
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => onToggleMission(mission.id)}
                              />
                              <span className={`text-sm ${checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                {mission.text}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "read" && (
                  <motion.div key="read" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">Versão Digital</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                      Em breve você poderá ler o resumo completo diretamente aqui. Fique ligado!
                    </p>
                  </motion.div>
                )}

                {activeTab === "audio" && (
                  <motion.div key="audio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <Headphones className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">Audiobook</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                      O audiobook estará disponível em breve. Ouça o resumo enquanto treina ou dirige!
                    </p>
                  </motion.div>
                )}

                {activeTab === "buy" && (
                  <motion.div key="buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <ShoppingCart className="w-16 h-16 text-amber-400/30 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">Comprar na Amazon</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm mb-4">
                      Tenha a versão física de "{book.title}" para aprofundar seu conhecimento.
                    </p>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Comprar na Amazon
                    </a>
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
