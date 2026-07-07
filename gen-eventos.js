/* ============================================================
   RETALHOS DA CONTRACENA — gen-eventos.js
   Geradores: Evento da Cidade (evento-cidade) e Evento de Mistério (evento-misterio)
   Espelham as duas tabelas d10 de sistema-progressao-mundo.html.
   Registrados no motor RDC (geradores.js). Ver guia-geradores.md §5.5.
   ============================================================ */
(function () {

  // ---------------------------------------------------------
  // POOLS — Evento da Cidade (evento-cidade)
  // ---------------------------------------------------------
  const EVENTOS_CIDADE = [
    { evento: 'Novo Trabalhador', efeito: '+1 trabalhador chega à Confraria — talvez alguém que precisava de um recomeço tanto quanto de um emprego.' },
    { evento: 'Nova Família', efeito: '+1 família se muda para a cidade, trazendo um jeito novo de fazer as coisas.' },
    { evento: 'Novo Local', efeito: '+1 local notável surge na cidade — uma porta que ainda ninguém abriu direito.' },
    { evento: 'Novo Quebrador', efeito: '+1 Quebrador regular passa a frequentar a Confraria.' },
    { evento: 'Grupo de Quebradores', efeito: 'Um grupo inteiro de Quebradores chega junto, como quem já decidiu ficar.' },
    { evento: 'Expansão da Confraria', efeito: '+1 Cômodo fica disponível, com custo reduzido — a casa está pedindo para crescer.' },
    { evento: 'Sinal de Tempestade', efeito: 'Algo grande se aproxima — ameaça ou oportunidade, ainda não dá para saber qual.' },
    { evento: 'Festival da Cidade', efeito: 'Um evento especial toma as ruas — boa hora para uma cena de comunidade. (Se você usa A Roda do Ano: 🌱 Brotar é festa de plantio; 🌸 Florescer é festa dos vínculos; 🌾 Colher é festa da fartura; 🍂 Repousar é uma vigília silenciosa. Convite, nunca obrigação.)' },
    { evento: 'Comerciante Viajante', efeito: 'Itens raros ficam disponíveis só neste capítulo — o carrinho não fica muito tempo.' },
    { evento: 'Lenda Nascente', efeito: '+1 Vínculo com a Confraria e com a Cidade — uma história sobre você começa a circular.' },
    { evento: 'Reforma na Praça', efeito: 'A praça central ganha um banco, uma fonte ou um canteiro novo. +1 Vínculo com a Cidade.' },
    { evento: 'Carta de Um Antigo Cliente', efeito: 'Notícias de um Quebrador que já passou pela Confraria chegam por carta.' },
    { evento: 'Colheita Farta', efeito: 'A cidade celebra uma colheita generosa. +1 Recurso. (Combina com a volta 🌾 Colher da Roda do Ano, se você a usa.)' },
    { evento: 'Aprendiz Bate à Porta', efeito: 'Alguém pede para aprender o ofício com você — pode virar trabalhador, se você aceitar.' },
    { evento: 'Boato Gentil', efeito: 'Um boato bondoso sobre a Contracena se espalha pela cidade. +1 Retalho.' },
    { evento: 'Reencontro Inesperado', efeito: 'Alguém que você conheceu antes da Confraria reaparece na cidade, mudado.' },
    { evento: 'Notícia de Longe', efeito: 'Um boato chega sobre algo se movendo no horizonte do mundo — guerra? praga? uma migração inteira? Você decide o que se comenta ao jantar. Nada disso cruza a sua porta, por enquanto. (Opcional: você pode abrir um Fio de Tensão à parte só para esse eco distante — não é o Fio de Tensão da Confraria, e nunca precisa fechar.)' },
    { evento: 'Retorno da Guerra', efeito: 'Um grupo volta com um a menos, e ninguém conta como. A cidade acende uma vela. Você escreve o nome — ou deixa o silêncio. (Se fizer sentido, quem voltou carrega a Marca [GUERREIRO]; isso não abre combate jogável, só o eco de algo vivido longe daqui.)' }
  ];

  const SINAIS_CIDADE = [
    'Um cheiro novo entra pela janela entreaberta da oficina.',
    'Vozes desconhecidas passam conversando na rua, mais animadas que o normal.',
    'Alguém bate à porta com um sorriso torto e um assunto que ainda não anuncia.',
    'O sino da entrada soa num horário em que ninguém costuma chegar.',
    'Uma carta chega debaixo da porta, sem que ninguém tenha visto quem a deixou.',
    'O barulho da rua muda de tom — mais movimento, mais vozes, mais vida.',
    'Um vizinho comenta a novidade enquanto você compra pão pela manhã.',
    'Há uma fila diferente na esquina — gente esperando por algo que você ainda não sabe o quê.',
    'Uma placa nova aparece em algum lugar que você passa todo dia.',
    'Alguém deixa um bilhete curto na sua bancada de trabalho.',
    'O gato da vizinhança anda inquieto, rondando perto da sua porta.',
    'Você percebe o assunto correndo de boca em boca antes de alguém te contar de fato.',
    'Um cheiro de comida nova — de uma cozinha que não é a sua — chega pela rua.',
    'A luz muda de jeito diferente na hora em que a novidade chega — mais quente, ou mais fria.',
    'Alguém aparece na Contracena só para contar, sem pedir nada em troca.',
    'Um viajante repete, com medo, um nome que você nunca ouviu. Se quiser, é o nome de uma ameaça a leste. Se não, é só o medo de um estranho passando.'
  ];

  // ---------------------------------------------------------
  // POOLS — Evento de Mistério (evento-misterio)
  // ---------------------------------------------------------
  const EVENTOS_MISTERIO = [
    { evento: 'O Símbolo Desconhecido', efeito: 'Um símbolo aparece na parede da Contracena, sem explicação. Fio de Mistério +1.' },
    { evento: 'O Sussurro na Noite', efeito: 'Algo sussurra seu nome à noite. Ganhe a Marca [MISTÉRIO].' },
    { evento: 'O Objeto Desaparecido', efeito: 'Um artefato simples desaparece do armazém. Uma investigação fica disponível.' },
    { evento: 'A Carta Anônima', efeito: 'Uma carta sem remetente chega, com uma pista sobre um mistério em aberto.' },
    { evento: 'O Estranho Visitante', efeito: 'Um viajante chega com histórias de um lugar estranho. Fio de Mistério +1.' },
    { evento: 'A Porta que Não Existia', efeito: 'Uma porta aparece onde antes não havia nada. Para onde ela leva?' },
    { evento: 'O Sonho Compartilhado', efeito: 'Você e um NPC têm exatamente o mesmo sonho. Fio de Romance +1, Fio de Mistério +1.' },
    { evento: 'O Artefato que Sussurra', efeito: 'Um artefato guardado no armazém começa a sussurrar, sempre à noite.' },
    { evento: 'A Figura na Janela', efeito: 'Alguém — ou algo — foi visto na janela da Contracena, e já não está mais lá.' },
    { evento: 'A Revelação', efeito: 'Um mistério se resolve sozinho — a verdade chega até você por acaso. Fio de Mistério preenchido.' },
    { evento: 'O Relógio que Atrasa', efeito: 'Um relógio da Contracena passa a atrasar sempre na mesma hora, todos os dias.' },
    { evento: 'A Poeira que Não Assenta', efeito: 'Uma poeira dourada paira sobre uma prateleira específica, não importa quanto você limpe.' },
    { evento: 'O Nome Riscado', efeito: 'Você encontra o mesmo nome riscado várias vezes num livro antigo do armazém.' },
    { evento: 'A Chave Sem Fechadura', efeito: 'Uma chave aparece entre seus pertences, e nenhuma porta que você conhece se encaixa nela.' },
    { evento: 'O Reflexo Atrasado', efeito: 'Por um instante, seu reflexo no espelho parece se mover um segundo depois de você.' }
  ];

  const PERGUNTAS_MISTERIO = [
    'O que você faria se descobrisse que o segredo era seu, e não de outra pessoa?',
    'Quem mais sabe disso — e por que nunca contou?',
    'Se você pudesse voltar e não ver o que viu, você voltaria?',
    'O que essa descoberta muda sobre alguém em quem você confiava?',
    'Existe alguém na Confraria que talvez já soubesse disso o tempo todo?',
    'Isso é um aviso, um convite, ou as duas coisas?',
    'O que você perderia se resolvesse esse mistério rápido demais?',
    'Há algo parecido que já aconteceu antes, e que você só está lembrando agora?',
    'Se essa pergunta ficasse sem resposta para sempre, o que mudaria na sua vida?',
    'Quem, na cidade, ficaria feliz em ver isso continuar em segredo?',
    'O que isso tem a ver com o motivo pelo qual você abriu a Contracena?',
    'Existe uma versão gentil dessa história, ou ela só piora quanto mais você olha?',
    'O que você faria diferente se soubesse que alguém está observando?',
    'Isso pertence ao passado da cidade, ou ao seu?',
    'Quem você chamaria primeiro, se decidisse não guardar isso sozinho?'
  ];

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  function renderCidade(data) {
    return `
      <div class="gen-result">
        <div class="gen-result-title">🏘️ ${data.evento}</div>
        <div class="gen-field">
          <span class="gen-field-label">Efeito sugerido</span>
          <p>${data.efeito}</p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Como você percebe, no cotidiano da Contracena</span>
          <p>${data.sinal}</p>
        </div>
        <p class="gen-hint">⚖️ Lembrete: escolha esta tabela <strong>ou</strong> a de Evento de Mistério — nunca as duas no mesmo capítulo.</p>
      </div>
    `;
  }

  function renderMisterio(data) {
    return `
      <div class="gen-result">
        <div class="gen-result-title">🔍 ${data.evento}</div>
        <div class="gen-field">
          <span class="gen-field-label">Efeito sugerido</span>
          <p>${data.efeito}</p>
        </div>
        <div class="gen-field">
          <span class="gen-field-label">Pergunta plantada</span>
          <p>${data.pergunta}</p>
        </div>
        <p class="gen-hint">⚖️ Lembrete: escolha esta tabela <strong>ou</strong> a de Evento da Cidade — nunca as duas no mesmo capítulo.</p>
      </div>
    `;
  }

  // ---------------------------------------------------------
  // REGISTRO
  // ---------------------------------------------------------
  RDC.registerGenerator({
    id: 'evento-cidade',
    label: 'Evento da Cidade',
    icon: '🏘️',
    page: 'sistema-progressao-mundo.html',
    loadingText: 'Sentindo o pulso da cidade...',
    generate: () => {
      const base = RDC.pick(EVENTOS_CIDADE);
      return {
        evento: base.evento,
        efeito: base.efeito,
        sinal: RDC.pick(SINAIS_CIDADE)
      };
    },
    render: renderCidade,
    title: (data) => data.evento
  });

  RDC.registerGenerator({
    id: 'evento-misterio',
    label: 'Evento de Mistério',
    icon: '🔍',
    page: 'sistema-progressao-mundo.html',
    loadingText: 'Ouvindo os sussurros...',
    generate: () => {
      const base = RDC.pick(EVENTOS_MISTERIO);
      return {
        evento: base.evento,
        efeito: base.efeito,
        pergunta: RDC.pick(PERGUNTAS_MISTERIO)
      };
    },
    render: renderMisterio,
    title: (data) => data.evento
  });

})();
