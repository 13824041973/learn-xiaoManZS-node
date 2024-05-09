process.on('message', msg => {
    console.log('子进程收到的：' + msg);
})

process.send('我是子进程')