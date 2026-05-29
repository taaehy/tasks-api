import http from 'node:http';
import { routes } from './routes/tasks.routes.js';
import { jsonBodyParser } from './middlewares/json-body-parser.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const app = http.createServer(async (req, res) => {
  const { method, url } = req;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  await jsonBodyParser(req);

  const [pathname, queryString] = url.split('?');
  req.query = extractQueryParams(queryString);

  const route = routes.find(r => {
    return r.method === method && r.path.test(url);
  });

  if (!route) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Rota não encontrada.' }));
  }

  const match = pathname.match(route.path);
  req.params = match?.groups ?? {};

  if (match && match[1]) {
    req.params.id = match[1];
  }

  res.status = (code) => {
    res._statusCode = code;
    return res;
  };

  res.json = (data) => {
    res.writeHead(res._statusCode ?? 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  res.send = () => {
    res.writeHead(res._statusCode ?? 200);
    res.end();
  };

  return route.handler(req, res);
});

export default app;
