/* ============================================================
   GEN-ARTEFATOS.JS — Retalhos da Contracena
   Geradores: Artefato (🎲, sistema modular em camadas) e
   Maravilha Cotidiana (🌟, inalterado).
   Registrados no motor RDC (geradores.js). Ver guia-geradores.md §5.1.
   ============================================================ */

/* ------------------------------------------------------------
   Toggle genérico de revelação (Nome Verdadeiro / Segredos)
   Função global (não sob RDC) porque também é usada pelas caixas
   editoriais estáticas da Galeria de Exemplos em artefatos.html,
   que chamam onclick="revelarNome(this)" no HTML preservado.

   Aceita rótulos customizados via data-label-fechado / data-label-aberto
   no próprio botão — se ausentes, cai no rótulo padrão do Nome
   Verdadeiro (comportamento idêntico ao original).
   ------------------------------------------------------------ */
function revelarNome(btn) {
  const reveal = btn.nextElementSibling;
  const visivel = reveal.classList.contains('visible');
  reveal.classList.toggle('visible', !visivel);
  const fechado = btn.dataset.labelFechado || '🔒 Revelar Nome Verdadeiro';
  const aberto = btn.dataset.labelAberto || '🔓 Ocultar Nome Verdadeiro';
  btn.textContent = visivel ? fechado : aberto;
}

