export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <span className="font-bold text-slate-900">
          Meta<span className="text-primary">Task</span>
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-700 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Privacidade</a>
        </div>
        <span>© {new Date().getFullYear()} MetaTask. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
