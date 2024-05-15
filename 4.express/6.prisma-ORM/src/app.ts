import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port: number = 3000;

app.use(express.json());

// 新增
app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      post: {
        create: [
          {
            title: "标题1",
          },
          {
            title: "标题2",
          },
        ],
      },
    },
  });
  res.send(data);
});
// 修改
app.post("/update", async (req, res) => {
  const { id, name, email } = req.body;
  const data = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.send(data);
});
// 查找
app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      post: true,
    },
  });
  res.send(data);
});
// 单个查找
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.user.findMany({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});
// 删除！！！
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await prisma.post.deleteMany({
    where: {
      authorId: Number(id),
    },
  });
  // 不能光删除user表的数据，得将关联在post表的数据也删了
  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
