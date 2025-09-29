<script setup lang="ts">
import { RouterLink } from 'vue-router'

const categories = [
  { id: 1, name: 'Eletrônicos', src: '/images/categories/eletronicos.jpg' },
  { id: 2, name: 'Roupas e Acessorios', src: '/images/categories/roupas.jpg' },
  { id: 3, name: 'Livros', src: '/images/categories/livros.jpg' },
  { id: 4, name: 'Casa e Cozinha', src: '/images/categories/casa-cozinha.jpg' },
]
</script>

<template>
  <main class="home-container">
    <h1>Nossas Categorias</h1>
    <div class="category-grid">
      <RouterLink v-for="category in categories" :key="category.id"
        :to="{ name: 'category', params: { id: category.id }, query: { name: category.name } }" class="category-card">
        <img :src="category.src" :alt="category.name" class="category-image">
        <h3>{{ category.name }}</h3>
        <p>Veja nossos produtos</p>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  /* Adicione esta linha para permitir a quebra */
  justify-content: center;
  /* Troque justify-items por justify-content */
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  width: 300px;
  height: 280px;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.category-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.category-card h3 {
  margin: 0 0 0.5rem 0;
  color: #007bff;
}

.category-card p {
  margin: 0;
  color: #555;
}

@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
