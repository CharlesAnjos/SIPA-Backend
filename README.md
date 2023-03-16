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

    # docker run --name backend-ntdw -d -p 27017:27017 mongo

- desisti de rodar um servidor mongodb no docker por problemas de conexão
- desisti de rodar um servidor mongodb localmente pois tive problemas ao tentar conectar nele
- foi mais fácil usar o MongoDB Atlas e hostear o serviço de BD na nuvem.

## 5. Fazer o resto da implementação
- Estou usando o tutorial localizado em https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/ para o resto do trabalho

### 5.1 Notas sobre implementação
- dotenv resolveu não funcionar, então ignorei ele