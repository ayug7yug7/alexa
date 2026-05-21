// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const promoBanner = document.querySelector('.promo-banner');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  if (promoBanner) {
    promoBanner.style.transform = scrolled ? 'translateY(-100%)' : 'translateY(0)';
    promoBanner.style.transition = 'transform 0.4s ease';
  }
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links-left a[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Scroll Reveal Animation =====
function reveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}

document.querySelectorAll(
  '.product-card, .testimonial-card, .feature-list li, .comfort-icon, .footer-links'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.powerful-text, .comfort-headphone').forEach(el => {
  el.classList.add('reveal-left');
});

document.querySelectorAll('.powerful-product, .comfort-text').forEach(el => {
  el.classList.add('reveal-right');
});

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===== Hero Headphone Parallax on Mouse Move =====
const heroHeadphone = document.getElementById('heroHeadphone');

if (heroHeadphone) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroHeadphone.style.transform = `
      translateY(${Math.sin(Date.now() / 1000) * 15}px)
      rotateY(${x}deg)
      rotateX(${-y}deg)
    `;
  });
}

// ===== Comfort Section - Headphone Rotate on Scroll =====
const comfortHeadphone = document.getElementById('comfortHeadphone');

if (comfortHeadphone) {
  let comfortAnimFrame;

  function animateComfortHeadphone() {
    const rect = comfortHeadphone.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = 1 - (rect.top / windowHeight);
      const rotation = (progress - 0.5) * 30;
      comfortHeadphone.style.transform = `perspective(800px) rotateY(${rotation}deg)`;
    }
    comfortAnimFrame = requestAnimationFrame(animateComfortHeadphone);
  }

  window.addEventListener('scroll', () => {
    cancelAnimationFrame(comfortAnimFrame);
    comfortAnimFrame = requestAnimationFrame(animateComfortHeadphone);
  });
}

// ===== Earbuds Showcase Hover Effect =====
const earbudsShowcase = document.getElementById('earbudsShowcase');

if (earbudsShowcase) {
  const container = earbudsShowcase.closest('.product-showcase');
  if (container) {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      earbudsShowcase.style.transform = `
        perspective(500px)
        rotateY(${x}deg)
        rotateX(${-y}deg)
        translateY(${Math.sin(Date.now() / 1200) * 8}px)
      `;
    });

    container.addEventListener('mouseleave', () => {
      earbudsShowcase.style.transform = '';
    });
  }
}

// ===== Product Card Tilt Effect =====
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Sound Wave Particles in Hero =====
function createSoundWaves() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div');
    wave.className = 'sound-wave';
    wave.style.left = '50%';
    wave.style.top = '50%';
    wave.style.transform = 'translate(-50%, -50%)';
    wave.style.animationDelay = `${i * 1}s`;
    heroSection.appendChild(wave);
  }
}

createSoundWaves();

// ===== Audio Visualizer Animation in Hero =====
function createAudioVisualizer() {
  const heroSection = document.querySelector('.hero-bg-gradient');
  if (!heroSection) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.15';
  heroSection.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bars = 60;
    const barWidth = canvas.width / bars;
    const time = Date.now() / 1000;

    for (let i = 0; i < bars; i++) {
      const height = Math.abs(Math.sin(time * 2 + i * 0.3)) * 80 +
                     Math.abs(Math.sin(time * 3 + i * 0.5)) * 40;
      const x = i * barWidth;
      const y = canvas.height - height;

      const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
      gradient.addColorStop(0, 'rgba(200, 255, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(200, 255, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, y, barWidth - 4, height);
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

createAudioVisualizer();

// ===== Smooth Counter Animation for Stats =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');
    const originalText = btn.textContent;

    btn.textContent = 'Subscribing...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Subscribed!';
      btn.style.background = '#27ae60';
      input.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
    }, 1000);
  });
}

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== Parallax Background Layers =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroGradient = document.querySelector('.hero-bg-gradient');
  if (heroGradient) {
    heroGradient.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});

// ===== Intersection Observer for Performance =====
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
