/**
 * Integrity Law Associates - Core Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Sticky & Scroll Effect
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Consultation Modal
  const modal = document.getElementById('consultationModal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const modalTriggers = document.querySelectorAll('.open-modal-btn, [data-modal-open]');

  function openModal(defaultPracticeArea) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (defaultPracticeArea) {
      const select = modal.querySelector('select[name="practiceArea"]');
      if (select) select.value = defaultPracticeArea;
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const area = btn.getAttribute('data-area');
      openModal(area);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // 4. Consultation Form Submit Handler
  const consultForm = document.getElementById('consultationForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(consultForm);
      const name = formData.get('fullName') || 'Client';
      const phone = formData.get('phone') || '';
      const area = formData.get('practiceArea') || 'General Legal Consultation';
      const summary = formData.get('summary') || '';

      const whatsappText = `Hello Integrity Law Associates, My name is ${encodeURIComponent(name)}. Phone: ${encodeURIComponent(phone)}. I would like to schedule a consultation regarding: ${encodeURIComponent(area)}. Summary: ${encodeURIComponent(summary)}`;
      const whatsappUrl = `https://wa.me/919087528552?text=${whatsappText}`;

      // Open WhatsApp with prefilled message
      window.open(whatsappUrl, '_blank');
      closeModal();
      consultForm.reset();
    });
  }
});
