// pages/wordDetail/wordDetail.js
const app = getApp()
const globalData = app.globalData
const posturl = globalData.pathurl
//!globalData.isClick

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    favor: true,
    wordDetail: null
  },
  
  onLoad: function (option) {
    let _this = this
    let wordid = option.id
    let wordname = option.name
    let storage = {
      id: wordid,
      name: wordname
    }
    let thehistory = wx.getStorageSync('wordhistory') || []
    
    wx.request({
      url: posturl + '/api/teachsource/englishWord/searchEnglishWordDetailById?englishWordId=' + wordid,
      success: function(res){
        let thisobject = null
        thisobject = res.data.data[0]
        let reg = new RegExp('<[a-z]+>','ig')
        thisobject.description = thisobject.description.replace(reg,'')
        _this.setData({
          wordDetail: thisobject
        })
        if (!_this.wordFilter(thehistory, wordid)){
          thehistory.push(storage)
          wx.setStorageSync('wordhistory', thehistory)
        }
      }
    })
    
  },

  wordFilter:function(arr,word){
    // 过滤缓存中是否存在某个历史单词，如果有那么就返回true，否则返回false
    let isnub = 0
    for(let one of arr){
      if (one.id == word){
        isnub++
      }
    }
    if (isnub>0){
      return true
    }else{
      return false
    }
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