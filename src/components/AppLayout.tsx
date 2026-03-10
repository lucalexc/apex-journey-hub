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
          {/* Top Header for Desktop, hidden on mobile since mobile uses only BottomNav & Pages have their own titles */}
          <header className="hidden md:flex h-14 items-center border-b border-slate-200 px-6 bg-white sticky top-0 z-30 shadow-sm">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Meta<span className="text-blue-600">Task</span>
            </h1>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 md:pb-8 w-full max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>

        {/* Mobile bottom nav - hidden on md+ */}
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
