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
    },
    
    // Добавляем новый getter для похожих товаров
    getRelatedProducts: (state) => (productId: number) => {
      const currentProduct = state.products.find(p => p.id === productId);
      if (!currentProduct) return [];
      
      // Получаем товары той же категории, исключая текущий товар
      return state.products.filter(p => 
        p.category === currentProduct.category && p.id !== productId
      ).slice(0, 4); // Ограничиваем до 4 товаров
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
    
    // Можно также добавить метод для загрузки конкретного продукта
    async fetchProductById(id: number) {
      if (this.products.length > 0 && this.products.some(p => p.id === id)) {
        // Если товар уже загружен, не делаем запрос
        return;
      }
      
      const config = useRuntimeConfig();
      this.loading = true;
      this.error = null;
      
      try {
        const { data } = await useFetch<Product>(`${config.public.apiBase}/products/${id}`);
        if (data.value) {
          // Добавляем товар в массив, если его там еще нет
          if (!this.products.some(p => p.id === id)) {
            this.products.push(data.value);
          }
        }
      } catch (err) {
        this.error = 'Ошибка при загрузке товара';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
});