import { motion } from "framer-motion";
import { Check, Zap, Lock, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function MissaoAtivaPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="mb-2 flex items-center">
        <Button variant="ghost" size="icon" asChild className="-ml-2">
          <Link to="/missoes">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
          Fase 3
        </span>
        <h1 className="text-3xl font-bold text-slate-900">Ambiente</h1>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          Projete o ambiente que molda quem você se torna.
        </p>
        
        <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 max-w-lg mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500 font-medium tracking-wide text-xs uppercase">Progresso XP</span>
            <span className="font-bold text-slate-900">280 / 500 XP</span>
          </div>
          <Progress value={(280 / 500) * 100} className="h-2.5 bg-slate-100 [&>div]:bg-blue-600" />
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Card 1: Completed */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-white rounded-3xl p-5 border-2 border-green-500 shadow-sm relative overflow-hidden">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight block">Mapear o Ambiente Físico</h3>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 uppercase text-[10px] shrink-0">Concluída</Badge>
                </div>
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">Criação de lista de pessoas e locais que drenam sua energia.</p>
                <Button variant="outline" disabled className="w-full mt-4 text-slate-400 border-slate-200 bg-slate-50">
                  Registrar Progresso
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Active */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="bg-white rounded-3xl p-5 border-2 border-blue-600 shadow-[0_8px_30px_rgb(37,99,235,0.12)] relative overflow-hidden">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Zap className="h-6 w-6 text-blue-600 fill-blue-600/20" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Purge de Notificações</h3>
                  <Badge className="bg-blue-600 hover:bg-blue-600 uppercase text-[10px] animate-pulse shrink-0">Ativa</Badge>
                </div>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">Desativar notificações não essenciais no celular por 24h.</p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all font-semibold rounded-xl h-11">
                  Registrar Progresso
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Locked by Time */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 opacity-60">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-slate-700">Configurar Espaço de Trabalho</h3>
                <p className="text-slate-500 text-sm mt-1.5 blur-[4px] select-none h-10 overflow-hidden">Definição do local ideal para foco profundo, eliminando distrações visuais e auditivas do cômodo.</p>
                <div className="mt-4 blur-[3px] select-none">
                  <Progress value={30} className="h-2.5 bg-slate-300 [&>div]:bg-slate-400" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400 font-medium mt-3" style={{ fontVariantNumeric: 'tabular-nums' }}>
            Disponível em: <span className="text-slate-500 font-bold">17h 55min</span>
          </p>
        </motion.div>

        {/* Card 4: Mystery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 opacity-50">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <div className="relative">
                  <Lock className="h-5 w-5 text-slate-500" />
                  <span className="text-[10px] font-black absolute -top-1 -right-2 text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex flex-col items-center justify-center ring-2 ring-slate-50 pb-[1px]">?</span>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-slate-700">Ação de Maestria do Ambiente</h3>
                <div className="mt-3 blur-[4px] select-none space-y-2 opacity-70">
                  <div className="h-3 bg-slate-400 rounded w-full"></div>
                  <div className="h-3 bg-slate-400 rounded w-4/5"></div>
                  <div className="h-3 bg-slate-400 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400 font-medium mt-3">
            Revele após completar as atividades anteriores.
          </p>
        </motion.div>
      </div>

      {/* Final Button */}
      <div className="mt-12 mb-8">
        <Button 
          disabled 
          className="w-full h-14 rounded-2xl text-base font-bold shadow-sm opacity-50 bg-slate-200 text-slate-400 cursor-not-allowed uppercase tracking-wide border-2 border-slate-200"
        >
          Finalizar Missão: Ambiente
        </Button>
      </div>
    </div>
  );
}
