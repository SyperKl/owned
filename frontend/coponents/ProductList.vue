<template>
    <div>
      <div v-if="loading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded mb-4">
        {{ error }}
      </div>
      
      <div v-else-if="products.length === 0" class="text-center py-10">
        <p class="text-gray-500">Товары не найдены</p>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useProductStore } from '~/stores/products';
  import { storeToRefs } from 'pinia';
  
  const productStore = useProductStore();
  const { products, loading, error } = storeToRefs(productStore);
  
  // Получаем продукты при монтировании компонента
  onMounted(() => {
    productStore.fetchProducts();
  });
  </script>