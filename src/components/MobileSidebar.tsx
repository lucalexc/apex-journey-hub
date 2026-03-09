import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { navItems } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileSidebarContentProps {
  onNavigate: () => void;
}

export function MobileSidebarContent({ onNavigate }: MobileSidebarContentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url: string) => {
    navigate(url);
    onNavigate();
  };

  const handleLogout = () => {
    navigate("/");
    onNavigate();
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.title}>
                <button
                  onClick={() => handleNavigation(item.url)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-slate-100">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-xl h-11 text-slate-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="text-sm">Desconectar</span>
        </Button>
      </div>
    </div>
  );
}
