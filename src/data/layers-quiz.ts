export interface LayerQuizOption {
  label: string;
  layer: number;
}

export interface LayerQuizQuestion {
  question: string;
  options: LayerQuizOption[];
}

export const layerQuizQuestions: LayerQuizQuestion[] = [
  {
    question: "Quando você é criticado duramente no trabalho ou em casa, qual é a sua reação interna mais comum?",
    options: [
      { label: "Sinto que não sou amado ou compreendido pelas pessoas.", layer: 4 },
      { label: "Fico com raiva e sinto a necessidade de provar que a pessoa está errada.", layer: 5 },
      { label: "Analiso se a crítica faz sentido tecnicamente para eu melhorar minha habilidade.", layer: 6 },
      { label: "Aceito se a crítica mostrar que falhei com meus deveres e obrigações para com os outros.", layer: 7 },
      { label: "Avalio a crítica à luz da verdade objetiva, independente de como isso afeta meu ego.", layer: 8 },
    ],
  },
  {
    question: "Qual é a sua maior dor ou frustração na vida atualmente?",
    options: [
      { label: "Sentimentos de rejeição, carência emocional ou traumas do passado.", layer: 4 },
      { label: "Sentir que não venci na vida, não tenho dinheiro ou não sou reconhecido.", layer: 5 },
      { label: "Sentir que sou medíocre no que faço, que me falta excelência e domínio técnico.", layer: 6 },
      { label: "O peso das responsabilidades e o medo de não conseguir prover e cuidar da minha família/comunidade.", layer: 7 },
      { label: "A falta de sentido profundo, a hipocrisia do mundo e a dificuldade de viver de acordo com meus princípios morais.", layer: 8 },
    ],
  },
  {
    question: "O que mais te motiva a acordar cedo e trabalhar duro?",
    options: [
      { label: "Garantir que as pessoas ao meu redor gostem de mim e me aceitem.", layer: 4 },
      { label: "Conquistar meu espaço, ganhar dinheiro e mostrar o meu valor para o mundo.", layer: 5 },
      { label: "O prazer de fazer um trabalho extremamente bem feito e ser útil pela minha competência.", layer: 6 },
      { label: "Cumprir o meu papel. Minha família e a sociedade dependem de mim.", layer: 7 },
      { label: "A busca pela verdade e o desejo de organizar a minha vida em torno de um propósito maior.", layer: 8 },
    ],
  },
  {
    question: "Como você enxerga os seus relacionamentos (amizades e namoro/casamento)?",
    options: [
      { label: "Como um refúgio onde busco afeto e proteção constante.", layer: 4 },
      { label: "Como parcerias que devem me ajudar a crescer e conquistar meus objetivos.", layer: 5 },
      { label: "Como algo que exige manutenção prática e convivência baseada em habilidades complementares.", layer: 6 },
      { label: "Como um compromisso inegociável, deveres que assumi e devo honrar até o fim.", layer: 7 },
      { label: "Como um encontro de almas que devem se ajudar mutuamente a buscar a virtude.", layer: 8 },
    ],
  },
  {
    question: "Se você tivesse que resumir o seu foco de vida hoje em uma palavra, seria:",
    options: [
      { label: "Afeto / Cura", layer: 4 },
      { label: "Vitória / Poder", layer: 5 },
      { label: "Excelência / Aptidão", layer: 6 },
      { label: "Dever / Responsabilidade", layer: 7 },
      { label: "Verdade / Consciência", layer: 8 },
    ],
  },
];

export interface LayerResult {
  id: number;
  title: string;
  description: string;
  nextStep: string;
}

export const layerResults: Record<number, LayerResult> = {
  4: {
    id: 4,
    title: "História Afetiva",
    description: "Você está operando a partir das suas marcas emocionais. Traumas, carências e a busca por aprovação ainda governam grande parte das suas decisões. Isso não é fraqueza — é o ponto de partida de quem tem coragem de se conhecer.",
    nextStep: "Busque curar feridas emocionais profundas. Terapia, journaling e perdão são suas ferramentas de ascensão. Só quem resolve a base pode subir com solidez.",
  },
  5: {
    id: 5,
    title: "A Força do Ego",
    description: "Você está no estágio da conquista e da autoafirmação. Seu motor é provar valor, vencer e ser reconhecido. Essa energia é poderosa, mas pode se tornar uma armadilha se o ego não for domesticado.",
    nextStep: "Canalize sua ambição em competência real. Pare de buscar validação externa e comece a construir domínio técnico que fale por si só.",
  },
  6: {
    id: 6,
    title: "Vida Imaginativa",
    description: "Você já superou a necessidade de aprovação e está focado em excelência. Seu mundo gira em torno de habilidade, competência e fazer as coisas da maneira certa. Você é um artesão da vida.",
    nextStep: "Expanda sua visão além da técnica. Pergunte-se: para quem e para quê eu estou construindo isso? A próxima camada exige consciência moral.",
  },
  7: {
    id: 7,
    title: "Consciência Moral",
    description: "Você opera pelo senso de dever. Família, compromissos e responsabilidade são o centro da sua vida. Você entende que a vida não é sobre você — é sobre o que você deve ao mundo.",
    nextStep: "Aprofunde seus princípios. Estude filosofia, ética e cosmovisão. O próximo nível exige que você saiba POR QUE acredita no que acredita.",
  },
  8: {
    id: 8,
    title: "Consciência do Dever",
    description: "Você busca a verdade objetiva e organiza sua vida em torno de princípios transcendentes. Poucos chegam aqui. Seu desafio não é mais crescer — é não se corromper.",
    nextStep: "Viva de acordo com o que você sabe ser verdade. Torne-se exemplo vivo dos seus princípios. Mentore outros. Construa legado.",
  },
};
