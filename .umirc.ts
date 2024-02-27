import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/locale'
  ],
  routes: [
    { path: "/", component: "index" },
    // { path: "/home", component: "home" }
  ],
  npmClient: 'yarn',
  title:"xxx",
  jsMinifierOptions: {
    target: ['chrome80', 'es2020']
  },
  // styledComponents: {},
  // antd:{},
  clientLoader: {},
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
    useLocalStorage: true,
    baseNavigator: false,
    title:false
  },
  // headScripts: [
  //   { src: `https://cstaticdun.126.net/load.min.js?t=${new Date().getTime()}`},
  //   { src: `https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.3.1/swiper-bundle.min.js?t=${new Date().getTime()}`},
  //   { src: "https://www.googletagmanager.com/gtag/js?id=G-DF3LQ261MQ"},
  //   `window.dataLayer = window.dataLayer || [];
  //       function gtag(){dataLayer.push(arguments)}
  //       gtag('js', new Date());

  //       gtag('config', 'G-DF3LQ261MQ');`
  // ],
  chainWebpack(config:any) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
  hash:true,
  history:{
    type:'hash'
  },
  metas:[
    {
      "http-equiv":'Cache-Control',
      content:'no-cache, no-store, must-revalidate'
    },
    {
      "http-equiv":"Pragma",
      content:'no-cache'
    },
    {
      "http-equiv":"Expires",
      content:"0"
    }
  ]
});
