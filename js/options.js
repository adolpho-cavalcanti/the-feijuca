// Options selection logic

export function initOptionSelectors(orderManager) {
  // Select all option cards for size and accompaniments
  const optionCards = document.querySelectorAll('.option-card');
  
  // Add click event to each option card
  optionCards.forEach(card => {
    if (!card.classList.contains('toggle-card')) {
      card.addEventListener('click', () => {
        const option = card.dataset.option;
        const value = card.dataset.value;
        
        // Find sibling cards with the same option type
        const siblingCards = document.querySelectorAll(`.option-card[data-option="${option}"]`);
        
        // Remove selected class from all siblings
        siblingCards.forEach(sibling => {
          sibling.classList.remove('selected');
        });
        
        // Add selected class to this card
        card.classList.add('selected');
        
        // Update the order
        orderManager.updateOrder(option, value);
      });
    }
  });
  
  // Handle toggle switches for extras
  const toggleInputs = document.querySelectorAll('input[data-toggle]');
  
  toggleInputs.forEach(input => {
    input.addEventListener('change', () => {
      const option = input.dataset.toggle;
      const value = input.checked;
      
      // Update the order
      orderManager.updateOrder(option, value);
      
      // Update card selected state
      const card = input.closest('.option-card');
      if (value) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  });
  
  // Add hover effect to option cards
  optionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
}