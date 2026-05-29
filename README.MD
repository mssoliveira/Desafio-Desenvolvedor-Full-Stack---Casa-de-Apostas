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
O backend estará disponível em:
```bash
http://localhost:3000
```

## Como Rodar o Projeto Frontend

