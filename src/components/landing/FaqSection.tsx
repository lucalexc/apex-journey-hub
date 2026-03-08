import { FadeUp } from "./HeroSection";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqSectionProps {
  onSignup: () => void;
}

const faqs = [
  {
    q: "Como funciona a garantia de 7 dias?",
    a: "Você tem risco zero. Entre no MetaTask, explore as fases, monte sua rotina e, se dentro de 7 dias você achar que o sistema não está ajudando na sua produtividade, basta um clique para receber 100% do seu dinheiro de volta.",
  },
  {
    q: "Posso cancelar a assinatura quando quiser?",
    a: "Absolutamente. Nós odiamos burocracia tanto quanto você. O cancelamento é feito diretamente pelo seu painel, sem precisar falar com nenhum atendente.",
  },
  {
    q: "O aplicativo já vem com todas as 25 fases desbloqueadas?",
    a: "As fases estão no sistema, mas elas possuem travas de gamificação. Você precisará provar consistência (ex: completar os dias de leitura ou as missões da base biológica) para desbloquear os níveis mais altos. É assim que garantimos a sua evolução.",
  },
  {
    q: "Tem versão para celular?",
    a: "O MetaTask foi construído como um Web App responsivo premium. Ele se adapta perfeitamente à tela do seu smartphone, funcionando como um aplicativo nativo diretamente do seu navegador.",
  },
];

export default function FaqSection({ onSignup }: FaqSectionProps) {
  return (
    <section id="faq" className="py-24 md:py-36 relative">
      <div className="relative max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-[hsl(var(--landing-fg))] mb-12">
            Ainda com dúvidas?
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card))] rounded-2xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-[hsl(var(--landing-fg))] font-semibold text-base sm:text-lg hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[hsl(var(--landing-muted))] text-sm sm:text-base leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-14 text-center">
            <Button
              size="lg"
              className="rounded-full px-10 font-bold h-14 text-base"
              onClick={onSignup}
            >
              Começar minha jornada agora
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
