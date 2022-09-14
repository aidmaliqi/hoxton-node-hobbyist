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
  const hobbies = await prisma.hobbies.findMany({ include: { Users: true } });
  res.send(hobbies);
});
app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    include: { hobby: true },
    where: { id: Number(req.params.id) },
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

app.get("/hobbies/:id", async (req, res) => {
  const hobbie = await prisma.hobbies.findUnique({
    where: { id: Number(req.params.id) },
    include: { Users: true },
  });
  res.send(hobbie);
});

app.delete("/users/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: Number(req.params.id) },
    include: { hobby: true },
  });
  res.send(user);
});
app.delete("/hobbies/:id", async (req, res) => {
  const hobbie = await prisma.hobbies.delete({
    where: { id: Number(req.params.id) },
    include: { Users: true },
  });
  res.send(hobbie);
});

app.post("/users", async (req, res) => {
  const userData = {
    hobby: req.body.hobby ? req.body.hobby : [],
  };

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      img: req.body.img,
      hobby: {
        connectOrCreate: userData.hobby.map((item: any) => ({
          where: { name: item.name },
          create: {
            name: item.name,
            active: item.active,
          },
        })),
      },
    },
    include: { hobby: true },
  });

  res.send(user);
});

app.post("/hobbies", async (req, res) => {
  const hobbiesData = {
    name: req.body.name,
    active: req.body.active,
    Users: req.body.Users ? req.body.Users : [],
  };

  const hobby = await prisma.hobbies.create({
    data: {
      name: hobbiesData.name,
      active: hobbiesData.active,
      Users: {
        connectOrCreate: hobbiesData.Users.map((item: any) => ({
          where: { email: item.email },
          create: { name: item.name, email: item.email },
        })),
      },
    },
    include: { Users: true },
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
//working on it 
app.patch("/usersUpdateHobies/:id", async (req, res) => {
  const patchingData = {
    hobbyName : req.body.name,
    avtivity : req.body.active
  }
  const user = await prisma.user.update({
    where: {id : Number (req.params.id)},
    data: {
      hobby : {
        connectOrCreate: {

        }
      }
    },
    include: { hobby: true },
  });
  res.send(user);
});

app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`);
});
