// menu.js - Menu de Navegação com Dropdown Hierárquico
document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('nav-container');
  if (!navContainer) return;

  const menuData = [
    {
      label: '🧭 Jornada',
      items: [
        { label: '🚀 Quick Start (15 min)', url: 'quickstart.html' },
        { label: '🌍 Sessão 0 — Criação do Mundo', url: 'sessao0.html' },
        { label: '🌅 Jornada I — Primeiros Dias', url: 'jornada-iniciante.html' },
        { label: '🌿 Jornada II — Aprofundando e o Fim', url: 'jornada-avancada.html' },
        { label: '🌅 Finais', url: 'finais.html' }
      ]
    },
    {
      label: '🎭 Criação',
      items: [
        { label: 'Protagonista', url: 'criacao-protagonista.html' },
        { label: 'NPCs Romanceáveis', url: 'criacao-npcs.html' },
        { label: 'Guilda', url: 'criacao-guilda.html' },
        { label: 'Bastidores', url: 'criacao-bastidores.html' },
        { label: 'Cidade', url: 'criacao-cidade.html' },
        { label: 'Raças', url: 'criacao-racas.html' },
        { label: 'Lenda', url: 'criacao-lenda.html' }
      ]
    },
    {
      label: '⚙️ Sistema',
      items: [
        { label: 'Resolução', url: 'sistema-resolucao.html' },
        { label: 'Atos', url: 'sistema-atos.html' },
        { label: 'Ecos & Recursos', url: 'sistema-ecos-recursos.html' },
        { label: 'Tags', url: 'sistema-tags.html' },
        { label: 'Relógios', url: 'sistema-relogios.html' },
        { label: 'Evento Final', url: 'sistema-evento-final.html' },
        { label: 'Câmara Selada', url: 'sistema-camara.html' },
        { label: 'Escrita', url: 'sistema-escrita-epifania.html' },
        { label: 'Loop', url: 'sistema-loop.html' },
        { label: '⚔️ Aventureiros', url: 'sistema-aventureiros.html' },
        { label: '🎮 Modos de Jogo', url: 'sistema-modos.html' },
        { label: '🪑 Decoração', url: 'sistema-decoracao.html' },
        { label: '🔨 Crafting', url: 'sistema-crafting.html' },
        { label: '🔍 Mistérios', url: 'sistema-misterios.html' },
        { label: '💕 Rotas de Romance', url: 'sistema-rotas-romance.html' },
        { label: '🏛️ Facções', url: 'sistema-faccoes.html' },
        { label: '📊 Estatísticas', url: 'sistema-estatisticas.html' },
        { label: '📈 Feedback', url: 'sistema-feedback.html' },
        { label: '🔍 Explorar Bastidores', url: 'sistema-bastidores-exploracao.html' },
        { label: '📜 Legado', url: 'sistema-legado.html' }
      ]
    },
    {
      label: '🎲 Moves',
      items: [
        { label: 'Ofício', url: 'moves-oficio.html' },
        { label: 'Sociais', url: 'moves-sociais.html' },
        { label: 'Investigação', url: 'moves-investigacao.html' },
        { label: 'Base', url: 'moves-base.html' },
        { label: 'Tensão', url: 'moves-tensao.html' },
        { label: 'Amor', url: 'moves-amor.html' }
      ]
    },
    {
      label: '📈 Progressão',
      items: [
        { label: 'Ofício', url: 'progressao-oficio.html' },
        { label: 'Reputação', url: 'progressao-reputacao.html' },
        { label: 'Oficina', url: 'progressao-oficina.html' },
        { label: 'Relacionamentos', url: 'progressao-relacionamentos.html' },
        { label: 'Economia', url: 'progressao-economia.html' },
        { label: 'Conquistas', url: 'progressao-conquistas.html' },
        { label: 'Consequências', url: 'progressao-consequencias.html' },
        { label: '✨ Sinergias', url: 'sinergias.html' },
        { label: '🌱 Progressão do Mundo', url: 'sistema-progressao-mundo.html' }
      ]
    },
    {
      label: '🛠️ Ferramentas',
      items: [
        { label: 'Gerar NPCs', url: 'geradores-npcs.html' },
        { label: 'Gerar Conteúdo', url: 'geradores-conteudo.html' },
        { label: 'Ficha Protagonista', url: 'ficha-prota.html' },
        { label: 'Ficha NPCs', url: 'ficha-npcs.html' },
        { label: 'Ficha Mundo', url: 'ficha-mundo.html' },
        { label: 'Ficha Rastro', url: 'ficha-rastro.html' }
      ]
    },
    {
      label: '📚 Referências',
      items: [
        { label: 'Referência Rápida', url: 'rapido.html' },
        { label: 'Artefatos', url: 'artefatos.html' },
        { label: 'Lore', url: 'lore.html' },
        { label: '🌍 Conteúdo Expansivo', url: 'conteudo-expansivo.html' },
        { label: '🪶 Prompts de Escrita', url: 'prompts-escrita.html' }
      ]
    }
  ];

  // Links diretos (sem dropdown)
  const directLinks = [
    { label: 'Início', url: 'index.html' },
    { label: 'Quick Start', url: 'quickstart.html' },
    { label: 'Finais', url: 'finais.html' }
  ];

  let html = `
    <div class="top-nav-inner">
      <h1>Ecos dos Bastidores</h1>
      <div class="nav-links">
  `;

  // Links diretos
  directLinks.forEach(link => {
    html += `<a href="${link.url}">${link.label}</a>`;
  });

  // Dropdowns
  menuData.forEach(group => {
    html += `
      <div class="dropdown">
        <button class="dropbtn">${group.label}</button>
        <div class="dropdown-content">
    `;
    group.items.forEach(item => {
      html += `<a href="${item.url}">${item.label}</a>`;
    });
    html += `
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  navContainer.innerHTML = html;

  // ============================================================
  // SUPORTE PARA DROPDOWN EM DISPOSITIVOS TOUCH (MOBILE)
  // ============================================================
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');
    if (!btn) return;
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });
      
      dropdown.classList.toggle('active');
    });
  });
  
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });
});