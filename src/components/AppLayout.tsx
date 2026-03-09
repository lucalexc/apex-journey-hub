import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <div className="hidden md:block relative z-10">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-14 flex items-center border-b border-border px-4 md:px-6 bg-white sticky top-0 z-40 shadow-sm shadow-slate-100">
            <SidebarTrigger className="hidden md:flex mr-3 text-slate-500 hover:text-slate-700" />
            <h1 className="text-lg font-bold tracking-tight text-slate-900 md:hidden">
              Meta<span className="text-primary">Task</span>
            </h1>
          </header>

          <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
            <Outlet />
          </main>
        </div>

        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
