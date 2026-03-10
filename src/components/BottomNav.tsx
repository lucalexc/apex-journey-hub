import { CheckSquare, Clock, Map, Fingerprint } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const mobileNavItems = [
  { title: "Tarefas", url: "/tarefas", icon: CheckSquare },
  { title: "Rotina", url: "/rotina", icon: Clock },
  { title: "Missões", url: "/missoes", icon: Map },
  { title: "Perfil", url: "/quem-sou", icon: Fingerprint },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_16px_0_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)] px-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className="flex flex-col items-center justify-center gap-1 text-slate-400 transition-colors w-16 h-12 min-h-[44px]"
            activeClassName="text-blue-600"
          >
            <item.icon className="h-[22px] w-[22px]" />
            <span className="text-[10px] font-semibold">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
