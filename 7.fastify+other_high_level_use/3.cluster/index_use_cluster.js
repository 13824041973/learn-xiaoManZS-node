import cluster from 'node:cluster'
import http from 'http'
import os from 'os'

const numCPUs = os.cpus().length

console.log(numCPUs)

// 主进程
if (cluster.isPrimary) {
    console.log("@@@")
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
}
// 子进程
else {
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('cluster is running')
    }).listen(3000, () => {
        console.log("http server listening on port 3000")
    })
}