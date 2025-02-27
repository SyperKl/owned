<template>
    <div>
      <section class="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl">
            <h1 class="text-4xl font-bold mb-4">Добро пожаловать в МойМагазин</h1>
            <p class="text-xl mb-8">Лучшие товары по доступным ценам</p>
            <NuxtLink 
              to="/catalog" 
              class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Перейти в каталог
            </NuxtLink>
          </div>
        </div>
      </section>
      
      <section class="py-12 container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-8 text-center">Популярные товары</h2>
        <ProductList />
      </section>
      
      <section class="bg-gray-100 py-12">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-6 text-center">Почему выбирают нас</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <div class="text-5xl text-blue-600 mb-4 mx-auto">
                <i class="fas fa-truck"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p class="text-gray-600">Доставляем заказы в течение 1-3 рабочих дней по всей России</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <div class="text-5xl text-blue-600 mb-4 mx-auto">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p class="text-gray-600">На все товары действует гарантия от производителя</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <div class="text-5xl text-blue-600 mb-4 mx-auto">
                <i class="fas fa-undo"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Возврат без проблем</h3>
              <p class="text-gray-600">14 дней на возврат товара без объяснения причин</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  // Метаданные страницы
  useHead({
    title: 'МойМагазин - Главная страница',
    meta: [
      { name: 'description', content: 'Интернет-магазин качественных товаров с доставкой по всей России' }
    ]
  });
  </script>