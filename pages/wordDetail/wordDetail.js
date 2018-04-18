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
    favor: false,
    wordDetail: null,
    wordid: null,
    wordname: null,
    wordcname: null,
    storage: null,
    thehistory: null,
    thefavor: null
  },
  
  onLoad: function (option) {
    let _this = this
    _this.data.wordid = option.id
    _this.data.wordname = option.name
    _this.data.wordcname = option.cname
    _this.data.storage = {
      id: _this.data.wordid,
      name: _this.data.wordname,
      cname: _this.data.wordcname
    }
    _this.data.thehistory = wx.getStorageSync('wordhistory') || []
    _this.data.thefavor = wx.getStorageSync('wordfavor') || []
   
    //会否收藏
    this.checkStar()

    //请求当前单词的mess详细信息
    wx.request({
      url: posturl + '/api/teachsource/englishWord/searchEnglishWordDetailById?englishWordId=' + this.data.wordid,
      success: function(res){
        let thisobject = null
        thisobject = res.data.data[0]
        let reg = new RegExp('<[a-z]+>','ig')
        thisobject.description = thisobject.description.replace(reg,'')
        _this.setData({
          wordDetail: thisobject
        })
        if (!_this.wordFilter(_this.data.thehistory, _this.data.wordid)){
          _this.data.thehistory.push(_this.data.storage)
          wx.setStorageSync('wordhistory', _this.data.thehistory)
        }
      }
    })
    
  },

  checkStar: function(){
    if (!this.wordFilter(this.data.thefavor, this.data.wordid)) {
      this.data.favor = false
      this.setData({
        favor: this.data.favor
      })
    } else {
      this.data.favor = true
      this.setData({
        favor: this.data.favor
      })
    }
  },

  wordFilter:function(arr,wordid){
    // 过滤缓数组中是否存在某个元素，如果有那么就返回true，否则返回false
    let isnub = 0
    for(let one of arr){
      if (one.id == wordid){
        isnub++
      }
    }
    if (isnub>0){
      return true
    }else{
      return false
    }
  },

  wordDelof(arr,wordid){
    let isnub = 0
    let wordindex = null
    for (let one of arr) {
      if (one.id == wordid) {
        wordindex = arr.indexOf(one)
      }
    }
    arr.splice(wordindex, 1)
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
    
    //收藏的业务逻辑
    if (!this.wordFilter(this.data.thefavor, this.data.wordid)){
      this.data.thefavor.push(this.data.storage)
    }else{
      this.wordDelof(this.data.thefavor, this.data.wordid)
    }
    wx.setStorageSync('wordfavor', this.data.thefavor)
    //会否收藏
    this.checkStar()

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