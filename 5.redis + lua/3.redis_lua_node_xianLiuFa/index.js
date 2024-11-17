import express from 'express';
import Redis from 'ioredis'
import fs from "fs"

const redis = new Redis();
const app = express();

const lua = fs.readFileSync("./index.lua", "utf8");

const TIME = 30
const CHANGE = 5
const KEY = 'lottery'

app.use("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.get("/lottery", (req, res) => {
    redis.eval(lua, 1, KEY, CHANGE, TIME, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result >= 5) {
            res.send("30s内抽奖次数已用完")
        } else {
            res.send("抽奖成功")
        }
    })
})

app.listen(3000, () => {
    console.log("listening on 3000");
})