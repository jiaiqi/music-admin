/**
 * Created by WebStorm.
 * User: Jia
 * Date: 2020/4/20
 * Description: 文件描述
 *  // 图片上传
  router.post("/editor/uploadImg", controller.article.uploadImg)
  // 歌曲文件上传
  router.post("/song/upload", controller.music.uploadSong)
  // 歌曲列表
  router.get("/song/list", controller.music.index)
  // 添加歌曲
  router.post('/song/create', controller.music.create)
  // 删除歌曲
  router.delete('/song/destroy/:id', controller.music.destroy)
  // 编辑歌曲
  router.put('/song/update/:id', controller.music.update)
  // 歌词文件上传
  router.post("/lyric/upload", controller.music.uploadLyric)
 */
export default {
    // 添加歌曲
    addSong: "/song/create",
    // 删除歌曲
    delSong: '/song/delete',
    // 编辑歌曲信息
    updateSong: '/song/update',
    // 歌曲列表
    songList: '/song/list'
}
