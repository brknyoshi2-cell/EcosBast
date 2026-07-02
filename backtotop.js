// backtotop.js — Botão "Voltar ao Topo"
(function() {
  'use strict';

  // Aguarda o DOM carregar completamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
  } else {
    initBackToTop();
  }

  function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) {
      console.warn('⚠️ Botão "Voltar ao Topo" não encontrado');
      return;
    }

    // Função para mostrar/esconder o botão
    function toggleVisibility() {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Evento de scroll
    window.addEventListener('scroll', toggleVisibility);

    // Verifica imediatamente se já está scrollado
    toggleVisibility();

    // Evento de clique
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    console.log('✅ Botão "Voltar ao Topo" inicializado');
  }
})();