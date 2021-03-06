import zhLocale from "element-ui/lib/locale/lang/zh-CN"

const cn = {
  routeName: {
    home: "主页",
    article: "动态管理",
    publishArticle: "创建动态",
    publishArticleEditor: "创建动态-富文本",
    articleList: "动态记录",
    music: "歌曲管理",
    songList: '歌曲列表',
    publishSong: '上传歌曲',
    commentList: "评论列表",
    userManage: "用户管理",
    userList: "用户列表",
    editPassword: "修改密码",
    demo: "demo",
    editor: "编辑器",
    markdown: "markdown",
    wangeditor: "wangeditor",
    systemSettings: "系统设置",
    systemManage: "系统管理",
    unitManage: "单位管理",
    roleManage: "角色管理",
    systemSetting: "系统配置项"
  },
  rightMenu: {
    close: "关闭",
    closeOther: "关闭其他",
    closeAll: "全部关闭"
  },
  role: {
    superAdmin: "超级管理员",
    admin: "管理员",
    ordinary: "普通用户"
  },
  userDropdownMenu: {
    basicInfo: "基本资料",
    changePassword: "修改密码",
    logout: "退出"
  },

  ...zhLocale //  合并element-ui内置翻译
}

export default cn
