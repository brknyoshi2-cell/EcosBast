// dado-multiplo.js — Rolagem de Múltiplas Colunas Independentes
// -----------------------------------------------------------------------------
// Gerencia tabelas com N listas side-by-side (ex: Forma + Material + Origem),
// cada uma com seu próprio dado, dentro de um único elemento
// marcado com data-tabela-multipla.
//
// Estrutura esperada no HTML:
//
//   <div class="tabela-multipla" data-tabela-multipla>
//     <div data-tabela-multipla-col data-dado="d20" data-label="Forma">
//       <p class="tabela-multipla-col-label">🎲¹ Forma — o objeto físico base</p>
//       <table>
//         <tr><th>#</th><th>Forma</th></tr>
//         <tr><td>1</td><td>Capa</td></tr>
//         ...
//       </table>
//     </div>
//     <div data-tabela-multipla-col data-dado="d20" data-label="Material">
//       <p class="tabela-multipla-col-label">🎲² Material — a feitura e substância</p>
//       <table>
//         <tr><th>#</th><th>Material</th></tr>
//         <tr><td>1</td><td>de Areia Estelar</td></tr>
//         ...
//       </table>
//     </div>
//     <!-- quantas colunas quiser -->
//   </div>
//
// O script injeta um botão "🎲 Rolar Nd20" acima do container.
// Clicar destaca UMA linha em cada coluna (rolagens independentes)
// e exibe o resultado composto abaixo do botão.
//
// Cada coluna recebe uma classe .dado-resultado-col-N (N = índice 0-based),
// com paleta de cores definida no CSS via variáveis CSS canônicas do jogo.
// As classes base (.dado-resultado, .dado-resultado--anim) são compartilhadas
// com dado.js, garantindo consistência visual.
// -----------------------------------------------------------------------------

(function () {
  'use strict';

  if (window.__dadoMultiploContracena) return;
  window.__dadoMultiploContracena = true;

  function rolarD(faces) {
    return 1 + Math.floor(Math.random() * faces);
  }

  function parseFaces(str) {
    const m = String(str || '').trim().match(/^d(\d+)$/i);
    return m ? parseInt(m[1], 10) : 20;
  }

  // Encontra a linha cujo primeiro <td> contém o número exato
  function acharLinhaPorNumero(tabela, numero) {
    for (const tr of tabela.rows) {
      const c = tr.cells[0];
      if (c && c.tagName === 'TD' && parseInt(c.textContent.trim(), 10) === numero) {
        return tr;
      }
    }
    return null;
  }

  function limparDestaques(container, n) {
    const classes = ['dado-resultado', 'dado-resultado--anim'];
    for (let i = 0; i < n; i++) classes.push(`dado-resultado-col-${i}`);
    container.querySelectorAll('.' + classes.join(', .')).forEach(el => {
      el.classList.remove(...classes);
    });
  }

  function destacarLinha(tr, colIndex) {
    if (!tr) return;
    tr.classList.add('dado-resultado', `dado-resultado-col-${colIndex}`);
    tr.classList.remove('dado-resultado--anim');
    void tr.offsetWidth; // força reflow para reiniciar animação
    tr.classList.add('dado-resultado--anim');
  }

  // Constrói o rótulo do botão: "Rolar 2d20" ou "Rolar d20 + d12 + d6" etc.
  function rotuloBtn(colunas) {
    const faces = colunas.map(c => parseFaces(c.dataset.dado));
    // Se todas as faces forem iguais, usa forma compacta: "2d20"
    const todasIguais = faces.every(f => f === faces[0]);
    if (todasIguais) return `🎲 Rolar ${faces.length}d${faces[0]}`;
    return '🎲 Rolar ' + faces.map(f => `d${f}`).join(' + ');
  }

  function iniciarContainer(container) {
    if (container.dataset.multiploIniciado) return;
    container.dataset.multiploIniciado = '1';

    const colunas = Array.from(container.querySelectorAll('[data-tabela-multipla-col]'));
    if (colunas.length < 2) return;

    const ctrl = document.createElement('div');
    ctrl.className = 'tabela-multipla-ctrl no-print';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dado-btn tabela-multipla-btn';
    btn.innerHTML = rotuloBtn(colunas);

    const resultado = document.createElement('div');
    resultado.className = 'tabela-multipla-resultado';
    resultado.setAttribute('aria-live', 'polite');

    ctrl.appendChild(btn);
    ctrl.appendChild(resultado);
    container.insertAdjacentElement('beforebegin', ctrl);

    btn.addEventListener('click', () => {
      limparDestaques(container, colunas.length);

      const rolagens = colunas.map((col, i) => {
        const faces = parseFaces(col.dataset.dado);
        const tabela = col.querySelector('table');
        const num = rolarD(faces);
        const tr = acharLinhaPorNumero(tabela, num);
        destacarLinha(tr, i);
        const texto = tr ? (tr.cells[1]?.textContent.trim() ?? `#${num}`) : `#${num}`;
        return { num, texto, i };
      });

      resultado.innerHTML = rolagens
        .map((r, idx) =>
          (idx > 0 ? '<span class="multiplo-separador">+</span>' : '') +
          `<span class="multiplo-badge multiplo-badge-col-${r.i}">🎲 ${r.num} → <strong>${r.texto}</strong></span>`
        )
        .join('');

      resultado.classList.remove('tabela-multipla-resultado--pulse');
      void resultado.offsetWidth;
      resultado.classList.add('tabela-multipla-resultado--pulse');

      // Scroll suave para a primeira linha destacada em mobile
      const primeiraLinha = container.querySelector('.dado-resultado');
      if (primeiraLinha) primeiraLinha.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function init() {
    document.querySelectorAll('[data-tabela-multipla]').forEach(iniciarContainer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
