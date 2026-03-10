import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NecrologyTab } from "@/components/quem-sou/NecrologyTab";
import { TemperamentTab } from "@/components/quem-sou/TemperamentTab";
import { LayersTab } from "@/components/quem-sou/LayersTab";
import { BioRadarTab } from "@/components/quem-sou/BioRadarTab";

export default function QuemSouPage() {
  const [activeTab, setActiveTab] = useState("necrologio");

  return (
    <div className="w-full h-full p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Fingerprint className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Minha Identidade</h1>
            <p className="text-sm md:text-base text-muted-foreground">O ponto de partida da sua ascensão</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start bg-secondary/50 backdrop-blur-sm rounded-xl p-1 gap-1 h-auto flex-wrap">
          <TabsTrigger value="necrologio" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-card text-xs sm:text-sm px-3 py-2">
            📜 Necrológio
          </TabsTrigger>
          <TabsTrigger value="temperamento" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-card text-xs sm:text-sm px-3 py-2">
            🔥 Temperamento
          </TabsTrigger>
          <TabsTrigger value="camadas" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-card text-xs sm:text-sm px-3 py-2">
            🪜 12 Camadas
          </TabsTrigger>
          <TabsTrigger value="raio-x" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-card text-xs sm:text-sm px-3 py-2">
            🧬 Raio-X
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <TabsContent value="necrologio" className="mt-6" forceMount={activeTab === "necrologio" ? true : undefined}>
              <NecrologyTab />
            </TabsContent>
            <TabsContent value="temperamento" className="mt-6" forceMount={activeTab === "temperamento" ? true : undefined}>
              <TemperamentTab />
            </TabsContent>
            <TabsContent value="camadas" className="mt-6" forceMount={activeTab === "camadas" ? true : undefined}>
              <LayersTab />
            </TabsContent>
            <TabsContent value="raio-x" className="mt-6" forceMount={activeTab === "raio-x" ? true : undefined}>
              <BioRadarTab />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
