// ============================================================
// Ashutosh Salunke — Portfolio Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
      });
    });
  }

  // ---------- Nav background on scroll ----------
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
    });
  }

  // ---------- Scroll Reveal ----------
  // NOTE: styles are applied inline via JS (not relying on a specific CSS
  // class contract) so this can't silently break if style.css changes.
  const revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  function showEl(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.classList.add('is-visible'); // kept too, in case CSS also hooks into it
  }

  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showEl(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // Safety net: if anything is still hidden 1.5s after load (e.g. an
    // element that never intersects, like content below a very tall page),
    // reveal it anyway so nothing stays permanently invisible.
    setTimeout(() => {
      revealEls.forEach(el => {
        if (el.style.opacity !== '1') showEl(el);
      });
    }, 1500);
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealEls.forEach(showEl);
  }

  // ---------- Animated Stat Counters ----------
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  // ---------- Smooth Scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---------- Contact Form (Formspree) ----------
  // 1. Go to https://formspree.io and sign up free with ashutoshsalunke@proton.me
  // 2. Create a new form, it gives you an endpoint like https://formspree.io/f/xxxxxxxx
  // 3. Replace FORMSPREE_ENDPOINT below with that URL
  // 4. Formspree will send a confirmation email the first time — click the link to activate it
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      // Basic guard so the endpoint isn't left unconfigured silently
      if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        formNote.textContent = 'Form isn\'t connected yet — add your Formspree endpoint in script.js.';
        formNote.classList.add('form-note-error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formNote.textContent = '';
      formNote.classList.remove('form-note-error', 'form-note-success');

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formNote.textContent = 'Thanks for reaching out — I\'ll get back to you soon!';
          formNote.classList.add('form-note-success');
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => null);
          const errMsg = data && data.errors
            ? data.errors.map(err => err.message).join(', ')
            : 'Something went wrong. Please try emailing me directly instead.';
          formNote.textContent = errMsg;
          formNote.classList.add('form-note-error');
        }
      } catch (err) {
        formNote.textContent = 'Network error — please try emailing me directly instead.';
        formNote.classList.add('form-note-error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

});
