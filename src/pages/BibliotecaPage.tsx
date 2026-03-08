import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { books, type Book } from "@/data/books";
import BookCard from "@/components/biblioteca/BookCard";
import BookDetailModal from "@/components/biblioteca/BookDetailModal";

const categories = ["Todos", ...Array.from(new Set(books.map(b => b.category)))];

export default function BibliotecaPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const toggleMission = useCallback((id: string) => {
    setCompletedMissions(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  }, []);

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "Todos" || b.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Biblioteca da Sabedoria</h1>
        </div>
        <p className="text-sm text-muted-foreground">Leia, assista e aplique o conhecimento dos melhores livros.</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar livro ou autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/50 border-border"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-primary/15 border-primary/30 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {filtered.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <BookCard
              book={book}
              onClick={() => setSelectedBook(book)}
              completedMissions={completedMissions}
            />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground">Nenhum livro encontrado.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          open={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          completedMissions={completedMissions}
          onToggleMission={toggleMission}
        />
      )}
    </div>
  );
}
