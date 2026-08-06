# TaskManager API

API REST para gerenciamento de tarefas, desenvolvida com os módulos nativos do Node.js e sem dependências de produção externas.

O serviço oferece operações de criação, consulta, atualização, conclusão e exclusão de tarefas. Os dados são persistidos em um arquivo JSON local, e a API pode ser consumida por aplicações web graças à configuração de CORS.

## Funcionalidades

- Criação de tarefas com título obrigatório e descrição opcional
- Listagem de todas as tarefas
- Filtros por título e descrição
- Atualização de título e descrição
- Alternância entre os estados pendente e concluída
- Exclusão de tarefas
- Identificadores UUID gerados pelo módulo nativo `node:crypto`
- Registro automático das datas de criação, atualização e conclusão
- Respostas de erro para dados inválidos, recursos inexistentes e rotas desconhecidas
- Suporte a requisições CORS e preflight `OPTIONS`

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| Node.js | Runtime e servidor HTTP nativo |
| JavaScript | Código-fonte com ES Modules |
| `node:http` | Recebimento e resposta das requisições HTTP |
| `node:crypto` | Geração de identificadores UUID |
| `node:fs/promises` | Persistência assíncrona em arquivo JSON |

## Arquitetura

O código separa as responsabilidades em camadas:

```text
tasks-api/
├── src/
│   ├── controllers/
│   │   └── tasks.controller.js
│   ├── db/
│   │   ├── database.js
│   │   └── tasks.json           # gerado localmente e ignorado pelo Git
│   ├── middlewares/
│   │   └── json-body-parser.js
│   ├── repositories/
│   │   └── tasks.repository.js
│   ├── routes/
│   │   └── tasks.routes.js
│   ├── utils/
│   │   └── extract-query-params.js
│   ├── app.js
│   └── server.js
├── package.json
└── README.md
```

- **Servidor:** configura HTTP, CORS, parsing e despacho das rotas.
- **Controller:** valida a entrada e define os códigos e corpos das respostas.
- **Repository:** cria o modelo da tarefa e coordena as operações de dados.
- **Database:** carrega, consulta e persiste as tarefas no arquivo JSON.

## Modelo de tarefa

```json
{
  "id": "4e087c5f-3521-4d1b-a429-accfb32f9ec2",
  "title": "Revisar documentação",
  "description": "Validar os comandos do projeto",
  "completed_at": null,
  "created_at": "2026-08-06T15:00:00.000Z",
  "updated_at": "2026-08-06T15:00:00.000Z"
}
```

`completed_at` permanece `null` enquanto a tarefa está pendente e recebe uma data ISO quando ela é concluída.

## Endpoints

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| `GET` | `/tasks` | Lista as tarefas | `200` |
| `GET` | `/tasks?title=termo` | Filtra pelo título | `200` |
| `GET` | `/tasks?description=termo` | Filtra pela descrição | `200` |
| `POST` | `/tasks` | Cria uma tarefa | `201` |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa | `200` |
| `PATCH` | `/tasks/:id/complete` | Alterna o estado de conclusão | `200` |
| `DELETE` | `/tasks/:id` | Exclui uma tarefa | `204` |

### Criar uma tarefa

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "title": "Estudar Node.js",
  "description": "Revisar o módulo HTTP"
}
```

### Atualizar uma tarefa

Envie o título, a descrição ou ambos:

```http
PUT /tasks/:id
Content-Type: application/json
```

```json
{
  "title": "Estudar Node.js nativo",
  "description": "Revisar HTTP e streams"
}
```

### Alternar a conclusão

```http
PATCH /tasks/:id/complete
```

Cada chamada alterna a tarefa entre pendente e concluída.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Execução local

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/taaehy/tasks-api.git
cd tasks-api
```

Instale o projeto a partir do arquivo de lock:

```bash
npm ci
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Por padrão, a API fica disponível em `http://localhost:3333`. A variável de ambiente `PORT` pode definir outra porta.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor com reinicialização automática ao alterar o código |
| `npm start` | Inicia o servidor sem file watcher, indicado para produção |

## Deploy

Em uma plataforma Node.js, configure:

```text
Install command: npm ci
Start command: npm start
```

O servidor respeita a variável `PORT` fornecida pela plataforma e libera os métodos `GET`, `POST`, `PUT`, `PATCH`, `DELETE` e `OPTIONS` via CORS.

> A persistência é feita em `src/db/tasks.json`. Em serviços com sistema de arquivos efêmero, os dados podem ser perdidos em reinicializações ou novos deploys. Para persistência durável em produção, é necessário usar um disco persistente ou substituir essa camada por um banco de dados.

## Front-end

A interface React que consome esta API está disponível no repositório [tasks-front](https://github.com/taaehy/tasks-front).

## Observações técnicas

- Os filtros de título e descrição não diferenciam letras maiúsculas de minúsculas.
- Quando os dois filtros são informados, ambos precisam corresponder à tarefa.
- O arquivo de dados é criado automaticamente caso ainda não exista.
- O projeto não possui uma suíte de testes automatizados configurada.
