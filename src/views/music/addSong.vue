<template>
  <div class="add-song">
    <el-form ref="song" :inline="true" :model="song" label-width="80px">
      <el-form-item label="歌曲名">
        <el-input class="" v-model="song.name" />
      </el-form-item>
      <el-form-item label="专辑名">
        <el-input class="" v-model="song.album" />
      </el-form-item>
      <el-form-item label="歌手名">
        <el-input class="" v-model="song.singer" />
      </el-form-item>
      <!-- <el-form-item label="歌曲类型">
        <el-input class="" v-model="song.type" />
      </el-form-item> -->
      <el-form-item label="排名">
        <el-input v-model="song.rank"></el-input>
      </el-form-item>

      <br />
      <el-form-item label="歌曲封面上传" label-width="125px">
        <el-upload
          class="avatar-uploader"
          :action="this.$path + '/editor/uploadImg'"
          :show-file-list="false"
          :on-success="handlethumbnailSuccess"
          :before-upload="beforethumbnailUpload"
        >
          <img v-if="song.cover" :src="song.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌词上传" label-width="110px">
        <el-upload
          :action="this.$path + '/lyric/upload'"
          :show-file-list="true"
          :on-success="handleLyricSuccess"
          :before-upload="beforeLyricUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传lrc文件，且大小不超过5M
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌曲上传" label-width="110px">
        <el-upload
          :action="this.$path + '/song/upload'"
          :show-file-list="true"
          :on-success="handleSongSuccess"
          :before-upload="beforeSongUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传mp3文件，且大小不超过10M
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="subBtn" type="primary" @click="submitMusic"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addArticle",
  data() {
    return {
      song: {
        type: "", //类型
        name: "", //歌名
        cover: "", //封面路径
        rank: "", //排行
        singer: "", //歌手
        album: "", //专辑名称
        song_src: "", //歌曲上传路径
        lyric_src: "", //歌词上传路径
      },
      restaurants: [],
    }
  },
  methods: {
    handlethumbnailSuccess(res, file) {
      this.song.cover = res.data[0]
    },
    beforethumbnailUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isPNG = file.type === "image/png"
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!(isJPG || isPNG)) {
        this.$message.error("上传歌曲封面只能是 JPG/PNG 格式!")
      }
      if (!isLt10M) {
        this.$message.error("上传歌曲封面大小不能超过 10MB!")
      }
      // eslint-disable-next-line no-mixed-operators
      return (isLt10M && isJPG) || isPNG
    },
    handleLyricSuccess(res, file) {
      this.song.lyric_src = res.data[0]
    },
    beforeLyricUpload(file) {
      const isLyric = file.name && file.name.indexOf(".lrc") !== -1
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isLyric) {
        this.$message.error("上传歌词文件只能是 lrc 格式!")
      }
      if (!isLt5M) {
        this.$message.error("上传歌词文件大小不能超过 5MB!")
      }
      // eslint-disable-next-line no-mixed-operators
      return isLt5M && isLyric
    },
    handleSongSuccess(res, file) {
      this.song.song_src = res.data[0]
    },
    beforeSongUpload(file) {
      debugger
      const isAudio = file.type && file.type.indexOf("audio") !== -1
      const isLt30M = file.size / 1024 / 1024 < 30

      if (!isAudio) {
        this.$message.error("只能上传mp3格式的文件!")
      }
      if (!isLt30M) {
        this.$message.error("上传歌曲文件大小不能超过 30MB!")
      }
      // eslint-disable-next-line no-mixed-operators
      return isLt30M && isAudio
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [{ value: "vue" }, { value: "node.js" }]
    },
    handleSelect(item) {
      console.log(item)
    },

    getContent: function() {
      alert(this.editorContent)
    },
    submitMusic() {
      this.$request
        .fetchAddSong(this.song)
        .then((response) => {
          this.$restBack(response.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
  mounted() {
    let that = this
    this.restaurants = this.loadAll()
  },
}
</script>

<style scoped>
.title {
  width: 1000px;
}

.subBtn {
  width: 100px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.el-autocomplete-suggestion {
  z-index: 10010 !important;
}

.w-e-text-container {
  height: 600px !important;
}
</style>
