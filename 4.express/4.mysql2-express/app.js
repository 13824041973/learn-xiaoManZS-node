import express from 'express';
import mysql2 from 'mysql2/promise';
import fs from 'fs';
import jsyaml from 'js-yaml'

const yaml = fs.readFileSync('./db.config.yaml', 'utf-8')
const config = jsyaml.load(yaml)
const sql = await mysql2.createConnection({
    ...config.db
})
const app = express();
app.use(express.json()) // express天然不支持post请求，得用中间件

// 查询全部数据
app.get('/', async (req, res) => {
    const [data] = await sql.query(`select * from user`)
    res.send(data)
})
// 查询特定数据
app.get('/user/:id', async (req, res) => {
    const [data] = await sql.query(`select * from user where id = ?`, [req.params.id])
    res.send(data)
})

// 创建用户
app.post('/create', async (req, res) => {
    const { name, age, hobby, sex } = req.body
    await sql.query(`insert into user(name, age, hobby, sex) values (?,?,?,?)`, [name, age, hobby, sex])
    res.send({ ok: 1 })
})
// 编辑用户
app.post('/update', async (req, res) => {
    const { name, age, hobby, sex, id } = req.body
    await sql.query(`update user set name=?,age=?,hobby=?,sex=? where id = ?`, [name, age, hobby, sex, id])
    res.send({ ok: 1 })
})
// 删除用户
app.post('/delete', async (req, res) => {
    const { id } = req.body
    await sql.query(`delete from user where id = ?`, [id])
    res.send({ ok: 1 })
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})