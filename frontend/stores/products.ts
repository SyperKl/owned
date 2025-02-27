import { defineStore } from 'pinia';
import type { Product } from '~/types/product';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),
  
  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(product => product.id === id);
    },
    
    getProductsByCategory: (state) => (category: string) => {
      return state.products.filter(product => product.category === category);
    }
  },
  
  actions: {
    async fetchProducts() {
      const config = useRuntimeConfig();
      this.loading = true;
      this.error = null;
      
      try {
        const { data } = await useFetch<Product[]>(`${config.public.apiBase}/products`);
        if (data.value) {
          this.products = data.value;
        }
      } catch (err) {
        this.error = 'Ошибка при загрузке товаров';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  }
});