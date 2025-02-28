import { defineStore } from 'pinia';
import type { Product } from '~/types/product';
import type { Cart, CartItem } from '~/types/cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      items: [],
      totalAmount: 0
    } as Cart
  }),
  
  getters: {
    itemCount: (state) => {
      return state.cart.items.reduce((total, item) => total + item.quantity, 0);
    }
  },
  
  actions: {
    addToCart(product: Product, quantity: number = 1) {
      const existingItem = this.cart.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.items.push({
          product,
          quantity
        });
      }
      
      this.calculateTotal();
    },
    
    removeFromCart(productId: number) {
      const index = this.cart.items.findIndex(item => item.product.id === productId);
      if (index !== -1) {
        this.cart.items.splice(index, 1);
        this.calculateTotal();
      }
    },
    
    updateQuantity(productId: number, quantity: number) {
      const item = this.cart.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        this.calculateTotal();
      }
    },
    
    clearCart() {
      this.cart.items = [];
      this.cart.totalAmount = 0;
    },
    
    calculateTotal() {
      this.cart.totalAmount = this.cart.items.reduce(
        (total, item) => total + (item.product.price * item.quantity), 
        0
      );
    }
  }
});