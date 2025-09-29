export interface Category {
  id: number
  name: string
  src: string
}

export const categories: Category[] = [
  { id: 1, name: 'Eletrônicos', src: '/images/categories/eletronicos.jpg' },
  { id: 2, name: 'Roupas e Acessorios', src: '/images/categories/roupas.jpg' },
  { id: 3, name: 'Livros', src: '/images/categories/livros.jpg' },
  { id: 4, name: 'Casa e Cozinha', src: '/images/categories/casa-cozinha.jpg' },
]

export const getCategoryNameById = (id: number): string => {
  const category = categories.find((c) => c.id === id)
  return category ? category.name : 'Categoria Desconhecida'
}
