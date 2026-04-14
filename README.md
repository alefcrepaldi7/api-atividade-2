 API Filmes - Atividade 02

## 1. Introdução
Esta aplicação consiste em uma **API RESTful** desenvolvida em **Node.js** com o framework **Express**. O objetivo do projeto é gerenciar uma coleção de filmes persistida em memória, permitindo operações de consulta e inserção de dados sob critérios de validação rigorosos.

---

## 2. Especificações Tecnológicas
* **Ambiente de Execução:** Node.js (v24.14.0)
* **Framework Web:** Express.js
* **Gerenciador de Processos:** Nodemon
* **Protocolo de Comunicação:** HTTP/1.1
* **Formato de Dados:** JSON

---

## 3. Arquitetura de Endpoints

* 3.1. Recuperação de Registros (GET)
Retorna o estado atual do array de filmes armazenado no servidor.

| Atributo | Especificação |
| **Método** | `GET` |
| **URL** | `http://localhost:3001/api/filmes` |
| **Status de Sucesso** | `200 OK` |

* 3.2. Cadastro de Novos Recursos (POST)
Responsável pela inserção de um novo objeto na coleção de filmes.

| Atributo | Especificação |
| :--- | :--- |
| **Método** | `POST` |
| **URL** | `http://localhost:3001/api/filmes` |
| **Status de Sucesso** | `201 Created` |

* 3.3. Atualização de Registro (PUT)
Realiza a alteração integral dos dados de um filme existente baseado no ID passado via URL.

| Atributo | Especificação |
| :--- | :--- |
| **Método** | `PUT` |
| **URL** | `http://localhost:3001/api/filmes/:id` |
| **Status de Sucesso** | `200 OK` |

* 3.4. Exclusão de Recurso (DELETE)
Remove permanentemente um filme da coleção em memória.

| Atributo | Especificação |
| :--- | :--- |
| **Método** | `DELETE` |
| **URL** | `http://localhost:3001/api/filmes/:id` |
| **Status de Sucesso** | `204 No Content` |

#### Exemplo de Payload (Corpo da Requisição):

{
  "titulo": "Batman: O Cavaleiro das Trevas",
  "diretor": "Christopher Nolan",
  "nota": 10,
  "genero": "Acao"
}

---

## 4. Regras de Negócio e Validações Implementadas

A API utiliza camadas de lógica condicional para assegurar a integridade dos dados:

Atributo | Especificação da Validação
--- | ---
**Integridade** | Valida presença de `titulo`, `diretor`, `nota` e `genero`. Erro: `400`.
**Título** | Comprimento mínimo de **3 caracteres**.
**Nota** | Valor numérico entre **0 e 10**. Erro: `422`.
**ID** | Gerado automaticamente de forma incremental a partir do **11**.

---

## 5. Instruções de Instalação e Execução

Passos para rodar o projeto localmente:

Passo | Ação / Comando
--- | ---
**1. Dependências** | `npm install`
**2. Inicialização** | `npm run dev`
**3. Testes** | Importar `collection.json` no Postman.

---

## 6. Evidências de Validação

### 6.1. Verificação de Consulta Geral (GET)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `200 OK` |
| **Evidência** | ![Teste GET](./Prints_Get/get%20send.png) |

### 6.2. Consulta por ID Específico (GET ID 11)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `200 OK` |
| **Evidência** | ![Get ID 11](./Prints_Get/Get%20id11.png) |

### 6.3. Teste de Validação: Campos Ausentes (POST)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `400 Bad Request` |
| **Evidência** | ![Erro Campo](./Prints_Erro/Faltando%20campo.png) |

### 6.4. Teste de Validação: Nota Inválida (POST)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `422 Unprocessable Entity` |
| **Evidência** | ![Erro Nota](./Prints_Erro/Erro%20nota.png) |

### 6.5. Cadastro de Novo Recurso (POST)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `201 Created` |
| **Evidência** | ![Sucesso Cadastro](./Prints_Post/Put.png) |

### 6.6. Atualização de Recurso (PUT)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `200 OK` |
| **Evidência** | ![Teste PUT](./Prints_Put/Put.png) |

### 6.7. Confirmação de Atualização (GET)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `200 OK` |
| **Evidência** | ![Confirmar PUT](./Prints_Put/Put_get.png) |

### 6.8. Exclusão de Recurso (DELETE)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `204 No Content` |
| **Evidência** | ![Teste DELETE](./Prints_Delete/Delete.png) |

### 6.9. Verificação Pós-Exclusão (GET)

| Atributo | Especificação |
| :--- | :--- |
| **Status** | `200 OK` |
| **Evidência** | ![Confirmar DELETE](./Prints_Delete/Delete_get.png) |