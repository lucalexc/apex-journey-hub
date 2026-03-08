export default function LandingFooter() {
  return (
    <footer className="border-t border-[hsl(var(--landing-card-border))] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[hsl(var(--landing-muted))]">
        <span className="font-bold text-[hsl(var(--landing-fg))]">
          Meta<span className="text-primary">Task</span>
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[hsl(var(--landing-fg))] transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-[hsl(var(--landing-fg))] transition-colors">Privacidade</a>
        </div>
        <span>© {new Date().getFullYear()} MetaTask. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
