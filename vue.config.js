const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const path = require("path");

const productionGzipExtensions = ["js", "css"];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  devServer: {
    host: "0.0.0.0",
    port: 9096,
    open: true
  },
  // vue-echarts-v3需要babel转码，才能兼容ie
  // 参考 https://github.com/xlsdg/vue-echarts-v3#usage
  transpileDependencies: ["iview"],
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set("@", resolve("src"))

    // 鼠标指针样式
    config.module
      .rule("mouse")
      .test(/\.(ico|cur)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "[path][name].[ext]"
      })
      .end();

    config.plugin("html").tap(args => {
      if (process.env.NODE_ENV === "development") {
        args[0].favicon = path.resolve("public/favicon.ico");
      }
      return args;
    });

    // use svg
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.include
      .add(resolve("src/icon/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // image exclude svg
    const imagesRule = config.module.rule("images");
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve("src/icon/svg"))
      .end();
  },
  // 生产环境打包去除console.log
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ?
      "cheap-module-eval-source-map" : "source-map",
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          // origin : https://stackoverflow.com/questions/55989693/warnings-is-not-a-supported-option-error-from-uglifyjs
          // lower Uglifyjs version use compress:{ pass } replace this
          uglifyOptions: {
            warnings: false,
            drop_console: false,
            drop_debugger: true
          },
          parallel: true,
          sourceMap: true
        })
      ]
    },
    // gzip
    plugins: process.env.NODE_ENV === "production" ? [
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp(
          "\\.(" + productionGzipExtensions.join("|") + ")$"
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    ] : []
  }
};