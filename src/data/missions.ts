export interface MissionPhase {
  id: number;
  title: string;
  description: string;
  status: "completed" | "active" | "locked";
  xpCurrent: number;
  xpTotal: number;
}

export const missionPhases: MissionPhase[] = [
  { id: 1, title: "Necrológio", description: "Descubra como quer ser lembrado. Escreva sua história final.", status: "completed", xpCurrent: 500, xpTotal: 500 },
  { id: 2, title: "Temperamento", description: "Conheça seus instintos naturais e como usá-los a seu favor.", status: "completed", xpCurrent: 500, xpTotal: 500 },
  { id: 3, title: "Ambiente", description: "Projete o ambiente que molda quem você se torna.", status: "active", xpCurrent: 280, xpTotal: 500 },
  { id: 4, title: "Foco", description: "Domine a arte da atenção profunda e elimine distrações.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 5, title: "Energia", description: "Otimize sua energia física e mental ao longo do dia.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 6, title: "Disciplina", description: "Construa sistemas que funcionam mesmo quando a motivação falha.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 7, title: "Mentalidade", description: "Reprograme crenças limitantes e adote uma mentalidade de crescimento.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 8, title: "Sono", description: "Transforme seu sono no superpoder que ele realmente é.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 9, title: "Nutrição", description: "Alimente seu corpo como combustível de alta performance.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 10, title: "Movimento", description: "Integre movimento intencional na sua rotina diária.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 11, title: "Relações", description: "Cultive conexões profundas que elevam quem você é.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 12, title: "Comunicação", description: "Domine a arte de se expressar com clareza e impacto.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 13, title: "Finanças", description: "Construa uma base financeira sólida e consciente.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 14, title: "Propósito", description: "Alinhe suas ações diárias com um propósito maior.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 15, title: "Criatividade", description: "Desbloqueie seu potencial criativo em todas as áreas.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 16, title: "Trabalho", description: "Transforme sua carreira em uma missão significativa.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 17, title: "Aprendizado", description: "Aprenda a aprender: meta-habilidade definitiva.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 18, title: "Resiliência", description: "Desenvolva a capacidade de se levantar mais forte.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 19, title: "Mindfulness", description: "Cultive presença e consciência no momento atual.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 20, title: "Liderança", description: "Lidere a si mesmo antes de liderar outros.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 21, title: "Impacto", description: "Meça e amplifique seu impacto no mundo ao redor.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 22, title: "Sabedoria", description: "Integre conhecimento com experiência vivida.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 23, title: "Gratidão", description: "Pratique gratidão como ferramenta de transformação.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 24, title: "Maestria", description: "Alcance excelência sustentável nas áreas que importam.", status: "locked", xpCurrent: 0, xpTotal: 500 },
  { id: 25, title: "Legado", description: "Defina e construa o legado que transcende você.", status: "locked", xpCurrent: 0, xpTotal: 500 },
];
