// pages/video/video.js
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    wordDetail: {},
    comment: '',
    menu: false
  },
  onLoad() {
    this.setData({
      wordDetail: globalData.wordDetail
    })
    console.log(this.data.wordDetail)
  },

  // 输入评论
  comment(e) {
    this.setData({
      comment: e.detail.value
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