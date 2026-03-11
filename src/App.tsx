import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}
import MissoesPage from "@/pages/MissoesPage";
import MissaoAtivaPage from "@/pages/MissaoAtivaPage";
import TarefasPage from "@/pages/TarefasPage";
import MetasPage from "@/pages/MetasPage";
import RotinaPage from "@/pages/RotinaPage";
import QuemSouPage from "@/pages/QuemSouPage";
import BibliotecaPage from "@/pages/BibliotecaPage";
import LandingPage from "@/pages/LandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<AppLayout />}>
            <Route path="/tarefas" element={<TarefasPage />} />
            <Route path="/metas" element={<MetasPage />} />
            <Route path="/rotina" element={<RotinaPage />} />
            <Route path="/missoes" element={<MissoesPage />} />
            <Route path="/missoes/:id" element={<MissaoAtivaPage />} />
            <Route path="/quem-sou" element={<QuemSouPage />} />
            <Route path="/biblioteca" element={<BibliotecaPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
