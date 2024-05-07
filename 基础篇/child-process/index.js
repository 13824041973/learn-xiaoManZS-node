const { execFile, fork } = require('child_process')
const path = require('path')

// execFile(path.resolve(__dirname, './bat.cmd'), null, (err, stdout) => {
//     console.log(stdout.toString());
// })



const testProcess = fork('./test.js')

testProcess.send('我是主进程')

testProcess.on('message', msg => {
    console.log('主进程收到的：' + msg);
})