<template>
    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else-if="!product" class="text-center py-10">
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Товар не найден</h1>
        <p class="text-gray-500 mb-6">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <NuxtLink to="/catalog" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Вернуться в каталог
        </NuxtLink>
      </div>
      
      <div v-else>
        <!-- Хлебные крошки -->
        <div class="flex items-center mb-6 text-sm">
          <NuxtLink to="/" class="text-gray-500 hover:text-blue-600">Главная</NuxtLink>
          <span class="mx-2 text-gray-500">/</span>
          <NuxtLink to="/catalog" class="text-gray-500 hover:text-blue-600">Каталог</NuxtLink>
          <span class="mx-2 text-gray-500">/</span>
          <span class="text-gray-700">{{ product.title }}</span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Галерея изображений -->
          <div>
            <div class="bg-white rounded-lg shadow overflow-hidden mb-4">
              <img :src="product.imageUrl" :alt="product.title" class="w-full h-auto object-contain" />
            </div>
          </div>
          
          <!-- Информация о товаре -->
          <div>
            <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
            
            <div class="mb-6">
              <span class="text-3xl font-bold text-blue-600">{{ formatPrice(product.price) }} ₽</span>
              <span v-if="product.inStock" class="ml-4 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                В наличии
              </span>
              <span v-else class="ml-4 inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                Нет в наличии
              </span>
            </div>
            
            <div class="mb-6">
              <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
            </div>
            
            <div class="flex items-center space-x-4 mb-6">
              <div class="flex items-center">
                <button 
                  @click="decreaseQuantity" 
                  class="w-10 h-10 border rounded-l flex items-center justify-center hover:bg-gray-100"
                  :disabled="quantity <= 1"
                >
                  -
                </button>
                <input 
                  v-model="quantity" 
                  type="number" 
                  min="1" 
                  class="w-16 h-10 border-t border-b text-center" 
                />
                <button 
                  @click="increaseQuantity" 
                  class="w-10 h-10 border rounded-r flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button 
                @click="addToCart"
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex-1"
                :disabled="!product.inStock"
              >
                {{ product.inStock ? 'Добавить в корзину' : 'Нет в наличии' }}
              </button>
            </div>
            
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold mb-4">Характеристики</h3>
              <ul class="space-y-2">
                <li class="flex">
                  <span class="text-gray-600 w-1/3">Категория:</span>
                  <span class="text-gray-900">{{ product.category }}</span>
                </li>
                <li class="flex">
                  <span class="text-gray-600 w-1/3">Артикул:</span>
                  <span class="text-gray-900">SKU-{{ product.id.toString().padStart(6, '0') }}</span>
                </li>
                <!-- Дополнительные характеристики будут здесь -->
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Рекомендуемые товары -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold mb-6">Похожие товары</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id" 
              :product="relatedProduct" 
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductStore } from '~/stores/products';
  import { useCartStore } from '~/stores/cart';
  import { storeToRefs } from 'pinia';
  </script>