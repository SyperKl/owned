<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Фильтры и категории -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-4 mb-6">
          <h3 class="text-lg font-semibold mb-4">Категории</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <button @click="selectCategory(category.slug)"
                class="text-gray-700 hover:text-blue-600 transition w-full text-left"
                :class="{ 'font-bold text-blue-600': selectedCategory === category.slug }">
                {{ category.name }}
                <span class="text-gray-500 text-sm">({{ category.count }})</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold mb-4">Фильтры</h3>

          <div class="mb-4">
            <h4 class="font-medium mb-2">Цена</h4>
            <div class="flex space-x-4 items-center">
              <input v-model="priceRange.min" type="number" placeholder="От" class="w-full border rounded px-2 py-1" />
              <span>-</span>
              <input v-model="priceRange.max" type="number" placeholder="До" class="w-full border rounded px-2 py-1" />
            </div>
          </div>

          <div class="mb-4">
            <h4 class="font-medium mb-2">Наличие</h4>
            <label class="flex items-center space-x-2">
              <input v-model="showInStock" type="checkbox" class="form-checkbox" />
              <span>Только в наличии</span>
            </label>
          </div>

          <button @click="applyFilters" class="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition">
            Применить
          </button>

          <button @click="resetFilters" class="w-full text-gray-700 mt-2 hover:text-blue-600 transition">
            Сбросить фильтры
          </button>
        </div>
      </div>

      <!-- Список товаров -->
      <div class="lg:col-span-3">
        <div class="mb-6 flex justify-between items-center">
          <div class="text-gray-600">
            Найдено товаров: {{ filteredProducts.length }}
          </div>

          <div class="flex items-center space-x-2">
            <span class="text-gray-600">Сортировать:</span>
            <select v-model="sortOption" class="border rounded px-2 py-1">
              <option value="popular">По популярности</option>
              <option value="priceAsc">Сначала дешевые</option>
              <option value="priceDesc">Сначала дорогие</option>
              <option value="new">Сначала новые</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
        </div>

        <div v-if="filteredProducts.length === 0 && !loading" class="text-center py-10">
          <p class="text-gray-500">Товары не найдены. Попробуйте изменить параметры фильтрации.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProductStore } from '~/stores/products';
import { storeToRefs } from 'pinia';
import type { Product } from '~/types/product';

const productStore = useProductStore();
const { products, loading } = storeToRefs(productStore);

// Состояние для фильтров
const selectedCategory = ref('');
const priceRange = ref({ min: null, max: null });
const showInStock = ref(false);
const sortOption = ref('popular');

// Заглушка для категорий (в реальном проекте нужно получать с сервера)
const categories = ref([
  { id: 1, name: 'Электроника', slug: 'electronics', count: 42 },
  { id: 2, name: 'Одежда', slug: 'clothing', count: 56 },
  { id: 3, name: 'Дом и сад', slug: 'home-garden', count: 38 },
  { id: 4, name: 'Спорт и отдых', slug: 'sports', count: 29 },
  { id: 5, name: 'Красота и здоровье', slug: 'beauty', count: 35 },
]);

// Получаем продукты при монтировании компонента
onMounted(() => {
  productStore.fetchProducts();
});

// Применение фильтров
const applyFilters = () => {
  // Здесь можно добавить логику для отправки запроса на сервер с фильтрами
  // В данном примере фильтрация происходит на клиенте
};

// Сброс фильтров
const resetFilters = () => {
  selectedCategory.value = '';
  priceRange.value = { min: null, max: null };
  showInStock.value = false;
  sortOption.value = 'popular';
};

// Выбор категории
const selectCategory = (slug: string) => {
  selectedCategory.value = slug === selectedCategory.value ? '' : slug;
};

// Отфильтрованные продукты
const filteredProducts = computed(() => {
  let result = [...products.value];

  // Фильтр по категории
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value);
  }

  // Фильтр по цене
  if (priceRange.value.min !== null) {
    const minPrice = priceRange.value.min;
    result = result.filter(product => product.price >= minPrice);
  }

  result = result.filter(product => product.price >= priceRange.value.min!);

  // Фильтр по наличию
  if (showInStock.value) {
    result = result.filter(product => product.inStock);
  }

  return result;
});

// Сортировка продуктов
const displayedProducts = computed(() => {
  const sorted = [...filteredProducts.value];

  switch (sortOption.value) {
    case 'priceAsc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'new':
      // Заглушка, в реальном проекте нужно сортировать по дате добавления
      return sorted.sort((a, b) => b.id - a.id);
    case 'popular':
    default:
      // Заглушка, в реальном проекте нужно сортировать по рейтингу или количеству продаж
      return sorted;
  }
});

// Метаданные страницы
useHead({
  title: 'МойМагазин - Каталог товаров',
  meta: [
    { name: 'description', content: 'Каталог качественных товаров с доставкой по всей России' }
  ]
});
</script>