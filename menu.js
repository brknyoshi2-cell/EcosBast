document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('nav-container');
  if (!navContainer) return;

  /* ============================================================
     ESTRUTURA DO MENU — Navegação por Pilares
     ------------------------------------------------------------
     Cada categoria pode ter uma de três formas:
       • items    → lista plana simples (Os Dias, Referências).
                    O rótulo vira <button> (abre por hover/toque,
                    não navega — não tem página-âncora).
       • anchor + sections → Núcleo. Rótulo vira link para a
                    âncora; o dropdown usa divisores VISUAIS
                    (não-clicáveis) já que o Núcleo não tem Grupos.
       • anchor + groups → um Pilar. Rótulo vira link para a
                    âncora; cada Grupo é ele próprio um link para
                    sua página pilar-X-grupo.html e serve de
                    divisor visual; abaixo dele vêm os conteúdos.

     • core: true  → marca as 6 categorias estruturais do jogo
                    (Núcleo + 5 Pilares), em contraste com "Os Dias"
                    e "Referências". Recebem a classe .dropbtn-core
                    (ver style.css): só um fundo dourado suave atrás
                    do rótulo, sem alterar tamanho/layout do menu.
     • dias: true   → marca "Os Dias" (onboarding), com um fundo
                    mais claro (.dropbtn-dias), mais suave que o
                    dourado do core — mesma lógica, tom diferente.
     ============================================================ */

  const menuData = [
    {
      label: '🌅 Os Dias',
      dias: true,
      items: [
        { label: '☕ Antes do Primeiro Café', url: 'comecar.html' },
        { label: '🌱 O Primeiro Suspiro — O Essencial', url: 'sessao0.html' },
        { label: '🏛️ Vaelstrom — Um Mundo de Exemplo', url: 'quickstart.html' },
        { label: '🌅 Os Primeiros Dias — Caps 1–3', url: 'jornada-iniciante.html' },
        { label: '🌗 Interlúdio: O Mundo Respira', url: 'interludio-mundo-respira.html' },
        { label: '🌿 Aprofundando — Caps 4–8', url: 'jornada-avancada.html' },
        { label: '🌒 Interlúdio: O Eco Chega Mais Perto', url: 'interludio-eco-mais-perto.html' },
        { label: '🌙 Rumo ao Entardecer — Caps 9+', url: 'jornada-final.html' },
        { label: '❦ Epílogo', url: 'finais.html' },
        { label: '⚡ Referência Rápida', url: 'rapido.html' }
      ]
    },
    {
      label: '⚙️ Núcleo',
      anchor: 'nucleo.html',
      core: true,
      sections: [
        {
          divider: 'Motor',
          items: [
            { label: 'Resolução (2d6)', url: 'sistema-resolucao.html' },
            { label: 'Fôlego', url: 'sistema-atos.html' },
            { label: 'Fios', url: 'sistema-relogios.html' },
            { label: 'Marcas', url: 'sistema-tags.html' },
            { label: '🌦️ Climas', url: 'sistema-modos.html' },
            { label: 'A Estação', url: 'sistema-loop.html' },
            { label: '🌾 A Roda do Ano', url: 'sistema-roda-do-ano.html' },
            { label: 'O Entardecer', url: 'sistema-evento-final.html' },
            { label: 'Retalhos & Recursos', url: 'sistema-ecos-recursos.html' }
          ]
        },
        {
          divider: 'Progressão transversal',
          items: [
            { label: 'Trocas', url: 'progressao-economia.html' },
            { label: 'Saberes', url: 'progressao-conquistas.html' },
            { label: 'Rastros', url: 'progressao-consequencias.html' }
          ]
        },
        {
          divider: 'Segredos & Mistério',
          items: [
            { label: '🔒 O Relicário', url: 'sistema-camara.html' },
            { label: '🔍 Mistérios', url: 'sistema-misterios.html' }
          ]
        },
        {
          divider: 'Gestos gerais',
          items: [
            { label: 'Rotina', url: 'moves-base.html' },
            { label: 'Descobertas', url: 'moves-investigacao.html' },
            { label: 'Desafios', url: 'moves-tensao.html' }
          ]
        },
        {
          divider: 'Criação fundacional',
          items: [
            { label: '🪡 Crie Seu Jogador', url: 'criacao-protagonista.html' },
            { label: '🪑 A Contracena', url: 'criacao-bastidores.html' },
            { label: '🌿 Raças e Culturas', url: 'criacao-racas.html' },
            { label: '🧵 O Primeiro Fio', url: 'criacao-lenda.html' }
          ]
        },
        {
          divider: 'Meta & Legado',
          items: [
            { label: '📊 Registros', url: 'sistema-estatisticas.html' },
            { label: '📈 Ressonâncias', url: 'sistema-feedback.html' },
            { label: '⚖️ O Peso', url: 'sistema-peso.html' },
            { label: '📜 O Que Fica', url: 'sistema-legado.html' }
          ]
        },
        {
          divider: 'Fichas & Ferramentas',
          items: [
            { label: 'Ficha do Jogador', url: 'ficha-prota.html' },
            { label: 'Ficha de Rastros', url: 'ficha-rastro.html' },
            { label: '📖 Álbum de Nomes', url: 'ficha-album.html' },
            { label: '🎲 Geradores', url: 'geradores.html' },
            { label: '🖨️ Fichas para Impressão', url: 'fichas-impressao.html' }
          ]
        }
      ]
    },
    {
      label: '📚 Curadoria',
      anchor: 'pilar-curadoria.html',
      core: true,
      groups: [
        {
          label: 'Gestos', url: 'pilar-curadoria-gestos.html',
          items: [
            { label: 'Curadoria', url: 'moves-oficio.html' }
          ]
        },
        {
          label: 'Raízes', url: 'pilar-curadoria-raizes.html',
          items: [
            { label: 'Cômodos & Harmonias', url: 'progressao-oficio.html' },
            { label: 'Encomendas', url: 'sistema-encomendas.html' }
          ]
        },
        { label: 'O Peso', url: 'pilar-curadoria-peso.html', items: [] },
        { label: 'O Que Fica', url: 'pilar-curadoria-legado.html', items: [] },
        {
          label: 'Ferramentas', url: 'pilar-curadoria-ferramentas.html',
          items: [
            { label: 'Artefatos', url: 'artefatos.html' }
          ]
        }
      ]
    },
    {
      label: '🚪 Confraria & Cidade',
      anchor: 'pilar-confraria.html',
      core: true,
      groups: [
        {
          label: 'Gestos', url: 'pilar-confraria-gestos.html',
          items: [
            { label: 'Conversas', url: 'moves-sociais.html' }
          ]
        },
        {
          label: 'Raízes', url: 'pilar-confraria-raizes.html',
          items: [
            { label: 'Vínculos', url: 'progressao-reputacao.html' },
            { label: '🏛️ Círculos', url: 'sistema-faccoes.html' },
            { label: '🌱 A Vida da Cidade', url: 'sistema-progressao-mundo.html' }
          ]
        },
        { label: 'O Peso', url: 'pilar-confraria-peso.html', items: [] },
        { label: 'O Que Fica', url: 'pilar-confraria-legado.html', items: [] },
        {
          label: 'Ferramentas', url: 'pilar-confraria-ferramentas.html',
          items: [
            { label: '🏙️ A Cidade', url: 'criacao-cidade.html' },
            { label: '⚜️ A Confraria', url: 'criacao-guilda.html' },
            { label: '👥 NPCs da Cidade', url: 'criacao-npcs-cidade.html' },
            { label: 'Ficha do Mundo', url: 'ficha-mundo.html' }
          ]
        }
      ]
    },
    {
      label: '🔥 Romance',
      anchor: 'pilar-romance.html',
      core: true,
      groups: [
        {
          label: 'Gestos', url: 'pilar-romance-gestos.html',
          items: [
            { label: 'Corações', url: 'moves-amor.html' }
          ]
        },
        {
          label: 'Raízes', url: 'pilar-romance-raizes.html',
          items: [
            { label: 'Rotas de Romance', url: 'sistema-rotas-romance.html' },
            { label: 'Relacionamentos', url: 'progressao-relacionamentos.html' }
          ]
        },
        { label: 'O Peso', url: 'pilar-romance-peso.html', items: [] },
        { label: 'O Que Fica', url: 'pilar-romance-legado.html', items: [] },
        {
          label: 'Ferramentas', url: 'pilar-romance-ferramentas.html',
          items: [
            { label: '💕 NPCs Romanceáveis', url: 'criacao-npcs.html' },
            { label: 'Ficha de NPCs', url: 'ficha-npcs.html' }
          ]
        }
      ]
    },
    {
      label: '🪟 Quebradores',
      anchor: 'pilar-quebradores.html',
      core: true,
      groups: [
        { label: 'Gestos', url: 'pilar-quebradores-gestos.html', items: [] },
        {
          label: 'Raízes', url: 'pilar-quebradores-raizes.html',
          items: [
            { label: '⚔️ Quebradores', url: 'sistema-aventureiros.html' }
          ]
        },
        { label: 'O Peso', url: 'pilar-quebradores-peso.html', items: [] },
        { label: 'O Que Fica', url: 'pilar-quebradores-legado.html', items: [] },
        {
          label: 'Ferramentas', url: 'pilar-quebradores-ferramentas.html',
          items: [
            { label: 'Ficha de Quebradores', url: 'ficha-quebradores.html' }
          ]
        }
      ]
    },
    {
      label: '🪣 O Ninho',
      anchor: 'pilar-ninho.html',
      core: true,
      groups: [
        {
          label: 'Gestos', url: 'pilar-ninho-gestos.html',
          items: [
            { label: '🔍 Explorar a Contracena', url: 'sistema-bastidores-exploracao.html' }
          ]
        },
        {
          label: 'Raízes', url: 'pilar-ninho-raizes.html',
          items: [
            { label: '🪴 O Ninho', url: 'sistema-decoracao.html' },
            { label: '🔨 Moldagem', url: 'sistema-crafting.html' },
            { label: 'Escrita & Revelação', url: 'sistema-escrita-epifania.html' }
          ]
        },
        { label: 'O Peso', url: 'pilar-ninho-peso.html', items: [] },
        { label: 'O Que Fica', url: 'pilar-ninho-legado.html', items: [] },
        {
          label: 'Ferramentas', url: 'pilar-ninho-ferramentas.html',
          items: [
            { label: '🪶 Convites de Escrita', url: 'prompts-escrita.html' },
            { label: 'Ficha do Ninho', url: 'ficha-ninho.html' }
          ]
        }
      ]
    },
    {
      label: '📖 Referências',
      items: [
        { label: 'Glossário', url: 'glossario.html' },
        { label: 'Atmosfera', url: 'lore.html' },
        { label: '✦ Manifesto', url: 'manifesto.html' },
        { label: '📖 Exemplos de Jogo', url: 'exemplos.html' },
        { label: '🎭 Playtesters', url: 'playtesters.html' },
        { label: '🌍 Conteúdo de Encerramento', url: 'conteudo-expansivo.html' }
      ]
    }
  ];

  const directLinks = [
    { label: 'Início', url: 'index.html' },
    { label: 'Começar', url: 'comecar.html' },
    { label: 'Referência Rápida', url: 'rapido.html' }
  ];

  /* --- Estilos inline mínimos (ver nota na resposta do chat) -----------
     Não há classes de "cabeçalho de grupo" / "subitem" / "divisor" no
     style.css para dropdowns; enquanto elas não existem, usamos estes
     estilos inline, todos baseados nas variáveis do tema já definidas. */
  const S_ANCHOR   = 'font-style:italic;opacity:.9;';
  const S_GROUP    = 'border-top:1px solid var(--accent-light);margin-top:.2rem;padding-top:.4rem;' +
                     'font-variant:small-caps;letter-spacing:.06em;color:var(--gold);font-weight:600;';
  const S_DIVIDER  = 'border-top:1px solid var(--accent-light);margin-top:.2rem;padding:.4rem .8rem .15rem;' +
                     'font-variant:small-caps;letter-spacing:.06em;color:var(--gold);opacity:.7;' +
                     'font-size:.72rem;font-weight:600;cursor:default;';
  const S_SUBITEM  = 'padding-left:1.4rem;';

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function renderDropdownInner(group) {
    let inner = '';

    // Link "Visão geral" para a âncora (garante acesso à página do Pilar/Núcleo,
    // sobretudo em telas de toque, onde o primeiro toque no rótulo apenas abre).
    if (group.anchor) {
      const alvo = group.groups ? 'do Pilar' : 'do Núcleo';
      inner += `<a href="${group.anchor}" style="${S_ANCHOR}">→ Visão geral ${alvo}</a>`;
    }

    if (group.sections) {
      // Núcleo: divisores visuais NÃO-clicáveis + itens.
      group.sections.forEach(sec => {
        inner += `<div style="${S_DIVIDER}">${esc(sec.divider)}</div>`;
        sec.items.forEach(it => {
          inner += `<a href="${it.url}">${it.label}</a>`;
        });
      });
    } else if (group.groups) {
      // Pilar: cada Grupo é um link (para pilar-X-grupo.html) e faz de divisor;
      // os conteúdos aparecem indentados abaixo dele.
      group.groups.forEach(g => {
        inner += `<a href="${g.url}" style="${S_GROUP}">${esc(g.label)}</a>`;
        (g.items || []).forEach(it => {
          inner += `<a href="${it.url}" style="${S_SUBITEM}">${it.label}</a>`;
        });
      });
    } else {
      // Lista plana.
      group.items.forEach(it => {
        inner += `<a href="${it.url}">${it.label}</a>`;
      });
    }

    return inner;
  }

  let html = `
    <div class="top-nav-inner">
      <h1>Retalhos da Contracena</h1>
      <div class="nav-links">
  `;

  directLinks.forEach(link => {
    html += `<a href="${link.url}">${link.label}</a>`;
  });

  menuData.forEach(group => {
    // Rótulo: <a> quando há âncora (clique navega); <button> quando não há.
    let dropbtnClass = 'dropbtn';
    if (group.core) dropbtnClass += ' dropbtn-core';
    if (group.dias) dropbtnClass += ' dropbtn-dias';
    const rotulo = group.anchor
      ? `<a class="${dropbtnClass}" href="${group.anchor}">${group.label}</a>`
      : `<button class="${dropbtnClass}">${group.label}</button>`;

    html += `
      <div class="dropdown">
        ${rotulo}
        <div class="dropdown-content">
          ${renderDropdownInner(group)}
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  navContainer.innerHTML = html;

  /* ============================================================
     INDICADOR "TEM MAIS PRA BAIXO" (setinha de scroll)
     ------------------------------------------------------------
     Dropdowns longos (ex.: Núcleo) rolam dentro de si mesmos
     (ver .dropdown-content no style.css). Sem indicação visual,
     não dá pra saber que existe mais conteúdo abaixo da área
     visível. Aqui a gente injeta uma setinha (▼) fixa no rodapé
     de cada dropdown-content e liga/desliga sua visibilidade
     comparando scrollHeight com a posição atual do scroll.
     A setinha some sozinha ao chegar no fim da lista. ============ */
  const scrollHints = [];

  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const content = dropdown.querySelector('.dropdown-content');
    if (!content) return;

    const hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.textContent = '▼';
    hint.setAttribute('aria-hidden', 'true');
    content.appendChild(hint);

    const update = () => {
      const escondido = content.scrollHeight - content.scrollTop - content.clientHeight > 4;
      hint.classList.toggle('visible', escondido);
    };

    // Rola dentro do próprio dropdown → reavalia a cada scroll.
    content.addEventListener('scroll', update, { passive: true });
    // Abre (hover no desktop / toque no mobile) → precisa recalcular,
    // já que scrollHeight/clientHeight só existem com display:block.
    dropdown.addEventListener('mouseenter', () => setTimeout(update, 0));
    dropdown.addEventListener('click', () => setTimeout(update, 0));

    scrollHints.push(update);
  });

  // Reavalia tudo se a janela for redimensionada (o max-height do
  // dropdown depende da viewport — ver style.css, min(75vh, 520px)).
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => scrollHints.forEach(fn => fn()), 120);
  });

  /* ============================================================
     COMPORTAMENTO: "clique navega + hover abre"
     ------------------------------------------------------------
     • Desktop (hover): a abertura é 100% CSS (.dropdown:hover),
       então o clique no rótulo-link simplesmente navega para a
       âncora — nada a interceptar.
     • Toque (sem hover): o primeiro toque no rótulo-link ABRE o
       dropdown (preventDefault + .active); um segundo toque no
       mesmo rótulo navega. O link "→ Visão geral" no topo do
       dropdown é o caminho garantido para a âncora.
     • Categorias sem âncora (Os Dias, Referências) mantêm o
       <button> e o toggle por clique de antes.
     ============================================================ */
  const noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
  const dropdowns = document.querySelectorAll('.dropdown');

  const closeOthers = (keep) => {
    dropdowns.forEach(d => { if (d !== keep) d.classList.remove('active'); });
  };

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropbtn');
    if (!trigger) return;

    const isAnchorLink = trigger.tagName === 'A';

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();

      if (isAnchorLink) {
        // Rótulo-link (Pilar/Núcleo).
        if (noHover && !dropdown.classList.contains('active')) {
          // Primeiro toque: abre em vez de navegar.
          e.preventDefault();
          closeOthers(dropdown);
          dropdown.classList.add('active');
        }
        // Desktop, ou segundo toque em toque: deixa navegar naturalmente.
        return;
      }

      // Rótulo-botão (Os Dias / Referências): toggle como antes.
      closeOthers(dropdown);
      dropdown.classList.toggle('active');
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });
});
