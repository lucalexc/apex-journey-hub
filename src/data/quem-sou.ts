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

export const temperamentQuestions = [
  {
    question: "Em um grupo, qual é o seu papel natural?",
    options: [
      { label: "Líder — tomo a frente e organizo tudo", type: "Colérico" as const },
      { label: "Animador — faço todos rirem e se sentirem bem", type: "Sanguíneo" as const },
      { label: "Observador — analiso antes de agir", type: "Melancólico" as const },
      { label: "Mediador — busco harmonia e evito conflitos", type: "Fleumático" as const },
    ],
  },
  {
    question: "Como você lida com prazos apertados?",
    options: [
      { label: "Encaro de frente e entrego antes do prazo", type: "Colérico" as const },
      { label: "Trabalho melhor sob pressão, improviso", type: "Sanguíneo" as const },
      { label: "Planejo cada detalhe para não errar", type: "Melancólico" as const },
      { label: "Sigo no meu ritmo, sem me estressar", type: "Fleumático" as const },
    ],
  },
  {
    question: "O que mais te irrita no dia a dia?",
    options: [
      { label: "Incompetência e lentidão", type: "Colérico" as const },
      { label: "Rotina monótona e solidão", type: "Sanguíneo" as const },
      { label: "Desorganização e superficialidade", type: "Melancólico" as const },
      { label: "Conflitos e agressividade", type: "Fleumático" as const },
    ],
  },
  {
    question: "Qual frase te define melhor?",
    options: [
      { label: "Resultados falam mais que palavras", type: "Colérico" as const },
      { label: "A vida é curta demais para ser séria", type: "Sanguíneo" as const },
      { label: "A perfeição está nos detalhes", type: "Melancólico" as const },
      { label: "A paz interior vale mais que qualquer vitória", type: "Fleumático" as const },
    ],
  },
  {
    question: "O que te motiva a levantar da cama?",
    options: [
      { label: "Conquistar meus objetivos", type: "Colérico" as const },
      { label: "Viver novas experiências", type: "Sanguíneo" as const },
      { label: "Criar algo significativo", type: "Melancólico" as const },
      { label: "Manter a estabilidade da minha vida", type: "Fleumático" as const },
    ],
  },
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

export const bioAxes = ["Sono", "Foco", "Vigor Físico", "Estabilidade Emocional", "Nutrição"];

export const defaultBioValues: Record<string, number> = {
  Sono: 6,
  Foco: 5,
  "Vigor Físico": 7,
  "Estabilidade Emocional": 4,
  Nutrição: 6,
};
