# Store Manager

Este projeto foi desenvolvido ao final da Seção 5 de Back-end da [Trybe](https://www.betrybe.com/), onde estudei Node.js, Arquitetura de software: Model, Service e Controller e testes unitários.

## Descrição

Store Manager é uma aplicação backend que cria rotas com os métodos POST, PUT, GET e DELETE para acessar um banco de dados. Além disso, trabalhei com Middlewares para criar validações e mocha, chai e sinon para criar testes unitários.

## Como funciona

Este projeto consistiu na criação de rotas com os métodos POST, PUT, GET e DELETE para acessar um banco de dados e criar uma aplicação backend.


## Endpoints

#### POST
```
/products: para registrar um novo produto.

/sales: para registrar uma nova venda.
```

#### GET
```
/products: para listar todos os produtos.

/products/:id: para encontrar um produto pelo seu id.

/sales: para listar todas as vendas.

/sales/:id: para encontrar uma venda pelo seu id.

/products/search: usando uma query "q" no endpoint, você pode pesquisar por uma palavra e encontrar todos os produtos que contêm essa palavra em seu nome. 

Exemplo: /products/search?q=searchTerm.
```

#### DELETE
```
/products/:id: para deletar um produto.

/sales/:id: para deletar uma venda.
```

#### PUT
```
/products/:id: para atualizar um produto.

/sales: para atualizar uma venda.
```
