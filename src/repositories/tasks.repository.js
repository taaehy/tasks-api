import { Database } from '../db/database.js';
import { randomUUID } from 'node:crypto';

const db = new Database();

export class TasksRepository {
  async findAll(filters) {
    return db.list(filters);
  }

  async findById(id) {
    return db.findById(id);
  }

  async create({ title, description }) {
    const task = {
      id: randomUUID(),
      title,
      description: description ?? null,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return db.create(task);
  }

  async update(id, { title, description }) {
    return db.update(id, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      updated_at: new Date().toISOString(),
    });
  }

  async complete(id, task) {
    const isCompleted = task.completed_at !== null;

    return db.update(id, {
      completed_at: isCompleted ? null : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  async delete(id) {
    return db.delete(id);
  }
}