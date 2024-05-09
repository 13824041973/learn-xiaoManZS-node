// fs的一个注意事项！

// 为什么先走setImmediate 呢，而不是fs

// Node.js 读取文件的时候是使用libuv进行调度的

// 而setImmediate是由V8进行调度的

// 文件读取完成后 libuv 才会将 fs的结果 推入V8的队列

const fs = require('node:fs')

fs.readFile('./test.txt', {
    encoding: 'utf-8',
    flag: 'r'
}, (err, data) => {
    if (err) throw err
    console.log('fs');
})

setImmediate(() => {
    console.log('immediate');
})