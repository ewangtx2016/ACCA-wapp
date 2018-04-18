// pages/dictionary/dictionary.js
const app = getApp()
const globalData = app.globalData
const posturl = globalData.pathurl

Page({
  data: {
    search: '',
    searchWords: [],
    historyWord: wx.getStorageSync('wordhistory').slice(0,6) || []
  },

  // 获取输入
  what(e) {
    let value = e.detail.value.trim()
    this.setData({
      search: value
    })

    if (!value) {
      this.setData({
        searchWords: []
      })
      return false
    }

    this.searchWord(value)
  },

  // 单词处理
  searchWord(word) {
    let sw = []
    let reg = new RegExp(`^${word}`, 'i')
    let _this = this
    wx.request({
      url: posturl + '/api/teachsource/englishWord/searchEnglishWordPage?pageNo=1&pageSize=6&name=' + word,
      success: function(res){
        if (res.data.pageSize > 0){
          for (let one of res.data.data){
            sw = res.data.data
          }
          _this.data.searchWords = sw
          _this.setData({
            searchWords:_this.data.searchWords
          })
        }
      }
    })
  },

  // 搜索框单词清除
  hehe() {
    this.setData({
      search: '',
      searchWords: []
    })
  },

  // 清除历史
  historyClean() {
    wx.removeStorageSync('wordhistory')
    this.setData({
      historyWord: []
    })
  },

  onLoad() {
    this.setData({
      historyWord: wx.getStorageSync('wordhistory').slice(0, 6) || []
    })
    console.log(this.data.historyWord)
  }
})