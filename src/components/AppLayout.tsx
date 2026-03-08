import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 md:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
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
