import { CheckSquare, Target, Clock, Map, Fingerprint, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useSidebar } from "@/components/ui/sidebar";

const navItems = [
  { title: "Tarefas", url: "/tarefas", icon: CheckSquare },
  { title: "Metas", url: "/metas", icon: Target },
  { title: "Rotina", url: "/rotina", icon: Clock },
  { title: "Missões", url: "/missoes", icon: Map },
  { title: "Quem Sou", url: "/quem-sou", icon: Fingerprint },
  { title: "Biblioteca", url: "/biblioteca", icon: BookOpen },
];

export { navItems };

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white">
      <SidebarContent className="pt-6">
        {!collapsed && (
          <div className="px-6 pb-6">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Meta<span className="text-primary">Task</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">O RPG da Vida Real</p>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center pb-4">
            <span className="text-lg font-bold text-primary">M</span>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11 rounded-xl">
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors rounded-xl"
                      activeClassName="bg-blue-50 text-blue-700 font-semibold"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-slate-100">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-xl h-11 text-slate-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-sm">Desconectar</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
