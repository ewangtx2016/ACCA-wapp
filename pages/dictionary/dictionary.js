// pages/dictionary/dictionary.js
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    search: '',
    searchWords: [],
    historyWord: []
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
    let wordsBak = globalData.words[(word[0]).toUpperCase()]
    if (!wordsBak) return false
    if (!word[1]) {
      this.setData({
        searchWords: wordsBak
      })
      return false
    }
    for (let val of wordsBak) {
      if (reg.test(val.word)) {
        sw.push(val)
      }
    }
    this.setData({
      searchWords: sw
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
    this.setData({
      historyWord: []
    })
    globalData.historyWords = []
  },

  onLoad() {
    console.log(globalData.historyWords)
    globalData.wordDetail = {}
    this.setData({
      historyWord: globalData.historyWords
    })
  }
})