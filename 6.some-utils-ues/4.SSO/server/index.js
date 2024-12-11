import express from 'express'
import session from 'express-session'
import fs from 'fs'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const appToMapUrl = {
    // vue应用id
    'qwe': {
        url: 'http://localhost:5173', // 应用对应的网址
        secretKey: 'qweqweqweqwe', // 对应的secretKey
        token: ""
    },
    'asd': {
        url: 'http://localhost:5174', // 应用对应的网址
        secretKey: 'asdasdasdasd', // 对应的secretKey
        token: ""
    }
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(session({
    secret: 'secretKey',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 过期时间
}))

const getToken = (appId) => {
    return jwt.sign({ appId }, appToMapUrl[appId].secretKey)
}

app.get('/login', (req, res) => {
    // 没登录过的才需要重定向到登陆页面

    console.log("@@@@@",req.session)

    if (req.session.username) {
        const appId = req.query.appId
        const url = appToMapUrl[appId].url
        let token
        if (appToMapUrl[appId].token) {
            token = appToMapUrl[appId].token
        } else {
            token = getToken(appId)
            appToMapUrl[appId].token = token
        }
        res.redirect(url + '?token=' + token)
        return
    }

    const html = fs.readFileSync('../sso.html', 'utf-8')
    res.send(html)
})

app.get('/protected', (req, res) => {
    const { appId, username, password } = req.query
    const url = appToMapUrl[appId].url
    const token = getToken(appId)
    req.session.username = username
    appToMapUrl[appId].token = token
    res.redirect(`${url}?token=${token}`)
})

app.listen(3000, () => {
    console.log('listen in 3000')
})