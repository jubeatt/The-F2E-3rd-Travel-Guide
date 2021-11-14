// 設定首頁路徑
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/The-F2E-3rd-Travel-Guide/' : '/',
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
  }
}
