/*
 * @Description: webpack配置
 * @Author: 王明龙
 * @Date: 2022-4-7 16:29
 */

const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  addLessLoader,
  fixBabelImports,
  overrideDevServer,
  adjustStyleLoaders
} = require('customize-cra')
const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const themeConfig = lessToJs(
  fs.readFileSync(path.join(__dirname, './src/assets/theme/var.less'), 'utf8'),
  {
    stripPrefix: true,
    resolveVariables: false,
  },
)

const devServerConfig = () => (config) => {
  return {
    ...config,
    // proxy: {
    //   '/v1/xsmes': {
    //     target: 'https://arktest.boe.com.cn',
    //     changeOrigin: true,
    //   },
    // },
  }
}
// 打包体积优化
const addOptimization = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
    }
    config.output.publicPath = process.env.REACT_APP_PATH + '/'
    // 关闭sourceMap
    config.devtool = false
  }
  return config
}
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ["last 2 version", ">1%", "iOS 7"]
    })
  ],
  webpack: override(
    addOptimization(),
    //  装饰器
    addDecoratorsLegacy(),
    // antd按需加载 - babel-plugin-import
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        localIdentName: '[local]--[hash:base64:5]',
        modifyVars: { '@primary-color': '#64BFBB'} // 全局主色,
      },
      sourceMap:true,
    }),

    // adjustStyleLoaders(({ use: [ , css] }) => {
    //   css.options.sourceMap = true;
    //   css.options.modules = {
    //     // 配置默认的样式名称规则
    //     localIdentName:'[name]__[local]--[hash:base64:5]',
    //     getLocalIdent:(loaderContext, localIdentName, localName, options) => {
    //       // 处理antd 的样式
    //       if (loaderContext.resourcePath.includes('node_modules')) {
    //         return localName;
    //       }
    //     }
    //   }
    // }),

    adjustStyleLoaders(({ use: [, , postcss] }) => {
      const postcssOptions = postcss.options;
      postcss.options = { postcssOptions };
    }),
    // 配置路径别名
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
  ),
  // 本地启动配置，可以设置代理
  devServer: overrideDevServer(devServerConfig()),
}
