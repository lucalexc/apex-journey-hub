import { FadeUp } from "./HeroSection";
import painImg from "@/assets/pain-overwhelmed.jpg";

export default function PainSection() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--landing-bg))]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <FadeUp className="order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={painImg}
                alt="Pessoa sobrecarregada com múltiplas telas"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </FadeUp>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-[hsl(var(--landing-fg))]">
                O cemitério da{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  produtividade.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-base sm:text-lg text-[hsl(var(--landing-muted))] leading-relaxed max-w-lg">
                Você já baixou dezenas de apps. Criou listas infinitas. E no fim do dia, sente que não fez nada de útil.{" "}
                <span className="text-[hsl(var(--landing-fg))] font-semibold">
                  O problema não é a falta de tempo. É a falta de um mapa.
                </span>{" "}
                O MetaTask substitui a ansiedade de uma tela em branco por um roteiro de amadurecimento.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
