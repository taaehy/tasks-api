import { TasksController } from '../controllers/tasks.controller.js';

const controller = new TasksController();

export const routes = [
  {
    method: 'GET',
    path: /^\/tasks(\?.*)?$/,
    handler: controller.index.bind(controller),
  },
  {
    method: 'POST',
    path: /^\/tasks$/,
    handler: controller.store.bind(controller),
  },
  {
    method: 'PUT',
    path: /^\/tasks\/([a-f0-9-]+)$/,
    handler: controller.update.bind(controller),
  },
  {
    method: 'PATCH',
    path: /^\/tasks\/([a-f0-9-]+)\/complete$/,
    handler: controller.complete.bind(controller),
  },
  {
    method: 'DELETE',
    path: /^\/tasks\/([a-f0-9-]+)$/,
    handler: controller.destroy.bind(controller),
  },
];