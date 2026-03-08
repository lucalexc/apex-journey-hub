import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function AuthModal({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);

  // Sync tab with defaultTab when modal opens
  useEffect(() => {
    if (open) setTab(defaultTab);
  }, [open, defaultTab]);

  // Reset tab when modal opens with a new defaultTab
  const handleOpenChange = (val: boolean) => {
    if (val) setTab(defaultTab);
    onOpenChange(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      navigate("/missoes");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-md fixed inset-0 z-50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-[hsl(var(--landing-card))] border border-[hsl(var(--landing-card-border))] shadow-2xl shadow-black/50 p-8 animate-in fade-in-0 zoom-in-95 duration-200">
            {/* Close */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm text-[hsl(var(--landing-muted))] hover:text-[hsl(var(--landing-fg))] transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </button>

            {/* Logo */}
            <div className="text-center mb-6">
              <span className="text-xl font-extrabold tracking-tight">
                Meta<span className="text-primary">Task</span>
              </span>
            </div>

            <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login">
                <h2 className="text-2xl font-bold mb-1">Bem-vindo de volta</h2>
                <p className="text-sm text-muted-foreground mb-6">Entre na sua conta para continuar.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <Input id="login-email" type="email" placeholder="seu@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Senha</Label>
                      <button type="button" className="text-xs text-primary hover:underline">
                        Esqueci minha senha
                      </button>
                    </div>
                    <Input id="login-password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full rounded-full font-bold h-11" disabled={loading}>
                    {loading ? "Processando..." : "Entrar"}
                  </Button>
                </form>

                <div className="flex items-center gap-3 my-5">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">ou</span>
                  <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full rounded-full font-medium h-11 gap-2.5" type="button">
                  <GoogleIcon />
                  Continuar com o Google
                </Button>
              </TabsContent>

              {/* SIGNUP */}
              <TabsContent value="signup">
                <h2 className="text-2xl font-bold mb-1">Comece sua jornada</h2>
                <p className="text-sm text-muted-foreground mb-6">Crie sua conta e desbloqueie sua vida.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome Completo</Label>
                    <Input id="signup-name" type="text" placeholder="Seu nome" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-mail</Label>
                    <Input id="signup-email" type="email" placeholder="seu@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirmar Senha</Label>
                    <Input id="signup-confirm" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full rounded-full font-bold h-11" disabled={loading}>
                    {loading ? "Processando..." : "Criar Conta e Começar"}
                  </Button>
                </form>

                <div className="flex items-center gap-3 my-5">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">ou</span>
                  <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full rounded-full font-medium h-11 gap-2.5" type="button">
                  <GoogleIcon />
                  Continuar com o Google
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
