import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from "fs"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/") // 将传入的切片文件存至uploads文件夹
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.index}-${req.body.fileName}`) // 存入文件的文件名
    }
})

const upload = multer({ storage })

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('./static'))

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('ok')
})

app.post('/merge', async (req, res) => {
    const uploadPath = './uploads'
    let files = fs.readdirSync(path.join(process.cwd(), uploadPath))
    files = files.sort((a, b) => a.split('-')[0] - b.split('-')[0]) // 取回来的文件需要按原切片顺序排序
    const writePath = path.join(process.cwd(), 'video', `${req.body.fileName}.mp4`)
    files.forEach(item => {
        fs.appendFileSync(writePath, fs.readFileSync(path.join(process.cwd(), uploadPath, item)))
        fs.unlinkSync(path.join(process.cwd(), uploadPath, item))
    })

    res.send('merge ok')
})

app.post('/download', function (req, res) {
    const fileName = req.body.fileName
    const filePath = path.join(process.cwd(), './static', fileName)
    const content = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'attachment;filename=' + fileName)
    res.send(content)
})

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});