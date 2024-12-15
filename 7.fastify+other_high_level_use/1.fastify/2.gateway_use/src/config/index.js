export const rateLimitConfig = {
    max: 5,
    timeWindow: '1 minute'
}

export const cachingConfig = {
    privacy: 'private', //缓存客户端服务器 禁止缓存代理服务器
    expiresIn: 1000 //缓存1s
}

export const breakerConfig = {
    errorThresholdPercentage: 40, //超过 40% 会触发熔断
    timeout: 1000, //超过 1s 会触发熔断
    resetTimeout: 5000, //熔断后 5s 会重置
}