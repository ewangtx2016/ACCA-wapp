// pages/webview/webview.js
const app = getApp()
const globalData = app.globalData
// web-view 链接地址中的 域名：m.zbgedu.com
const weburl = globalData.listurl
//ajax请求统计代码接口 域名：www.zbgedu.com
const webajax = globalData.classurl

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

    wx.request({
      url: webajax + '/index.php?m=out_api&c=importVisit&a=save_user_visit',
      method:'POST',
      data: {
        url: this.data.listurl,
        ivid: wx.getStorageSync('useid')
      },
      success: (res) => {
        
      }
    })
  }
})