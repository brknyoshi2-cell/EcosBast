/* ============================================================
   gen-ganchos.js — Retalhos da Contracena
   Gerador: Gancho de Capítulo (Quadro de Avisos da Confraria)
   Registrado no motor RDC (geradores.js). Ver guia-geradores.md §5.4.
   ============================================================ */

(function () {

  /* --------------------------------------------------------
     Pool de Ganchos — expandido da tabela d10 de finais.html
     Cada item carrega uma categoria interna, usada só para
     escolher uma Semente de Fio e um Clima coerentes.
     -------------------------------------------------------- */
  const GANCHOS = [
    { texto: "Um Quebrador traz um artefato estranho que ninguém quer tocar.", categoria: "misterio" },
    { texto: "Um trabalhador da Confraria pede um favor pessoal urgente.", categoria: "confraria" },
    { texto: "Uma carta anônima chega com um aviso sobre a Contracena.", categoria: "misterio" },
    { texto: "Um NPC da cidade aparece com um problema que só você pode resolver.", categoria: "pessoal" },
    { texto: "Um artefato esquecido no armazém começa a reagir sozinho.", categoria: "misterio" },
    { texto: "A Mestra da Confraria convoca uma reunião urgente sobre uma mudança nas regras.", categoria: "confraria" },
    { texto: "Um vizinho da Contracena reclama de barulhos estranhos vindos de dentro.", categoria: "misterio" },
    { texto: "Uma expedição que um Quebrador decidiu sozinho retorna com um único sobrevivente, e ele não fala do que viu.", categoria: "tensao" },
    { texto: "Um Fio de Tensão avança sozinho, sem gatilho claro — algo está errado.", categoria: "tensao" },
    { texto: "Você encontra, dentro da Contracena, um objeto pessoal de um NPC desaparecido.", categoria: "misterio" },
    { texto: "Um Quebrador Recorrente deveria ter reaparecido esta semana, mas não aparece, e ninguém sabe dizer por quê.", categoria: "pessoal" },
    { texto: "A Confraria anuncia uma nova taxa ou regra que atinge direto o seu trabalho.", categoria: "confraria" },
    { texto: "Um cliente antigo volta pedindo para desfazer uma restauração já entregue.", categoria: "misterio" },
    { texto: "Correm rumores de que outro Restaurador está de olho no seu território.", categoria: "tensao" },
    { texto: "Uma criança da vizinhança jura ter visto uma luz saindo do Relicário Selado, de noite.", categoria: "misterio" },
    { texto: "Um Círculo da cidade oferece uma aliança boa demais para ser verdade.", categoria: "confraria" },
    { texto: "A névoa desce cedo demais, e um Quebrador some no caminho até a Contracena.", categoria: "tensao" },
    { texto: "Chega, sem remetente, uma carta de um NPC com quem você havia perdido contato.", categoria: "pessoal" },
    { texto: "Um cliente cujo Fio de Encomenda está quase fechando aparece sem avisar, só para saber notícias do artefato.", categoria: "cobranca" },
    { texto: "Chega um recado seco: se o artefato não estiver pronto até o fim do capítulo, o cliente procura outro Restaurador.", categoria: "cobranca" },
    { texto: "Um Recorrente reaparece antes do esperado, e não é visita — é cobrança pessoal pelo que ainda está incompleto.", categoria: "cobranca" }
  ];

  /* --------------------------------------------------------
     Reação da cidade ou da Confraria — pool geral
     -------------------------------------------------------- */
  const REACOES = [
    "A Confraria manda um recado discreto perguntando se está tudo bem com você.",
    "Antes do sol se pôr, a cidade inteira já está comentando o assunto.",
    "Um Quebrador conhecido aparece na sua porta só para checar se você está bem.",
    "A Mestra da Confraria finge não se importar, mas passa a te observar de longe.",
    "Vizinhos param de te cumprimentar na rua — não por raiva, por cautela.",
    "Alguém deixa um bilhete anônimo de apoio embaixo da porta da Contracena.",
    "A Confraria oferece ajuda, mas cobra um preço que ainda não fica claro.",
    "A notícia chega distorcida à cidade, e você precisa corrigir o rumor pessoalmente.",
    "Um Círculo local aproveita o assunto para tentar se aproximar de você.",
    "Ninguém comenta em voz alta, mas o silêncio ao seu redor muda de tom.",
    "Um velho cliente aparece só para dizer que sempre confiou em você, aconteça o que for.",
    "A Confraria abre uma exceção nas regras, só desta vez, e todos notam.",
    "As crianças da vizinhança passam a rondar a Contracena, curiosas demais.",
    "Alguém da cidade tenta usar o ocorrido para te fazer um pedido inconveniente."
  ];

  /* --------------------------------------------------------
     Sementes de Fio — organizadas por categoria para manter
     coerência com o gancho sorteado.
     -------------------------------------------------------- */
  const SEMENTES = {
    misterio: [
      "Abra um novo Fio de Mistério: o que esse objeto ou artefato está tentando dizer?",
      "Avance um Fio de Mistério já existente em +1 — a pergunta ficou mais urgente.",
      "Um novo Fio de Mistério nasce sobre quem — ou o quê — está por trás disso.",
      "Se já existe um Fio ligado ao Relicário Selado, este é o momento de avançá-lo."
    ],
    tensao: [
      "Abra um novo Fio de Tensão: algo está prestes a cobrar seu preço.",
      "Avance um Fio de Tensão existente em +1 — o que estava latente, agora aperta.",
      "Um Fio de Tensão sobre a segurança da Contracena ganha força a partir daqui.",
      "Se há um Fio de rivalidade ou disputa em aberto, avance-o em +1."
    ],
    confraria: [
      "Abra ou avance um Fio ligado ao seu lugar dentro da Confraria.",
      "Um Fio de Tensão sobre as regras da Confraria nasce ou avança em +1.",
      "Se existe um Fio sobre sua reputação entre os Quebradores, este gancho o empurra.",
      "Considere um novo Fio: até onde vai a lealdade da Confraria a você?"
    ],
    pessoal: [
      "Abra um novo Fio ligado a um vínculo pessoal seu, dentro ou fora da Contracena.",
      "Avance em +1 um Fio de Romance ou Ligação já em andamento.",
      "Um Fio sobre algo que você deixou para trás ganha um novo nó aqui.",
      "Se um NPC tem um Fio pendente com você, este é o momento de puxá-lo."
    ],
    cobranca: [
      "Avance em +1 o Fio de Encomenda deste cliente — a cobrança deixou tudo mais urgente.",
      "Se o Fio de Encomenda já está perto de fechar, este é o momento de lembrar disso na mesa.",
      "Abra ou avance um Fio de Tensão ligado à sua reputação como Restaurador.",
      "Pergunte-se: o que acontece se este Fio de Encomenda fechar antes da próxima entrega?"
    ]
  };

  /* --------------------------------------------------------
     Clima sugerido — usa só os quatro Climas de capítulo em
     curso (Vendaval fica reservado ao Entardecer). Cada Clima
     tem algumas variações de justificativa.
     -------------------------------------------------------- */
  const CLIMAS = {
    Brisa: [
      "leve o suficiente para não pesar logo de cara — deixe a cena respirar antes de complicar.",
      "o gancho é real, mas a manhã ainda pode começar tranquila."
    ],
    Ameno: [
      "há um fundo de preocupação, mas nada que peça pressa ainda.",
      "a cena pode seguir o ritmo normal do dia, com uma pontinha de atenção a mais."
    ],
    Neblina: [
      "algo está incerto demais para ser dito com todas as letras — jogue com isso.",
      "as respostas vêm turvas; deixe o jogador desconfiar antes de confirmar."
    ],
    Tempestade: [
      "este gancho pede urgência — algo vai exigir uma escolha ainda hoje.",
      "a tensão já chegou; não há muito espaço para adiar."
    ]
  };

  const CLIMA_POR_CATEGORIA = {
    misterio: ["Neblina", "Ameno", "Brisa"],
    tensao: ["Tempestade", "Neblina"],
    confraria: ["Ameno", "Neblina", "Brisa"],
    pessoal: ["Brisa", "Ameno", "Neblina"],
    cobranca: ["Tempestade", "Neblina", "Ameno"]
  };

  function gerarGanchoCapitulo() {
    const escolha = RDC.pick(GANCHOS);
    const reacao = RDC.pick(REACOES);
    const sementePool = SEMENTES[escolha.categoria] || SEMENTES.misterio;
    const semente = RDC.pick(sementePool);
    const climasPossiveis = CLIMA_POR_CATEGORIA[escolha.categoria] || Object.keys(CLIMAS);
    const clima = RDC.pick(climasPossiveis);
    const climaTexto = RDC.pick(CLIMAS[clima]);

    return {
      gancho: escolha.texto,
      categoria: escolha.categoria,
      reacao: reacao,
      semente: semente,
      clima: clima,
      climaTexto: climaTexto
    };
  }

  function renderGanchoCapitulo(data) {
    return `
      <div class="gen-result">
        <div class="gen-result-title">📌 ${data.gancho}</div>
        <div class="gen-field">
          <span class="gen-field-label">Como a Cidade ou a Confraria Reage</span>
          <p>${data.reacao}</p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Semente de Fio</span>
          <p>${data.semente}</p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Clima Sugerido para a Cena</span>
          <p><strong>${data.clima}</strong> — ${data.climaTexto}</p>
        </div>
      </div>
    `;
  }

  function tituloGanchoCapitulo(data) {
    let resumo = data.gancho.replace(/[.!]+$/, "");
    if (resumo.length > 60) {
      resumo = resumo.slice(0, 57).trim() + "...";
    }
    return resumo;
  }

  RDC.registerGenerator({
    id: "gancho",
    label: "Gancho de Capítulo",
    icon: "📌",
    page: "jornada-avancada.html",
    loadingText: "Afixando aviso no Quadro da Confraria...",
    generate: gerarGanchoCapitulo,
    render: renderGanchoCapitulo,
    title: tituloGanchoCapitulo
  });

})();