(function () {
  'use strict';

  /* ============================================================
     GERADOR DE ARTEFATO — Sistema Modular em Camadas
     ============================================================
     Cada artefato nasce de rolagens independentes em camadas.
     A Raridade decide QUANTAS camadas entram em jogo, não troca
     a mecânica. As camadas de "segredo" (Preço, Defeito, Ironia)
     e a trilha do Nome Verdadeiro (Tema + sugestão) só aparecem
     atrás de um clique — espelhando o próprio ritmo da Curadoria:
     o que se vê de cara, e o que só se descobre ao trabalhar
     o artefato (Fase Moldar) ou ao ouvi-lo de verdade (Fase Ouvir).
     ============================================================ */

  // --- Camada 1: FORMA (d20) — o objeto físico base ------------
  const FORMAS = [
    'Capa', 'Anel', 'Bússola', 'Taça', 'Espelho de Mão', 'Diário',
    'Chave sem Fechadura', 'Lamparina', 'Luva', 'Dedal',
    'Tesoura de Bordado', 'Novelo de Linha', 'Caixinha de Música',
    'Leque', 'Cachimbo', 'Colar', 'Campainha de Mesa',
    'Escova de Cabelo', 'Âncora em Miniatura', 'Vela que Nunca Derrete'
  ];

  // --- Camada 1: MATERIAL / FEITURA (d12) — qualificador poético
  const MATERIAIS = [
    'de Areia Estelar', 'de Prata Líquida', 'de Ossos Antigos',
    'de Tinta Invisível', 'que Nunca Esvazia', 'de Vidro Fumê',
    'de Cinzas Douradas', 'de Fio Partido', 'de Sal e Silêncio',
    'de Lua Cheia', 'de Poeira de Estrela', 'de Renda Desfiada'
  ];

  // --- Camada 2: EFEITO CENTRAL (d12) — escala com a Raridade ---
  // Cada núcleo de efeito vem escrito em três intensidades: o que
  // ele faz sendo Comum, Raro ou Lendário. A raiz poética é a
  // mesma; só o alcance e o peso emocional crescem.
  const EFEITOS = [
    {
      nome: 'Revela o que foi escondido de propósito',
      comum: 'Acha pequenos objetos perdidos dentro da Contracena.',
      raro: 'Revela um segredo que alguém vivo guarda a sete chaves.',
      lendario: 'Revela algo que uma cidade inteira escolheu esquecer.'
    },
    {
      nome: 'Preserva o que deveria se deteriorar',
      comum: 'Mantém flores e comida frescas por mais um dia.',
      raro: 'Impede que um ferimento ou uma mágoa piore, por uma semana.',
      lendario: 'Suspende o tempo sobre uma pessoa ou lugar, por uma estação inteira.'
    },
    {
      nome: 'Aponta para o que foi perdido',
      comum: 'Indica a direção de um objeto perdido na cidade.',
      raro: 'Indica a direção de uma pessoa que sumiu.',
      lendario: 'Indica a direção de algo que o próprio usuário perdeu de si mesmo.'
    },
    {
      nome: 'Devolve, por um instante, uma sensação que já passou',
      comum: 'O cheiro de uma refeição de infância.',
      raro: 'O som exato da voz de alguém que partiu.',
      lendario: 'Um dia inteiro revivido como memória, do início ao fim.'
    },
    {
      nome: 'Conforta quem sente falta de alguém',
      comum: 'Aquece as mãos de quem está com saudade.',
      raro: 'Por uma noite, alivia por completo o peso da saudade.',
      lendario: 'Permite uma despedida simbólica com quem se foi — sentida como real.'
    },
    {
      nome: 'Traduz o que não pode mais ser dito',
      comum: 'Traduz idiomas que já não são falados por ninguém.',
      raro: 'Traduz a intenção verdadeira por trás de uma mentira.',
      lendario: 'Traduz os últimos pensamentos de alguém que já morreu.'
    },
    {
      nome: 'Guarda o som ou a imagem de uma despedida',
      comum: 'Grava uma frase, para ser ouvida uma única vez.',
      raro: 'Grava uma cena inteira, revivida quantas vezes o dono quiser.',
      lendario: 'Grava a despedida antes mesmo dela acontecer — um aviso.'
    },
    {
      nome: 'Mostra o rosto de quem se ama',
      comum: 'Mostra quem está pensando em você, uma vez ao dia.',
      raro: 'Mostra se essa pessoa está bem, sem entrar em detalhes.',
      lendario: 'Permite trocar uma única frase com essa pessoa, não importa a distância.'
    },
    {
      nome: 'Cura um ferimento físico',
      comum: 'Cura arranhões e contusões leves.',
      raro: 'Cura um ferimento sério, mas exige repouso depois.',
      lendario: 'Cura qualquer coisa — uma única vez em toda a vida do artefato.'
    },
    {
      nome: 'Reverte um pequeno intervalo de tempo',
      comum: 'Desfaz os últimos cinco minutos de uma ação (não de uma conversa).',
      raro: 'Reverte dez minutos dentro de um cômodo inteiro.',
      lendario: 'Reverte um dia inteiro — mas só uma vez, e o artefato se quebra depois.'
    },
    {
      nome: 'Ilumina apenas o que foi esquecido de propósito',
      comum: 'Ilumina objetos escondidos numa gaveta ou baú.',
      raro: 'Ilumina memórias reprimidas de quem segura a luz.',
      lendario: 'Ilumina segredos que uma família inteira jurou nunca revelar.'
    },
    {
      nome: 'Reproduz uma canção que ninguém mais consegue lembrar',
      comum: 'Toca uma canção de ninar qualquer, à escolha de quem usa.',
      raro: 'Toca uma canção específica que uma pessoa amada costumava cantar.',
      lendario: 'Toca a última canção que existiu antes de um povo desaparecer.'
    }
  ];

  // --- Camada 3: PREÇO (o custo de USAR o efeito central) -------
  const PRECOS_LEVES = [
    'Custa 1 Recurso a cada uso.',
    'Só funciona uma vez por dia.',
    'Deixa quem usa levemente cansado(a) por algumas horas.',
    'Só funciona em silêncio absoluto ao redor.',
    'Esquenta de forma desconfortável nas mãos ao ser usado.',
    'Funciona apenas pela metade se usado com pressa ou raiva.'
  ];

  const PRECOS_PESADOS = [
    'Envelhece o usuário em uma pequena medida a cada uso.',
    'Custa uma lembrança pequena e específica, escolhida por quem usa.',
    'Deixa uma marca física temporária — uma mancha, um calafrio, um fio de cabelo branco.',
    'Atrai a atenção de algo que não deveria notar a Contracena.',
    'Exige que o usuário confesse algo verdadeiro em voz alta antes de funcionar.',
    'Funciona perfeitamente para outra pessoa — nunca para quem o possui.',
    'Rouba uma noite de sono inteira, sentida só uma semana depois.',
    'Deixa o usuário incapaz de mentir por um dia inteiro.',
    'Cada uso aproxima o artefato um pouco mais de se desfazer para sempre.',
    'Exige que quem usa abra mão, por uma cena, de algo que mais quer.'
  ];

  // --- Camada 4: TEMPERAMENTO (o que o artefato pede) — d12 -----
  const PEDIDOS = [
    'Para ser polido com óleo de lavanda toda semana.',
    'Para ouvir música (cantarolar funciona) antes de ser usado.',
    'Silêncio absoluto. Não funciona se houver barulho por perto.',
    'Para ser guardado perto de uma fonte de água corrente.',
    'Que o usuário diga seu nome verdadeiro antes de tocá-lo.',
    'Para ser alimentado com uma gota de sangue ou uma lágrima (uma vez por mês).',
    'Para ficar virado para o norte, ou perde a função.',
    'Que alguém conte uma história verdadeira para ele antes de dormir.',
    'Para ser envolto em seda vermelha quando não estiver em uso.',
    'Nada. Ele é perfeitamente autossuficiente — e isso é assustador.',
    'Que seja apresentado a um visitante novo toda lua cheia.',
    'Companhia silenciosa por uma hora ao entardecer.'
  ];

  // --- Camada 4: DEFEITO / MARCA PASSIVA (independente do Preço) — d12
  // Diferença de design: o Preço é o custo de USAR o efeito central.
  // O Defeito é um hábito ou falha que existe mesmo quando o
  // artefato está parado — sua personalidade, não sua tarifa.
  const DEFEITOS = [
    'Sussurra à noite em uma língua que ninguém entende.',
    'Drena energia vital de quem o toca por muito tempo (causa fadiga).',
    'Muda de lugar dentro da Contracena quando ninguém está olhando.',
    'Reage violentamente a mentiras (esquenta, treme, ou emite luz).',
    'Mostra memórias do dono anterior para quem o segura.',
    'Atrai criaturas mágicas pequenas e inofensivas (mariposas de luz, ratos de sombra).',
    'Funciona apenas sob a luz da lua ou em escuridão total.',
    'Tem uma personalidade teimosa e recusa funcionar se não for "pedido com educação".',
    'Causa alucinações leves em quem o usa por mais de uma hora.',
    'Está lentamente se desintegrando — resta pouco tempo antes que suma para sempre.',
    'Só funciona se alguém contar uma mentira gentil por perto.',
    'Esquece seu próprio propósito por uma hora após o pôr do sol.'
  ];

  // --- Camada 5 (só Raro/Lendário): SEMENTE DE TEMA (oráculo) ----
  // Duas mesas cruzadas dão a faísca (ex.: "Culpa + Repetição"),
  // não a resposta pronta — é munição para as 3 pistas reais que
  // o jogador escreve na Fase Ouvir.
  const TEMA_A = ['Perda', 'Promessa', 'Segredo', 'Proteção', 'Culpa', 'Despedida'];
  const TEMA_B = ['Substituição', 'Silêncio', 'Repetição', 'Sacrifício', 'Espera', 'Negação'];

  // Sugestões de Nome Verdadeiro por Tema A (a metade "pronta" do
  // sistema híbrido — o jogador pode usar, adaptar ou ignorar).
  const NOME_TEMPLATES = {
    'Perda': [
      'O Que Ficou de [X]', 'A Ausência que Não Cicatriza',
      'O Peso do Que Sumiu', 'O Lugar Vazio à Mesa'
    ],
    'Promessa': [
      'A Palavra Não Cumprida', 'O Juramento Que Ainda Pesa',
      'O Que Foi Prometido e Não Veio', 'A Promessa Guardada a Sete Chaves'
    ],
    'Segredo': [
      'O Que Nunca Foi Dito', 'A Verdade Guardada a Sete Chaves',
      'O Silêncio Que Você Escolheu', 'O Que Só as Paredes Sabem'
    ],
    'Proteção': [
      'O Escudo Que Ninguém Pediu', 'A Guarda Silenciosa',
      'O Que Vela Enquanto Você Dorme', 'A Muralha Que Ninguém Vê'
    ],
    'Culpa': [
      'O Peso Que Você Carrega Sozinho(a)', 'A Conta Que Nunca Fecha',
      'O Que Você Não Perdoou em Si Mesmo(a)', 'A Sombra Que Segue Sem Ameaçar'
    ],
    'Despedida': [
      'O Último Adeus Não Dito', 'A Porta Que Ainda Espera',
      'O Que Ficou por Dizer', 'A Mala Que Nunca Foi Desfeita'
    ]
  };

  // Ganchos mecânicos de Propriedade por Tema B — sempre escritos
  // em cima de "o artefato" (gênero neutro seguro) e do efeito
  // central já sorteado, para soarem amarrados sem depender de
  // Núcleos pré-escritos.
  const PROPRIEDADE_TEMPLATES = {
    'Substituição': 'Uma vez por Fio de Mistério ativo, outra pessoa pode usar o artefato sem pagar o Preço — desde que aceite carregar, por um tempo, o que o dono carregava.',
    'Silêncio': 'Se guardado em silêncio absoluto por uma noite inteira, o próximo uso do efeito central não cobra Preço.',
    'Repetição': 'Na terceira vez que o efeito central for usado sobre a mesma pessoa ou lugar, ele se torna permanente — ou impossível de repetir de novo. Escolha.',
    'Sacrifício': 'Uma vez, quem usa pode dobrar o alcance ou a duração do efeito central — mas paga o Preço em dobro, de uma só vez.',
    'Espera': 'Se guardado sem uso por uma estação inteira, o próximo uso do efeito central é gratuito — sem Preço algum.',
    'Negação': 'Uma vez, quem usa pode recusar o Preço — mas o efeito central falha, e o artefato guarda essa recusa como uma Marca [NEGAÇÃO], visível a quem souber olhar.'
  };

  // --- Camada opcional: IRONIA (tag sorteável em qualquer artefato)
  // Versão modular da antiga tabela "Não-Tradicionais": em vez de
  // 10 piadas fixas, um padrão de subversão genérico aplicado sobre
  // a Forma e o Efeito já sorteados — nunca se repete do mesmo jeito.
  const IRONIAS = [
    'Funciona perfeitamente — mas só na direção oposta à esperada.',
    'Cumpre a função por completo, só que para a pessoa errada — nunca para quem o usa.',
    'Faz exatamente o que promete, mas de um jeito tão discreto que ninguém percebe a mágica.',
    'O efeito é real e forte, mas vem sempre acompanhado de um efeito colateral ridículo e inofensivo.',
    'Só funciona em circunstâncias tão específicas e triviais que quase nunca vale o esforço.',
    'Faz o oposto exato do que o dono pede — mas sempre o que o dono precisava, sem saber.'
  ];

  // Chance de um artefato carregar a tag Ironia, independente da Raridade.
  const CHANCE_IRONIA = 0.2;

  // --- Camada opcional (só Raro/Lendário): RASTRO DE ORIGEM (d10) --
  // A Fera nunca aparece em cena, nunca é nomeada, nunca é confirmada.
  // Cada entrada é só um vestígio no jeito como o artefato chegou até
  // a Contracena — quem trouxe fala pouco, e o que fica implícito é
  // que algo grande e vivo ainda está lá fora. PROMPT, NÃO FATO: o
  // jogador decide se isso importa, se é lenda de Quebrador bêbado,
  // ou se um dia bate à porta.
  const RASTROS_FERA = [
    'Arrancado de algo que não deveria ter nome. Quem o trouxe não fala da criatura — só que ela ainda respira, em algum lugar.',
    'Encontrado ao lado de marcas de garra na pedra, fundas e grandes demais para qualquer bicho que a cidade conheça.',
    'Chegou enrolado em um tufo de pelo cinza, comprido demais, ainda morno quando foi entregue.',
    'Veio de dentro do que sobrou de um ninho — de quê, exatamente, o Quebrador preferiu não dizer.',
    'Achado numa clareira onde as árvores cresceram tortas ao redor de um vazio, como se algo enorme tivesse dormido ali por anos.',
    'Segundo quem o trouxe, foi tirado da boca de algo — e essa pessoa nunca mais quis falar sobre o resgate.',
    'Chegou com um cheiro que os cães da cidade não esquecem: fogem da rua toda vez que ele é destampado.',
    'Foi encontrado perto de ossos grandes demais para identificar — talvez de um animal enorme, talvez de outra coisa.',
    'O Quebrador jura ter ouvido uma respiração enorme antes de conseguir pegá-lo, e nunca mais voltou àquela direção.',
    'Veio embrulhado em escamas que não pertencem a peixe nem a lagarto catalogado algum — grandes, e ainda meio úmidas.'
  ];

  // Chance de um artefato Raro/Lendário carregar um Rastro de Origem —
  // é tempero opcional, não todo artefato profundo precisa de uma
  // Fera à espreita.
  const CHANCE_RASTRO_FERA = 0.4;

  // --- Raridade: pesos e o que cada tier libera --------------------
  const NIVEIS = [
    { limite: 60, chave: 'comum', nome: 'Comum', recursos: '1d4 Recursos' },
    { limite: 90, chave: 'raro', nome: 'Raro', recursos: '1d6 Recursos' },
    { limite: 100, chave: 'lendario', nome: 'Lendário', recursos: '1d10 Recursos' }
  ];

  function sortearNivel() {
    const r = RDC.roll(100);
    return NIVEIS.find(n => r <= n.limite);
  }

  function gerarArtefato() {
    const nivel = sortearNivel();
    const forma = RDC.pick(FORMAS);
    const material = RDC.pick(MATERIAIS);
    const efeitoBase = RDC.pick(EFEITOS);
    const efeitoTexto = efeitoBase[nivel.chave];

    const temIronia = RDC.chance(CHANCE_IRONIA);
    const ironiaTexto = temIronia ? RDC.pick(IRONIAS) : null;

    const data = {
      nome: `${forma} ${material}`,
      nivelNome: nivel.nome,
      nivelChave: nivel.chave,
      recursos: nivel.recursos,
      efeitoNome: efeitoBase.nome,
      efeito: efeitoTexto,
      ironia: ironiaTexto,
      pedido: null,
      defeito: null,
      preco: null,
      origem: null,
      temNomeVerdadeiro: false
    };

    if (nivel.chave === 'comum') {
      // Comuns são utilitários e rápidos: ganham só UMA marca de
      // caráter (Pedido OU Defeito), sem Preço e sem trilha de
      // Nome Verdadeiro — não pedem uma Curadoria funda.
      if (RDC.chance(0.5)) {
        data.pedido = RDC.pick(PEDIDOS);
      } else {
        data.defeito = RDC.pick(DEFEITOS);
      }
      return data;
    }

    // Raro e Lendário: todas as camadas entram, incluindo a trilha
    // do Nome Verdadeiro (revelada só na Fase Ouvir, na interface).
    data.pedido = RDC.pick(PEDIDOS);
    data.defeito = RDC.pick(DEFEITOS);
    data.preco = nivel.chave === 'raro' ? RDC.pick(PRECOS_LEVES) : RDC.pick(PRECOS_PESADOS);
    data.origem = RDC.chance(CHANCE_RASTRO_FERA) ? RDC.pick(RASTROS_FERA) : null;

    const temaA = RDC.pick(TEMA_A);
    const temaB = RDC.pick(TEMA_B);
    data.temNomeVerdadeiro = true;
    data.temaA = temaA;
    data.temaB = temaB;
    data.semente = `${temaA} + ${temaB}`;
    data.nomeSugerido = RDC.pick(NOME_TEMPLATES[temaA]);
    data.propriedadeSugerida = PROPRIEDADE_TEMPLATES[temaB];

    return data;
  }

  function renderArtefato(data) {
    let html = `
      <div class="gen-result">
        <div class="gen-result-title">✨ ${data.nome}</div>
        <div class="gen-field"><span class="gen-field-label">Nível</span> ${data.nivelNome} (${data.recursos})</div>
        <div class="gen-field"><span class="gen-field-label">Efeito Central</span> ${data.efeito}</div>
    `;

    if (data.pedido) {
      html += `<div class="gen-field"><span class="gen-field-label">O que Pede</span> ${data.pedido}</div>`;
    }

    if (data.nivelChave === 'comum') {
      if (data.defeito) {
        html += `<div class="gen-field"><span class="gen-field-label">Defeito Mágico</span> ${data.defeito}</div>`;
      }
      if (data.ironia) {
        html += `<div class="gen-field"><span class="gen-field-label">🙃 Ironia</span> ${data.ironia}</div>`;
      }
      html += `<p class="gen-hint">Um artefato simples — funciona sem exigir uma Curadoria funda. Use este artefato em uma cena de restauração rápida.</p></div>`;
      return html;
    }

    // Raro / Lendário: Preço, Defeito e Ironia ficam atrás de um
    // primeiro véu — o que só se descobre ao começar a trabalhar
    // o artefato (Fase Moldar).
    html += `
        <div class="nome-oculto-wrapper">
          <button class="nome-oculto-toggle" onclick="revelarNome(this)"
            data-label-fechado="🔍 Revelar ao Iniciar a Restauração"
            data-label-aberto="🔽 Ocultar">🔍 Revelar ao Iniciar a Restauração</button>
          <div class="nome-oculto-reveal">
            <div class="gen-field"><span class="gen-field-label">Preço</span> ${data.preco}</div>
            <div class="gen-field"><span class="gen-field-label">Defeito (Marca Passiva)</span> ${data.defeito}</div>
            ${data.ironia ? `<div class="gen-field"><span class="gen-field-label">🙃 Ironia</span> ${data.ironia}</div>` : ''}
            ${data.origem ? `<div class="gen-field"><span class="gen-field-label">🐾 De Onde Veio</span> ${data.origem}</div>` : ''}
          </div>
        </div>
    `;

    if (data.temNomeVerdadeiro) {
      html += `
        <div class="nome-oculto-wrapper">
          <button class="nome-oculto-toggle" onclick="revelarNome(this)"
            data-label-fechado="🔒 Revelar Trilha do Nome Verdadeiro (Fase Ouvir)"
            data-label-aberto="🔓 Ocultar">🔒 Revelar Trilha do Nome Verdadeiro (Fase Ouvir)</button>
          <div class="nome-oculto-reveal">
            <p style="margin:0 0 0.6rem; font-size:0.9rem;"><strong>Semente de Tema</strong> <em style="color:var(--ink-soft); font-size:0.82rem">(faísca para as 3 pistas — não a resposta pronta)</em></p>
            <div class="gen-field"><span class="gen-field-label">Tema</span> ${data.semente}</div>
            <p style="margin:0.8rem 0 0.3rem; font-size:0.9rem;">Escreva as 3 pistas da Fase Ouvir a partir dessa faísca. Se preferir um atalho pronto:</p>
            <div class="nome-label" style="margin-top:0.6rem">Nome Verdadeiro Sugerido</div>
            <div class="nome-valor">${data.nomeSugerido}</div>
            <div class="nome-propriedade">Propriedade sugerida: ${data.propriedadeSugerida}</div>
          </div>
        </div>
      `;
    }

    html += `<p class="gen-hint">Use este artefato em uma cena de restauração ou como gancho de mistério. A Regra de Ouro vale aqui: aceite, adapte ou ignore qualquer camada.</p></div>`;
    return html;
  }

  RDC.registerGenerator({
    id: 'artefato',
    label: 'Artefato',
    icon: '🎲',
    page: 'artefatos.html',
    loadingText: 'Invocando artefato...',
    generate: gerarArtefato,
    render: renderArtefato,
    title: (data) => data.nome
  });

  /* ============================================================
     GERADOR DE MARAVILHA COTIDIANA (inalterado)
     ============================================================ */

  // Cada evento amarra nome + efeito, para manter coerência entre os dois campos
  const EVENTOS_MARAVILHA = [
    { nome: 'A Poeira que Vira Céu', efeito: 'forma pequenas constelações no ar se não for varrida por 24 horas.' },
    { nome: 'O Chá de Humor Variável', efeito: 'muda de sabor conforme o humor de quem o bebe.' },
    { nome: 'As Sombras Atrasadas', efeito: 'imitam os movimentos dos objetos com 2 segundos de atraso.' },
    { nome: 'A Vassoura Educada', efeito: 'varre sozinha por 1 hora, se for pedido com educação.' },
    { nome: 'A Xícara Sem Pressa', efeito: 'nunca esfria, não importa quanto tempo passe.' },
    { nome: 'O Espelho do Amanhã', efeito: 'reflete, de relance, o clima do dia seguinte.' },
    { nome: 'Os Livros Fofoqueiros', efeito: 'sussurram uns com os outros quando ninguém está olhando.' },
    { nome: 'As Velas Pontuais', efeito: 'acendem sozinhas exatamente ao entardecer.' },
    { nome: 'O Gato que Ninguém Vê', efeito: 'dorme (invisível, mas audível) sobre os artefatos mais perigosos, como se os vigiasse.' },
    { nome: 'A Escada Cantante', efeito: 'conta os passos de quem sobe em voz baixa e melodiosa.' },
    { nome: 'O Novelo Teimoso', efeito: 'se desenrola sozinho até formar, no chão, a palavra que você mais precisa ouvir.' },
    { nome: 'A Janela de Bom Tempo', efeito: 'deixa entrar um raio de sol mesmo em dias fechados, por exatamente cinco minutos.' },
    { nome: 'O Relógio de Cozinha Generoso', efeito: 'atrasa sozinho alguns minutos sempre que uma refeição é feita com carinho.' },
    { nome: 'O Chá que Não Aceita Mentira', efeito: 'esfria na hora exata em que alguém mente perto dele — mesmo que a mentira seja gentil.' },
    { nome: 'As Penas Esquecidas', efeito: 'se recusam a escrever o nome de alguém que o dono já esqueceu de verdade.' },
    { nome: 'O Sabonete de Saudade', efeito: 'cheira, cada dia, ao que quem o usa mais sente falta.' },
    { nome: 'A Porta que Reconhece Visita', efeito: 'range uma melodia diferente para cada pessoa que bate — e nunca erra quem é.' },
    { nome: 'O Baú Arrumadinho', efeito: 'se reorganiza sozinho por dentro, sempre que ninguém está prestando atenção.' }
  ];

  const ONDE = [
    'na bancada de trabalho', 'no parapeito da janela', 'no armário de ferramentas',
    'perto da lareira', 'no tapete gasto da entrada', 'na prateleira mais alta',
    'no vão sob a escada', 'no jardim de ervas da varanda', 'na pia da cozinha',
    'dentro do baú de retalhos', 'no corredor dos espelhos', 'na soleira da porta principal',
    'no sótão empoeirado', 'dentro da caixa de costura'
  ];

  const HUMOR = [
    'fica mais brilhante quando a Contracena está em paz.',
    'esfria um pouco quando há uma discussão recente no ar.',
    'sussurra baixinho nas noites de saudade.',
    'brilha mais forte perto de quem está feliz.',
    'fica quieta demais quando alguém guarda um segredo pesado.',
    'vibra de leve quando um vínculo é reparado.',
    'ganha cores suaves nos dias de descanso.',
    'fica birrenta quando a rotina é quebrada sem aviso.',
    'se acalma quando alguém chora por perto.',
    'fica elétrica nos dias de visita esperada.',
    'se encolhe um pouco quando há tensão entre os moradores.',
    'floresce, à sua maneira, quando um novo vínculo nasce.'
  ];

  function gerarMaravilha() {
    const evento = RDC.pick(EVENTOS_MARAVILHA);
    return {
      nome: evento.nome,
      onde: RDC.pick(ONDE),
      efeito: evento.efeito,
      humor: RDC.pick(HUMOR)
    };
  }

  function renderMaravilha(data) {
    return `
      <div class="gen-result">
        <div class="gen-result-title">🌟 ${data.nome}</div>
        <div class="gen-field"><span class="gen-field-label">Onde</span> ${data.onde}</div>
        <div class="gen-field"><span class="gen-field-label">Efeito</span> ${data.efeito}</div>
        <div class="gen-field"><span class="gen-field-label">Humor</span> Ela ${data.humor}</div>
        <p class="gen-hint">Incorpore esta maravilha na próxima cena de rotina na Contracena.</p>
      </div>
    `;
  }

  RDC.registerGenerator({
    id: 'maravilha',
    label: 'Maravilha Cotidiana',
    icon: '🌟',
    page: 'artefatos.html',
    loadingText: 'Despertando a maravilha...',
    generate: gerarMaravilha,
    render: renderMaravilha,
    title: (data) => data.nome
  });

})();
