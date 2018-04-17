// pages/favorite/favorite.js
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    favorite: []
  },

  onLoad() {
    this.setData({
      favorite: globalData.favorite
    })
    console.log(this.data.favorite)
  }
})