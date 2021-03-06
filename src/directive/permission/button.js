/**
 * @description 自定义指令
 */
export default {
  install(Vue, options) {
    Vue.directive("roleBtn", {
      componentUpdated: function (el, binding) {
        let btnId = binding.value
        let userInfo = JSON.parse(localStorage.getItem("info"))
        if ((btnId && userInfo.permissionButton.indexOf(btnId) !== -1) || userInfo.role === "超级管理员") {
          return false
        } else {
          el.parentNode.removeChild(el)
        }
      },
      inserted: function (el, binding) {
        let btnId = binding.value
        let userInfo = JSON.parse(localStorage.getItem("info"))
        if ((btnId && userInfo.permissionButton.indexOf(btnId) !== -1) || userInfo.role === "超级管理员") {
          return false
        } else {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
