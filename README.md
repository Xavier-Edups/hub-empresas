Projeto de Gestão de Empresas e Locais - HubLocal

Este documento fornece um guia completo para configurar e executar o ambiente de desenvolvimento localmente, sem o uso de Docker. A aplicação é um monorepo composto por um backend em NestJS e um frontend em Next.js.
Stack de Tecnologias

    Backend: NestJS, TypeORM, PostgreSQL, Passport.js, JWT

    Frontend: Next.js, React, Redux Toolkit, NextAuth.js, Material UI (MUI), Axios

    Gerenciador de Pacotes: pnpm (usando workspaces)

Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados na sua máquina:

    Node.js: Versão 20.x ou superior.

    pnpm: Gerenciador de pacotes. Se não tiver, instale com npm install -g pnpm.

    PostgreSQL: Um servidor de banco de dados PostgreSQL rodando localmente.

1. Configuração do Banco de Dados PostgreSQL

Você precisa de um banco de dados e um usuário para a aplicação.

    Acesse o PostgreSQL:
    Abra o terminal e conecte-se ao psql como superusuário (geralmente postgres).

    sudo -u postgres psql

    Crie o Usuário (Role):
    Crie um usuário (role) com uma senha. Substitua password por uma senha segura.

    CREATE ROLE hublocal_user WITH LOGIN PASSWORD 'password';

    Crie o Banco de Dados:
    Crie o banco de dados que será usado pela aplicação.

    CREATE DATABASE hublocaldb;

    Dê Permissões ao Usuário:
    Conceda todas as permissões do novo banco de dados ao usuário que você criou.

    GRANT ALL PRIVILEGES ON DATABASE hublocaldb TO hublocal_user;

    Saia do psql:

    \q

2. Configuração do Backend (API NestJS)

Siga estes passos dentro da pasta raiz do projeto.

    Instale as Dependências:
    Na raiz do monorepo, o pnpm instalará as dependências para ambos os projetos.

    pnpm install

    Crie o Arquivo de Ambiente (.env):
    Navegue até a pasta da API e crie uma cópia do arquivo .env.example (se houver) ou crie um novo arquivo chamado .env.

    cd apps/hublocal-api
    touch .env

    Configure as Variáveis de Ambiente:
    Abra o arquivo .env e adicione as seguintes variáveis, substituindo os valores conforme a sua configuração do PostgreSQL e definindo segredos para o JWT.

    # Configuração do Banco de Dados
    DATABASE_URL="postgresql://hublocal_user:password@localhost:5432/hublocaldb?schema=public"

    # Segredos do JWT (use valores longos e aleatórios em um projeto real)
    JWT_SECRET="SUA_CHAVE_SECRETA_SUPER_LONGA_E_ALEATORIA"
    JWT_EXPIRATION="1h"

    Execute as Migrações do Banco:
    Com o backend configurado, precisamos criar as tabelas no banco de dados. Os comandos a seguir devem ser executados de dentro da pasta apps/hublocal-api.

    Primeiro, compile o projeto para que o TypeORM possa ler as entidades:

    pnpm run build

    Os arquivos de migração inicial já estão no projeto portanto só precisamos rodar a migração:

    pnpm run migration:run
    
    Caso seja necessário gerar uma migração nova execute (não esqueça de rodar a migração depois):
    
    pnpm run migration:generate

    Este comando irá analisar suas entidades e criar um arquivo de migração SQL na pasta src/migrations.

    Agora suas tabelas users, companies e locations foram criadas.

    Inicie o Servidor do Backend:
    Ainda dentro da pasta apps/hublocal-api, inicie o servidor em modo de desenvolvimento (talvez seja necessário privilégios de superusuário).

    pnpm run start:dev

    O servidor da API estará rodando em http://localhost:3001.

3. Configuração do Frontend (Cliente Next.js)

Abra um novo terminal e siga os passos abaixo.

    Navegue até a Pasta do Cliente:
    A partir da raiz do projeto:

    cd apps/hublocal-client

    (As dependências já foram instaladas no passo 2.1)

    Crie o Arquivo de Ambiente (.env.local):
    Crie um arquivo .env.local na raiz da pasta apps/hublocal-client.

    touch .env.local

    Configure as Variáveis de Ambiente:
    Abra o arquivo .env.local e adicione a variável que aponta para a sua API backend.

    # URL da API Backend
    NEXT_PUBLIC_API_URL=http://localhost:3001/api

    # URL da aplicação (usada pelo NextAuth)
    NEXTAUTH_URL=http://localhost:3000

    # Segredo para o NextAuth (pode ser qualquer string aleatória)
    NEXTAUTH_SECRET="SEU_SEGREDO_NEXTAUTH_AQUI"

    Inicie o Servidor do Frontend:
    Ainda dentro da pasta apps/hublocal-client, inicie o servidor de desenvolvimento.

    pnpm run dev

    A aplicação frontend estará acessível em http://localhost:3000.

Resumo para Rodar a Aplicação

Depois da configuração inicial, para rodar a aplicação, você precisará de dois terminais:

    Terminal 1 (Backend):

    cd apps/hublocal-api
    pnpm run start:dev

    Terminal 2 (Frontend):

    cd apps/hublocal-client
    pnpm run dev

Agora você pode abrir http://localhost:3000 no seu navegador, criar uma conta e começar a usar a aplicação.
