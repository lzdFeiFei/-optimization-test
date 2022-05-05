const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "": {
        target: "http://localhost:3000/", //对应自己的接口
        changeOrigin: true,
        ws: true,
      },
    },
  },
  configureWebpack: (config) => {
    return {
      plugins: [
        new DllReferencePlugin({
          manifest: require("./build/vendor-manifest.json"),
        }),
        new DllReferencePlugin({
          manifest: require("./build/utils-manifest.json"),
        }),
        // 将 dll 注入到 生成的 html 模板中
        // new HtmlWebpackPlugin(),
        new AddAssetHtmlPlugin([
          {
            filepath: path.resolve(__dirname, "./build/vendor.dll.js"),
          },
          {
            filepath: path.resolve(__dirname, "./build/utils.dll.js"),
          },
        ]),
      ],
    };
  },
});
