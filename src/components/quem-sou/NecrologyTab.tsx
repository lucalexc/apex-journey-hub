import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { NecrologyVersion } from "@/data/quem-sou";

export function NecrologyTab() {
  const [text, setText] = useState("");
  const [versions, setVersions] = useState<NecrologyVersion[]>([]);
  const [viewingVersion, setViewingVersion] = useState<NecrologyVersion | null>(null);

  const handleSave = () => {
    if (!text.trim()) {
      toast({ title: "Texto vazio", description: "Escreva algo antes de salvar.", variant: "destructive" });
      return;
    }
    const newVersion: NecrologyVersion = {
      id: crypto.randomUUID(),
      text: text.trim(),
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };
    setVersions((prev) => [newVersion, ...prev]);
    setViewingVersion(null);
    toast({ title: "Versão salva ✨", description: "Seu necrológio foi registrado no histórico." });
  };

  const handleViewVersion = (v: NecrologyVersion) => {
    setViewingVersion(v);
    setText(v.text);
  };

  const handleBackToEdit = () => {
    setViewingVersion(null);
    setText("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Editor */}
      <Card className="lg:col-span-3 border-border/50 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            {viewingVersion ? (
              <>
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm font-normal">Visualizando versão de {viewingVersion.date}</span>
              </>
            ) : (
              "Como você quer ser lembrado?"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => { if (!viewingVersion) setText(e.target.value); }}
            readOnly={!!viewingVersion}
            placeholder="Imagine que você está no final da sua vida. O que as pessoas que te amam diriam sobre quem você foi? Escreva aqui o texto que gostaria que lessem sobre você..."
            className="min-h-[240px] resize-none bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:ring-primary/30 rounded-xl text-sm leading-relaxed"
          />
          <div className="flex gap-2">
            {viewingVersion ? (
              <Button onClick={handleBackToEdit} variant="outline" className="rounded-xl">
                Voltar a editar
              </Button>
            ) : (
              <Button onClick={handleSave} className="rounded-xl gap-2">
                <Save className="h-4 w-4" /> Salvar Versão
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="lg:col-span-2 border-border/50 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" /> Histórico
          </CardTitle>
        </CardHeader>
        <CardContent>
          {versions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              <p className="text-3xl mb-2">📝</p>
              Nenhuma versão salva ainda.<br />Escreva seu necrológio e salve.
            </div>
          ) : (
            <div className="relative space-y-0">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
              {versions.map((v, i) => (
                <motion.button
                  key={v.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleViewVersion(v)}
                  className={`relative pl-8 py-3 w-full text-left rounded-lg transition-colors hover:bg-secondary/50 group ${
                    viewingVersion?.id === v.id ? "bg-primary/5" : ""
                  }`}
                >
                  <div className={`absolute left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 transition-colors ${
                    viewingVersion?.id === v.id ? "bg-primary border-primary" : "bg-card border-border group-hover:border-primary/50"
                  }`} />
                  <p className="text-xs font-medium text-muted-foreground">{v.date}</p>
                  <p className="text-sm text-foreground truncate mt-0.5">{v.text.substring(0, 60)}...</p>
                </motion.button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
