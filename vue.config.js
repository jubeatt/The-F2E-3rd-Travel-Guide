// 設定首頁路徑
module.exports = {
  // publicPath 路徑設定
  publicPath: process.env.NODE_ENV === 'production' ? '/The-F2E-3rd-Travel-Guide/' : '/',
  // css loader設定
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/scss/reset.scss";
           @import "@/assets/scss/variable.scss";
           @import "@/assets/scss/mixin.scss";
           @import "@/assets/scss/utilities.scss";
           @import "@/assets/scss/global.scss";
        `
      }
    }
  },
  // HTML模板標題設定
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '台灣旅遊導覽平台'
        return args
      })
  },
  // 圖標設定
  pwa: {
    iconPath: {
      favicon32: 'favicon.jpg',
      favicon16: 'favicon.jpg',
      appleTouchIcon: 'favicon.jpg',
      maskIcon: 'favicon.jpg',
      msTileImage: 'favicon.jpg'
    }
  }
}
