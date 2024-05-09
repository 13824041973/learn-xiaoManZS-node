import express from 'express';

const app = express();

// 白名单
const whiteList = ['localhost']

const preventHotLinking = (req, res, next) => {
    const referer = req.get('referer');
    if (referer) {
        const { hostname } = new URL(referer);
        if (!whiteList.includes(hostname)) {
            res.status(403).send('Forbidden')
            return
        }
    }
    next()
}

app.use(preventHotLinking)
app.use('/test-hotlinking', express.static('static'))

app.listen(3000, () => {
    console.log('listening on port 3000');
})