/* ============================================================
   gen-quebradores.js — Retalhos da Contracena
   Gerador: Quebrador (cliente da Confraria)
   Página canônica: sistema-aventureiros.html
   Depende de: geradores.js (namespace RDC)
   ============================================================ */

(function () {
  const NOMES = [
    'Bren', 'Sora', 'Ilya', 'Doran', 'Fennis', 'Yara',
    'Petra', 'Coren', 'Malia', 'Ross', 'Ebba', 'Tamsin',
    'Aldric', 'Ninka'
  ];

  const EPITETOS = [
    'o Cansado', 'das Estradas Longas', 'Mão Leve', 'o Silencioso',
    'das Três Quedas', 'Pé de Poeira', 'a Persistente', 'do Rio Sem Nome',
    'Sorte Torta', 'a Sortuda', 'das Botas Furadas', 'o Segundo Fôlego'
  ];

  const ESPECIALIDADES = [
    'guerreiro', 'guerreira errante', 'mago decadente', 'maga de biblioteca',
    'ladino de telhados', 'ladina silenciosa', 'clérigo itinerante',
    'clériga de santuário caído', 'bardo sem plateia', 'barda de tavernas',
    'druida de beira de estrada', 'druida da mata funda'
  ];

  const APARENCIAS = [
    'Uma cicatriz fina cruzando a sobrancelha, contando uma história que ele nunca termina',
    'Botas gastas de um jeito que sugere mais estradas do que anos de vida',
    'Um anel torto no dedo mindinho, provavelmente de mais valor do que ele finge saber',
    'Cabelo sempre despenteado de um jeito que parece proposital',
    'Mãos calejadas demais para a idade',
    'Um remendo colorido na capa, feito às pressas, que destoa do resto da roupa',
    'Olhos de um jeito que parecem sempre calculando distâncias',
    'Um sotaque de terras distantes que ele suaviza quando percebe que você notou',
    'Postura ereta demais, como quem tenta parecer maior do que é',
    'Um talismã pendurado no pescoço que ele toca sem perceber',
    'Sardas espalhadas como um mapa de lugares que ele já visitou',
    'Uma capa remendada tantas vezes que já não se sabe qual era a cor original',
    'Dentes tortos e um sorriso fácil demais para quem acabou de voltar de uma expedição'
  ];

  const JEITOS = [
    'Fala rápido demais quando está nervoso, devagar demais quando está mentindo',
    'Ri de tudo, inclusive do que não tem graça nenhuma',
    'Guarda silêncio como quem guarda moeda — com cuidado e um pouco de avareza',
    'Sempre oferece ajuda antes de pedir, mesmo cansado',
    'Conta as próprias vitórias em voz baixa, como se tivesse vergonha de se orgulhar',
    'Reclama de tudo, mas nunca desiste de nada',
    'Trata cada objeto com um cuidado exagerado, como se tudo fosse frágil',
    'Evita se sentar de costas para a porta',
    'Faz perguntas demais sobre a vida dos outros e poucas sobre a própria',
    'Termina toda frase séria com uma piada, como quem não sabe lidar com o peso das palavras',
    'Anda sempre um passo mais devagar que os outros, sem nunca ficar realmente para trás',
    'Guarda pequenos objetos nos bolsos, como amuletos, sem nunca explicar o porquê'
  ];

  const TRAZ = [
    'Um artefato quebrado que ele insiste em dizer que "ainda dá pra usar"',
    'Uma dívida que não é dele, mas que ele carrega como se fosse',
    'Um mapa rasgado, faltando exatamente a parte que importaria',
    'Um problema de outra cidade que seguiu ele até aqui',
    'Um artefato completo, mas com um Nome Verdadeiro que se recusa a se revelar',
    'Um pedido de ajuda que não é bem dele — é de alguém que ele encontrou pelo caminho',
    'Um item raro, mas com uma história que ele conta pela metade',
    'Um artefato aparentemente inofensivo, com um defeito que só aparece depois',
    'Uma promessa feita a um estranho, que agora precisa ser cumprida',
    'Um artefato que ele jura ter encontrado, mas que claramente veio de algum lugar que não devia',
    'Um objeto sem valor aparente, que ele insiste em restaurar mesmo assim',
    'Notícias de outro Quebrador que não vai voltar'
  ];

  const NAO_CONTA = [
    'Que quase não voltou desta vez',
    'Que gastou o pagamento inteiro antes mesmo de chegar',
    'Que reconheceu alguém na expedição que preferia esquecer',
    'Que fez uma promessa que não sabe se vai conseguir cumprir',
    'Que sente que está sendo seguido, mas não tem certeza',
    'Que perdeu algo que nenhum Recurso substitui',
    'Que já pensou em não voltar para a Confraria de vez',
    'Que tem medo do que aconteceria se contasse a verdade',
    'Que encontrou algo que reconheceu — de um jeito que não devia',
    'Que fez um trato que talvez não devesse ter feito',
    'Que está mais cansado do que qualquer expedição deveria deixar alguém',
    'Que guarda uma dúvida sobre se vale a pena continuar nesta vida'
  ];

  function sortearMarca() {
    const r = Math.random();
    if (r < 0.15) return '[GUERREIRO]';
    if (r < 0.30) return '[SÁBIO]';
    if (r < 0.45) return '[OCULTISTA]';
    return 'nenhuma';
  }

  function generateQuebrador() {
    const temEpiteto = RDC.chance(0.4);
    const nome = RDC.pick(NOMES) + (temEpiteto ? ', ' + RDC.pick(EPITETOS) : '');
    const tipo = RDC.chance(0.7) ? 'Regular' : 'Recorrente';

    return {
      nome,
      tipo,
      especialidade: RDC.pick(ESPECIALIDADES),
      aparencia: RDC.pick(APARENCIAS),
      jeito: RDC.pick(JEITOS),
      traz: RDC.pick(TRAZ),
      naoConta: RDC.pick(NAO_CONTA),
      marca: sortearMarca()
    };
  }

  function renderQuebrador(data) {
    const marcaHtml = data.marca === 'nenhuma'
      ? '<span class="gen-field-value">nenhuma — este quebrador ainda não tem Marca</span>'
      : '<strong>' + data.marca + '</strong>';

    return `
      <div class="gen-result">
        <div class="gen-result-title">⚔️ ${data.nome}</div>
        <div class="gen-field"><span class="gen-field-label">Tipo</span> ${data.tipo}</div>
        <div class="gen-field"><span class="gen-field-label">Especialidade</span> ${data.especialidade}</div>
        <div class="gen-field"><span class="gen-field-label">Aparência</span> ${data.aparencia}</div>
        <div class="gen-field"><span class="gen-field-label">Jeito</span> ${data.jeito}</div>
        <div class="gen-field"><span class="gen-field-label">O que costuma trazer</span> ${data.traz}</div>
        <div class="gen-field"><span class="gen-field-label">Não conta</span> ${data.naoConta}</div>
        <div class="gen-field"><span class="gen-field-label">Marca sugerida</span> ${marcaHtml}</div>
      </div>
    `;
  }

  RDC.registerGenerator({
    id: 'quebrador',
    label: 'Quebrador',
    icon: '⚔️',
    page: 'sistema-aventureiros.html',
    loadingText: 'Um quebrador bate à porta da Confraria...',
    generate: generateQuebrador,
    render: renderQuebrador,
    title: (data) => data.nome
  });

  /* ============================================================
     Gerador: Chegada da Encomenda
     Página canônica: sistema-encomendas.html
     Sorteia, juntas, as três tabelas da seção "1) Chegada":
     Quem Trouxe, Por Que Trouxe, e O Que Ela Quer Junto com o
     Artefato. O jogador nunca envia nem decide quando alguém
     aparece — este gerador cobre só a reação a quem já bateu
     à porta.
     ============================================================ */

  const QUEM_TROUXE = [
    { texto: 'Regular — um cliente comum, sem histórico com você', nos: 4 },
    { texto: 'Recorrente — já esteve aqui antes, e vai voltar', nos: 6 },
    { texto: 'Romanceável — um dos três NPCs romanceáveis', nos: 8 },
    { texto: 'Estranho da cidade — alguém que você nunca viu', nos: 4 },
    { texto: 'Trabalhador da Confraria — chega a mando de outra pessoa', nos: 6 },
    { texto: 'Ninguém — foi deixado. Vá direto para Achado Sem Dono', nos: null, achado: true }
  ];

  const POR_QUE_TROUXE = [
    'Dívida — deve a alguém, e é assim que paga',
    'Medo — de alguém, de algo, ou de si mesma',
    'Luto — o objeto é tudo que restou',
    'Orgulho — precisa provar que ainda dá conta sozinha',
    'Desespero — não há mais ninguém a quem recorrer',
    'Curiosidade — quer saber o que você vai descobrir nele',
    'Chantagem — alguém a forçou a vir até aqui',
    'Amor — o objeto pertence a quem ela ama'
  ];

  const O_QUE_QUER_JUNTO = [
    'Só o objeto de volta — nada além disso',
    'Um segredo guardado, mesmo que nunca perguntado',
    'Uma desculpa — por algo que nem sempre é dela',
    'Que você minta sobre o estado dele',
    'Que você o guarde para sempre, e nunca devolva',
    'Nem ela sabe o que quer — só sabe que precisava vir'
  ];

  function gerarEncomenda() {
    const quemTrouxe = RDC.pick(QUEM_TROUXE);
    const porQueTrouxe = RDC.pick(POR_QUE_TROUXE);
    const oQueQuer = RDC.pick(O_QUE_QUER_JUNTO);

    return {
      quemTrouxe: quemTrouxe.texto,
      tipoFio: quemTrouxe.nos,
      achado: !!quemTrouxe.achado,
      porQueTrouxe,
      oQueQuer
    };
  }

  function renderEncomenda(data) {
    const fioHtml = data.achado
      ? '<span class="gen-field-value">Sem Fio — este artefato vai direto para Achado Sem Dono.</span>'
      : `<strong>${data.tipoFio} nós</strong>`;

    return `
      <div class="gen-result">
        <div class="gen-result-title">📦 Chegada — Quem Bate à Porta</div>
        <div class="gen-field"><span class="gen-field-label">Quem Trouxe</span> ${data.quemTrouxe}</div>
        <div class="gen-field"><span class="gen-field-label">Fio de Encomenda</span> ${fioHtml}</div>
        <div class="gen-field"><span class="gen-field-label">Por Que Trouxe</span> ${data.porQueTrouxe}</div>
        <div class="gen-field"><span class="gen-field-label">O Que Ela Quer Junto com o Artefato</span> ${data.oQueQuer}</div>
      </div>
    `;
  }

  RDC.registerGenerator({
    id: 'encomenda',
    label: 'Chegada da Encomenda',
    icon: '📦',
    page: 'sistema-encomendas.html',
    loadingText: 'Alguém bate à porta da Contracena...',
    generate: gerarEncomenda,
    render: renderEncomenda,
    title: (data) => 'Chegada — ' + data.quemTrouxe.split(' — ')[0]
  });
})();
