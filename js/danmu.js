let danmunewlist = []
let danmulist = [
  {
    text: '开始了',
    color: '#ff0000',
    time: 1
  },
  {
    text: '老师真帅',
    color: '#ff00ff',
    time: 15
  },
  {
    text: '送给老师一朵花❀',
    color: '#ff00ff',
    time: 20
  },
  {
    text: '❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀❀',
    color: '#ff00ff',
    time: 25
  },
  {
    text: '老师真帅',
    color: '#ff00ff',
    time: 30
  },
  {
    text: '❀',
    color: '#ff00ff',
    time: 35
  },
  {
    text: '认真听课...,不然听不懂',
    color: '#ff00ff',
    time: 45
  }
]

module.exports = {
  danmu: danmunewlist.length > 0 ? danmunewlist : danmulist
}