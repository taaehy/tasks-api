import { TasksRepository } from '../repositories/tasks.repository.js';

const repo = new TasksRepository();

export class TasksController {
  async index(req, res) {
    const { title, description } = req.query;
    const tasks = await repo.findAll({ title, description });
    return res.status(200).json(tasks);
  }

  async store(req, res) {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'O campo "title" é obrigatório.' });
    }

    const task = await repo.create({ title: title.trim(), description });
    return res.status(201).json(task);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && description === undefined) {
      return res.status(400).json({ error: 'Informe ao menos "title" ou "description" para atualizar.' });
    }

    const exists = await repo.findById(id);
    if (!exists) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    const task = await repo.update(id, { title, description });
    return res.status(200).json(task);
  }

  async complete(req, res) {
    const { id } = req.params;

    const exists = await repo.findById(id);
    if (!exists) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    const task = await repo.complete(id, exists);
    const message = task.completed_at
      ? 'Tarefa marcada como concluída.'
      : 'Tarefa marcada como pendente.';

    return res.status(200).json({ message, task });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const exists = await repo.findById(id);
    if (!exists) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await repo.delete(id);
    return res.status(204).send();
  }
}