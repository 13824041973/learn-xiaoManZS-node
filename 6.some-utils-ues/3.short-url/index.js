import express from 'express';
import knex from 'knex'
import shortid from 'shortid'

const app = express();
app.use(express.json())
const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'luyolg'
    }
})

app.post('/create_url', async function (req, res) {
    const { url } = req.body
    const short_id = shortid.generate()
    const result = await db('short').insert({ short_id, url })
    res.send(`http://127.0.0.1:3000/${short_id}`)
})

app.get('/:short_id', async (req, res) => {
    const short_id = req.params.short_id
    const result = await db('short').select('url').where('short_id', short_id)
    if (result && result[0]) {
        res.redirect(result[0].url)
    } else {
        res.send('URL NOT FOUND')
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})