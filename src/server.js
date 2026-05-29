import app from './app.js';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('\n📋 Rotas disponíveis:');
  console.log('  GET    /tasks              → Listar tarefas');
  console.log('  POST   /tasks              → Criar tarefa');
  console.log('  PUT    /tasks/:id          → Atualizar tarefa');
  console.log('  PATCH  /tasks/:id/complete → Marcar como concluída');
  console.log('  DELETE /tasks/:id          → Remover tarefa\n');
});