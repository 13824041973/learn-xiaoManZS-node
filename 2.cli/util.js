const fs = require('node:fs')
// const ora = require('ora')
const downlaod = require('download-git-repo')

let spinner
import('ora').then(({ default: ora }) => {
    spinner = ora('下载中')
})

// 验证路径
const checkPath = path => {
    return fs.existsSync(path)
}

// 下载
const downloadTemp = (branch, projectName) => {
    spinner.start()
    return new Promise((resolve, reject) => {
        downlaod(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, projectName, { clone: true }, err => {
            if (err) {
                reject(err)
                console.log(err);
            }
            resolve()
            spinner.succeed('下载完成')
        })
    })
}

module.exports = {
    checkPath,
    downloadTemp
}