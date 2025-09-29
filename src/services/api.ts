import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface Product {
  id: string
  name: string
  image: string
  idCateg: number
}

interface ProductParams {
  idCateg?: number | string
}

export type CreateProductFormData = {
  name: string
  image: File
  idCateg: number
}

export type UpdateProductFormData = Partial<CreateProductFormData>

export const getProducts = (params: ProductParams = {}) => {
  return apiClient.get<Product[]>('/products', { params })
}

export const getProductById = (id: number | string) => {
  return apiClient.get<Product>(`/products/${id}`)
}

export const createProduct = (productData: CreateProductFormData) => {
  const formData = new FormData()

  formData.append('name', productData.name)
  formData.append('image', productData.image)
  formData.append('idCateg', String(productData.idCateg))

  return apiClient.post<Product>('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateProduct = (id: number | string, updateData: UpdateProductFormData) => {
  const formData = new FormData()

  if (updateData.name) {
    formData.append('name', updateData.name)
  }
  if (updateData.idCateg) {
    formData.append('idCateg', String(updateData.idCateg))
  }
  if (updateData.image && updateData.image instanceof File) {
    formData.append('image', updateData.image)
  }

  return apiClient.put<Product>(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteProduct = (id: number | string) => {
  return apiClient.delete(`/products/${id}`)
}
