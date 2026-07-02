# Desafio Full Stack - IBS Sistemas

Este repositório contém a solução para o desafio de desenvolvimento de uma aplicação Full Stack proposto pela **IBS Sistemas**, localizada em Rio do Sul, SC. O projeto consiste em uma API construída com **NestJS** e um front-end desenvolvido com **Angular**.

O objetivo da aplicação é gerenciar usuários e seus respectivos endereços, além de fornecer um painel administrativo (dashboard) e sistema de autenticação.

## 🚀 Tecnologias Utilizadas

### Backend (API)
A API foi desenvolvida seguindo os princípios de uma arquitetura modular e escalável do NestJS.
- **Node.js** com **NestJS** (Framework principal)
- **TypeORM** (ORM para mapeamento do banco de dados)
- **PostgreSQL** (Banco de Dados Relacional)
- **JWT (JSON Web Token)** e **bcrypt** (Autenticação e Criptografia de senhas)
- **TypeScript**

### Frontend (Web App)
A interface de usuário foi criada como uma Single Page Application (SPA), focada em usabilidade.
- **Angular 17** (Framework frontend)
- **PrimeNG**, **Angular Material** e **NG-ZORRO** (Bibliotecas de Componentes de Interface)
- **Chart.js** (Utilizado para renderização de gráficos no Dashboard)
- **TypeScript** e **RxJS**

---

## ⚙️ Arquitetura e Funcionalidades

O sistema é dividido em módulos de negócios bem definidos:

### 1. Autenticação e Administração (`admin` / `login`)
- Sistema de login seguro.
- Proteção de rotas da API utilizando middlewares (`auth.middleware.ts`) baseados em validação de token JWT.

### 2. Gestão de Usuários (`users`)
- **Backend:** Endpoints RESTful para criação, leitura, atualização e exclusão (CRUD) de usuários.
- **Frontend:** Tela de listagem de usuários com modais interativos para criação (`create-user-modal`) e edição (`edit-user-modal`).

### 3. Gestão de Endereços (`address`)
- **Backend:** Endpoints para gerenciamento de endereços que são vinculados aos usuários do sistema.
- **Frontend:** Tela de endereços e gerenciamento controlado via modais interativos (`create-address-modal` e `edit-address-modal`).

### 4. Dashboard (`dashboard`)
- Tela principal (painel) apresentada logo após o login bem-sucedido.
- Exibe métricas, indicadores e gráficos (utilizando Chart.js) para análise visual de dados cadastrados no sistema.

---

## 📦 Como executar o projeto

### Pré-requisitos
- Node.js (v18+ recomendado)
- PostgreSQL configurado e rodando na sua máquina ou em um container (Docker)
- Gerenciador de pacotes `yarn` (ou `npm`)

### Configurando o Banco de Dados
1. Crie um banco de dados no PostgreSQL (ex: `ibs_desafio`).
2. Na pasta `backend/`, você encontrará um arquivo chamado `.env.example`. Crie uma cópia dele e renomeie para `.env`.
3. Preencha as variáveis de ambiente no arquivo `.env` com as credenciais do seu banco de dados PostgreSQL e defina a chave secreta (secret) para o JWT.

### Rodando o Backend (API)
```bash
# 1. Navegue até o diretório do backend
cd backend

# 2. Instale as dependências
yarn install

# 3. Inicie o servidor em modo de desenvolvimento
yarn start:dev
```
A API estará rodando (geralmente em `http://localhost:3000` ou na porta definida no seu `.env`). O TypeORM cuidará de sincronizar as tabelas do banco dependendo de sua configuração.

### Rodando o Frontend (Angular)
```bash
# 1. Abra um novo terminal e navegue até o diretório do frontend
cd frontend

# 2. Instale as dependências
yarn install

# 3. Inicie o servidor de desenvolvimento do Angular
yarn start
```
O frontend estará acessível no seu navegador em `http://localhost:4200/`.

---

## 📄 Estrutura do Repositório

```text
/
├── backend/                  # Código-fonte da API (NestJS)
│   ├── src/
│   │   ├── admin/            # Módulo de Autenticação e Regras de Admin
│   │   ├── users/            # Módulo de Usuários
│   │   ├── address/          # Módulo de Endereços
│   │   └── migrations/       # Migrations do Banco de Dados (TypeORM)
│   ├── typeOrm.config.ts     # Configuração de conexão do TypeORM
│   └── package.json          
│
└── frontend/                 # Código-fonte da interface Web (Angular)
    ├── src/
    │   └── app/
    │       ├── components/   # Componentes visuais da UI (Login, Dashboard, Users, Address, Modais)
    │       ├── services/     # Serviços de integração com a API via chamadas HTTP
    │       ├── types/        # Definição de Tipagens e Interfaces TypeScript
    │       └── app.routes.ts # Definição das rotas de navegação do Angular
    └── package.json
```

---

*Desenvolvido para a IBS Sistemas (Rio do Sul, SC).*
