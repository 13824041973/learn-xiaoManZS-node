const fs = require('fs')
const http = require('http')
const path = require('path')

http.createServer((req, res) => {
    const { url, method } = req

    // 处理静态资源
    if (method === 'GET' && url.startsWith('/static')) {
        const filePath = path.join(process.cwd(), url)
        console.log('File path: ' + filePath);
        import('mime').then(({ default: mime }) => {
            const mimeType = mime.getType(filePath)
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, {
                        "Content-Type": "text/plain"
                    })
                    res.end('not found')
                }
                else {
                    res.writeHead(200, {
                        "Content-Type": mimeType,
                        "cache-control": "public, max-age=3600"
                    })
                    res.end(data)
                }
            })
        })
    }
    else if ((method === 'POST' || method === 'GET') && url.startsWith('/api')) {
        // 处理动态资源请求
        res.end('这是动态资源的')
    }
    else res.end('123')
}).listen(80, () => {
    console.log('服务启动在80端口处');
})