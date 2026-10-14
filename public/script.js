/**
 * Scentwise - Vanilla JavaScript
 * Mobile Navigation Toggle and Interactive FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open');
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        menuToggle.focus();
      }
    });
  }

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        // Toggle current item
        item.classList.toggle('open', !isOpen);
        question.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  });
});
