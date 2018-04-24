// pages/webview/webview.js
const app = getApp()
const globalData = app.globalData
// web-view 链接地址中的 域名：m.zbgedu.com
const weburl = globalData.listurl

Page({
  data: {
    listurl: null
  },
  onLoad: function (res) {
    //拼接web-view的链接地址
    this.data.listurl = weburl + res.url
    this.setData({
      listurl: this.data.listurl
    })
  }
})