const { defineConfig } = require("@vue/cli-service");

const CDN = {
  css: ["https://unpkg.com/element-plus/dist/index.css"],
  js: [
    // "https://unpkg.com/vue@3/dist/vue.global.prod.js", // 生产环境
    "https://unpkg.com/vue@next",
    "https://unpkg.com/element-plus",
    "https://unpkg.com/axios/dist/axios.min.js",
    "https://unpkg.com/vue-router@4",
    "https://unpkg.com/vuex@4",
  ],
};

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
      externals: {
        devtool: "nosources-source-map",
        vue: "Vue",
        axios: "axios",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        "element-plus": "ElementPlus",
      },
    };
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].cdn = CDN;
      return args;
    });
  },
});
