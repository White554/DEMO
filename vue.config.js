module.exports = ({
  transpileDependencies: true,
  // 关闭eslint 
  lintOnSave: false,
  // 不生成map文件 
  productionSourceMap:false,
  // 代理跨域
  devServer: {
    proxy: {
        '/api': {
            target: 'http://gmall-h5-api.atguigu.cn',
            // pathRewrite: {'':''}
        }
    }
  }
})
