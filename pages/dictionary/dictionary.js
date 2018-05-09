// pages/dictionary/dictionary.js
const app = getApp()
const globalData = app.globalData
const posturl = globalData.pathurl

Page({
  data: {
    search: null,
    searchNow: true,
    searchWords: [],
    historyWord: wx.getStorageSync('wordhistory').slice(0,6) || []
  },

  // 获取输入
  what(e) {
    let value = e.detail.value

    if(value == ''){
      this.setData({
        searchNow: true
      })
    }

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
      url: posturl + '/api/teachsource/englishWord/searchEnglishWordPage?pageNo=1&pageSize=6&name=' + word + '&certificate=CFA',
      success: function(res){
        if (res.data.pageSize > 0){
          for (let one of res.data.data){
            sw = res.data.data
          }
          _this.data.searchWords = sw
          _this.setData({
            searchWords:_this.data.searchWords,
            searchNow: false
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
    let wordhisar = wx.getStorageSync('wordhistory') || []
    this.setData({
      historyWord: wordhisar.reverse().slice(0, 6)
    })
  }
})