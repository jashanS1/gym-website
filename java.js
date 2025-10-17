// IronPulse Fitness — Shared JS
(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById('nav');
  const burger = document.getElementById('hamburger');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Auto-scroll testimonials slider
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    let scrollPos = 0;
    const tick = () => {
      scrollPos += 1;
      if (scrollPos >= slider.scrollWidth - slider.clientWidth) scrollPos = 0;
      slider.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
    setInterval(tick, 60);
  }

  // BMI Calculator
  const bmiForm = document.getElementById('bmiForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const h = parseFloat(document.getElementById('heightCm').value);
      const w = parseFloat(document.getElementById('weightKg').value);
      if (!h || !w) return;
      const bmi = w / Math.pow(h / 100, 2);
      let status = 'Normal';
      if (bmi < 18.5) status = 'Underweight';
      else if (bmi < 25) status = 'Normal';
      else if (bmi < 30) status = 'Overweight';
      else status = 'Obese';
      document.getElementById('bmiResult').textContent = `BMI: ${bmi.toFixed(1)} · ${status}`;
    });
  }

  // Newsletter fake submit
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      alert(`Thanks for subscribing, ${email}!`);
      newsletterForm.reset();
    });
  }
  
  // Gallery filter
  const filters = document.getElementById('filters');
  const gallery = document.getElementById('galleryGrid');
  if (filters && gallery) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      const filter = btn.getAttribute('data-filter');
      filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gallery.querySelectorAll('.g-item').forEach(item => {
        const show = filter === 'all' || item.classList.contains(filter);
        item.style.display = show ? 'inline-block' : 'none';
      });
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  if (gallery && lightbox && lightboxImg) {
    gallery.addEventListener('click', (e) => {
      const link = e.target.closest('a.g-item');
      if (!link) return;
      e.preventDefault();
      lightboxImg.src = link.href;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  }
  if (lightbox && lightboxClose) {
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Contact form (demo)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactStatus.textContent = 'Thanks! We will get back to you shortly.';
      contactForm.reset();
    });
  }
})();


