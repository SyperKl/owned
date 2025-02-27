<template>
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
            МойМагазин
          </NuxtLink>
          
          <nav class="hidden md:flex space-x-6">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="text-gray-700 hover:text-blue-600 transition"
            >
              {{ item.name }}
            </NuxtLink>
          </nav>
          
          <div class="flex items-center space-x-4">
            <div class="relative group">
              <button class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
                <i class="fas fa-shopping-cart text-xl"></i>
                <span class="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -top-2 -right-2">
                  {{ cartItemCount }}
                </span>
              </button>
              
              <!-- Выпадающая корзина -->
              <div class="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block z-10">
                <div v-if="cart.items.length === 0">
                  <p class="text-gray-500 text-center">Корзина пуста</p>
                </div>
                <div v-else>
                  <div v-for="item in cart.items" :key="item.product.id" class="flex items-center py-2 border-b">
                    <img :src="item.product.imageUrl" :alt="item.product.title" class="w-12 h-12 object-cover rounded" />
                    <div class="ml-2 flex-1">
                      <h4 class="text-sm font-medium">{{ item.product.title }}</h4>
                      <div class="flex justify-between mt-1">
                        <span class="text-gray-500 text-xs">{{ item.quantity }} x {{ formatPrice(item.product.price) }}₽</span>
                        <button @click="removeItem(item.product.id)" class="text-red-500 text-xs">
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 flex justify-between">
                    <span class="font-bold">Итого:</span>
                    <span class="font-bold">{{ formatPrice(cart.totalAmount) }}₽</span>
                  </div>
                  <NuxtLink to="/checkout" class="block mt-4 bg-blue-600 text-white text-center rounded py-2 hover:bg-blue-700 transition">
                    Оформить заказ
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <button class="md:hidden" @click="toggleMenu">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        <!-- Мобильное меню -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 py-2 border-t">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="block py-2 text-gray-700 hover:text-blue-600"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useCartStore } from '~/stores/cart';
  import { storeToRefs } from 'pinia';
  
  const mobileMenuOpen = ref(false);
  const cartStore = useCartStore();
  const { cart } = storeToRefs(cartStore);
  const cartItemCount = computed(() => cartStore.itemCount);
  
  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/catalog' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contacts' },
  ];
  
  const toggleMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };
  
  const removeItem = (productId: number) => {
    cartStore.removeFromCart(productId);
  };
  </script>