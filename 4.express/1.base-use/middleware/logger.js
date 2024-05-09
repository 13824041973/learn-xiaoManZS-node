import log4js from 'log4js';

log4js.configure({
    appenders: {
        out: {
            type: 'stdout', // 输出到控制台
            layout: {
                type: 'colored'
            }
        },
        file: {
            type: 'file', // 输出到文件
            filename: './logs/server.log'
        }
    },
    categories: {
        default: {
            appenders: ['out', 'file'],
            level: 'debug'
        }
    }
})

const logger = log4js.getLogger('default');

const loggerMiddleware = (req, res, next) => {
    logger.debug(`${req.method}: ${req.url}`)
    next()
}

export default loggerMiddleware