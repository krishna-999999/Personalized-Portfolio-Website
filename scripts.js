document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate position considering fixed navbar height
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update active class immediately on click for responsiveness
        // (Scroll listener will also handle this, but click provides instant feedback)
        navLinks.forEach(nav => {
          nav.classList.remove('active');
          nav.removeAttribute('aria-current');
        });
        this.classList.add('active');
        this.setAttribute('aria-current', 'page');
      }
    });
  });

  // Active navigation link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.querySelector('.navbar');
  let navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Recalculate navbar height on resize
  window.addEventListener('resize', () => {
    navbarHeight = navbar ? navbar.offsetHeight : 0;
  });

  function activateNavLink() {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 20; // Add a small offset
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  window.addEventListener('scroll', activateNavLink);
  activateNavLink(); // Initial check

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real application, you would send this data to a server.
      // For this example, we'll just show a success message.
      formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      formMessage.style.color = 'green';
      contactForm.reset(); // Clear the form
    });
  }
});