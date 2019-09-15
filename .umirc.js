
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Edgware',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
      locale: {
        enable: false, // default false
      },
    }],
  ],
  proxy: {
    "/api": {
      target: "https://api.chainx.org/",
      changeOrigin: true
    }
  },
  hash: true,
  base: '/edgware',
  publicPath: "./"
}
