import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Outlet } from "react-router-dom";

export function AppLayout() {

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50 relative overflow-x-hidden">
        {/* Desktop Sidebar - hidden on mobile, fixed/sticky on desktop */}
        <div className="hidden md:flex md:w-64 md:flex-shrink-0 sticky top-0 h-screen border-r border-slate-200 bg-white z-40">
          <AppSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-x-hidden">
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 w-full max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>

        {/* Mobile bottom nav - hidden on md+ */}
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
