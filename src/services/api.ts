import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface Product {
  id: number
  name: string
  image: string
  idCateg: number
}

interface ProductParams {
  idCateg?: number | string
}

type CreateProductData = Omit<Product, 'id'>
type UpdateProductData = Partial<CreateProductData>

export const getProducts = (params: ProductParams = {}) => {
  return apiClient.get<Product[]>('/products', { params })
}

export const getProductById = (id: number | string) => {
  return apiClient.get<Product>(`/products/${id}`)
}

export const createProduct = (productData: CreateProductData) => {
  return apiClient.post<Product>('/products', productData)
}

export const updateProduct = (id: number | string, updateData: UpdateProductData) => {
  return apiClient.put<Product>(`/products/${id}`, updateData)
}

export const deleteProduct = (id: number | string) => {
  return apiClient.delete(`/products/${id}`)
}
