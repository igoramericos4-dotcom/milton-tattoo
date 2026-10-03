/* Milton Tattoo Studio — Main JS */

(function () {
  'use strict';

  // >>> Altere para o número do WhatsApp do Milton (código país + número, só dígitos)
  // Exemplo Moçambique: 2588XXXXXXXX
  const WHATSAPP_NUMBER = '258840000000';

  // Year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Header scroll
  const header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Min date = today
  const dataInput = document.getElementById('data');
  if (dataInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dataInput.min = yyyy + '-' + mm + '-' + dd;
  }

  // Booking form → WhatsApp
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = (form.nome.value || '').trim();
      const servico = form.servico.value;
      const data = form.data.value;
      const hora = form.hora.value;
      const ideia = (form.ideia.value || '').trim();

      if (!nome || !servico || !data || !hora || !ideia) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }

      let dataFormatada = data;
      try {
        const d = new Date(data + 'T12:00:00');
        dataFormatada = d.toLocaleDateString('pt-PT', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (_) {}

      let msg = '*Agendamento — Milton Tattoo Studio*%0A%0A';
      msg += '*Nome:* ' + encodeURIComponent(nome) + '%0A';
      msg += '*Serviço:* ' + encodeURIComponent(servico) + '%0A';
      msg += '*Data preferida:* ' + encodeURIComponent(dataFormatada) + '%0A';
      msg += '*Hora preferida:* ' + encodeURIComponent(hora) + '%0A';
      msg += '*Ideia do projecto:*%0A' + encodeURIComponent(ideia) + '%0A';
      msg += '%0A_Pedido enviado pelo site._';

      const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();
