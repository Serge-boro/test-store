import axios from 'axios'
const BASE_URL = 'http://localhost:4002/store'

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
