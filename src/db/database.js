import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'tasks.json');

export class Database {
  #tasks = [];
  #ready;

  constructor() {
    this.#ready = this.#load();
  }

  async #load() {
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      this.#tasks = JSON.parse(data);
    } catch {
      this.#tasks = [];
      await this.#persist();
    }
  }

  async #persist() {
    await fs.writeFile(DB_PATH, JSON.stringify(this.#tasks, null, 2));
  }

  async list(filters = {}) {
    await this.#ready;

    const { title, description } = filters;
    let tasks = [...this.#tasks];

    if (title) {
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (description) {
      tasks = tasks.filter(t =>
        t.description?.toLowerCase().includes(description.toLowerCase())
      );
    }

    return tasks;
  }

  async findById(id) {
    await this.#ready;
    return this.#tasks.find(t => t.id === id) ?? null;
  }

  async create(task) {
    await this.#ready;
    this.#tasks.push(task);
    await this.#persist();
    return task;
  }

  async update(id, data) {
    await this.#ready;
    const index = this.#tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    this.#tasks[index] = { ...this.#tasks[index], ...data };
    await this.#persist();
    return this.#tasks[index];
  }

  async delete(id) {
    await this.#ready;
    const index = this.#tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.#tasks.splice(index, 1);
    await this.#persist();
    return true;
  }
}
