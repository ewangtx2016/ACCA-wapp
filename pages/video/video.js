// pages/video/video.js
const app = getApp()
const globalData = app.globalData
const posturl = globalData.pathurl
const classurl = globalData.classurl
const danmujs = require('../../js/danmu.js')
const md5 = require('../../js/md5.js')

Page({
  data: {
    menu: false,
    playurl: null,
    thisobj: null,
    danmuList: null,
    danmuListBool: true,
    courses: []
  },
  onLoad(res) {
    let _this = this
    _this.setData({
      playurl: res,
      danmuList: danmujs.danmu
    })
    wx.request({
      url: posturl + '/api/teachsource/lesson/video/getVideosByCCId?ccid=' + res.ccid,
      success: function(res){
        let thisobj = null
        let ccobj = null
        if (res.statusCode == 200 && res.data.data.length > 0){
          thisobj = {
            title: res.data.data[0].title
          }
          _this.setData({
            thisobj:thisobj
          })
          if (res.data.data[0]['ccdata']){
            ccobj = JSON.parse(res.data.data[0]['ccdata'])
          }
        }
      }
    })


    // 获取课程列表 - kecheng => md5.hexMD5()
    let classPage = 1
    let classSize = 10
    let classId = 3433
    let classTime = parseInt(new Date().getTime() / 1000)
    let openClassString = `m=out_api&c=course&a=course_list&pageOn=${classPage}&pageSize=${classSize}&typeId=${classId}&time=${classTime}`
    openClassString = md5.hexMD5(openClassString)
    let openClassHash = `m=out_api&c=course&a=course_list&pageOn=${classPage}&pageSize=${classSize}&typeId=${classId}&time=${classTime}&string=${openClassString}`
    openClassHash = md5.hexMD5(openClassHash)
    let openClassGetUrl = `/index.php?m=out_api&c=course&a=course_list&pageOn=${classPage}&pageSize=${classSize}&typeId=${classId}&time=${classTime}&hash=${openClassHash}`

    wx.request({
      url: classurl + openClassGetUrl,
      success: function (res) {
        //_this.data.courses
        for (let one of res.data.data) {
          let thistime = new Date(Number(one.endtime))
          let thisobj = {
            id: one.id,
            title: one.name,
            des: one.brief,
            url: '/course-' + one.id + '.html',
            imgurl: 'https://www.zbgedu.com/' + one.img
          }

          _this.setData({
            courses: _this.data.courses.concat(thisobj)
          })
        }

      }
    })

    // CFA证书课程 - end


  },


  // 显示菜单
  menuShow() {
    this.setData({
      menu: !this.data.menu
    })
  },

  // 咨询
  zixun() {
    wx.navigateTo({
      url: '/pages/consult/consult',
    })
  }
})