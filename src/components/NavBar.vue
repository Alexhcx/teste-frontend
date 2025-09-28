<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="nav-item">Home</RouterLink>
      <RouterLink to="/produtos" class="nav-item">Produtos</RouterLink>
    </div>
    <div>
      <RouterLink to="/login" class="nav-item">Login</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #f8f9fa;
  padding: 1rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.navbar-container {
  display: flex;
  gap: 1rem;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #e9ecef;
}

/* Estilo para o link ativo */
.router-link-exact-active {
  color: #007bff;
  font-weight: bold;
}
</style>
