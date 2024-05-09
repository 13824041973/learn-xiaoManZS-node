const http = require('http');
const fs = require('fs');
const url = require('url');

const yaml = require('js-yaml');
const nodemailer = require('nodemailer');

let mailConfig = yaml.load(fs.readFileSync('./user.yaml', 'utf-8'))
let transPort = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    host: 'smtp.qq.com',
    secure: true,
    auth: {
        pass: mailConfig.pass,
        user: mailConfig.user
    }
})


http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    if (pathname === '/send/mail' && req.method === 'POST') {
        let mailInfo = ''
        req.on('data', (data) => {
            mailInfo += data.toString()
        })
        req.on('end', () => {
            const body = JSON.parse(mailInfo)
            const { to, subject, text } = body
            transPort.sendMail({
                to,
                from: mailConfig.user,
                subject,
                text
            })
            res.end('已发送')
        })
    }
}).listen(3000, () => {
    console.log('server run in 3000');
})
