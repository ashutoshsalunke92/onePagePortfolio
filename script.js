// ============ NAV: scroll state + mobile toggle + active link ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Highlight active nav link based on section in view
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(s => navObserver.observe(s));

// ============ SCROLL REVEAL ANIMATIONS ============
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = (Array.from(revealEls).indexOf(el) % 6) * 60;
      setTimeout(() => el.classList.add('in-view'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============ ANIMATED STAT COUNTERS ============
const statNums = document.querySelectorAll('.stat-num');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ============ CURSOR GLOW (desktop only) ============
const glowCursor = document.getElementById('glowCursor');
let glowActive = false;

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    glowCursor.style.opacity = '1';
    glowCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    glowActive = true;
  });
  window.addEventListener('mouseleave', () => {
    glowCursor.style.opacity = '0';
  });
}

// ============ HERO PARALLAX ============
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    if (orb1) orb1.style.transform = `translateY(${y * 0.15}px)`;
    if (orb2) orb2.style.transform = `translateY(${y * -0.1}px)`;
  }
}, { passive: true });

// ============ CONTACT FORM (mailto handoff — static site, no backend) ============
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:ashutoshsalunke@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  formNote.textContent = 'Opening your email client…';
});
