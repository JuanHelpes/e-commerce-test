# e-commerce-app

Sistema Fullstack de e-commerce desenvolvido com foco em autenticação, carrinho de compras e integração com banco de dados.

## 🧠 Descrição

Este projeto simula um sistema de e-commerce onde usuários podem navegar por produtos cadastrados no banco de dados, criar contas, autenticar-se e gerenciar seus dados pessoais e carrinho de compras. O frontend foi construído com **React + Vite**, utilizando **Material UI** para a interface. O backend é uma **API REST** construída com **NestJS**, utilizando **Prisma** e **MongoDB** para persistência de dados.

## 🚀 Funcionalidades

- 🔐 Cadastro e login de usuários
- 👤 Edição de dados pessoais (nome, endereço, etc.)
- 🛒 Adição e remoção de produtos no carrinho
- 📦 Visualização de produtos disponíveis
- 🧾 Resumo final da compra

## 🛠️ Tecnologias Utilizadas

### Frontend

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)

### Backend

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/) (para autenticação)
- [bcrypt] (para hash seguro de senhas)

## 📦 Estrutura Geral

e-commerce-app/
├── backend/ # API NestJS com Prisma + MongoDB
└── frontend/ # Aplicação React + Vite + MUI

## 📌 Observações

- O sistema utiliza autenticação com tokens JWT.
- A comunicação entre frontend e backend é feita via HTTP.
- O carrinho de compras é vinculado ao usuário autenticado.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar.
