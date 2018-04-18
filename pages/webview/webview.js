// pages/webview/webview.js
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    id: null,
    title: null,
    listurl: null
  },
  onLoad: function(res){
    //拼接web-view的链接地址
    this.data.listurl = globalData.listurl + '/Live-' + res.id + '.html'
    this.setData({
      id: res.id,
      title: res.title,
      listurl: this.data.listurl
    })
  },
  bindmessage: function(res){
    console.log(res)
  }
})