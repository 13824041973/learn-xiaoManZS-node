#!/usr/bin/env node
const fs = require('node:fs')

const { program } = require('commander')
const { checkPath, downloadTemp } = require('./util')
// const inquirer = require('inquirer')

// //添加create 命令 和 别名c 以及描述 以及 执行完成之后的动作
program.command('create <projectName>').alias('c').description('创建项目').action(
    // 创建的项目名称
    projectName => {
        if (checkPath(projectName)) {
            console.log('文件已存在');
            return
        }
        import('inquirer').then(({ default: inquirer }) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'project name',
                    default: projectName
                },
                {
                    type: 'confirm',
                    name: 'isTs',
                    message: '是否支持typeScript'
                }
            ]).then(answers => {
                if (answers.isTs) {
                    downloadTemp('ts', answers.projectName)
                } else {
                    downloadTemp('js', answers.projectName)
                }
            })
        })
    })

let json = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
program.version(json.version)

program.parse(process.argv)