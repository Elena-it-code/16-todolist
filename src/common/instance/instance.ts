import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    // Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY
  }
})

  // этот токен необходим для всех запросов кроме запроса Login
instance.interceptors.request.use(function(config) {
  // config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}` // эквивалентная запись
  config.headers.Authorization = `Bearer ${localStorage.getItem("sn-token")}`
  return config
})