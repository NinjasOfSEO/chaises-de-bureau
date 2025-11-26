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

  // Filtres produits améliorés avec compteur
  function initFilters() {
    const filtersForm = document.getElementById('filters-form');
    if (!filtersForm) return;

    const productCards = document.querySelectorAll('.product-card');
    
    // Créer le compteur de résultats
    const resultsCounter = document.createElement('div');
    resultsCounter.className = 'filters__results';
    resultsCounter.innerHTML = `<span id="results-count">${productCards.length}</span> produits correspondent à vos critères`;
    filtersForm.appendChild(resultsCounter);
    
    // Créer le bouton reset
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'btn btn--ghost btn--small';
    resetButton.textContent = 'Réinitialiser les filtres';
    resetButton.style.display = 'none';
    filtersForm.appendChild(resetButton);
    
    function updateResults() {
      const formData = new FormData(filtersForm);
      const budget = formData.get('budget');
      const usage = formData.get('usage');
      let visibleCount = 0;
      let hasActiveFilters = budget || usage;
      
      productCards.forEach(card => {
        let show = true;
        
        // Filtre budget
        if (budget && card.dataset.price) {
          const price = parseInt(card.dataset.price);
          if (budget === '-150' && price >= 150) show = false;
          if (budget === '150-300' && (price < 150 || price > 300)) show = false;
          if (budget === '+300' && price <= 300) show = false;
        }
        
        // Filtre usage
        if (usage && card.dataset.usage && card.dataset.usage !== usage) {
          show = false;
        }
        
        if (show) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Mettre à jour le compteur
      const countElement = document.getElementById('results-count');
      countElement.textContent = visibleCount;
      
      // Afficher/masquer le bouton reset
      resetButton.style.display = hasActiveFilters ? 'inline-block' : 'none';
    }
    
    // Event listeners
    filtersForm.addEventListener('change', updateResults);
    
    resetButton.addEventListener('click', function() {
      filtersForm.reset();
      updateResults();
    });
  }
  
  // Initialize filters
  initFilters();

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
