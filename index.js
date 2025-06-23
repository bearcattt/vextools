import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyCompress from '@fastify/compress'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fastify = Fastify({
  logger: true,
})

await fastify.register(fastifyCompress, { global: true })
await fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/',
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=86400')
  },
})

fastify.get('/', async (req, reply) => {
  return reply.type('text/html').sendFile('index.html')
})

try {
  await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
  console.log('Server running on http://localhost:3000')
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
