export interface NecrologyVersion {
  id: string;
  text: string;
  date: string;
}

export interface TemperamentResult {
  type: "Colérico" | "Sanguíneo" | "Melancólico" | "Fleumático";
  element: string;
  emoji: string;
  strengths: string[];
  weaknesses: string[];
  description: string;
}

export const questions = [
  {
    pergunta: "1. Um projeto importante acaba de atrasar por culpa de terceiros. Qual a sua primeira reação interna?",
    opcoes: [
      { texto: "Assumo o controle imediatamente, cobro os responsáveis e mudo o plano para entregar logo.", tipo: "colerico" },
      { texto: "Tento aliviar a tensão do grupo, foco no lado positivo e improviso uma solução.", tipo: "sanguineo" },
      { texto: "Fico frustrado com a falta de excelência, analiso onde o erro ocorreu e refaço o cronograma.", tipo: "melancolico" },
      { texto: "Mantenho a calma, evito conflitos e sigo trabalhando no meu ritmo para resolver a parte que me cabe.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "2. Em um ambiente social ou evento de networking com pessoas desconhecidas, você geralmente:",
    opcoes: [
      { texto: "Vou direto aos contatos que podem me trazer resultados práticos ou de negócios.", tipo: "colerico" },
      { texto: "Me misturo rapidamente, conto histórias, dou risada e viro o centro das atenções.", tipo: "sanguineo" },
      { texto: "Prefiro conversas profundas com uma ou duas pessoas e observo mais do que falo.", tipo: "melancolico" },
      { texto: "Sou amigável e ouvinte, mas prefiro que os outros iniciem as conversas.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "3. Como é a sua relação com regras e processos rígidos?",
    opcoes: [
      { texto: "Sigo se fizerem sentido para o meu objetivo final; se me atrasarem, eu as quebro.", tipo: "colerico" },
      { texto: "Acho entediante e frequentemente esqueço ou ignoro detalhes burocráticos.", tipo: "sanguineo" },
      { texto: "Gosto e respeito. Regras garantem qualidade, ordem e evitam o caos.", tipo: "melancolico" },
      { texto: "Sigo tranquilamente. É mais fácil seguir o processo do que criar atrito questionando.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "4. Ao tomar uma decisão financeira ou de carreira difícil, você se baseia em:",
    opcoes: [
      { texto: "Intuição rápida, foco no resultado e coragem para assumir o risco.", tipo: "colerico" },
      { texto: "No que me empolga no momento e no impacto que isso terá na minha imagem.", tipo: "sanguineo" },
      { texto: "Muitos dados, prós e contras, análise de cenários e medo de errar.", tipo: "melancolico" },
      { texto: "No que trará mais segurança, paz de espírito e estabilidade a longo prazo.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "5. O que mais rapidamente drena a sua energia no dia a dia?",
    opcoes: [
      { texto: "Pessoas lentas, indecisas ou ineficientes.", tipo: "colerico" },
      { texto: "Rotinas repetitivas, isolamento e falta de novidades.", tipo: "sanguineo" },
      { texto: "Trabalho mal feito, desordem e pessoas superficiais.", tipo: "melancolico" },
      { texto: "Conflitos, pressão extrema e pessoas agressivas exigindo muito de mim.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "6. Durante uma discussão ou conflito acalorado, sua postura é:",
    opcoes: [
      { texto: "Argumento com força para vencer. Tenho certeza da minha visão.", tipo: "colerico" },
      { texto: "Falo alto, me emociono, mas logo depois perdoo e esqueço.", tipo: "sanguineo" },
      { texto: "Trago fatos, me ofendo profundamente se for injustiçado e demoro a esquecer.", tipo: "melancolico" },
      { texto: "Cedo ou me calo para manter a paz. Odeio gritaria e atrito.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "7. Como é a organização física do seu espaço de trabalho ou quarto?",
    opcoes: [
      { texto: "Funcional. Não precisa ser perfeito, só precisa ter o que eu preciso para agir.", tipo: "colerico" },
      { texto: "Geralmente caótico ou bagunçado, cheio de estímulos visuais.", tipo: "sanguineo" },
      { texto: "Impecável e sistemático. Cada coisa tem seu lugar exato.", tipo: "melancolico" },
      { texto: "Confortável e agradável, não sou obcecado por ordem, mas não vivo no caos.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "8. Quando você precisa executar uma tarefa chata, mas necessária:",
    opcoes: [
      { texto: "Faço o mais rápido possível só para tirar da frente e ir para o que importa.", tipo: "colerico" },
      { texto: "Procrastino ao máximo e me distraio com coisas mais divertidas.", tipo: "sanguineo" },
      { texto: "Faço com perfeccionismo. Se é para fazer, que seja bem feito, mesmo sendo chato.", tipo: "melancolico" },
      { texto: "Faço devagar, no meu tempo, sem pressa ou estresse.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "9. Qual destas qualidades você considera o seu maior ponto forte?",
    opcoes: [
      { texto: "Determinação, liderança e foco em resultados.", tipo: "colerico" },
      { texto: "Carisma, otimismo e facilidade de comunicação.", tipo: "sanguineo" },
      { texto: "Profundidade, lealdade e alto padrão de qualidade.", tipo: "melancolico" },
      { texto: "Empatia, diplomacia e consistência.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "10. Quando você sofre uma falha pessoal em uma meta, como você processa isso?",
    opcoes: [
      { texto: "Fico com raiva de mim mesmo, dobro a aposta e forço a barra para conseguir na próxima.", tipo: "colerico" },
      { texto: "Fico triste na hora, mas racionalizo que 'faz parte' e logo arrumo uma meta nova.", tipo: "sanguineo" },
      { texto: "Sinto uma culpa esmagadora, rumino o erro por dias e duvido da minha capacidade.", tipo: "melancolico" },
      { texto: "Me conformo rápido. Penso que não era para ser e volto à minha rotina normal.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "11. Em um trabalho em equipe, você prefere o papel de:",
    opcoes: [
      { texto: "Líder que define a direção e cobra a execução.", tipo: "colerico" },
      { texto: "Motivador que traz ideias criativas e mantém a energia alta.", tipo: "sanguineo" },
      { texto: "Especialista que garante a qualidade técnica e os detalhes sem aparecer muito.", tipo: "melancolico" },
      { texto: "Apoiador que concilia opiniões e faz o trabalho de base com estabilidade.", tipo: "fleumatico" }
    ]
  },
  {
    pergunta: "12. O seu final de semana perfeito é focado em:",
    opcoes: [
      { texto: "Adiantar projetos pessoais, competir em algum esporte ou realizar conquistas.", tipo: "colerico" },
      { texto: "Sair com amigos, ir a festas, viajar sem roteiro e viver aventuras intensas.", tipo: "sanguineo" },
      { texto: "Ficar em casa, ler um bom livro, estudar um assunto profundo ou ter conversas íntimas.", tipo: "melancolico" },
      { texto: "Descansar no sofá, assistir séries, comer bem e não ter horários ou obrigações.", tipo: "fleumatico" }
    ]
  }
];

export const temperamentResults: Record<string, TemperamentResult> = {
  Colérico: {
    type: "Colérico",
    element: "Fogo",
    emoji: "🔥",
    strengths: ["Liderança natural", "Determinação inabalável", "Visão estratégica", "Produtividade extrema"],
    weaknesses: ["Impaciência crônica", "Dificuldade em delegar", "Insensibilidade emocional", "Tendência autoritária"],
    description: "Você é movido por resultados. Sua energia é vulcânica e sua ambição não conhece limites. O mundo é seu campo de batalha — e você nasceu para vencer.",
  },
  Sanguíneo: {
    type: "Sanguíneo",
    element: "Ar",
    emoji: "💨",
    strengths: ["Carisma magnético", "Criatividade fluida", "Otimismo contagiante", "Adaptabilidade social"],
    weaknesses: ["Falta de foco", "Superficialidade", "Promessas não cumpridas", "Dificuldade com rotinas"],
    description: "Você é a alma da festa e o sol de qualquer ambiente. Sua energia ilumina, mas precisa de âncoras para não se perder no vento.",
  },
  Melancólico: {
    type: "Melancólico",
    element: "Terra",
    emoji: "🌍",
    strengths: ["Profundidade intelectual", "Atenção aos detalhes", "Sensibilidade artística", "Lealdade inabalável"],
    weaknesses: ["Perfeccionismo paralisante", "Tendência à melancolia", "Autocrítica excessiva", "Dificuldade em perdoar"],
    description: "Você enxerga o mundo em camadas que outros nem imaginam. Sua mente é um laboratório de ideias — mas cuidado para não se afogar na própria profundidade.",
  },
  Fleumático: {
    type: "Fleumático",
    element: "Água",
    emoji: "🌊",
    strengths: ["Equilíbrio emocional", "Paciência infinita", "Diplomacia natural", "Consistência admirável"],
    weaknesses: ["Passividade excessiva", "Resistência à mudança", "Falta de ambição aparente", "Dificuldade em dizer não"],
    description: "Você é o porto seguro em qualquer tempestade. Sua calma é sua superpotência — mas o mundo precisa sentir sua presença, não apenas sua paz.",
  },
};

export const layers = [
  { id: 1, title: "Corpo Físico", description: "A base biológica. Saúde, energia, alimentação e sono como alicerce de tudo." },
  { id: 2, title: "Vitalidade", description: "O nível de energia vital que você sustenta ao longo do dia. Força, disposição e vigor." },
  { id: 3, title: "Temperamento", description: "A camada herdada. A tendência emocional e comportamental que você trouxe ao nascer." },
  { id: 4, title: "História Afetiva", description: "As marcas emocionais da sua infância e juventude. O que te moldou antes de você poder escolher." },
  { id: 5, title: "Inteligência", description: "A capacidade de aprender, abstrair e resolver problemas. Cultivo da mente racional." },
  { id: 6, title: "Vida Imaginativa", description: "O mundo interior. Sonhos, fantasias, criatividade e a capacidade de projetar futuros possíveis." },
  { id: 7, title: "Consciência Moral", description: "O senso de certo e errado. A bússola interna que guia suas decisões éticas." },
  { id: 8, title: "Consciência do Dever", description: "A percepção de que você tem responsabilidades que transcendem seus desejos pessoais." },
  { id: 9, title: "Autopercepção", description: "A capacidade de se ver com clareza. Conhecer seus pontos cegos e limitações reais." },
  { id: 10, title: "Vocação", description: "O chamado profundo. Aquilo para o qual você nasceu e que dá sentido à sua existência." },
  { id: 11, title: "Cosmovisão", description: "A lente pela qual você interpreta o mundo. Filosofia, crenças e princípios fundamentais." },
  { id: 12, title: "Transcendência", description: "A relação com o que está além de você. Sentido último da vida, espiritualidade e legado eterno." },
];

