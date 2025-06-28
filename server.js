import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getProgram } from './server/programs.js';
import { getTeams } from './server/getTeams.js';

dotenv.config();

if (!process.env.KEY) {
  console.error('ERR: env value "KEY" is required. Follow readme for more info.');
  process.exit(1);
}
const token = process.env.KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: false });
const PORT = process.env.PORT || 3000;

await fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  wildcard: false,
});

fastify.get('/api/teams', async (request, reply) => {
  const params = new URLSearchParams();

  if (request.query.id) {
    params.append('number', request.query.id);
  }

  if (request.query.query) {
    const number = getProgram(request.query.query);
    if (number !== undefined) {
      params.append('program', number);
    }
  }

  const baseUrl = `https://www.robotevents.com/api/v2/teams?per_page=100&registered=true&${params.toString()}`;
  // dev stuf console.log('base url', baseUrl);
  try {
    const teams = await getTeams(token, baseUrl);
    return { data: teams };
  } catch (err) {
    request.log.error(err);
    reply.status(500).send({ error: 'Failed to fetch team info' });
  }
});

fastify.get('/api/matches/:id', (request, reply) => {
  // todo
});

fastify.get('/*', async (request, reply) => {
  return reply.sendFile('index.html');
});

fastify.listen({ port: PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
