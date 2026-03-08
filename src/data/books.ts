import bookPoderHabito from "@/assets/book-poder-habito.jpg";
import bookAtomicHabits from "@/assets/book-atomic-habits.jpg";
import bookRicoBabilonia from "@/assets/book-rico-babilonia.jpg";
import bookMindset from "@/assets/book-mindset.jpg";
import book7Habitos from "@/assets/book-7-habitos.jpg";
import bookPaiRico from "@/assets/book-pai-rico.jpg";
import bookArteGuerra from "@/assets/book-arte-guerra.jpg";
import bookMilagreManha from "@/assets/book-milagre-manha.jpg";
import bookEssencialismo from "@/assets/book-essencialismo.jpg";
import bookComoFazerAmigos from "@/assets/book-como-fazer-amigos.jpg";

export interface BookMission {
  id: string;
  text: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  synopsis: string;
  category: string;
  videoUrl?: string;
  amazonUrl?: string;
  missions: BookMission[];
}

export const books: Book[] = [
  {
    id: "poder-habito",
    title: "O Poder do Hábito",
    author: "Charles Duhigg",
    cover: bookPoderHabito,
    category: "Produtividade",
    synopsis: "Descubra por que fazemos o que fazemos na vida e nos negócios. Charles Duhigg revela como os hábitos funcionam através do loop do hábito — gatilho, rotina e recompensa — e como podemos transformá-los para mudar nossas vidas.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "ph-1", text: "Identificar o Gatilho de um hábito ruim" },
      { id: "ph-2", text: "Substituir a Rotina de um vício" },
      { id: "ph-3", text: "Criar uma nova Recompensa saudável" },
      { id: "ph-4", text: "Manter o novo hábito por 7 dias consecutivos" },
    ],
  },
  {
    id: "atomic-habits",
    title: "Hábitos Atômicos",
    author: "James Clear",
    cover: bookAtomicHabits,
    category: "Produtividade",
    synopsis: "Pequenas mudanças, resultados notáveis. James Clear mostra como mudanças minúsculas de 1% ao dia podem levar a resultados extraordinários, usando as 4 leis da mudança de comportamento.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "ah-1", text: "Empilhar um novo hábito em um hábito existente" },
      { id: "ah-2", text: "Tornar um hábito bom mais óbvio no ambiente" },
      { id: "ah-3", text: "Aplicar a regra dos 2 minutos em uma tarefa" },
    ],
  },
  {
    id: "rico-babilonia",
    title: "O Homem Mais Rico da Babilônia",
    author: "George S. Clason",
    cover: bookRicoBabilonia,
    category: "Finanças",
    synopsis: "As lições financeiras atemporais da antiga Babilônia. Através de parábolas envolventes, aprenda os princípios fundamentais para acumular riqueza, eliminar dívidas e garantir sua independência financeira.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "rb-1", text: "Guardar pelo menos 10% de toda renda recebida" },
      { id: "rb-2", text: "Criar um orçamento mensal detalhado" },
      { id: "rb-3", text: "Fazer seu dinheiro trabalhar para você (investir)" },
    ],
  },
  {
    id: "mindset",
    title: "Mindset: A Nova Psicologia do Sucesso",
    author: "Carol S. Dweck",
    cover: bookMindset,
    category: "Mentalidade",
    synopsis: "A psicóloga Carol Dweck revela como a mentalidade de crescimento vs. mentalidade fixa impacta todas as áreas da vida. Aprenda a cultivar a crença de que suas habilidades podem ser desenvolvidas.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "ms-1", text: "Identificar uma crença de mentalidade fixa sua" },
      { id: "ms-2", text: "Substituir 'eu não consigo' por 'eu ainda não consigo'" },
      { id: "ms-3", text: "Abraçar um desafio que você normalmente evitaria" },
    ],
  },
  {
    id: "7-habitos",
    title: "Os 7 Hábitos das Pessoas Altamente Eficazes",
    author: "Stephen R. Covey",
    cover: book7Habitos,
    category: "Liderança",
    synopsis: "O clássico de desenvolvimento pessoal que já vendeu mais de 40 milhões de cópias. Covey apresenta uma abordagem holística e baseada em princípios para resolver problemas pessoais e profissionais.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "7h-1", text: "Definir sua missão pessoal por escrito" },
      { id: "7h-2", text: "Praticar 'Começar com o fim em mente' em um projeto" },
      { id: "7h-3", text: "Colocar 'primeiro o mais importante' por uma semana" },
      { id: "7h-4", text: "Buscar primeiro compreender, depois ser compreendido" },
    ],
  },
  {
    id: "pai-rico",
    title: "Pai Rico, Pai Pobre",
    author: "Robert T. Kiyosaki",
    cover: bookPaiRico,
    category: "Finanças",
    synopsis: "O livro que desafia tudo o que você aprendeu sobre dinheiro. Kiyosaki compartilha as lições sobre dinheiro que os ricos ensinam a seus filhos — e a classe média e os pobres não.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "pr-1", text: "Listar seus ativos e passivos atuais" },
      { id: "pr-2", text: "Identificar uma fonte de renda passiva potencial" },
      { id: "pr-3", text: "Estudar a diferença entre ativo e passivo" },
    ],
  },
  {
    id: "arte-guerra",
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    cover: bookArteGuerra,
    category: "Estratégia",
    synopsis: "O tratado militar mais influente de todos os tempos, escrito há 2.500 anos. Os princípios estratégicos de Sun Tzu são aplicados hoje em negócios, liderança e vida pessoal.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "ag-1", text: "Analisar um 'campo de batalha' (desafio atual) estrategicamente" },
      { id: "ag-2", text: "Identificar seus pontos fortes e fracos" },
      { id: "ag-3", text: "Planejar antes de agir em uma decisão importante" },
    ],
  },
  {
    id: "milagre-manha",
    title: "O Milagre da Manhã",
    author: "Hal Elrod",
    cover: bookMilagreManha,
    category: "Produtividade",
    synopsis: "Transforme sua vida antes das 8h da manhã. Hal Elrod ensina os 6 hábitos matinais (SAVERS) que podem mudar qualquer área da sua vida: Silêncio, Afirmações, Visualização, Exercício, Leitura e Escrita.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "mm-1", text: "Acordar 30 minutos mais cedo por 5 dias" },
      { id: "mm-2", text: "Praticar os SAVERS por uma manhã completa" },
      { id: "mm-3", text: "Escrever suas afirmações pessoais" },
    ],
  },
  {
    id: "essencialismo",
    title: "Essencialismo",
    author: "Greg McKeown",
    cover: bookEssencialismo,
    category: "Produtividade",
    synopsis: "A busca disciplinada por menos. McKeown argumenta que apenas quando você diz não às coisas boas, pode dizer sim às grandes. Aprenda a identificar o que é essencial e eliminar todo o resto.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "es-1", text: "Dizer 'não' a um compromisso não essencial" },
      { id: "es-2", text: "Eliminar 3 itens da sua lista de tarefas" },
      { id: "es-3", text: "Definir a única coisa mais importante da semana" },
    ],
  },
  {
    id: "como-fazer-amigos",
    title: "Como Fazer Amigos e Influenciar Pessoas",
    author: "Dale Carnegie",
    cover: bookComoFazerAmigos,
    category: "Comunicação",
    synopsis: "O livro de desenvolvimento pessoal mais vendido de todos os tempos. Carnegie ensina técnicas fundamentais para lidar com pessoas, fazer com que gostem de você e conquistar outras pessoas para sua forma de pensar.",
    amazonUrl: "https://amazon.com.br",
    missions: [
      { id: "fa-1", text: "Elogiar sinceramente 3 pessoas hoje" },
      { id: "fa-2", text: "Ouvir atentamente sem interromper em uma conversa" },
      { id: "fa-3", text: "Chamar alguém pelo nome em uma interação" },
    ],
  },
];
