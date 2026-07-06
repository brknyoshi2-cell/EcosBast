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
    const percebido = RDC.pick(PERCEBE);

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
      convite: RDC.pick(CONVITES)
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
