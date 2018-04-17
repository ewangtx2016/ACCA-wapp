// pages/wordDetail/wordDetail.js
const app = getApp()
const globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    favor: true,
    wordDetail: {
      word: 'account',
      trans: '会计',
      video: {title: 'CFA L1 Reading 9::Probability Standards',
      src: 'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/13_9182e6961320c50b2553cce4b0e900ac.mp4'},
      conment: [{
        username: '马云',
        userpic: 'http://www.zbgedu.com/statics/images/zb/images-df/yw_inright_xlr.png',
        msg: '这个单词是真的难记住啊，得亏这个小词典帮了我的大忙啊!!!!!!!!'
      },
      {
        username: '马云',
        userpic: 'http://www.zbgedu.com/statics/images/zb/images-df/yw_inright_xlr.png',
        msg: '这个单词是真的难记住啊，得亏这个小词典帮了我的大忙啊!!!!!!!!'
      }]
    }
  },
  
  onLoad: function (option) {
    let words = option
    this.setData({
      word: words
    })

    if ((!words.word) || words.history) return
    if (globalData.historyWords.length) {
      for (let key of globalData.historyWords) {
        if (key.word == words.word) {
          return false
        }
      }
    }
    // if (!globalData.historyWords.includes(words)) {
    globalData.historyWords.push(words)
    // }
    app.setHistoryWord()
  },

  // 页面跳转到单词查询
  biu() {
    if (!globalData.isClick) return
    wx.redirectTo({
      url: '/pages/dictionary/dictionary',
    })
    app.setIsClick()
  },

  // 收藏单词
  favorWord() {
    if (!globalData.isClick) return false
    this.setData({
      favor: !this.data.favor
    })
    app.setIsClick()
  },

  // 跳转到视频播放界面
  video() {
    if (!globalData.isClick) return
    wx.navigateTo({
      url: '/pages/video/video',
    })
    app.setIsClick()
  }
})