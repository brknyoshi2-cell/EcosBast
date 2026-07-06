/* ============================================================
   geradores.js — Motor de Geradores do Retalhos da Contracena
   ============================================================
   Namespace único: window.RDC
   Responsabilidades:
   - Utilitários de aleatoriedade (roll, pick, pickN, chance)
   - Registro de geradores (registerGenerator)
   - Binding automático via data-attributes no DOMContentLoaded
   - Spinner com delay artificial
   - Toolbar do resultado (Guardar / Gerar outro)
   - Storage em localStorage (rdc-gerados-v1)
   - Painel de guardados (render, expandir, deletar, limpar)

   Este arquivo não conhece o conteúdo de nenhum gerador específico.
   Cada gen-*.js se registra chamando RDC.registerGenerator({...}).
   ============================================================ */

(function () {
  'use strict';

  const RDC = {};
  window.RDC = RDC;

  const STORAGE_KEY = 'rdc-gerados-v1';

  /* ============================================================
     1. UTILITÁRIOS DE ALEATORIEDADE
     ============================================================ */

  // Rola 1dN — retorna um inteiro entre 1 e n (inclusive)
  RDC.roll = function (n) {
    return Math.floor(Math.random() * n) + 1;
  };

  // Retorna um elemento aleatório do array
  RDC.pick = function (arr) {
    if (!arr || !arr.length) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Retorna n elementos distintos do array, em ordem aleatória
  RDC.pickN = function (arr, n) {
    if (!arr || !arr.length) return [];
    const copia = arr.slice();
    // embaralha (Fisher-Yates)
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, Math.min(n, copia.length));
  };

  // Retorna true com probabilidade p (0..1)
  RDC.chance = function (p) {
    return Math.random() < p;
  };

  /* ============================================================
     2. REGISTRO DE GERADORES
     ============================================================ */

  // Registro interno: id -> definição do gerador
  const registro = Object.create(null);
  // Mantém a ordem de registro (para montar o hub na mesma ordem)
  const ordemRegistro = [];

  RDC.registerGenerator = function (def) {
    if (!def || !def.id) {
      console.error('[RDC] registerGenerator: definição inválida (faltando id).', def);
      return;
    }
    if (!registro[def.id]) {
      ordemRegistro.push(def.id);
    }
    registro[def.id] = Object.assign({
      label: def.id,
      icon: '🎲',
      page: null,
      loadingText: 'Gerando...',
      generate: () => ({}),
      render: () => '',
      title: () => def.label || def.id
    }, def);

    // Se o hub já estiver montado na página, atualiza-o para incluir o novo gerador
    if (hubMontado) {
      montarHub();
    }
  };

  RDC.getGenerator = function (id) {
    return registro[id];
  };

  RDC.listGeneratorIds = function () {
    return ordemRegistro.slice();
  };

  /* ============================================================
     3. STORAGE (localStorage)
     ============================================================ */

  function lerStorage() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (erro) {
      console.error('[RDC] Erro ao ler o localStorage:', erro);
      return [];
    }
  }

  function escreverStorage(lista) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
      return true;
    } catch (erro) {
      console.error('[RDC] Erro ao escrever no localStorage:', erro);
      return false;
    }
  }

  function idUnico() {
    const aleatorio = Math.floor(Math.random() * 9000 + 1000);
    return 'g' + Date.now() + '-' + aleatorio;
  }

  // Salva um item gerado. Retorna o item salvo, ou null em caso de erro.
  RDC.saveItem = function (genId, data, html) {
    try {
      const gen = registro[genId];
      const lista = lerStorage();
      const item = {
        uid: idUnico(),
        genId: genId,
        genLabel: gen ? gen.label : genId,
        genIcon: gen ? gen.icon : '🎲',
        title: gen && typeof gen.title === 'function' ? gen.title(data) : String(genId),
        savedAt: new Date().toISOString(),
        data: data,
        html: html
      };
      lista.push(item);
      const ok = escreverStorage(lista);
      if (!ok) return null;
      atualizarTodosPaineis();
      return item;
    } catch (erro) {
      console.error('[RDC] Erro ao guardar item:', erro);
      return null;
    }
  };

  // Lista itens guardados, do mais recente para o mais antigo.
  // filterIds: string (um id), array de ids, ou undefined/null (sem filtro)
  RDC.listItems = function (filterIds) {
    try {
      let lista = lerStorage();
      if (filterIds) {
        const filtros = Array.isArray(filterIds) ? filterIds : [filterIds];
        lista = lista.filter(item => filtros.includes(item.genId));
      }
      return lista.slice().sort((a, b) => {
        const ta = a.savedAt ? Date.parse(a.savedAt) : 0;
        const tb = b.savedAt ? Date.parse(b.savedAt) : 0;
        return tb - ta;
      });
    } catch (erro) {
      console.error('[RDC] Erro ao listar itens:', erro);
      return [];
    }
  };

  RDC.deleteItem = function (uid) {
    try {
      const lista = lerStorage();
      const nova = lista.filter(item => item.uid !== uid);
      const ok = escreverStorage(nova);
      if (ok) atualizarTodosPaineis();
      return ok;
    } catch (erro) {
      console.error('[RDC] Erro ao deletar item:', erro);
      return false;
    }
  };

  RDC.clearItems = function (filterIds) {
    try {
      if (!filterIds) {
        const ok = escreverStorage([]);
        if (ok) atualizarTodosPaineis();
        return ok;
      }
      const filtros = Array.isArray(filterIds) ? filterIds : [filterIds];
      const lista = lerStorage();
      const nova = lista.filter(item => !filtros.includes(item.genId));
      const ok = escreverStorage(nova);
      if (ok) atualizarTodosPaineis();
      return ok;
    } catch (erro) {
      console.error('[RDC] Erro ao limpar itens:', erro);
      return false;
    }
  };

  /* ============================================================
     4. FORMATAÇÃO DE DATA (dd/mm)
     ============================================================ */

  function formatarDataCurta(iso) {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      return dia + '/' + mes;
    } catch (erro) {
      return '';
    }
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ============================================================
     5. SPINNER E BINDING DE GERAÇÃO (data-generate / data-output)
     ============================================================ */

  function encontrarOutput(botao, genId) {
    // Procura primeiro dentro da .generator-section mais próxima
    const secao = botao.closest('.generator-section, .gen-hub-card');
    if (secao) {
      const local = secao.querySelector('[data-output="' + genId + '"]');
      if (local) return local;
    }
    // Fallback: primeiro [data-output=ID] da página
    return document.querySelector('[data-output="' + genId + '"]');
  }

  function montarSaidaVazia(genId) {
    return '<p class="gen-placeholder">Clique no botão para gerar</p>';
  }

  function renderizarResultado(outputEl, genId, data) {
    const gen = registro[genId];
    if (!gen) {
      outputEl.innerHTML = '<p class="gen-placeholder">Gerador "' + escapeHtml(genId) + '" não encontrado.</p>';
      return;
    }
    let htmlResultado;
    try {
      htmlResultado = gen.render(data);
    } catch (erro) {
      console.error('[RDC] Erro ao renderizar gerador "' + genId + '":', erro);
      htmlResultado = '<p class="gen-placeholder">Não foi possível exibir este resultado.</p>';
    }

    const toolbarHtml =
      '<div class="gen-toolbar">' +
        '<button type="button" class="gen-tool-btn gen-btn-guardar">💾 Guardar</button>' +
        '<button type="button" class="gen-tool-btn gen-btn-outro">🎲 Gerar outro</button>' +
      '</div>';

    outputEl.innerHTML = '<div class="gen-result">' + htmlResultado + '</div>' + toolbarHtml;
    outputEl.dataset.genCurrentId = genId;

    // Guarda os dados brutos no próprio elemento (para o botão Guardar usar depois)
    outputEl.__rdcData = data;
    outputEl.__rdcHtml = htmlResultado;

    // Liga o botão Guardar
    const btnGuardar = outputEl.querySelector('.gen-btn-guardar');
    if (btnGuardar) {
      btnGuardar.addEventListener('click', function () {
        const salvo = RDC.saveItem(genId, outputEl.__rdcData, outputEl.__rdcHtml);
        if (salvo) {
          btnGuardar.textContent = '✓ Guardado';
          btnGuardar.classList.add('saved');
          btnGuardar.disabled = true;
        } else {
          btnGuardar.title = 'Não foi possível guardar — verifique se o navegador permite localStorage.';
        }
      });
    }

    // Liga o botão Gerar outro
    const btnOutro = outputEl.querySelector('.gen-btn-outro');
    if (btnOutro) {
      btnOutro.addEventListener('click', function () {
        executarGeracao(outputEl, genId);
      });
    }
  }

  function executarGeracao(outputEl, genId) {
    const gen = registro[genId];
    if (!gen) {
      outputEl.innerHTML = '<p class="gen-placeholder">Gerador "' + escapeHtml(genId) + '" ainda não está disponível.</p>';
      return;
    }

    // Monta (ou reaproveita) a estrutura do spinner dentro do output
    let spinner = outputEl.querySelector('.gen-spinner-wrap');
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.className = 'gen-spinner-wrap loading-spinner';
      spinner.innerHTML =
        '<div class="spinner"></div>' +
        '<div class="loading-text">' + escapeHtml(gen.loadingText || 'Gerando...') + '</div>';
    }

    // Esconde o conteúdo atual e mostra o spinner
    outputEl.innerHTML = '';
    outputEl.appendChild(spinner);
    spinner.classList.add('active');

    // Desabilita os botões de gerar da mesma seção enquanto processa
    const secao = outputEl.closest('.generator-section, .gen-hub-card') || document;
    const botoes = secao.querySelectorAll('[data-generate="' + genId + '"]');
    botoes.forEach(b => { b.disabled = true; });

    const atraso = 400 + Math.floor(Math.random() * 300); // 400–700ms

    setTimeout(function () {
      let data;
      try {
        data = gen.generate();
      } catch (erro) {
        console.error('[RDC] Erro ao gerar dados para "' + genId + '":', erro);
        outputEl.innerHTML = '<p class="gen-placeholder">Algo deu errado ao gerar. Tente novamente.</p>';
        botoes.forEach(b => { b.disabled = false; });
        return;
      }
      renderizarResultado(outputEl, genId, data);
      botoes.forEach(b => { b.disabled = false; });
    }, atraso);
  }

  function ligarBotoesGerar(escopo) {
    const raiz = escopo || document;
    raiz.querySelectorAll('[data-generate]').forEach(function (botao) {
      if (botao.__rdcBound) return;
      botao.__rdcBound = true;
      botao.addEventListener('click', function () {
        const genId = botao.getAttribute('data-generate');
        const outputEl = encontrarOutput(botao, genId);
        if (!outputEl) {
          console.error('[RDC] Nenhum [data-output="' + genId + '"] encontrado para o botão de gerar.');
          return;
        }
        executarGeracao(outputEl, genId);
      });
    });
  }

  /* ============================================================
     6. PAINEL DE GUARDADOS (data-saved-panel)
     ============================================================ */

  const paineisAtivos = [];

  function lerFiltroDoPainel(painelEl) {
    const raw = painelEl.getAttribute('data-saved-filter');
    if (!raw) return null;
    return raw.split(',').map(s => s.trim()).filter(Boolean);
  }

  function renderizarItemGuardado(item) {
    const dataCurta = formatarDataCurta(item.savedAt);
    return (
      '<details class="gen-saved-item" data-uid="' + escapeHtml(item.uid) + '">' +
        '<summary>' +
          '<span class="gen-saved-icon">' + escapeHtml(item.genIcon || '🎲') + '</span> ' +
          '<span class="gen-saved-title">' + escapeHtml(item.title || 'Sem título') + '</span>' +
          '<span class="gen-saved-meta">' + escapeHtml(item.genLabel || '') + (dataCurta ? ' · ' + dataCurta : '') + '</span>' +
        '</summary>' +
        '<div class="gen-saved-body">' +
          (item.html || '') +
          '<button type="button" class="gen-delete-btn" data-uid="' + escapeHtml(item.uid) + '">🗑️ Deletar</button>' +
        '</div>' +
      '</details>'
    );
  }

  function renderizarPainel(painelEl) {
    const filtro = lerFiltroDoPainel(painelEl);
    const itens = RDC.listItems(filtro);

    let summary = painelEl.querySelector(':scope > summary');
    if (!summary) {
      summary = document.createElement('summary');
      painelEl.insertBefore(summary, painelEl.firstChild);
    }
    summary.textContent = '📜 Guardados (' + itens.length + ')';

    // Corpo do painel (tudo depois do summary)
    let corpo = painelEl.querySelector(':scope > .gen-saved-body-wrap');
    if (!corpo) {
      corpo = document.createElement('div');
      corpo.className = 'gen-saved-body-wrap';
      painelEl.appendChild(corpo);
    }

    const mostrarLimparTudo = painelEl.hasAttribute('data-saved-clear-all');

    if (!itens.length) {
      corpo.innerHTML = '<p class="gen-saved-empty">Nada guardado ainda. Gere algo e clique em 💾 Guardar.</p>';
      return;
    }

    let html = itens.map(renderizarItemGuardado).join('');

    if (mostrarLimparTudo) {
      html += '<button type="button" class="gen-tool-btn gen-clear-all-btn">🗑️ Limpar todos</button>';
    }

    corpo.innerHTML = html;

    // Liga os botões de deletar deste painel
    corpo.querySelectorAll('.gen-delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const uid = btn.getAttribute('data-uid');
        const ok = window.confirm('Deletar este item guardado? Esta ação não pode ser desfeita.');
        if (ok) {
          RDC.deleteItem(uid);
        }
      });
    });

    const btnLimpar = corpo.querySelector('.gen-clear-all-btn');
    if (btnLimpar) {
      btnLimpar.addEventListener('click', function () {
        const ok = window.confirm('Limpar TODOS os itens guardados? Esta ação não pode ser desfeita.');
        if (ok) {
          RDC.clearItems(filtro || undefined);
        }
      });
    }
  }

  function atualizarTodosPaineis() {
    paineisAtivos.forEach(function (painelEl) {
      try {
        renderizarPainel(painelEl);
      } catch (erro) {
        console.error('[RDC] Erro ao atualizar painel de guardados:', erro);
      }
    });
  }

  function ligarPaineis(escopo) {
    const raiz = escopo || document;
    raiz.querySelectorAll('[data-saved-panel]').forEach(function (painelEl) {
      if (painelEl.__rdcBound) return;
      painelEl.__rdcBound = true;
      painelEl.classList.add('gen-saved-panel');
      paineisAtivos.push(painelEl);
      renderizarPainel(painelEl);
    });
  }

  /* ============================================================
     7. HUB (data-generator-hub)
     ============================================================ */

  let hubMontado = false;
  let hubContainerRef = null;

  function montarCardHub(genId) {
    const gen = registro[genId];
    if (!gen) return '';
    const linkPagina = gen.page
      ? '<a class="gen-hub-link" href="' + escapeHtml(gen.page) + '">📖 Regras completas</a>'
      : '';
    return (
      '<div class="gen-hub-card">' +
        '<h3>' + escapeHtml(gen.icon || '🎲') + ' ' + escapeHtml(gen.label || genId) + '</h3>' +
        '<div class="generator-controls">' +
          '<button type="button" class="generator-btn" data-generate="' + escapeHtml(genId) + '">✨ Gerar ' + escapeHtml(gen.label || genId) + '</button>' +
        '</div>' +
        '<div class="generator-output" data-output="' + escapeHtml(genId) + '">' +
          montarSaidaVazia(genId) +
        '</div>' +
        linkPagina +
      '</div>'
    );
  }

  function montarHub() {
    if (!hubContainerRef) return;
    const idsAtuais = ordemRegistro.slice();
    hubContainerRef.innerHTML = idsAtuais.map(montarCardHub).join('');
    ligarBotoesGerar(hubContainerRef);
  }

  function ligarHub() {
    const container = document.querySelector('[data-generator-hub]');
    if (!container) return;
    container.classList.add('gen-hub-grid');
    hubContainerRef = container;
    hubMontado = true;
    montarHub();
  }

  /* ============================================================
     8. INICIALIZAÇÃO
     ============================================================ */

  document.addEventListener('DOMContentLoaded', function () {
    try {
      ligarHub();
      ligarBotoesGerar(document);
      ligarPaineis(document);
    } catch (erro) {
      console.error('[RDC] Erro na inicialização do motor de geradores:', erro);
    }
  });

})();
