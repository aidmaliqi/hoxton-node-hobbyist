import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["warn", "error", "info", "query"] });
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { hobby: true } });
  res.send(users);
});
app.get("/hobbies", async (req, res) => {
  const hobbies = await prisma.hobbies.findMany({ include: { User: true } });
  res.send(hobbies);
});
app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    include: { hobby : true },
    where: { id: Number(req.params.id) },
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: Number(req.params.id) },
  });
  res.send(user);
});
app.delete("/hobbies/:id", async (req, res) => {
  const hobbie = await prisma.hobbies.delete({
    where: { id: Number(req.params.id) },
  });
  res.send(hobbie);
});

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
    include: { hobby: true },
  });
  res.send(user);
});
app.post("/hobbies", async (req, res) => {
  const hobby = await prisma.hobbies.create({
    data: req.body,
    include: { User: true },
  });
  res.send(hobby);
});
app.patch("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
    include: { hobby: true },
  });
  res.send(user);
});

app.listen(port, () => {
    console.log(`App running: http://localhost:${port}`)
  })