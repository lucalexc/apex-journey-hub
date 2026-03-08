import { navItems } from "@/components/AppSidebar";
import { NavLink } from "@/components/NavLink";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-t border-[hsl(0_0%_100%/0.05)] md:hidden">
      <div className="flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className="flex flex-col items-center gap-0.5 text-muted-foreground transition-colors px-2 py-1"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
