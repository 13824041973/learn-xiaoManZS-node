import express from 'express'
import { WebSocketServer } from 'ws'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

const connection = {}

const server = app.listen(3001)
const wss = new WebSocketServer({ server })

wss.on('connection', ws => {
    ws.on('message', msg => {
        const data = JSON.parse(msg)
        if (data.action === 'login') {
            if (connection[data.id] && connection[data.id].fingerprint) {
                console.log('账号在别处登录')
                connection[data.id].socket.send(JSON.stringify({
                    action: 'logout',
                    message: `你于${new Date().toLocaleString()}账号在别处登录`
                }))
                connection[data.id].socket.close()
                connection[data.id].socket = ws
            }
            else {
                console.log('首次登录')
                connection[data.id] = {
                    socket: ws,
                    fingerprint: data.fingerprint
                }
            }
        }
    })
})