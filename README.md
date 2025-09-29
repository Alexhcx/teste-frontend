# Teste Frontend

Este projeto foi desenvolvido como parte de um processo seletivo para uma vaga de desenvolvedor. A aplicação consiste em um CRUD (Create, Read, Update, Delete) de produtos, permitindo a visualização, criação, edição e exclusão de itens em diferentes categorias.

## Visão Geral do Projeto

O objetivo deste teste é demonstrar habilidades em desenvolvimento frontend utilizando Vue.js e outras tecnologias modernas. A aplicação consome uma API para gerenciar os produtos e exibi-los de forma organizada e intuitiva.

## Tecnologias Utilizadas

- **Vue.js (v3)**: Framework progressivo para a construção de interfaces de usuário.
- **Vite**: Ferramenta de build moderna e rápida para desenvolvimento frontend.
- **Vue Router**: Biblioteca de roteamento oficial para o Vue.js.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Axios**: Cliente HTTP baseado em Promises para o navegador e Node.js.
- **ESLint**: Ferramenta de linting para identificar e corrigir problemas no código.
- **Prettier**: Formatador de código para manter um estilo consistente.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão ^20.19.0 || \>=22.12.0)
- [NPM](https://www.npmjs.com/) (geralmente vem instalado com o Node.js)

## Configuração do Ambiente

Para que a aplicação funcione corretamente, é necessário configurar as variáveis de ambiente. Siga os passos abaixo:

1.  Na raiz do projeto, crie um arquivo chamado `.env`.

2.  Adicione as seguintes variáveis a este arquivo:

    ```
    VITE_API_BASE_URL=http://localhost:3000
    VITE_API_URL=http://localhost:3000
    ```

    **Observação:** `VITE_API_BASE_URL` é utilizada pelo Axios para fazer as requisições à API, enquanto `VITE_API_URL` é usada para construir o caminho completo das imagens dos produtos.

## Como Iniciar o Projeto

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento:

1.  **Clone o repositório:**

    ```sh
    git clone <URL_DO_REPOSITORIO>
    ```

2.  **Navegue até o diretório do projeto:**

    ```sh
    cd teste-frontend
    ```

3.  **Instale as dependências:**

    ```sh
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```sh
    npm run dev
    ```

    Após executar o comando, a aplicação estará disponível em `http://localhost:3001`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload.
- `npm run build`: Compila e minifica a aplicação para produção.
- `npm run preview`: Inicia um servidor local para visualizar a build de produção.
- `npm run lint`: Executa o ESLint para verificar e corrigir erros de linting.
- `npm run format`: Formata o código utilizando o Prettier.

## IDE Recomendada

- [Visual Studio Code](https://code.visualstudio.com/)
- **Extensões:**
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desabilite o Vetur se estiver instalado).
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
