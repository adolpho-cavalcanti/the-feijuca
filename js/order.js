// Order management logic

export class OrderManager {
  constructor() {
    this.order = {
      tamanho: null,
      couve: null,
      farofa: null,
      vinagrete: false,
      torresmo: false,
      costelinha: false
    };
    
    // Price configuration
    this.prices = {
      tamanho: {
        media: 79.9,
        grande: 129.9
      }
    };
  }
  
  // Update a specific part of the order
  updateOrder(option, value) {
    this.order[option] = value;
    console.log('Order updated:', this.order);
  }
  
  // Get the current order
  getOrder() {
    return { ...this.order };
  }
  
  // Check if a specific step is complete
  isStepComplete(step) {
    switch(step) {
      case 0: // Size selection
        return this.order.tamanho !== null;
      case 1: // Couve selection
        return this.order.couve !== null;
      case 2: // Farofa selection
        return this.order.farofa !== null;
      case 3: // Extras (always complete as they are optional)
        return true;
      default:
        return false;
    }
  }
  
  // Calculate the total price
  calculateTotal() {
    let total = 0;
    
    // Add base price based on size
    if (this.order.tamanho) {
      total += this.prices.tamanho[this.order.tamanho];
    }
    
    return total;
  }
  
  // Format price to Brazilian Real
  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}