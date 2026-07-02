// generators.js — Geradores compartilhados
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function roll(d) {
  return Math.floor(Math.random() * d) + 1;
}

// ============================================================
// GERADOR DE ARTEFATOS
// ============================================================
function generateArtifact() {
  const nomes = [
    'Ampulheta de Areia Estelar', 'Espelho de Prata Líquida',
    'Bússola de Ossos', 'Diário de Tinta Invisível',
    'Taça que Nunca Esvazia', 'Anel das Memórias Alheias',
    'Chave de Cristal Fumê', 'Pena de Fênix Adormecida',
    'Mapa de Tinta Viva', 'Relógio de Bolso sem Ponteiros'
  ];
  const origens = [
    'Império Caído de Ossun', 'Guilda dos Navegantes de Vaelstrom',
    'Tribos Nômades de Dusthaven', 'Universidade de Thys',
    'Reino Perdido de Kelfen', 'Mercado Negro de Marrath'
  ];
  const funcoes = [
    'Reverte o tempo em 10 minutos',
    'Mostra o rosto de quem o usuário mais ama',
    'Aponta para o que o usuário mais perdeu',
    'Revela segredos de quem o toca',
    'Cura ferimentos físicos',
    'Permite viver memórias alheias'
  ];
  const defeitos = [
    'Sussurra à noite em língua desconhecida',
    'Drena energia vital (causa fadiga)',
    'Muda de lugar quando ninguém olha',
    'Reage violentamente a mentiras',
    'Mostra memórias do dono anterior',
    'Atrai criaturas mágicas pequenas'
  ];
  const pedidos = [
    'Ser polido com óleo de lavanda',
    'Ouvir música antes de ser usado',
    'Silêncio absoluto para funcionar',
    'Ser guardado perto de água corrente',
    'Que o usuário diga seu nome verdadeiro',
    'Uma gota de sangue ou lágrima por mês'
  ];
  const niveis = [
    'Comum (1d3 Recursos)',
    'Incomum (1d4 Recursos)',
    'Raro (1d6 Recursos)',
    'Épico (1d8 Recursos)',
    'Lendário (1d10 Recursos)'
  ];

  return {
    nome: pick(nomes),
    origem: pick(origens),
    funcao: pick(funcoes),
    defeito: pick(defeitos),
    pedido: pick(pedidos),
    nivel: pick(niveis)
  };
}

// ============================================================
// GERADOR DE MARAVILHA COTIDIANA
// ============================================================
function generateWonder() {
  const maravilhas = [
    'A poeira forma constelações se não for varrida por 24h.',
    'O chá muda de sabor conforme o humor de quem bebe.',
    'As sombras imitam movimentos com 2 segundos de atraso.',
    'A vassoura varre sozinha por 1 hora se pedir com educação.',
    'A xícara de café nunca esfria.',
    'O espelho do corredor reflete o clima de amanhã.',
    'Os livros sussurram uns com os outros quando ninguém olha.',
    'As velas acendem sozinhas ao entardecer.',
    'Um gato fantasma dorme em cima dos artefatos perigosos.',
    'Os degraus contam seus passos em voz baixa e melodiosa.'
  ];
  return pick(maravilhas);
}

// ============================================================
// FUNÇÃO DE LOADING (com delay e renderização)
// ============================================================
function generateWithLoading(outputId, generatorFn) {
  const output = document.getElementById(outputId);
  if (!output) return;

  const spinner = document.getElementById('spinner-' + outputId);
  if (!spinner) return;

  // Esconde conteúdo anterior e mostra spinner
  output.querySelectorAll(':not(.loading-spinner)').forEach(el => el.style.display = 'none');
  spinner.classList.add('active');

  // Desabilita botões durante loading
  const buttons = output.parentElement.querySelectorAll('.generator-btn');
  buttons.forEach(btn => btn.disabled = true);

  // Simula delay de 300ms e executa gerador
  setTimeout(() => {
    spinner.classList.remove('active');
    generatorFn();
    buttons.forEach(btn => btn.disabled = false);
  }, 300);
}