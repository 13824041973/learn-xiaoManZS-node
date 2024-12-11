import express from 'express'
import qrcode from "qrcode"
import jwt from "jsonwebtoken"

const user = {}
let userId = 1 // 模拟一个用户

const app = express()
app.use(express.json())
app.use("/static", express.static("public")) // 初始静态目录

app.get("/qrcode", async (req, res) => {
    user[userId] = {
        token: null,
        time: Date.now()
    }
    const code = await qrcode.toDataURL(`http://192.168.1.20:3000/static/mandate.html?userId=${userId}`)
    res.json({
        code,
        userId
    })
})

app.get("/check/:userId", (req, res) => {
    const id = req.params.userId
    // 判断超时
    if (Date.now() - user[id].time > 1000 * 60 * 1) {
        return res.json({
            status: 2
        })
    }
    // 有token就是授权了
    else if (user[id].token) {
        return res.json({
            status: 1
        })
    }
    else {
        return res.json({
            status: 0
        })
    }
})

// 授权登录
app.post("/login/:userId", (req, res) => {
    const userId = req.params.userId
    const token = jwt.sign(userId, "secret")
    user[userId].token = token
    user[userId].time = Date.now()
    res.json({
        token
    })
})

app.listen(3000, () => {
    console.log("listening on 3000")
})