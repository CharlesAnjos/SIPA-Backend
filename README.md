# Instruções configuração backend

## 1. Instalar nodejs e npm

Instale os pacotes nodejs e npm no seu ambiente de desenvolvimento. Isso varia de acordo com o sistema operacional sendo utilizado no mesmo.

### 1.2. Checar instalação

    $ node -v
    $ npm -v

## 2. Baixar o projeto do github

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

## 5. Inicializar serviço backend

Na pasta do projeto iniciar o serviço com 
    npm start