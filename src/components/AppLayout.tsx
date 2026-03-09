import { useState } from "react";
import { Menu } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MobileSidebarContent } from "@/components/MobileSidebar";

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-x-hidden">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:flex md:w-64 md:flex-shrink-0 relative z-10">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-x-hidden">
          <header className="h-14 flex items-center border-b border-border px-4 md:px-6 bg-white sticky top-0 z-40 shadow-sm shadow-slate-100">
            {/* Mobile hamburger menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2 text-slate-500 hover:text-slate-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>

            {/* Desktop sidebar trigger */}
            <SidebarTrigger className="hidden md:flex mr-3 text-slate-500 hover:text-slate-700" />
            
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Meta<span className="text-primary">Task</span>
            </h1>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 md:pb-6">
            <Outlet />
          </main>
        </div>

        {/* Mobile bottom nav */}
        <BottomNav />

        {/* Mobile Sheet Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="px-6 py-4 border-b border-border">
              <SheetTitle className="text-left">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Meta<span className="text-primary">Task</span>
                </span>
                <p className="text-xs text-slate-400 mt-0.5 font-normal">O RPG da Vida Real</p>
              </SheetTitle>
            </SheetHeader>
            <MobileSidebarContent onNavigate={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </SidebarProvider>
  );
}
