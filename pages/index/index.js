//index.js
//获取应用实例
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    userImg: 'http://www.zbgedu.com/statics/images/zb/images-df/yw_inright_xlr.png',
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
      '专注于高端金融培训，帮助学员实现提升自我专业能力的同时，开拓更多渠道帮助学员实习、就业',
      'CFA&FRM+复旦金融专硕定向培养计划',
      'CFA&FRM大学生卓越金融人才千人计划',
      'CFA双语卓越课程',
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
    app.getUserInfoCode()
    let _this = this
  }
})
