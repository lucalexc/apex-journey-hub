import { navItems } from "@/components/AppSidebar";
import { NavLink } from "@/components/NavLink";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_16px_0_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className="flex flex-col items-center gap-0.5 text-slate-400 transition-colors px-2 py-1"
            activeClassName="text-blue-600"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
