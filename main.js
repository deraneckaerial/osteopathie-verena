/* =============================================
   OSTEOPATHIE VERENA MEIßNER — main.js
   ============================================= */

// ===== NAVBAR: scroll state =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  const bars = navToggle.querySelectorAll('.toggle-bar');
  if (open) {
    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  }
});

// Close nav on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const bars = navToggle.querySelectorAll('.toggle-bar');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  });
});

// ===== INTERSECTION OBSERVER: reveal animations =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.reveal-up, .reveal-right, .fade-in'
).forEach(el => revealObserver.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
      openItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked (if was closed)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('kontaktForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (field.type === 'checkbox') {
        if (!field.checked) { valid = false; field.closest('.form-privacy-row').style.outline = '2px solid #B07D52'; }
        else field.closest('.form-privacy-row').style.outline = '';
      } else {
        if (!field.value.trim()) { valid = false; field.style.borderColor = '#B07D52'; }
        else field.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Show success
    const submitBtn = form.querySelector('.btn-submit');
    const success   = document.getElementById('formSuccess');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';

    // Simulate send (replace with actual backend)
    setTimeout(() => {
      submitBtn.style.display = 'none';
      success.classList.add('visible');
      form.reset();
    }, 1200);
  });
}

// ===== MODALS =====
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBg(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

// Close modal with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
