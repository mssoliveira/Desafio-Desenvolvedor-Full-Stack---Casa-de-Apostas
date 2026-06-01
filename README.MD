## 📌 Description

Este desafio tem como objetivo avaliar habilidades em **Desenvolvedor Fullstack - JUNIOR/PLENO**.

Desenvolver uma aplicação web com:

- CRUD de clientes
- CRUD de contatos
- Relacionamento entre clientes e múltiplos contatos
- Relatório em tela ou PDF

Para entender o desafio melhor leia o DESAFIO.md

---

## 🧰 Requirements

- **Node.js** versão **22**
- **Docker**
- **Docker Compose**
- **pnpm**

---

## ⚙️ Tecnologias Utilizadas

### Backend
- Nest.js(Node.js framework) + TypeScript
- Prisma ORM
- PostgreSQL
- API REST

### Frontend
- Next.js

### Infra
- Docker Compose

---

## Como Rodar o Projeto Backend
## Funcionalidades
### Backend
- Autenticação JWT
- Login de usuário
- CRUD de Clientes
- CRUD de Contatos
- Relacionamento Cliente → Contatos
- Validação de dados com class-validator
- Swagger
- Prisma ORM
- PostgreSQL
- Docker

## Principais Rotas
### Auth
POST /auth/login

### Clientes
GET /clientes<br/>
GET /clientes/:id<br/>
POST /clientes<br/>
PUT /clientes/:id<br/>
DELETE /clientes/:id<br/>

### Contatos
GET /contatos<br/>
GET /contatos/:id<br/>
POST /contatos<br/>
PUT /contatos/:id<br/>
DELETE /contatos/:id<br/>

### 1️. Subir o banco de dados (Docker)
> ⚠️ Docker é obrigatório

```bash
docker-compose up -d
```
### 2. Instalar dependências
```bash
pnpm install
```
### 3. Configurar variáveis de ambiente
Crie o arquivo .env na raiz do projeto e copie todo o conteudo do .env.example

### 4. Executar migrations e seed
Rodar as migrations
```bash
pnpm prisma:deploy
```

### 6. Rodar o backend
Execute o backend
```bash
pnpm start:dev
```

## URLs da Aplicação
API:
```bash
http://localhost:3000
```

Swagger(Documentação):
```bash
http://localhost:3000/docs
```

## Como Rodar o Projeto Frontend
### 1. Acessar a pasta do frontend

```bash
cd frontend
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do frontend e copie o conteúdo do `.env.example`.

Exemplo:

```env
NEXT_PUBLIC_API="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="2d3c19251a366f4fd1c4a1c51c40d66eb7e747a5d389650f0777846b07482eae"
```

> Certifique-se de que o backend esteja em execução antes de iniciar o frontend.

### 4. Executar o frontend

```bash
pnpm dev
```

O frontend estará disponível em:

```text
http://localhost:3001
```
---

## Fluxo para Execução Completa
### 1. Subir o banco de dados
```bash
docker-compose up -d
```

### 2. Executar o Backend

```bash
pnpm install
pnpm prisma:deploy
pnpm start:dev
```

Backend disponível em:

```text
http://localhost:3000
```

Swagger disponível em:

```text
http://localhost:3000/api/docs
```

### 3. Executar o Frontend

```bash
pnpm install
pnpm dev
```

Frontend disponível em:

```text
http://localhost:3001
```

---

## Usuário para Testes
Caso tenha executado o seed da aplicação, utilize:
**Email**

```text
user@user.dev
```

**Senha**

```text
#Senha123
```

---

## Fluxo da Aplicação

1. Realizar login.
2. Cadastrar clientes.
3. Cadastrar contatos vinculados a um cliente.
4. Editar e excluir clientes e contatos.
5. Consultar clientes e seus respectivos contatos.
6. Visualizar o relatório de clientes e contatos.
