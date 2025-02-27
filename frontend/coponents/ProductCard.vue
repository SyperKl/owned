<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="product.imageUrl" :alt="product.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ product.title }}</h3>
      <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
      <div class="flex justify-between items-center mt-4">
        <span class="text-lg font-bold">{{ formatPrice(product.price) }} ₽</span>
        <button 
          @click="addToCart"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          :disabled="!product.inStock"
        >
          {{ product.inStock ? 'В корзину' : 'Нет в наличии' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/types/product';
import { useCartStore } from '~/stores/cart';

const props = defineProps<{
  product: Product
}>();

const cartStore = useCartStore();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const addToCart = () => {
  cartStore.addToCart(props.product);
  // Можно добавить уведомление о добавлении в корзину
};
</script>

