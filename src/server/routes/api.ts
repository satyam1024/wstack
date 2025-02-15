import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth-middleware';

const app = new Hono();

app.get('/hello', (c) => {
  return c.json({ message: 'Hello from Hono API!' });
});

app.get("/protected", authMiddleware, (c) => {
  const user: any = c.get("user");

  return c.json({ message: "Protected API Data", name: user.name });
});


export default app;