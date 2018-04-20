//index.js
//获取应用实例
const app = getApp()
const globalData = app.globalData
const weburl = globalData.listurl
const classurl = globalData.classurl
const md5 = require('../../js/md5.js')

Page({
  data: {
    userinfo: null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 300,
    imgUrls: [
      {
        id: 1,
        url: 'http://www.zbgedu.com/uploadfile/img/2018/0313/152090943530819.jpg',
        title: 'CFA',
        linkurl: '/course/finance/cfa.html'
      },
      {
        id: 2,
        url: 'https://www.zbgedu.com/uploadfile/img/2017/1123/151142311744711.png',
        title: 'CFA',
        linkurl: '/cfa.html'
      }
    ],
    zixun: [
      {
        id: 1,
        title: '专注于高端金融培训，帮助学员实现提升自我专业能力的同时，开拓更多渠道帮助学员实习、就业',
        linkurl: '/course/finance/cfa/cfa.html'
      },
      {
        id: 2,
        title: 'CFA&FRM+复旦金融专硕定向培养计划',
        linkurl: '/course/finance/cfa/class-78.html'
      },
      {
        id: 3,
        title: 'CFA & FRM大学生卓越金融人才千人计划',
        linkurl: '/course/finance/cfa/class-79.html'
      },
      {
        id: 4,
        title: 'CFA双语卓越课程',
        linkurl: '/course/finance/cfa/class-cfa04.html'
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
  // ban图片点击事件
  banclick(event){
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + event.target.dataset.url
    })
  },
  onLoad() {
    let _this = this
    //获取用户信息
    app.getUserInfoCode(function(res){
      console.log(res.userInfo)
      _this.setData({
        userinfo: res.userInfo
      })  
    })

    

  }
})
