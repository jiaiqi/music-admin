
import axios from "../axios"
import loginUrls from "../urls/login"

export default {
  // 账号密码登陆
  fetchLogin(data) {
    return axios.post(loginUrls.login, data)
  },
  // 注册
  fetchRegister(data) {
    return axios.post(loginUrls.register, data)
  }
}
