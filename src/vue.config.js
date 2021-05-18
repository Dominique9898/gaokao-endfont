module.exports = {
    devServer: {
        port:8081,
        proxy: {
          '/api': {
            target: 'https://dominikcloud.ltd/api', //对应自己的接口
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      }
}