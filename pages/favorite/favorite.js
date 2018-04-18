// pages/favorite/favorite.js
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    favorite: []
  },
  onLoad() {
    this.data.favorite = wx.getStorageSync('wordfavor')
    this.setData({
      favorite: this.data.favorite
    })
  }
})