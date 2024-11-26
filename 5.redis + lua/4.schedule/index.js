import schedule from 'node-schedule'
import request from 'request'
import config from './config.js'

schedule.scheduleJob("*/5 * * * * *", () => {
    request(config.check_url, {
        method: 'post',
        headers: {
            Referer: config.url,
            Cookie: config.cookie
        },
    }, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log(body)
        }
        console.log("发生错误", err)
        console.log("@@@@@@@@", JSON.stringify(res))
        console.log("!!!!!!!!", body)
    })
})