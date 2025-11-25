document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile toggle
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('#nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('nav__list--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('nav__list--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FAQ toggle
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      if (!answer) return;
      
      const isOpen = answer.style.display === 'block';
      
      // Close all other FAQ items
      document.querySelectorAll('.faq__answer').forEach(otherAnswer => {
        otherAnswer.style.display = 'none';
      });
      document.querySelectorAll('.faq__question').forEach(otherBtn => {
        otherBtn.classList.remove('active');
      });
      
      // Toggle current item
      if (!isOpen) {
        answer.style.display = 'block';
        btn.classList.add('active');
      }
    });
  });

  // Simple product filters (basic implementation)
  const filtersForm = document.querySelector('#filters-form');
  if (filtersForm) {
    filtersForm.addEventListener('change', () => {
      const formData = new FormData(filtersForm);
      const budget = formData.get('budget');
      const usage = formData.get('usage');
      
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        let show = true;
        
        // Budget filter
        if (budget && budget !== '') {
          const price = card.dataset.price;
          if (price) {
            const priceNum = parseInt(price);
            switch (budget) {
              case '-150':
                show = show && priceNum < 150;
                break;
              case '150-300':
                show = show && priceNum >= 150 && priceNum <= 300;
                break;
              case '+300':
                show = show && priceNum > 300;
                break;
            }
          }
        }
        
        // Usage filter
        if (usage && usage !== '') {
          const cardUsage = card.dataset.usage;
          if (cardUsage) {
            show = show && cardUsage.includes(usage);
          }
        }
        
        card.style.display = show ? 'flex' : 'none';
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading state for Amazon links
  document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
    link.addEventListener('click', function() {
      const btn = this;
      if (btn.classList.contains('btn')) {
        const originalText = btn.textContent;
        btn.textContent = 'Redirection...';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }
    });
  });
});
