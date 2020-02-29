
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  define: {
    APP_SIGN: 'wuding',
    APP_NAME: '无定牌',
    API_BASE_URL: 'http://127.0.0.1:10080/api',
    SOCKET_WS_URL: 'http://127.0.0.1:10080',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '无定牌',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
