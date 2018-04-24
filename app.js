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
              console.log(res)
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
    isClick: true
  },


  // 页面函数是否点击
  setIsClick: function () {
    this.globalData.isClick = false
    setTimeout(() => {
      this.globalData.isClick = true
    }, 800)
  }
})