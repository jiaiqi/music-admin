/**
 * Created by WebStorm.
 * User: Jia
 * Date: 2020/4/20
 * Description: 文件描述
 */
import axios from "../axios"
import songUrls from "../urls/song"

export default {
  // 添加歌曲信息
  fetchAddSong(data) {
    return axios.post(songUrls.addSong, data)
  },
  // 歌曲列表
  fetchSongList() {
    return axios.get(songUrls.songList)
  },
  // 歌曲信息修改
  fetchUpdateSong(data, id) {
    return axios.post(songUrls.updateSong + '?id=' + id, data)
  },
  // fetchGetArticle(data) {
  //   return axios.post(articleUrls.getArticle, data)
  // },
  // 删除歌曲
  fetchDelSong(id) {
    return axios.delete(songUrls.delSong + '?id=' + id)
  }

}
