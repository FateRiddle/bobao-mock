import axios from 'axios'
import { formatNow } from '@/util'

//constant
const API_ROOT = 'http://crm.dongjianhome.com:98/oms_prd/getorder/proc/axecProc.jsp'
// const API_ROOT = 'http://61.164.47.179:7280/oms/getorder/proc/axecProc.jsp'

//when refresh,seems to need reset it
// const token = window.localStorage.getItem('token')
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

// every request being a form request
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//first time setToken
// const setToken = _token => {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${_token}`
// }

//setting up request
const request = axios.create({
  baseURL: API_ROOT,
})

//methods
// const encode = encodeURIComponent
const responseBody = res => res.data.rows
// const responseOutput = res => res.data

const ax = {
  // del: url => request.delete(url).then(responseOutput),
  get: body => request.get('', { params: body }).then(responseBody),
  // put: (url, body) => request.put(url, body).then(responseOutput),
}

export const getCity = () => ax.get({ procName: 'PROC_SSY_CITY_PM_LOAD' })

export const getProvince = () => ax.get({ procName: 'PROC_11_REGION_NUM_LOAD_TOP5_ZL' })

export const getBrand = () => ax.get({ procName: 'PROC_OMS_SSY_PP_LOAD' })

export const getHourSales = () =>
  ax.get({ procName: 'PROC_11_REGION_NUM_LOAD_ZJ', jinrtime: formatNow() })

export const getDaySales = () =>
  ax.get({ procName: 'PROC_11_REGION_NUM_LOAD_EVERY_DAY_ZL' })

export const getPercentage = () =>
  ax.get({ procName: 'PROC_11_REGION_NUM_LOAD_EVERY_ZL' })

//总销售量
export const getSales = () => ax.get({ procName: 'PROC_11_REGION_NUM_LOAD_PRESELL_ZL' })

// export const getSales = () => {
//   return axios.get(
//     'http://61.164.47.179:7280/oms/getorder/proc/axecProc.jsp?procName=PROC_11_REGION_NUM_LOAD_EVERY_DAY_ZL'
//   )
// }
