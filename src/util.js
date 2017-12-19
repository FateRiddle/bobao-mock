export const format = date => {
  // const month = date.substring(5, 7)
  const day = date.substring(8, 10)
  // return month + '.' +day
  return day
}

export const formatNow = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const _day = date.getDate()
  const day = _day < 10 ? '0' + _day : _day
  return year + '-' + month + '-' + day
}

export const getNow = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const _day = date.getDate()
  const day = _day < 10 ? '0' + _day : _day
  const _hour = date.getHours()
  const hour = _hour < 10 ? '0' + _hour : _hour
  const _minute = date.getMinutes()
  const minute = _minute < 10 ? '0' + _minute : _minute
  const _second = date.getSeconds()
  const second = _second < 10 ? '0' + _second : _second

  return [year + '年' + month + '月' + day + '日', hour + '时' + minute + '分' + second + '秒']
}

export const formatNum = number => {
  const num = typeof number === 'number' ? number.toString() : number
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getMax = arr => {
  let max = 0
  arr.forEach(x => {
    if (x > max) {
      max = x
    }
  })
  return max
}
