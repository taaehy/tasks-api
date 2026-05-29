# ✅TaskManager API
API REST completa para gerenciamento de tarefas, desenvolvida com **Node.js puro** sem frameworks.

## 🚀Tecnologias
- Node.js (HTTP nativo)
- JavaScript ES Modules
- Persistência em JSON

## 📋Funcionalidades
- ✅Criar tarefas
- ✅Listar tarefas com filtro por título e descrição
- ✅Atualizar tarefas
- ✅Marcar como concluída / pendente
- ✅Remover tarefas

## 🔌Rotas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Lista tarefas |
| POST | `/tasks` | Cria tarefa |
| PUT | `/tasks/:id` | Atualiza tarefa |
| PATCH | `/tasks/:id/complete` | Alterna conclusão |
| DELETE | `/tasks/:id` | Remove tarefa |

## ⚙️Como rodar
```bash
npm install
npm run dev
```

Servidor inicia em `http://localhost:3333`

## 🖥️Front-end
Interface desenvolvida em React + Vite com design dark premium.
Repositório: [tasks-front](https://github.com/taaehy/tasks-front)