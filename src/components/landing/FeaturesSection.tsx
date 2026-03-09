import { Mountain, Moon, Sun, Clock, BookOpen } from "lucide-react";
import { FadeUp } from "./HeroSection";
import mountainImg from "@/assets/feature-mountain.jpg";
import sleepImg from "@/assets/feature-sleep.jpg";
import routineImg from "@/assets/feature-routine.jpg";
import libraryImg from "@/assets/feature-library.jpg";

interface BentoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  large?: boolean;
}

function BentoCard({ icon, title, description, image, imageAlt, large }: BentoCardProps) {
  return (
    <div
      className={`group relative rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 ${
        large ? "md:row-span-2" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2 text-blue-600 mb-3">{icon}</div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{title}</h3>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-36 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
              Projetado para quem{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">joga sério.</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg">
              Cada pilar do MetaTask foi calibrado para atacar uma falha real dos apps tradicionais.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-5">
          <FadeUp delay={0.1}>
            <BentoCard
              icon={<Mountain className="w-6 h-6" />}
              title="Uma jornada de 25 fases."
              description="Do Necrológio ao Legado. Você só desbloqueia o próximo nível da vida quando provar que dominou o atual."
              image={mountainImg}
              imageAlt="Pessoa subindo uma montanha ao nascer do sol"
              large
            />
          </FadeUp>

          <div className="flex flex-col gap-5">
            <FadeUp delay={0.2}>
              <BentoCard
                icon={<><Moon className="w-5 h-5" /><Sun className="w-5 h-5" /></>}
                title="Biologia: A Sua Maior Alavanca."
                description="Não adianta ter força de vontade se você dorme mal. O sistema cobra e calibra suas horas de sono."
                image={sleepImg}
                imageAlt="Pessoa dormindo serenamente sob a luz da lua"
              />
            </FadeUp>

            <FadeUp delay={0.3}>
              <BentoCard
                icon={<Clock className="w-5 h-5" />}
                title="O Fim das Listas Infinitas."
                description="Sua rotina dividida logicamente entre Manhã, Tarde e Noite. Foco total, zero distração."
                image={routineImg}
                imageAlt="Pessoa focada em uma mesa de trabalho limpa"
              />
            </FadeUp>
          </div>

          <FadeUp delay={0.35} className="md:col-span-2">
            <BentoCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Biblioteca da Sabedoria."
              description="Desbloqueie conhecimento prático através de checks diários de leitura."
              image={libraryImg}
              imageAlt="Pessoa lendo um livro em ambiente aconchegante"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
