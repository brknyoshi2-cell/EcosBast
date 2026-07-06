// dado.js — Motor de Rolagem de Retalhos da Contracena
// -----------------------------------------------------------------------------
// Detecta automaticamente TODA tabela de rolagem do jogo (aquelas cuja primeira
// célula de cabeçalho é uma notação de dado: d6, d10, d20, 1d3, 2d6, ...),
// rola o dado de verdade e destaca a linha correspondente.
//
// Comportamento:
//   • Tabela DENTRO de <details> (colapsável): a cada vez que abre, rola de novo
//     e destaca uma linha (com repetição). Ao fechar, o destaque some.
//   • Tabela sempre visível: ganha um botão "🎲 Rolar" que destaca uma linha
//     e pode ser clicado de novo para re-rolar.
//
// NÃO exige nenhuma alteração no HTML das tabelas: basta a página carregar este
// script. Detecção e mapeamento de linhas são feitos lendo o próprio cabeçalho
// e a primeira coluna de cada linha (valores únicos, faixas "4–6", abertos "4+").
//
// Contrato canônico (ver CONTRATO.md):
//   - Assinatura de tabela de rolagem: primeira <th> casa /^\s*\d*d\d+\s*$/i
//   - Classe da linha sorteada: .dado-resultado
//   - Selo com o número rolado: .dado-badge
//   - Botão de rolagem: .dado-btn
// -----------------------------------------------------------------------------

(function () {
  'use strict';

  // Evita rodar duas vezes se o script for incluído mais de uma vez.
  if (window.__dadoContracena) return;
  window.__dadoContracena = true;

  // --- Parsing da notação de dado no cabeçalho (d6, 1d3, 2d6, d20...) ---------
  function parseDado(texto) {
    if (!texto) return null;
    const m = String(texto).trim().match(/^(\d*)\s*d\s*(\d+)$/i);
    if (!m) return null;
    const quantidade = m[1] ? parseInt(m[1], 10) : 1;
    const faces = parseInt(m[2], 10);
    if (!faces || faces < 2 || quantidade < 1 || quantidade > 10) return null;
    return { quantidade, faces, rotulo: `${quantidade > 1 ? quantidade : ''}d${faces}` };
  }

  function rolar(dado) {
    let soma = 0;
    for (let i = 0; i < dado.quantidade; i++) {
      soma += 1 + Math.floor(Math.random() * dado.faces);
    }
    return soma;
  }

  // --- Parsing da primeira célula de cada linha em uma faixa [min, max] -------
  // Aceita: "4"  |  "4–6" / "4-6"  |  "4+"  |  "6−" (n ou menos)
  function faixaDaLinha(texto) {
    if (!texto) return null;
    const t = texto.trim().replace(/[–—−]/g, '-'); // normaliza travessões/menos
    let m;
    if ((m = t.match(/^(\d+)$/)))            return [+m[1], +m[1]];
    if ((m = t.match(/^(\d+)\s*-\s*(\d+)$/))) return [+m[1], +m[2]];
    if ((m = t.match(/^(\d+)\s*\+$/)))        return [+m[1], Infinity];
    if ((m = t.match(/^(\d+)\s*-$/)))         return [-Infinity, +m[1]];
    return null; // linha sem valor numérico → não é candidata (ex.: "Média")
  }

  // --- Prepara uma tabela: identifica dado e linhas candidatas ----------------
  function prepararTabela(tabela) {
    if (tabela.dataset.dadoPronto === '1') return null;

    const primeiraTh = tabela.querySelector('th');
    if (!primeiraTh) return null;

    const dado = parseDado(primeiraTh.textContent);
    if (!dado) return null; // não é tabela de rolagem — ignora silenciosamente

    // Linhas cuja primeira célula é <td> com valor numérico mapeável.
    const linhas = [];
    Array.from(tabela.rows).forEach((tr) => {
      const c = tr.cells && tr.cells[0];
      if (!c || c.tagName !== 'TD') return;
      const faixa = faixaDaLinha(c.textContent);
      if (faixa) linhas.push({ tr, min: faixa[0], max: faixa[1] });
    });
    if (!linhas.length) return null;

    tabela.dataset.dadoPronto = '1';
    return { tabela, dado, linhas };
  }

  function limparDestaque(ctx) {
    ctx.linhas.forEach(({ tr }) => tr.classList.remove('dado-resultado'));
  }

  function acharLinha(ctx, valor) {
    // Linha cuja faixa contém o valor rolado…
    let alvo = ctx.linhas.find((l) => valor >= l.min && valor <= l.max);
    // …ou, se houver lacuna, a linha de faixa mais próxima.
    if (!alvo) {
      let melhor = Infinity;
      ctx.linhas.forEach((l) => {
        const dist = valor < l.min ? l.min - valor : valor - l.max;
        if (dist < melhor) { melhor = dist; alvo = l; }
      });
    }
    return alvo;
  }

  function atualizarSelo(alvoEl, dado, valor) {
    if (!alvoEl) return;
    let selo = alvoEl.querySelector(':scope > .dado-badge');
    if (!selo) {
      selo = document.createElement('span');
      selo.className = 'dado-badge';
      alvoEl.appendChild(selo);
    }
    selo.textContent = `🎲 ${dado.rotulo} → ${valor}`;
    // reinicia a animação de pulso
    selo.classList.remove('dado-badge--pulse');
    void selo.offsetWidth;
    selo.classList.add('dado-badge--pulse');
  }

  function executarRolagem(ctx, seloEl) {
    limparDestaque(ctx);
    const valor = rolar(ctx.dado);
    const alvo = acharLinha(ctx, valor);
    if (alvo) {
      alvo.tr.classList.add('dado-resultado');
      alvo.tr.classList.remove('dado-resultado--anim');
      void alvo.tr.offsetWidth;
      alvo.tr.classList.add('dado-resultado--anim');
    }
    atualizarSelo(seloEl, ctx.dado, valor);
  }

  // --- Fiação da tabela conforme o contexto (colapsável x visível) ------------
  function fiar(ctx) {
    const { tabela, dado } = ctx;
    const details = tabela.closest('details');

    if (details) {
      // Selo mora no <summary>; abrir = rolar de novo, fechar = limpar.
      const summary = details.querySelector(':scope > summary');
      details.addEventListener('toggle', () => {
        if (details.open) {
          executarRolagem(ctx, summary || null);
        } else {
          limparDestaque(ctx);
          const selo = summary && summary.querySelector(':scope > .dado-badge');
          if (selo) selo.remove();
        }
      });

      // Botão discreto para re-rolar sem fechar.
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dado-btn no-print';
      btn.textContent = '🎲 Rolar de novo';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        executarRolagem(ctx, summary || null);
      });
      tabela.insertAdjacentElement('afterend', btn);

      if (details.open) executarRolagem(ctx, summary || null);
    } else {
      // Tabela sempre visível: botão que rola/re-rola (não rola sozinha).
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dado-btn no-print';
      btn.innerHTML = `🎲 Rolar ${dado.rotulo}`;
      let jaRolou = false;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        executarRolagem(ctx, btn);
        if (!jaRolou) { btn.dataset.rolou = '1'; jaRolou = true; }
      });
      tabela.insertAdjacentElement('beforebegin', btn);
    }
  }

  // --- Inicialização ----------------------------------------------------------
  function init() {
    const tabelas = document.querySelectorAll('table');
    tabelas.forEach((t) => {
      const ctx = prepararTabela(t);
      if (ctx) fiar(ctx);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
