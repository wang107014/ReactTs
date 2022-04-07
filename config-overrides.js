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
  overrideDevServer
} = require('customize-cra')
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeConfig = lessToJs(
  fs.readFileSync(path.join(__dirname, './src/assets/theme/var.less'), 'utf8'),
  {
    stripPrefix: true,
    resolveVariables: false,
  },
);

const devServerConfig = () => (config) => {
  return {
    ...config,
    // proxy: {
    //   '/v1/xsmes': {
    //     target: 'https://arktest.boe.com.cn',
    //     changeOrigin: true,
    //   },
    // },
  };
};

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    // 配置路径别名
    addWebpackAlias({
      '@': path.resolve('src'),
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        localIdentName: '[local]--[hash:base64:5]',
        modifyVars: themeConfig,
      },
    }),
    // antd按需加载 - babel-plugin-import
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
  ),
  // 本地启动配置，可以设置代理
  devServer: overrideDevServer(devServerConfig()),
}
