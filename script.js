document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-in animations ──

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.feature-card, .code-block, .comparison-card, .cta-content, .notice-content, ' +
    '.tech-card, .arch-layer, .api-table-wrapper, .roadmap-item, .faq-item, ' +
    '.install-warning-box, .install-step, .install-requirements, .logo-explain-content, ' +
    '.benchmark-column, .benchmark-disclaimer, .summary-item'
  ).forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ── FAQ Accordion ──

  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // ── Install Warning Modal ──

  const openBtn = document.getElementById('open-install-modal');
  const modal = document.getElementById('install-modal');
  const goBack = document.getElementById('modal-go-back');
  const continueBtn = document.getElementById('modal-continue');
  const installSteps = document.getElementById('install-steps');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) {
    openBtn.addEventListener('click', openModal);
  }

  if (goBack) {
    goBack.addEventListener('click', closeModal);
  }

  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      closeModal();
      installSteps.classList.add('visible');
    });
  }

  // Close modal on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
