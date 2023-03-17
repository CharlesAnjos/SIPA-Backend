# Instruções configuração backend

## 1. Instalar nodejs e npm
    # pacman -S nodejs npm

### 1.2. Checar instalação
    $ node -v
    $ npm -v

## 2. Inicializar projeto node
    $ mkdir backend && cd backend
    $ npm init

    preencher dados do pacote note

## 3. Instalar pacote de banco de dados do node

### 3.1 Critérios de escolha do BD

Como já tenho bastante experiência com BDs relacionais, decidi fazer este projeto com um não-relacional. Destes, escolhi mongodb por ser o mais comumente usado em projetos node

### 3.2 Instalar o pacote de banco de dados no node

    npm install mongodb

## 4. Configurar o BD

Docker MongoDB

### 4.1 Instalação
    # docker run -d -p 27017:27017 --name backend-ntdw mongo:latest

### 4.2 Execução
    # docker start backend-ntdw

## 5. Fazer o resto da implementação
- Estou usando o tutorial localizado em https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/ para o resto do trabalho

### 5.1 Notas sobre implementação
- dotenv resolveu não funcionar, então ignorei ele