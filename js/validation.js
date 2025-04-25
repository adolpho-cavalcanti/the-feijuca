// Validation logic

export class ValidationManager {
  constructor() {
    this.orderManager = window.orderManager;
  }
  
  // Validate a specific step
  validateStep(stepIndex) {
    // If no order manager is found, use the global one
    if (!this.orderManager) {
      this.orderManager = window.orderManager;
    }
    
    // Validate based on step index
    switch(stepIndex) {
      case 0: // Tamanho selection
        return this.validateSizeSelection();
      case 1: // Couve selection
        return this.validateCouveSelection();
      case 2: // Farofa selection
        return this.validateFarofaSelection();
      case 3: // Extras (always valid since they're optional)
        return true;
      default:
        return true;
    }
  }
  
  // Validate size selection
  validateSizeSelection() {
    return this.orderManager.order.tamanho !== null;
  }
  
  // Validate couve selection
  validateCouveSelection() {
    return this.orderManager.order.couve !== null;
  }
  
  // Validate farofa selection
  validateFarofaSelection() {
    return this.orderManager.order.farofa !== null;
  }
  
  // Show validation error for a specific field
  showValidationError(field) {
    // Find the field element
    const fieldElement = document.querySelector(`[data-option="${field}"]`);
    
    if (fieldElement) {
      // Add error class
      fieldElement.classList.add('error');
      
      // Remove error class after animation
      setTimeout(() => {
        fieldElement.classList.remove('error');
      }, 1500);
    }
  }
}