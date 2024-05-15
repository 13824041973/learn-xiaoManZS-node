import knex from 'knex';
import jsyaml from 'js-yaml'
import fs from 'fs';
import express from 'express';

const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
const config = jsyaml.load(yaml)

const db = knex({
    client: 'mysql2',
    connection: config.db
})

// db.schema.createTable('list', table => {
//     table.increments('id')
//     table.integer('age')
//     table.string('name')
//     table.string('body')
//     table.timestamps(true, true)
// }).then(() => { console.log('创建成功') })

const app = express()
app.use(express.json())

// 查询接口
app.get('/', async (req, res) => {
    const data = await db('list').select().orderBy('id', 'desc')
    const total = await db('list').count('* as total')
    res.json({
        code: 200,
        data,
        total: total[0].total
    })
})
// 根据id查询
app.get('/user/:id', async (req, res) => {
    const row = await db('user').select().where({ id: req.params.id })
    res.json({
        code: 200,
        data: row
    })
})
// 新增
app.post('/create', async (req, res) => {
    const { name, age, body } = req.body
    const info = await db('list').insert({ name, age, body })
    res.json({
        code: 200,
        info
    })
})
// 编辑
app.post('/update', async (req, res) => {
    const { name, age, body, id } = req.body
    const info = await db('list').update({ name, age, body }).where({ id })
    res.json({
        code: 200,
        info
    })
})
// 删除
app.post('/delete', async (req, res) => {
    const info = await db('list').delete().where({ id: req.body.id })
    res.json({
        code: 200,
        info
    })
})

// 事务
db.transaction(async (trx) => {
    try {
        await trx('list').update({ age: 3 }).where({ id: 1 })
        await trx('list').update({ age: -2 }).where({ id: 3 })
        await trx.commit()
    } catch (error) {
        await trx.rollback()
    }
})

app.listen(3000, () => {
    console.log('server run in 3000');
})