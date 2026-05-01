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

/* ===== MENU PAGE: STICKY CATEGORY NAV + SCROLL SPY ===== */
const stickyCatNav = document.getElementById('stickyCatNav');
if (stickyCatNav) {
  const sectionIds = ['burgers', 'fries', 'shakes', 'drinks', 'ingredients'];
  const catLinks   = stickyCatNav.querySelectorAll('.cat-item[data-target]');

  const getOffsets = () => {
    const navH = navbar ? navbar.offsetHeight : 70;
    const catH = stickyCatNav.offsetHeight;
    return navH + catH + 24;
  };

  const setActive = (id) => {
    catLinks.forEach(link => {
      const isActive = link.dataset.target === id;
      link.classList.toggle('active', isActive);
    });

    const activeLink = stickyCatNav.querySelector(`.cat-item[data-target="${id}"]`);
    if (activeLink) {
      activeLink.scrollIntoView({ inline: 'nearest', behavior: 'smooth', block: 'nearest' });
    }
  };

  catLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      const offset = getOffsets();
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const scrollSpy = () => {
    const offset = getOffsets();
    let current = sectionIds[0];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= offset + 8) {
        current = id;
      }
    });
    setActive(current);
  };

  window.addEventListener('scroll', scrollSpy, { passive: true });
  scrollSpy();
}

/* ===== HOMEPAGE: CATEGORY STRIP HOVER ACTIVE ===== */
const catStrip = document.querySelector('.category-strip');
if (catStrip && !stickyCatNav) {
  const items = catStrip.querySelectorAll('.cat-item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
  catStrip.addEventListener('mouseleave', () => {
    items.forEach(i => i.classList.remove('active'));
    if (items[0]) items[0].classList.add('active');
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
