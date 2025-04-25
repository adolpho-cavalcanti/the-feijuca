// Import modules
import { initNavigationHandlers } from './navigation.js';
import { initOptionSelectors } from './options.js';
import { OrderManager } from './order.js';
import { ValidationManager } from './validation.js';

// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the order manager
  const orderManager = new OrderManager();
  window.orderManager = orderManager; // Make available globally for debugging
  
  // Initialize the validation manager
  const validationManager = new ValidationManager();
  
  // Initialize option selectors
  initOptionSelectors(orderManager);
  
  // Initialize navigation handlers
  initNavigationHandlers(validationManager, orderManager);
  
  // Initialize success modal
  initSuccessModal();
});

function initSuccessModal() {
  const modal = document.getElementById('success-modal');
  const closeButton = document.getElementById('close-modal');
  const finishOrderButton = document.getElementById('finish-order');
  
  finishOrderButton.addEventListener('click', () => {
    modal.classList.add('active');
  });
  
  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
      window.location.reload();
    }, 300);
  });
}

window.callWhatsapp = function() {
  const order = window.orderManager.getOrder();

  const sizeText = order.tamanho === 'media' ? 'Feijoada Média - R$ 17,90' : 'Feijoada Grande - R$ 19,90';
  const couveText = order.couve === 'crua' ? 'Couve Crua (Incluso)' : 'Couve Refogada (Incluso)';
  const farofaText = order.farofa === 'bacon' ? 'Farofa com Bacon (Incluso)' : 'Farofa Prime de Cebola (Incluso)';

  let extras = '';
  if (order.vinagrete) extras += '- Vinagrete (Incluso)\n';
  if (order.torresmo) extras += '- Torresmo (Incluso)\n';
  if (order.costelinha) extras += '- Costelinha (cortesia)\n';

  const mensagem = 
    `Olá! Gostaria de fazer o seguinte pedido:\n\n` +
    `*${sizeText}*\n` +
    `${couveText}\n` +
    `${farofaText}\n` +
    `${extras ? '\n🍽 *Extras:*\n' + extras : ''}` +
    `\n Total: ${order.tamanho === 'media' ? 'R$ 17,90' : 'R$ 19,90'}\n\n` +
    `Obrigado!`;

  const encodedMessage = encodeURIComponent(mensagem);
  const telefoneRestaurante = '5538991467647'; // Substitua pelo número real
  const url = `https://wa.me/${telefoneRestaurante}?text=${encodedMessage}`;

  window.open(url, '_blank');
}
