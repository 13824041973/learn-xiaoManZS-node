// 通常http网络传输的压缩使用deflate，更快

const zlib = require('zlib')
const http = require('node:http')

const server = http.createServer((req, res) => {
    const txt = 'LuyolG'.repeat(10000)

    res.setHeader("Content-type", 'text/plan;charset=utf-8')
    res.setHeader("Content-Encoding", 'deflate')

    const result = zlib.deflateSync(txt)
    res.end(result)
})

server.listen(3000, () => {
    console.log('启动了');
})