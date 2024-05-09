# 创建脚手架的步骤

## 我们会用到的第三方库

1.commander
2.inquirer
3.ora
4.download-git-repo

## index.js

为什么第一行要写 #!/usr/bin/env node

这是一个 特殊的注释 用于告诉操作系统用 node 解释器去执行这个文件，而不是显式地调用 node 命令

## package.json

bin 增设命令

```json
"type": "module", //使用import需要设置这个
"bin": {
    "LuyolG-cli": "cli/index.js"
},
```

用于生成软连接挂载到全局，便可以全局执行 LuyolG-cli 这个命令，配置完成之后 需要在命令行执行
`npm link`
