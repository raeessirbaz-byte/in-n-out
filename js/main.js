/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== MOBILE MENU TOGGLE ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  const spans = hamburger.querySelectorAll('span');

  const toggleMenu = (open) => {
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';

    spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  };

  hamburger.addEventListener('click', () => {
    toggleMenu(!mobileMenu.classList.contains('open'));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) toggleMenu(false);
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ===== HERO BG ZOOM-IN ON LOAD ===== */
const hero = document.getElementById('hero');
if (hero) {
  requestAnimationFrame(() => {
    setTimeout(() => hero.classList.add('loaded'), 80);
  });
}

/* ===== SCROLL FADE-IN (Intersection Observer) ===== */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -32px 0px'
  });
  fadeEls.forEach(el => observer.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

/* ===== PROMO SLIDER ===== */
const promoSlider = document.getElementById('promoSlider');
if (promoSlider) {
  const slides = promoSlider.querySelectorAll('.promo-slide');
  const dots   = document.querySelectorAll('.slider-dot');
  let current  = 0;
  let timer;

  const goTo = (index) => {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  };

  const autoplay = () => { timer = setInterval(() => goTo(current + 1), 5000); };
  const resetTimer = () => { clearInterval(timer); autoplay(); };

  document.getElementById('sliderNext')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  document.getElementById('sliderPrev')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goTo(+dot.dataset.index); resetTimer(); }));

  autoplay();
}

/* ===== MENU PAGE: FILTER TABS ===== */
const filterTabs = document.querySelectorAll('.filter-tab');
const darkCards  = document.querySelectorAll('.dark-card');

function filterMenu(category) {
  filterTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === category);
  });
  darkCards.forEach(card => {
    card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
  });
}

if (filterTabs.length) {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => filterMenu(tab.dataset.filter));
  });
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 70;
    const top = targetEl.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
