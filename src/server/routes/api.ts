import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth-middleware';
import {prisma} from '../../lib/db';

const app = new Hono();

// app.get('/hello', (c) => {
//   return c.json({ message: 'Hello from Hono API!' });
// });

// app.get("/protected", authMiddleware, (c) => {
//   const user: any = c.get("user");

//   return c.json({ message: "Protected API Data", name: user.name });
// });


app.post("/task", async (c) => {
  console.log(c);
  const { title } = await c.req.json();
  if (!title.trim()) return c.json({ error: "Title is required" }, 400);

  const newapp = await prisma.todo.create({ data: { title } });
  return c.json(newapp);
});


app.get("/task", async (c) => {
  const tasks = await prisma.todo.findMany();
  
  return c.json(tasks);
});

app.put("/changeStatus/:id", async (c) => {
  const id = c.req.param("id");
  const app = await prisma.todo.findUnique({ where: { id } });

  if (!app) return c.json({ error: "app not found" }, 404);

  const updatedapp = await prisma.todo.update({
    where: { id },
    data: { isCompleted: !app.isCompleted },
  });

  return c.json(updatedapp);
});

app.put("/changeTask/:id", async (c) => {

  const id = c.req.param("id");

  const app = await prisma.todo.findUnique({ where: { id } });

  if (!app) return c.json({ error: "app not found" }, 404);

  const { title } = await c.req.json();

  const updatedapp = await prisma.todo.update({
    where: { id },
    data: { title:title },
  });

  return c.json(updatedapp);
});

app.delete("/task/:id", async (c) => {
  const id = c.req.param("id");
  console.log("here");
  await prisma.todo.delete({ where: { id } });
  return c.json({ message: "Deleted successfully" });
});




export default app;

