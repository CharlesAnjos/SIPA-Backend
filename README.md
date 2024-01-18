# Sobre o projeto

Este é um servidor API para uma atividade de 

# Instruções

## 1. Pré-requisitos e dependências

Este projeto tem os seguintes pré-requisitos e dependências:

    nodejs
    npm
    mongodb
    express
    mongoose

Os detalhes dos requisitos para este projeto podem ser encontrados no arquivo [enunciado-atividade.pdf](enunciado-atividade.pdf)

## 2. Banco de dados

O banco de dados utilizado é o MongoDB. Você pode usar uma instância do banco local ou via docker. O jeito mais rápido é via Docker, apenas siga as instruções abaixo:

### 2.1 Instalação
    # docker run -d -p 27017:27017 --name backend-ntdw mongo:latest

### 2.2 Execução
    # docker start backend-ntdw

## 3. Inicializar serviço backend

Inicie o serviço backend através da execução do script [startserver.sh](startserver.sh). Pode ser necessário dar permissão de execução para este script.