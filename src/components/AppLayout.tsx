import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[hsl(var(--glow-blue)/0.08)] blur-[150px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(var(--glow-indigo)/0.06)] blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[hsl(var(--glow-blue)/0.03)] blur-[100px]" />
        </div>

        <div className="hidden md:block relative z-10">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-14 flex items-center border-b border-border px-4 md:px-6 bg-background/60 backdrop-blur-xl sticky top-0 z-40">
            <SidebarTrigger className="hidden md:flex mr-3" />
            <h1 className="text-lg font-bold tracking-tight md:hidden">
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
