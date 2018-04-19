//index.js
//获取应用实例
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    userinfo: null,
    imgUrls: [
      'http://www.zbgedu.com/uploadfile/img/2018/0327/265_176_152213440315287.jpg',
      'http://www.zbgedu.com/uploadfile/img/2018/0207/265_176_151799253213696.jpg',
      'http://www.zbgedu.com/uploadfile/img/2017/1211/265_176_151297735821851.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 300,
    zixun: [
      {
        id: 129,
        title: '2018FRM-P1考前通关串讲课（一）'
      },
      {
        id: 130,
        title: '2018FRM-P1考前通关串讲课（二）'
      },
      {
        id: 131,
        title: '2018FRM-P1考前通关串讲课（三）'
      }
    ]
  },

  // 页面跳转到单词查询
  biu: function () {
    if (!globalData.isClick) return
    wx.navigateTo({
      url: '/pages/dictionary/dictionary',
    })
    app.setIsClick()
  },

  // 咨询页面
  zixun() {
    if (!globalData.isClick) return
    wx.navigateTo({
      url: '/pages/favorite/favorite',
    })
    app.setIsClick()
  },

  onLoad() {
    let _this = this
    //获取用户信息
    app.getUserInfoCode(function(res){
      _this.setData({
        userinfo: res.userInfo
      })  
    })    
  }
})
