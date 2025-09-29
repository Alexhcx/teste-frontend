<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProductById } from '../services/api'
import { getCategoryNameById } from '../data/categories'

interface Product {
  id: string
  name: string
  image: string
  idCateg: number
}

const product = ref<Product | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const route = useRoute()

const apiBaseUrl = import.meta.env.VITE_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) {
    return 'https://placehold.co/600x400';
  }
  return `${apiBaseUrl}${imagePath}`;
}

onMounted(async () => {
  try {
    const productId = route.params.id as string
    const response = await getProductById(productId)
    product.value = response.data
  } catch (err) {
    console.error('Falha ao buscar o produto:', err)
    error.value = 'Não foi possível carregar o produto. Tente novamente mais tarde.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="product-detail-container">
    <div class="back-button-container">
      <RouterLink to="/" class="back-button">&larr; Voltar para a Home</RouterLink>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Carregando produto...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="product" class="product-layout">
      <div class="product-image-container">
        <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info-container">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-category">Categoria: {{ getCategoryNameById(product.idCateg) }}</p>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>Produto não encontrado.</p>
    </div>
  </main>
</template>

<style scoped>
.product-detail-container {
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
}

.back-button-container {
  margin-bottom: 2rem;
}

.back-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #5a6268;
}

.product-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.product-image-container {
  flex: 1;
  max-width: 50%;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-info-container {
  flex: 1;
  padding: 1rem;
}

.product-name {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.product-category {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #555;
}

.error-state {
  color: #dc3545;
}
</style>
