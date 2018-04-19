// pages/video/video.js
const app = getApp()
const globalData = app.globalData
const posturl = globalData.pathurl

Page({
  data: {
    menu: false,
    playurl: null,
    thisobj: null
  },
  onLoad(res) {
    let _this = this
    _this.setData({
      playurl: res
    })
    console.log(res)
    wx.request({
      url: posturl + '/api/teachsource/lesson/video/getVideosByCCId?ccid=' + res.ccid,
      success: function(res){
        console.log(res)
        let thisobj = null
        let ccobj = null
        if (res.statusCode == 200 && res.data.data.length > 0){
          thisobj = {
            title: res.data.data[0].title
          }
          _this.setData({
            thisobj:thisobj
          })
          if (res.data.data[0]['ccdata']){
            ccobj = JSON.parse(res.data.data[0]['ccdata'])
            console.log(ccobj)
          }
        }
      }
    })
  },


  // 显示菜单
  menuShow() {
    this.setData({
      menu: !this.data.menu
    })
  },

  // 咨询
  zixun() {
    wx.navigateTo({
      url: '/pages/consult/consult',
    })
  }
})