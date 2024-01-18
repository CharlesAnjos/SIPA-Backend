# Sobre o projeto

Este projeto encerra o backend de um Sistema de Inscrição de Projetos Acadêmicos. Este sistema foi criado como atividade avaliativa para a disciplina de Novas Tecnologias de Desenvolvimento Web, sob supervisão do professor Marinaldo Oliveira do curso de Sistemas para Internet do Instituto Federal de Ciência e Tecnologia do Tocantins - IFTO

Também faz parte desse sistema um outro projeto, consistindo em frontend feito em Flutter ([SIPA-Frontend](https://github.com/CharlesAnjos/SIPA-Frontend)), que acessa os dados do servidor deste projeto via API. Para tanto, este servidor disponibiliza uma API restful para que o frontend já desenvolvido mencionado anteriormente (ou qualquer outro frontend devidamente configurado) possa consultar e cadastrar Projetos Acadêmicos.

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