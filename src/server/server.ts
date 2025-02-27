import { Hono } from 'hono'
import api from './routes/api'
import { rateLimiterMiddleware } from './middlewares/redis-middleware'

const app = new Hono()

app.use(rateLimiterMiddleware)
app.route('/api', api)

export default app
