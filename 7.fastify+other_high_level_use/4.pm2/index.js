import http from 'http'

http.createServer((req, res) => {
    res.writeHead(200)
    res.end('Hello, World!\n')
}).listen(6000, () => {
    console.log("server listening on 6000")
})