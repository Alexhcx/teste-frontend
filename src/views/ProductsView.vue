<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api'

interface Product {
  id: string
  name: string
  image: string
  idCateg: number
}

const products = ref<Product[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const showModal = ref(false)
const isEditing = ref(false)
const currentProduct = ref<Partial<Product>>({
  name: '',
  image: '',
  idCateg: 1,
})

const fetchProducts = async () => {
  try {
    isLoading.value = true
    const response = await getProducts()
    products.value = response.data
  } catch (err) {
    console.error('Falha ao buscar produtos:', err)
    error.value =
      'Não foi possível carregar os produtos. Tente novamente mais tarde.'
  } finally {
    isLoading.value = false
  }
}

const handleOpenModal = (product: Product | null = null) => {
  if (product) {
    isEditing.value = true
    currentProduct.value = { ...product }
  } else {
    isEditing.value = false
    currentProduct.value = { name: '', image: '', idCateg: 1 }
  }
  showModal.value = true
}

const handleCloseModal = () => {
  showModal.value = false
}

const handleSaveProduct = async () => {
  try {
    if (isEditing.value) {
      await updateProduct(
        currentProduct.value.id!,
        currentProduct.value as Product
      )
    } else {
      await createProduct(currentProduct.value as Omit<Product, 'id'>)
    }
    await fetchProducts()
    handleCloseModal()
  } catch (err) {
    console.error('Falha ao salvar o produto:', err)
    error.value = 'Não foi possível salvar o produto.'
  }
}

const handleDeleteProduct = async (id: string) => {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    try {
      await deleteProduct(id)
      await fetchProducts()
    } catch (err) {
      console.error('Falha ao deletar o produto:', err)
      error.value = 'Não foi possível deletar o produto.'
    }
  }
}

onMounted(fetchProducts)
</script>

<template>
  <main class="products-view-container">
    <div class="header">
      <h1>Nossos Produtos</h1>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Carregando produtos...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="products.length > 0" class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3 class="product-name">{{ product.name }}</h3>
        <div class="product-actions">
          <button @click="handleOpenModal(product)" class="edit-button">
            Editar
          </button>
          <button @click="handleDeleteProduct(product.id)" class="delete-button">
            Deletar
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>Nenhum produto encontrado.</p>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="handleCloseModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
        <form @submit.prevent="handleSaveProduct" class="product-form">
          <div class="form-group">
            <label for="name">Nome do Produto</label>
            <input type="text" id="name" v-model="currentProduct.name" required />
          </div>
          <div class="form-group">
            <label for="image">URL da Imagem</label>
            <input type="text" id="image" v-model="currentProduct.image" required />
          </div>
          <div class="form-group">
            <label for="idCateg">Categoria</label>
            <select id="idCateg" v-model="currentProduct.idCateg" required>
              <option :value="1">Eletrônicos</option>
              <option :value="2">Roupas e Acessórios</option>
              <option :value="3">Livros</option>
              <option :value="4">Casa e Cozinha</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="handleCloseModal" class="cancel-button">
              Cancelar
            </button>
            <button type="submit" class="save-button">Salvar</button>
          </div>
        </form>
      </div>
    </div>
    <div class='add-container'>
      <button @click="handleOpenModal()" class="add-button">
        Adicionar Produto
      </button>
    </div>
  </main>
</template>

<style scoped>
.products-view-container {
  /* padding: 2rem; */
  margin: 2rem;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.add-button {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #218838;
}

.product-grid {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: auto;
  gap: 1.5rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-width: 20rem;
  height: 15rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.edit-button,
.delete-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 5rem;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.product-form .form-group {
  margin-bottom: 1rem;
}

.product-form label {
  display: block;
  margin-bottom: 0.5rem;
}

.product-form input,
.product-form select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-button,
.save-button {
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

.save-button {
  background-color: #007bff;
  color: white;
}

@media (max-width: 768px) {
  .add-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    margin: 0;
  }

  .add-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .add-button::before {
    content: '+';
    color: white;
    font-size: 24px;
  }

  .add-button {
    font-size: 0;
  }
}
</style>
