import fastify from "fastify"
import proxy from "@fastify/http-proxy"
import rateLimit from "@fastify/rate-limit"
import caching from "@fastify/caching"
import CircuitBreaker from "opossum"
import { breakerConfig, cachingConfig, rateLimitConfig } from "./config/index.js"
import proxyConfig from './proxy/index.js'

const app = fastify({
    logger: false
})

// 熔断技术
const breaker = new CircuitBreaker((url) => {
    return fetch(url).then((res) => res.json()) //检测服务是否挂掉
}, breakerConfig)

app.register(caching, cachingConfig) //注册缓存服务

app.register(rateLimit, rateLimitConfig) //注册限流

proxyConfig.forEach(({ upstream, prefix, rewritePrefix, httpMethods }) => {
    app.register(proxy, {
        //请求代理服务之前触发熔断
        preHandler: (request, reply, done) => {
            //检测这个服务 如果服务挂掉立马熔断
            breaker.fire(upstream)
                .then(() => done())
                .catch(() => reply.code(503).send('Circuit breaker tripped'))
        },
        upstream,
        prefix,
        rewritePrefix,
        httpMethods
    })
})

//启动服网关
app.listen({ port: 3000 }).then(() => console.log('server running on port 3000'))