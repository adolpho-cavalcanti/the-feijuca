// Navigation logic
const steps = document.querySelectorAll('.step-content');
const stepIndicators = document.querySelectorAll('.step-indicator .step');
const stepLines = document.querySelectorAll('.step-indicator .step-line');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');

// Current step tracker
let currentStepIndex = 0;

export function initNavigationHandlers(validationManager, orderManager) {
  // Initialize next button handler
  nextButton.addEventListener('click', () => {
    if (currentStepIndex < steps.length - 1) {
      // Validate current step
      if (!validationManager.validateStep(currentStepIndex)) {
        showValidationError();
        return;
      }
      
      // If we're on the last selection step, prepare the summary
      if (currentStepIndex === 3) {
        renderOrderSummary(orderManager);
      }
      
      // Move to next step
      goToStep(currentStepIndex + 1);
    }
  });
  
  // Initialize back button handler
  backButton.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  });
}

// Function to show a step
function goToStep(stepIndex) {
  // Hide current step
  steps[currentStepIndex].classList.remove('active');
  
  // Update the step indicators
  stepIndicators[currentStepIndex].classList.remove('active');
  stepIndicators[currentStepIndex].classList.add('completed');
  
  // Update step line if not the last step
  if (currentStepIndex < stepIndicators.length - 1) {
    stepLines[currentStepIndex].classList.add('completed');
  }
  
  // Show new step
  currentStepIndex = stepIndex;
  steps[currentStepIndex].classList.add('active');
  stepIndicators[currentStepIndex].classList.add('active');
  
  // Update navigation buttons
  updateNavigationButtons();
  
  // Scroll to top of step
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update navigation button states
function updateNavigationButtons() {
  // Enable/disable back button
  backButton.disabled = currentStepIndex === 0;
  
  // Update next button text if on last selection step
  if (currentStepIndex === 3) {
    nextButton.textContent = 'Ver Resumo';
  } else if (currentStepIndex === 4) { // Summary step
    nextButton.style.display = 'none';
  } else {
    nextButton.textContent = 'Avançar';
    nextButton.style.display = 'block';
  }
}

// Show validation error
function showValidationError() {
  // Add shake animation to the step content
  const currentStep = steps[currentStepIndex];
  currentStep.classList.add('shake');
  
  // Remove shake animation after it completes
  setTimeout(() => {
    currentStep.classList.remove('shake');
  }, 500);
  
  // Show error message
  const stepTitle = currentStep.querySelector('.step-title');
  const originalColor = stepTitle.style.color;
  stepTitle.style.color = '#ff4d4d';
  
  // Reset color after animation
  setTimeout(() => {
    stepTitle.style.color = originalColor;
  }, 1000);
}

// Render order summary
function renderOrderSummary(orderManager) {
  document.getElementById('back-button').style.display = "none";
  document.getElementById('next-button').style.display = "none";

  const orderItems = document.getElementById('order-items');
  const totalPrice = document.getElementById('total-price');
  const order = orderManager.getOrder();
  
  // Clear existing items
  orderItems.innerHTML = '';
  
  // Add size item
  const sizeItem = document.createElement('li');
  const sizeText = order.tamanho === 'media' ? 'Feijoada Média' : 'Feijoada Grande';
  const sizePrice = order.tamanho === 'media' ? 'R$ 17,90' : 'R$ 19,90';
  sizeItem.innerHTML = `<span>${sizeText}</span><span>${sizePrice}</span>`;
  orderItems.appendChild(sizeItem);
  
  // Add couve item
  const couveItem = document.createElement('li');
  const couveText = order.couve === 'crua' ? 'Couve Crua' : 'Couve Refogada';
  couveItem.innerHTML = `<span>${couveText}</span><span>Incluso</span>`;
  orderItems.appendChild(couveItem);
  
  // Add farofa item
  const farofaItem = document.createElement('li');
  const farofaText = order.farofa === 'bacon' ? 'Farofa com Bacon' : 'Farofa Prime de Cebola';
  farofaItem.innerHTML = `<span>${farofaText}</span><span>Incluso</span>`;
  orderItems.appendChild(farofaItem);
  
  // Add extras if selected
  if (order.vinagrete) {
    const vinagreteItem = document.createElement('li');
    vinagreteItem.innerHTML = `<span>Vinagrete</span><span>Incluso</span>`;
    orderItems.appendChild(vinagreteItem);
  }
  
  if (order.torresmo) {
    const torresmoItem = document.createElement('li');
    torresmoItem.innerHTML = `<span>Torresmo</span><span>Incluso</span>`;
    orderItems.appendChild(torresmoItem);
  }

  if (order.costelinha) {
    const costelinhaItem = document.createElement('li');
    costelinhaItem.innerHTML = `<span>Costelinha (cortesia)</span><span>Incluso</span>`;
    orderItems.appendChild(costelinhaItem);
  }
  
  // Set total price
  totalPrice.textContent = order.tamanho === 'media' ? 'R$ 17,90' : 'R$ 19,90';
}
