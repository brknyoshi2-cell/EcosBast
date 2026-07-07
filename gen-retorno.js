/* ============================================================
   gen-retorno.js — Retalhos da Contracena
   Gerador: Cena de Retorno de Expedição
   Página canônica: sistema-aventureiros.html
   Depende de: geradores.js (namespace RDC)
   ============================================================ */

(function () {
  // Cada item liga o que se percebe ao Fio que a cena tende a iluminar
  const PERCEBE = [
    { texto: 'Trouxe algo que não deveria ter trazido — e esconde no bolso. Você não pergunta. Ainda.', fio: 'Mistério' },
    { texto: 'Evita olhar nos seus olhos durante toda a conversa. O que aconteceu lá?', fio: 'Tensão' },
    { texto: 'Trouxe um presente para você — mas demora a entregar, como se ainda não tivesse certeza de que devia.', fio: 'Romance' },
    { texto: 'Fala demais sobre os detalhes sem importância. Está cobrindo o que realmente importa.', fio: 'Tensão' },
    { texto: 'Voltou mais silencioso. Cuida de um ferimento que diz que "não é nada" — e talvez não seja, mas o jeito que poupa o braço diz outra coisa.', fio: 'Tensão' },
    { texto: 'Está diferente de um jeito que você não consegue nomear. Mas sente. Algo ficou lá, ou algo veio com ele.', fio: 'Mistério' },
    { texto: 'Chega sorrindo, mas o sorriso não alcança os olhos.', fio: 'Tensão' },
    { texto: 'Traz um objeto sem explicação e o guarda em algum canto da Contracena sem te avisar.', fio: 'Mistério' },
    { texto: 'Pergunta por você antes de contar qualquer coisa da expedição.', fio: 'Romance' },
    { texto: 'Está mais quieto ao lado do outro quebrador que foi com ele — como se algo tivesse mudado entre os dois.', fio: 'Ligação' },
    { texto: 'Chega com o passo mais leve, como quem carrega boas notícias mas quer contar do jeito certo.', fio: 'Romance' },
    { texto: 'Volta e imediatamente busca o outro quebrador da expedição, como se precisassem terminar algo juntos.', fio: 'Ligação' },
    { texto: 'Segura a manga do casaco no lugar exato onde algo o marcou.', fio: 'Tensão' },
    { texto: 'Traz um cheiro estranho grudado na roupa, de um lugar que não soube nomear.', fio: 'Mistério' }
  ];

  // Elemento "Jornada/Aventura" vazando pelo retorno — nunca mostrada, sempre entrevista.
  // Prompt, não fato: cada entrada oferece a chance de afirmar um mundo lá fora,
  // nunca declara ele fechado.
  const VISLUMBRES_JORNADA = [
    { texto: 'Chega com poeira de um lugar que você nunca vai ver grudada nas botas. Se perguntar, ele conta um fragmento — uma estrada, uma cidade fora dos mapas, um horizonte sem nome. Ou não pergunta, e fica só a poeira.', fio: 'Mistério' },
    { texto: 'Traz uma marca no rosto que não estava lá antes. Cicatriz de quê? Ele desconversa. Se quiser, é semente de uma história maior lá fora — abra um Fio de Tensão distante, que nunca precisa fechar. Ou deixe passar.', fio: 'Tensão' },
    { texto: 'Um cheiro impossível impregnou a bagagem: sal de um mar que não deveria estar por perto, fumaça de um incêndio distante, ou incenso de um templo que ele não soube nomear. Escolha um e o mundo lá fora ganha essa cor — ou role de novo e deixe sem resposta.', fio: 'Mistério' },
    { texto: 'Fala o nome de um lugar que você nunca ouviu, como se fosse óbvio que você devesse conhecer. Se perguntar, ele muda de assunto — ou responde com uma comparação vaga, como quem mede o desconhecido pelo que já conhece.', fio: 'Mistério' },
    { texto: 'Carrega um mapa rabiscado à mão, dobrado tantas vezes que já ameaça rasgar nas dobras. Não mostra a você — só guarda. Talvez volte a puxar esse mapa outra hora. Ou talvez o jogue no fogo sem explicação.', fio: 'Tensão' },
    { texto: 'Menciona, quase sem querer, um nome que os outros já contam como se fosse história — de herói, de ameaça, ninguém sabe direito. Se quiser, é gancho para uma Marca [LENDA] ou [GUERREIRO] ganhar peso aqui. Ou deixa passar como boato de estrada.', fio: 'Mistério' },
    { texto: 'Volta com o andar de quem cruzou uma distância enorme — o corpo ainda carrega o ritmo da estrada, como se as pernas não tivessem aprendido ainda que já chegou.', fio: 'Ligação' },
    { texto: 'Um objeto emerge do casaco por acidente — algo de uso claramente estranho, ritual ou distante daqui — e ele o esconde de volta rápido demais para ser natural. Não é combate, é eco: o que aconteceu já passou; só a marca ficou.', fio: 'Tensão' }
  ];

  // Bestiário de Boatos — Método Deixar Vazar, intensidade "médio".
  // Nunca afirma que a criatura existe: cada entrada é um boato de estrada,
  // com forma clássica reconhecível, mas sempre hedged ("dizem", "contam",
  // "juram"). Sorteado à parte, com baixa chance (ver rollBoato), nunca
  // misturado ao pool principal de PERCEBE — é tempero raro, não regra.
  // Prompt, não fato: nomear a forma é sempre escolha do jogador.
  const BESTIARIO_BOATOS = [
    { texto: 'Dizem que asas enormes cobriram a lua por um instante, perto da fronteira leste. Ninguém afirma ter visto o resto — só a sombra, só o tamanho. Se quiser, é a primeira vez que um dragão ganha forma no seu mundo. Ou fica só boato de estrada, sem confirmar nada.', fio: 'Mistério' },
    { texto: 'Contam que alguém enterrado há anos foi visto andando de novo pela estrada velha, devagar, sem pressa de chegar a lugar nenhum. Quem conta troca o nome do morto a cada vez que repete a história.', fio: 'Mistério' },
    { texto: 'Juram que uma teia grossa como corda cobria uma clareira inteira, e nada no tamanho dela combinava com aranha nenhuma que a cidade conhece. Quem viu não quis se aproximar o bastante para confirmar.', fio: 'Tensão' },
    { texto: 'Falam de pegadas fundas demais na lama — um pé que não cabe em bota nenhuma, nem em pata de bicho catalogado. A distância entre uma pegada e outra também não fecha conta com passo de gente.', fio: 'Mistério' },
    { texto: 'Dizem que um dos que passaram por lá trocou de rosto três vezes na mesma noite, e ninguém tem certeza de qual era o verdadeiro — se é que algum era. A história muda um pouco cada vez que alguém repete.', fio: 'Tensão' },
    { texto: 'Contam de um buraco novo na terra, redondo demais para ser natural, e de um cheiro de enxofre que não sai da roupa de quem chegou perto. Ninguém foi fundo o bastante para saber o que cavou.', fio: 'Mistério' },
    { texto: 'Falam de um zumbido que cobriu um vale inteiro por uma tarde inteira — e depois nada. Nem um inseto morto no chão, nem uma folha fora do lugar, como se o vale tivesse prendido a respiração.', fio: 'Mistério' },
    { texto: 'Dizem que uma canção subiu do rio numa noite sem lua, e quem ouviu não quis repetir a melodia — só descrever o que sentiu, e mesmo isso com relutância.', fio: 'Romance' },
    { texto: 'Contam que a escuridão de uma vila vizinha ficou "errada" por uma semana inteira — mais funda, mais fria do que qualquer noite devia ser — antes de voltar ao normal sem explicação nenhuma.', fio: 'Tensão' },
    { texto: 'Falam de uma névoa que andava contra o vento, devagar, como se soubesse exatamente para onde ia. Quem cruzou o caminho dela conta a história baixinho, e evita contar duas vezes na mesma noite.', fio: 'Mistério' }
  ];

  const HORAS = [
    'ao entardecer', 'na virada da noite', 'pouco antes do amanhecer',
    'no meio da tarde', 'à meia-noite', 'logo depois do almoço'
  ];

  const CLIMAS = [
    'sob uma chuva fina', 'num ar seco e quente', 'com um vento frio entrando pela porta',
    'sob um céu claro e indiferente', 'com neblina ainda grudada na roupa dele',
    'num silêncio abafado, sem vento nenhum'
  ];

  const SONS = [
    'o som das botas arrastando no chão de madeira',
    'o sino da porta tocando baixo, como se não quisesse anunciar',
    'passos hesitantes na escada da entrada',
    'o barulho surdo de algo pesado sendo apoiado no chão',
    'quase nenhum som, só a respiração cansada',
    'o rangido familiar da porta da Contracena'
  ];

  const CHEIROS = [
    'cheiro de terra molhada', 'um resquício de fumaça',
    'o cheiro adocicado de ervas estranhas', 'poeira de estrada e suor',
    'um perfume que não é dele', 'cheiro de metal e sangue seco, discreto mas presente'
  ];

  const CONVITES = [
    'O que você nota primeiro, antes mesmo de ele dizer uma palavra?',
    'O que ele guarda para depois — e por quê?',
    'Que pergunta você decide não fazer?',
    'O que fica no ar quando a porta se fecha atrás dele?',
    'Qual gesto seu trai o alívio que você tenta esconder?',
    'O que muda no seu Cômodo favorito com a presença dele agora?',
    'Se ele pudesse dizer uma verdade e nenhuma mentira, qual seria?',
    'O que você faz com as mãos enquanto espera ele terminar de falar?',
    'Que memória de outra chegada essa cena te traz de volta?',
    'O que ele olha antes de olhar para você?'
  ];

  function classificarCondicao(total) {
    if (total >= 10) return { label: 'Inteiro', desc: 'Voltou inteiro — ou quase. A expedição correu bem.' };
    if (total >= 7) return { label: 'Ouro', desc: 'Voltou, mas com peso. Algo ficou para trás.' };
    return { label: 'Cacos', desc: 'Voltou diferente — ou não voltou. A expedição foi mal.' };
  }

  function generateRetorno() {
    const d1 = RDC.roll(6);
    const d2 = RDC.roll(6);
    const total = d1 + d2;
    const condicao = classificarCondicao(total);
    const percebido = RDC.pick(PERCEBE.concat(VISLUMBRES_JORNADA));

    // Bestiário de Boatos: chance baixa (3 em 10), independente da condição
    // de retorno. Raro de propósito — é tempero opcional, não um segundo
    // resultado obrigatório. Ausente na maioria das cenas.
    const boatoRoll = RDC.roll(10);
    const boato = boatoRoll <= 3 ? RDC.pick(BESTIARIO_BOATOS) : null;

    return {
      dados: { d1, d2, total },
      condicao,
      percebe: percebido.texto,
      fioSugerido: percebido.fio,
      detalhe: {
        hora: RDC.pick(HORAS),
        clima: RDC.pick(CLIMAS),
        som: RDC.pick(SONS),
        cheiro: RDC.pick(CHEIROS)
      },
      convite: RDC.pick(CONVITES),
      boato: boato ? { texto: boato.texto, fio: boato.fio } : null
    };
  }

  function renderRetorno(data) {
    const d = data.detalhe;
    const detalheTexto = `Ele chega ${d.hora}, ${d.clima}. Você ouve ${d.som}, e junto com ele entra ${d.cheiro}.`;

    return `
      <div class="gen-result">
        <div class="gen-result-title">🚪 Retorno — ${data.condicao.label}</div>
        <div class="gen-field">
          <span class="gen-field-label">Rolagem</span>
          2d6 = ${data.dados.d1} + ${data.dados.d2} = <strong>${data.dados.total}</strong> → ${data.condicao.label}
        </div>
        <p class="gen-hint">Rolagem sem modificadores. Se o seu quebrador tem Marcas, Cômodos ou vínculos que dão bônus (veja a tabela de Modificadores acima), role você mesmo e ajuste a condição de retorno.</p>
        <div class="gen-field"><span class="gen-field-label">Condição</span> ${data.condicao.desc}</div>
        <div class="gen-field"><span class="gen-field-label">O que você percebe</span> ${data.percebe}</div>
        <div class="gen-field"><span class="gen-field-label">A chegada</span> ${detalheTexto}</div>
        <div class="gen-field"><span class="gen-field-label">Fio que a cena tende a iluminar</span> ${data.fioSugerido}</div>
        <div class="gen-field"><span class="gen-field-label">Convite de escrita</span> <em>${data.convite}</em></div>
        ${data.boato ? `
        <div class="gen-field">
          <span class="gen-field-label">🐾 Boato de Estrada</span> ${data.boato.texto}
        </div>
        <p class="gen-hint">Isto não afirma nada — é boato, e boato erra. Se um artefato desta expedição tiver o Rastro "De Onde Veio" (ver <a href="artefatos.html#rastro-origem">Artefatos</a>), este boato pode ser o mesmo eco vazando por dois lugares.</p>
        ` : ''}
      </div>
    `;
  }

  RDC.registerGenerator({
    id: 'retorno',
    label: 'Retorno',
    icon: '🚪',
    page: 'sistema-aventureiros.html',
    loadingText: 'A porta da Contracena se abre...',
    generate: generateRetorno,
    render: renderRetorno,
    title: (data) => 'Retorno — ' + data.condicao.label
  });
})();
