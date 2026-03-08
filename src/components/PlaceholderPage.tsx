import { motion } from "framer-motion";

interface PlaceholderPageProps {
  title: string;
  description: string;
  emoji: string;
}

export default function PlaceholderPage({ title, description, emoji }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <span className="text-5xl mb-4 block">{emoji}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </motion.div>
    </div>
  );
}
