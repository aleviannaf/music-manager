# music-manager

A "Music Manager" é uma API simples para gerenciamento de playlist de músicas, permitindo cadastrar, atualizar e deletar contas, playlists e músicas.

## Rotas

1. **Listar Todas as Músicas (sem autenticação)**

    Endpoint: `GET /musics`

    Esta rota traz uma lista de todas as músicas cadastradas.

    Exemplo de retorno de sucesso (status 200):
    ```json
    {
        "prevPage": null,
        "nextPage": "http://localhost:3000/musics?page=2&perPage=5",
        "currentPage": 1,
        "totalItens": 11,
        "data": [
            {
                "id": 1,
                "name": "Camisa 10",
                "author": "Turma do Pagode",
                "album": "Esse é o Clima"
            },
            {
                "id": 2,
                "name": "Quem é Ela",
                "author": "Zeca Pagodinho",
                "album": null
            }
	    ]
    }
    ```

    Exemplo de retorno de erro (status 500):
    ```json
    {
        "error": "Internal Server Error."
    }
    ```

2. **Cadastrar uma Nova Conta de Usuário (sem autenticação)**

    Endpoint: `POST /users`

    Parâmetros no Corpo da Requisição:
    - `name` (string) - Nome do titular da conta.
    - `password` (numérico) - Senha da conta (ela sera criptografada).
    - `admin` (boolean) - Se o usuário é admin ou não.

    Esta rota permite cadastrar uma nova conta com o nome, senha e admin no corpo da requisição. Ela retorna os dados cadastrados juntamente com o ID gerado para a conta, data da criação e omitindo a senha.

    Exemplo de corpo de requisição:
    ```json
    {
        "username": "Alexandre",
        "password": "12345",
        "admin": true
    }
    ```

    Exemplo de retorno de sucesso (status 201):
    ```json
    {
        "id": 11,
        "username": "Alexandre",
        "admin": true,
        "createdAt": "2023-08-22T21:41:33.993Z"
    }
    ```

    Exemplo de retorno de erro (status 500):
    ```json
    {
        "error": "Internal server error."
    }
    ```


2. **Visualizar uma Conta por ID**

    Endpoint: `GET /users/:userId`

    Parâmetros:
    - `id` (numérico) - ID da conta a ser visualizada.
    - Passar o token no header gerado no login

    Esta rota traz os detalhes de uma única conta referente ao ID passado.

    Exemplo de retorno de sucesso (status 200):
    ```json
    {
        "id": 1,
        "username": "cauan",
        "admin": false,
        "createdAt": "2023-08-05T00:10:22.674Z"
    }
    ```

    Exemplo de retorno de erro (status 404):
    ```json
    {
        "error": "User not found."
    }
    ```

    Exemplo de retorno de erro (status 501):
    ```json
    {
        "error": "jwt must be provided."
    }
    ```
    
4. **Atualizar uma Conta**

    Endpoint: `PATCH /users/:userId`

    Parâmetros no Corpo da Requisição:
    - `name` (string) - Novo nome do titular da conta. 
    - `password` (srting) - Nova senha
    - `admin` (boolean) - Novo status.

    Esta rota permite atualizar os dados de uma conta existente com base no ID fornecido na requisição. Ela retorna os dados atualizados juntamente com o ID da conta, pode passar apenas o dado que será atualizado.

    Exemplo de corpo de requisição:
    ```json
    {
        "username": "Renata",
        "password": "senhaforte",
        "admin": false
    }
    ```

    Exemplo de retorno de sucesso (status 200):
    ```json
     {
        "id": 2,
        "username": "Renata",
        "admin": false,
        "createdAt": "2023-08-05T00:10:22.674Z"
    }
    ```

    Exemplo de retorno de erro (status 404):
    ```json
    {
        "error": "User not found."
    }
    ```

    Exemplo de retorno de erro (status 500):
    ```json
    {
        "error": "Internal server error."
    }
    ```

## Instalação

1. Clone este repositório.
2. Navegue até o diretório do projeto no terminal.
3. Execute `npm install` para instalar as dependências.

## Uso

1. Inicie o servidor: `npm run dev`
2. Acesse as rotas da API conforme descrito acima.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
