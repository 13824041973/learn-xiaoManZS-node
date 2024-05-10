import express from 'express';

const app = express();

app.use('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') // 允许http://127.0.0.1:5500访问我们的服务
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/info', (req, res) => {
    res.json({
        url: 'info'
    })
})

app.post('/post', (req, res) => {
    res.json({
        method: 'post'
    })
})

app.patch('/patch', (req, res) => {
    res.json({
        method: 'patch'
    })
})

app.get('/get', (req, res) => {
    res.set('luyolg', '18cm')
    res.setHeader("Access-Control-Expose-Headers", "luyolg")
    res.json({
        method: 'get'
    })
})

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.status(200)
    setInterval(() => {
        res.write('event: text\n')
        res.write(`data: ${new Date().getTime()}\n\n`)
    }, 2000);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})