import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import type { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
  onClick: () => void;
  completedMissions?: string[];
}

export default function BookCard({ book, onClick, completedMissions = [] }: BookCardProps) {
  const allDone = book.missions.length > 0 && book.missions.every(m => completedMissions.includes(m.id));

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-slate-100"
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-full aspect-[2/3] object-cover transition-all duration-300 group-hover:brightness-75 block"
      />

      {/* Hover play overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center">
          <PlayCircle className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Applied badge */}
      {allDone && (
        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          ✓ Aplicado
        </div>
      )}
    </motion.button>
  );
}
