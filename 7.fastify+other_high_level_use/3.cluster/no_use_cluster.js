import http from 'http'

http.createServer((req, res) => {
    res.writeHead(200)
    res.end("cluster is running")
}).listen(6000, () => {
    console.log("http server listening on 6000")
})