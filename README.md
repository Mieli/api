# Projeto de uma API desenvolvida usando typescript

Uma API que suporta requisições REST e GraphQL.

## Funcionalidades

- Cadastro, atualização e exclusão de produtos.
- Consulta de informações de produtos.
- Suporte a requisições REST e GraphQL.
- Cobertura de testes.

## Tecnologias Utilizadas

- Node.js
- Typescript
- Express.js
- GraphQL
- MongoDB
- Jest

## Pré-requisitos

- Node.js instalado (versão v20.5.1 )
- MongoDB instalado e em execução


## Como Usar

### REST

1. Clone o repositório.
2. Instale as dependências 

```sh
npm install
ou
npm i
```

3. Execute o servidor 

```sh
npm run dev
```

4. Acesse a API REST em `http://localhost:3000/api/v1/products`.


#### Exemplos de Requisições REST:

- [GET] Pesquisar todos os produtos: [http://localhost:3000/api/v1/products]
- [GET] Pesquisar um produto por id: [http://localhost:3000/api/v1/products/INFORMAR_ID_DO_PRODUTO]
- [POST] Cadastrar produto: [http://localhost:3000/api/v1/products]
- [PUT] Alterar um produto: [http://localhost:3000/api/v1/products]
- [DELETE] Remover um produto: [http://localhost:3000/api/v1/products/INFORMAR_ID_DO_PRODUTO]

#### Exemplos de Consultas GraphQL:

- [Pesquisar produtos]

```sh
  getAllProducts() {
    _id
    name,
    price,
    stock
  }
```

- [Pesquisar um produto]

```sh
   getProduct(id: $getProductId) {
    _id,
    name,
    price,
    stock
  }

variables:
{
  "getProductId": "ID_DO_PRODUTO"
}

```

- [Cadastrar produto]

```sh
createProduct(name: $name, price: $price, stock: $stock) {
    _id,
    name,
    price,
    stock
}

variables:
{
  "name": "Produto criado",
  "price": 80,
  "stock": 46
}
```

- [Atualizar produto]

```sh
updateProduct(id: $updateProductId, name: $name, price: $price, stock: $stock) {
    _id,
    name,
    price,
    stock,
  }

variables:
{
"updateProductId": "ID_DO_PRODUTO_PARA_ATUALIZAR",
  "name": "Produto atualizado",
  "price": 855,
  "stock": 600
}
```
- [Remover produto]

```sh
updateProduct(id: $updateProductId, name: $name, price: $price, stock: $stock) {
    _id,
    name,
    price,
    stock,
  }

variables: 
{
    "deleteProductId": "ID_DO_PRODUTO_A_SER_REMOVIDO"
}
```


