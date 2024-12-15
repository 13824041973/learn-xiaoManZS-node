export default [
    {
        upstream: 'http://localhost:9001',
        prefix: '/pc',
        rewritePrefix: "", //实际请求将pc 替换成 '' 因为后端服务器没有pc这个路由
        httpMethods: ['GET', 'POST']
    },
    {
        upstream: 'http://localhost:9002',
        prefix: '/mobile',
        rewritePrefix: "",
        httpMethods: ['GET', 'POST']
    },
]