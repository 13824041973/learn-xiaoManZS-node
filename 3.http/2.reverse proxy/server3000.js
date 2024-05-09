const http = require('http')
const url = require('url')

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    console.log(req.url);
    if (pathname === '/api') {
        res.end('成功代理到3000端口')
    }
}).listen(3000, () => {
    console.log('3000端口服务启动');
})