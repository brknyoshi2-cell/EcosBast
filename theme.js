// theme.js — Controle de tema escuro/claro
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Tema Claro';
  }

  themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    if (current === 'dark') {
      document.body.removeAttribute('data-theme');
      themeToggle.textContent = '🌙 Tema Escuro';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️ Tema Claro';
      localStorage.setItem('theme', 'dark');
    }
  });
});