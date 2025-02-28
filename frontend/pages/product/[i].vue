<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const { loading } = storeToRefs(productStore);

const productId = computed(() => Number(route.params.i));
const product = computed(() => productStore.getProductById(productId.value));
const quantity = ref(1);

const relatedProducts = computed(() => {
  return productStore.getRelatedProducts(productId.value);
});

// Форматирование цены
const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU');
};

// Методы для управления количеством
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Добавление в корзину
const addToCart = () => {
  if (product.value && product.value.inStock) {
    cartStore.addToCart(product.value, quantity.value);
  }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  productStore.fetchProductById(productId.value);
});
</script>