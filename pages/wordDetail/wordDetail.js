// pages/wordDetail/wordDetail.js
const app = getApp()
const globalData = app.globalData
const posturl = globalData.pathurl
const ccurl = globalData.ccurl
const classurl = globalData.classurl
const md5 = require('../../js/md5.js')
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
    thefavor: null,
    thisvideo: [],
    ccid: null,
    cfaOpenClass: []
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
   
    //收藏按钮点击效果
    this.checkStar()

    // 获取公开课列表 - cfaOpenClass => md5.hexMD5()
    let classPage = 1
    let classSize = 10
    let classId = 3433
    let classTime = parseInt(new Date().getTime() / 1000)
    let openClassString = `m=out_api&c=course&a=open_course_list&pageOn=${classPage}&pageSize=${classSize}&typeId=${classId}&time=${classTime}`
    openClassString = md5.hexMD5(openClassString)
    let openClassHash = `m=out_api&c=course&a=open_course_list&pageOn=${classPage}&pageSize=${classSize}&typeId=${classId}&time=${classTime}&string=${openClassString}`
    openClassHash = md5.hexMD5(openClassHash)
    let openClassGetUrl = `/index.php?m=out_api&c=course&a=open_course_list&pageOn=${classPage}&pageSize=${classSize}&typeId=${classId}&time=${classTime}&hash=${openClassHash}`

    wx.request({
      url: classurl + openClassGetUrl,
      success: function(res){
        //_this.data.cfaOpenClass
        for(let one of res.data.data){
          let thistime = new Date(Number(one.endtime))
          let thisobj = {
            id: one.id,
            title: one.name,
            des: one.description,
            imgsrc: 'https://www.zbgedu.com/' + one.img,
            link: '/Live-' + one.id + '.html',
            teacher: one.teacher,
            datatime: thistime.getFullYear() + '年' + (thistime.getMonth() + 1) + '月' + thistime.getDate() +'日',
            tag: ''
          }
          
          _this.setData({
            cfaOpenClass: _this.data.cfaOpenClass.concat(thisobj)
          })
        }

      }
    })


    //请求当前单词的mess详细信息
    wx.request({
      url: posturl + '/api/teachsource/englishWord/searchEnglishWordDetailById?englishWordId=' + this.data.wordid,
      success: function(res){
        
        //判断是否请求成功，否则报错误信息内容
        if (res.statusCode != 200 || res.data.data.length <= 0){
          console.log('获取单词mess错误：' + res.statusCode + '[' + res.errMsg + ']')
          return false
        }

        let thisobject = null
        let wordccid = null
        let keys = null
        thisobject = res.data.data[0] || null
        wordccid =  thisobject.ccid || null
        
        console.log(thisobject)
        
        // 获取当前单词数据进行赋值
        _this.setData({
          wordDetail: thisobject
        })
        if (!_this.wordFilter(_this.data.thehistory, _this.data.wordid)){
          _this.data.thehistory.push(_this.data.storage)
          wx.setStorageSync('wordhistory', _this.data.thehistory)
        }

        //通过ccid获取视频信息数据表
        wx.request({
          url: posturl + '/api/teachsource/lesson/video/getVideosByCCId?ccid=' + wordccid,
          success: function (res) {
            if (res.statusCode == 200 && res.data.data.length > 0){
              keys = res.data.data
              for (var i = 0; i < keys.length;i++){
                if (keys[i].videoCcid && keys[i].apiKey){
                  _this.getCCvideo(keys[i], keys[i].title)
                }else{
                  console.log('参数不完整')
                }
              }
              
            }else{
              console.log('ccid错误')
            }
          }
        })

       
      }
    })
    
  },

  getCCvideo:function(obj,title){
    let _this = this
    let time = new Date().getTime()
    let vsiteId = obj.videoSiteId || 'D550E277598F7D23'
    //通过第三方cc接口获取视频播放地址数组
    let videourl = 'format=json&hlsflag=0&httpsflag=1&userid=' + vsiteId + '&videoid=' + obj.videoCcid + '&time=' + time + '&salt=' + obj.apiKey
    videourl = md5.hexMD5(videourl)
    videourl = ccurl + 'format=json&hlsflag=0&httpsflag=1&userid=' + vsiteId + '&videoid=' + obj.videoCcid + '&time=' + time + '&hash=' + videourl
    // 请求视频播放地址 https
    wx.request({
      url: videourl,
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200 && res.data.video.copy && res.error != 'INVALID_REQUEST'){
          res.data.video.copy.partitle = title
          _this.setData({
            thisvideo: _this.data.thisvideo.concat(_this.forvideourl(res.data.video.copy, title)),
            ccid: obj.videoCcid
          })
        }else{
          console.log('获取CC视频地址-参数错误')
        }
      }
    })
        // ccurl ?format=json&httpsflag=1&userid=CB735BE8334BC857&videoid=
  },
  //重组url对象
  forvideourl: function (attr, title){
    let newvideo = []
    for (let one of attr){
      let thisurlar = one.playurl.split('?')
      let thisurlobj = {
        id: one.quality,
        url: thisurlar[0],
        search: thisurlar[1],
        partitle: title
      }
      newvideo.push(thisurlobj)
    }
    return newvideo
  },
  // 收藏按钮点击效果
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
    //收藏按钮点击效果
    this.checkStar()

    app.setIsClick()
  },
  //转发分享按钮
  shareBtn: function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})