import express from "express";

import User from './src/user.js'
import List from './src/list.js'

const app = express();
app.use(express.json())
app.use('/user', User)
app.use('/list', List)

app.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('动态参数')
})

app.listen(3000, () => { console.log("listening on port 3000") })