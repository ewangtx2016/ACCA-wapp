const md5 = require('./js/md5.js')

//app.js
App({
  onLaunch: function () {
    
  },

  getUserInfoCode(callback) {
    let _this = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        _this.globalData.code = res.code
      }
    })
    // 获取用户信息
    wx.getSetting({
      withCredentials:true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              _this.globalData.encryptedData = res.encryptedData
              _this.globalData.iv = res.iv
              _this.loginAjax(_this.globalData)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              //获取用户信息 赋值
              if (callback) {
                callback(res)
              }
            }
          })
        } else {
          wx.getUserInfo({ 
            success: res => {
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              //获取用户信息 赋值
              if (callback){
                callback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    // request()课程id获取课程信息接口地址
    pathurl: 'https://api.zbgedu.com',
    // web-viwe公开课-证书-的链接地址
    listurl: 'https://m.zbgedu.com',
    // request()CC直播视频地址获取接口地址
    ccurl: 'https://p.bokecc.com/api/mobile?',
    // request()公开课 和 课程 的接口地址
    classurl: 'https://www.zbgedu.com',
    isClick: true,
    encryptedData: null,
    iv: null,
    code: null
  },

  loginAjax: function(data){
    let _this = this
    let lvtime = (new Date().getTime() / 1000) | 0
    let params = data.code + data.encryptedData + data.iv
    let md5Params = md5.hexMD5(params)
    let lvhash = md5.hexMD5(params + md5Params)
    let thisdata = {
      encryptedData: data.encryptedData,
      iv: data.iv,
      time: lvtime,
      code: data.code,
      hash: lvhash
    }
    console.log(_this.globalData.classurl)
    wx.request({
      method: 'POST',
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      url: _this.globalData.classurl + '/index.php?m=out_api&c=importVisit&a=save_user_info',
      data: thisdata,
      success: function(res){
        console.log(res) 
      }
    })
  },

  // 页面函数是否点击
  setIsClick: function () {
    this.globalData.isClick = false
    setTimeout(() => {
      this.globalData.isClick = true
    }, 800)
  }
})