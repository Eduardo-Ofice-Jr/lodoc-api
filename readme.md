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
**/login** - Acesse para fazer login.</br>
http://localhost:3000/login [POST]</br>
**requirido**: username e password.

**/register** - Acesse para criar sua conta.</br>
http://localhost:3000/register [POST]</br>
**requirido**: name, username e password.

**/upload-doc** - Acesse para fazer o upload do documento.</br>
http://localhost:3000/upload-doc [POST]</br>
**requirido**: token jwt valido no header da requisição (Authorization: Baerer token) e o arquivo desejado a ser enviado

**/get-docs** - Solicita todos os documentos do usuário _logado_.</br>
http://localhost:3000/get-docs [GET]</br>
**requirido**: token de autorização para solicitar todos os docuemntos do usuário logado.

## Ferramentas usadas
* express: para gerenciar as rotas.
* jsonwebtoken (jwt): para o token de autenticação.
* better-sqlite3: para lidar com o bd sqlite.
* multer: para manipular o upload de arquivos.
* bcrypt: para criptográfia das senhas.
* cors: para liberar o acesso a requisições externas.
* nodemon: para automatizar o reload do servidor.

