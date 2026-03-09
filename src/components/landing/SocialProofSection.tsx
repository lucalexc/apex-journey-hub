import { FadeUp } from "./HeroSection";
import { Star } from "lucide-react";
import avatarCarlos from "@/assets/avatar-carlos.jpg";
import avatarAna from "@/assets/avatar-ana.jpg";
import avatarRafael from "@/assets/avatar-rafael.jpg";

const testimonials = [
  {
    name: "Carlos R.",
    age: "34 anos",
    avatar: avatarCarlos,
    text: "O MetaTask me tirou da depressão funcional. Hoje sei exatamente para onde estou indo. Nunca pensei que um app pudesse mudar minha perspectiva de vida.",
  },
  {
    name: "Ana P.",
    age: "28 anos",
    avatar: avatarAna,
    text: "Já tentei Notion, Todoist, Google Calendar... nada funcionava. O MetaTask é diferente porque não é sobre tarefas, é sobre quem eu quero me tornar.",
  },
  {
    name: "Rafael M.",
    age: "41 anos",
    avatar: avatarRafael,
    text: "As 25 fases me deram uma clareza que nenhum coach conseguiu. Meu sono melhorou, minha produtividade dobrou e finalmente estou lendo 2 livros por mês.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="py-24 md:py-36 relative">
      <div className="relative max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
              Pessoas reais,{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                transformações reais.
              </span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={0.1 * (i + 1)}>
              <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 h-full flex flex-col transition-all hover:border-blue-200 hover:shadow-lg shadow-md shadow-slate-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed flex-1 mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.age}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
