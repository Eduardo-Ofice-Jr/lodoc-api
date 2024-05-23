# Lodoc API
Uma aplicação simples e de fácil uso para guardar os seus documentos

## Pre-requisitos
* Ter o Nodejs instalado na sua máquina. Para verificar se você já tem instalado basta executar no terminal `node --version`.
* Conexão a internet para instalar as dependências

## Instalação
Para executar esse projeto, siga os passos abaixo.
1. Instale as dependências `npm install`
2. Remonie o `.env.example` para `.env` e adicione o segredo para ser usado na criação do token de autenticação.
3. execute o projeto via terminal: `npm run dev`

## Rotas de acesso
**/login** - Acesse para fazer login.
**/register** - Acesse para criar sua conta.
**/upload-doc** - Acesse para fazer o upload do documento.
**/get-docs** - Solicita todos os documentos do usuário _logado_.

ex: url [METHOD]
http://localhost:3000/register [POST]
http://localhost:3000/login [POST]
http://localhost:3000/upload-doc [POST]
http://localhost:3000/get-docs [GET]

**Dados necessário para realização bem sucedida das requisições**
Para realizar o login os dados requiridos são: username e password.
Para criar uma conta os dados requiridos são: name, username e password.
Para fazer upload de um arquivos é esperado o envio do token *JWT* no header da requisição e o arquivo no body.
Para solicitar todos os documentos do usuário logado é necessário enviar o token(JWT) de autorização no header dá requisição.

## Ferramentas usadas
* express: para gerenciar as rotas.
* jsonwebtoken (jwt): para o token de autenticação.
* better-sqlite3: para lidar com o bd sqlite.
* multer: para manipular o upload de arquivos.
* bcrypt: para criptográfia das senhas.
* cors: para liberar o acesso a requisições externas.
* nodemon: para automatizar o reload do servidor.

