module.exports = {
    server: {
        proxy: {
            // 代理的路径
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
}