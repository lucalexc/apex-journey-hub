import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { toast } from "@/hooks/use-toast";
import { bioAxes, defaultBioValues } from "@/data/quem-sou";

export function BioRadarTab() {
  const [values, setValues] = useState<Record<string, number>>({ ...defaultBioValues });
  const [tempValues, setTempValues] = useState<Record<string, number>>({ ...defaultBioValues });
  const [open, setOpen] = useState(false);

  const chartData = bioAxes.map((axis) => ({
    subject: axis,
    value: values[axis],
    fullMark: 10,
  }));

  const chartConfig = {
    value: { label: "Nível", color: "hsl(var(--bio-primary))" },
  };

  const handleOpen = () => {
    setTempValues({ ...values });
    setOpen(true);
  };

  const handleSave = () => {
    setValues({ ...tempValues });
    setOpen(false);
    toast({ title: "Raio-X atualizado 🧬", description: "Seus indicadores biológicos foram atualizados." });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="border-border/50 shadow-card overflow-hidden">
          <div className="bg-gradient-to-br from-[hsl(var(--bio-primary)/0.05)] via-transparent to-[hsl(var(--bio-accent)/0.08)] p-2">
            <CardContent className="p-4">
              <h3 className="text-center text-base font-semibold text-foreground mb-2">Status do Personagem</h3>
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[320px]">
                <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 10]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Radar
                    name="value"
                    dataKey="value"
                    stroke="hsl(var(--bio-primary))"
                    fill="hsl(var(--bio-primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    animationDuration={800}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      <div className="flex justify-center">
        <Button onClick={handleOpen} className="rounded-xl gap-2">
          <Settings2 className="h-4 w-4" /> Atualizar Exames
        </Button>
      </div>

      {/* Modal Wizard */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Atualizar Raio-X Biológico</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {bioAxes.map((axis) => (
              <div key={axis} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{axis}</span>
                  <span className="text-sm font-bold text-primary text-mono">{tempValues[axis]}</span>
                </div>
                <Slider
                  value={[tempValues[axis]]}
                  onValueChange={([v]) => setTempValues((prev) => ({ ...prev, [axis]: v }))}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSave} className="rounded-xl">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
