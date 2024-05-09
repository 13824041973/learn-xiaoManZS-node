const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    // 解析请求的URL，获取路径和请求参数
    const { pathname, query } = url.parse(req.url, true);


    if (req.method === 'GET') {
        if (pathname === '/get') {
            console.log('QUERY', query);
            res.end('get SUCCESS')
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404;
            res.end('Not Found');
        }
    } else if (req.method === 'POST') {
        if (pathname === '/post') {
            let data = ''
            req.on('data', chunk => {
                data += chunk
                console.log('DATA', data);
            })
            req.on('end', () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(data)
            })
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404;
            res.end('Not Found');
        }
    } else {
        res.statusCode = 400
        res.end('请求方法错误')
    }
}).listen(98, () => {
    console.log('98端口启动了');
})