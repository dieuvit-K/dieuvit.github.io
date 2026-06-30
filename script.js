/* =================================================================
   Dieuvit Kibamba Niangui — Portfolio
   Interactions : header sticky, menu mobile, reveal au scroll,
                  active link dans la nav, année footer.
================================================================= */

(function () {
  'use strict';

  /* ---------- 1. Header au scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScrollHeader = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- 2. Menu mobile ---------- */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = nav.querySelectorAll('.nav-link');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) setMenu(false);
    });
  });

  // Fermer le menu si on redimensionne vers desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setMenu(false);
  });

  // Fermer au clic en dehors
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      setMenu(false);
    }
  });

  /* ---------- 3. Reveal au scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // petit décalage en cascade pour les éléments groupés
            entry.target.style.transitionDelay =
              Math.min(i * 60, 240) + 'ms';
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    // Fallback : tout afficher
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- 4. Active link dans la nav ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const linkFor = (id) =>
    document.querySelector('.nav-link[href="#' + id + '"]');

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'));
            const link = linkFor(entry.target.id);
            if (link && !link.classList.contains('nav-cta')) {
              link.classList.add('active');
            }
          }
        });
      },
      { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- 5. Année footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 6. Téléchargement du CV (PDF) ---------- */
  const cvBtn = document.getElementById('downloadCv');
  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      // Lance l'impression : l'utilisateur choisit "Enregistrer en PDF"
      window.print();
    });
  }
})();
