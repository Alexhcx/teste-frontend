<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router' // Importe o RouterLink
import { getProducts } from '../services/api'

interface Product {
  id: string
  name: string
  image: string
  idCateg: number
}

const products = ref<Product[]>([])
const categoryName = ref('Carregando...')
const isLoading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()

const apiBaseUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  try {
    const categoryId = route.params.id as string
    const nameFromQuery = route.query.name as string

    categoryName.value = nameFromQuery || `Categoria ${categoryId}`

    const response = await getProducts({ idCateg: categoryId })
    products.value = response.data
  } catch (err) {
    console.error('Falha ao buscar produtos:', err)
    error.value = 'Não foi possível carregar os produtos. Tente novamente mais tarde.'
  } finally {
    isLoading.value = false
  }
})

const getImageUrl = (imagePath: string) => {
  if (!imagePath) {
    return '/path/to/placeholder.jpg';
  }
  return `${apiBaseUrl}${imagePath}`;
}

</script>

<template>
  <main class="category-view-container">
    <h1>{{ categoryName }}</h1>

    <div v-if="isLoading" class="loading-state">
      <p>Carregando produtos...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="products.length > 0" class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image">
        <h3 class="product-name">{{ product.name }}</h3>
        <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }" class="details-button">Ver Detalhes
        </RouterLink>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>Nenhum produto encontrado nesta categoria.</p>
    </div>
  </main>
</template>

<style scoped>
.category-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  margin-top: 2rem;
  color: #333;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 250px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-name {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
  flex-grow: 1;
}

.details-button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  text-decoration: none;
  /* Adicione esta linha */
  display: inline-block;
  /* Adicione esta linha */
}

.details-button:hover {
  background-color: #0056b3;
}

.loading-state,
.error-state,
.empty-state {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #555;
}

.error-state {
  color: #dc3545;
}
</style>
