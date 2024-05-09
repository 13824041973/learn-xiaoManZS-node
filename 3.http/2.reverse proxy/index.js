const http = require('http');
const url = require('url');
const fs = require('fs');

const { createProxyMiddleware } = require('http-proxy-middleware')

const html = fs.readFileSync('./index.html', 'utf8');
const config = require('./luyolg.config.js');

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const proxyList = Object.keys(config.server.proxy)

    // 如果请求的是需要代理的url
    if (proxyList.includes(pathname)) {
        const proxy = createProxyMiddleware(config.server.proxy[pathname])
        proxy(req, res)
        return
    }

    console.log('pathname: ' + pathname);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(html)
}).listen(80, () => {
    console.log('80端口服务启动');
})