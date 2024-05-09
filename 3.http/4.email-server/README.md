## npm i js-yaml nodemailer

## yaml 文件是为了不将账号密码明文显示在 js 文件

## node 跑通 index.js 后，需请求 localhost 的 3000 端口

### 请求示例

post localhost:3000/send/mail

请求头： Content-Type: application/json

{
"to": "13544550504@163.com",
"subject": "很爱的组长",
"text": "你还好吗？"
}
