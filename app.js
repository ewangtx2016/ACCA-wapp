//app.js
App({
  onLaunch: function () {
  },

  getUserInfoCode() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
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
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    historyWords: [
      {
        word: 'aacount',
        trans: '会计'
      }, {
        word: 'abcount',
        trans: '会计'
      }, {
        word: 'adcount',
        trans: '会计'
      }
    ],
    isClick: true,
    words: {
      A: [
        {
          word: 'aacount',
          trans: '会计'
        }, {
          word: 'abcount',
          trans: '会计'
        }, {
          word: 'adcount',
          trans: '会计'
        }, {
          word: 'aecount',
          trans: '会计'
        }, {
          word: 'afcount',
          trans: '会计'
        }, {
          word: 'agcount',
          trans: '会计'
        }, {
          word: 'ahcount',
          trans: '会计'
        }, {
          word: 'aicount',
          trans: '会计'
        }
      ],
      B: [
        {
          word: 'bacount',
          trans: '会计'
        }, {
          word: 'bbcount',
          trans: '会计'
        }, {
          word: 'bdcount',
          trans: '会计'
        }, {
          word: 'becount',
          trans: '会计'
        }, {
          word: 'bfcount',
          trans: '会计'
        }, {
          word: 'bgcount',
          trans: '会计'
        }, {
          word: 'bhcount',
          trans: '会计'
        }, {
          word: 'bicount',
          trans: '会计'
        }
      ],
      C: [
        {
          word: 'cacount',
          trans: '会计'
        }, {
          word: 'cbcount',
          trans: '会计'
        }, {
          word: 'cdcount',
          trans: '会计'
        }, {
          word: 'cecount',
          trans: '会计'
        }, {
          word: 'cfcount',
          trans: '会计'
        }, {
          word: 'cgcount',
          trans: '会计'
        }, {
          word: 'chcount',
          trans: '会计'
        }, {
          word: 'cicount',
          trans: '会计'
        }
      ],
    },
    wordDetail: {
      word: 'account',
      trans: '会计',
      video: {
        title: 'CFA L1 Reading 9::Probability Standards',
        src: 'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/13_9182e6961320c50b2553cce4b0e900ac.mp4'
      },
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
    },
    favorite: [{
      word: 'account',
      trans: '会计'
    }, {
      word: 'abcount',
      trans: '会计'
    }]
  },

  // 页面函数是否点击
  setIsClick: function () {
    this.globalData.isClick = false
    setTimeout(() => {
      this.globalData.isClick = true
    }, 800)
  },
  // 设置历史单词的数量
  setHistoryWord: function () {
    if (this.globalData.historyWords.length > 10) {
      this.globalData.historyWords = this.globalData.historyWords.slice(-10)
    }
  }
})