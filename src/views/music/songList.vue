<template>
  <div>
    <el-table :data="songList">
      <el-table-column fixed prop="created_at" label="上传时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="歌曲名"> </el-table-column>
      <el-table-column prop="singer" label="歌手"></el-table-column>
      <el-table-column prop="rank" label="排行" width="100"> </el-table-column>
      <el-table-column prop="album" label="专辑名" width="150">
      </el-table-column>
      <el-table-column prop="song_src" label="歌曲路径"> </el-table-column>
      <el-table-column prop="lyric_src" label="歌词路径" width="150">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "articleList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      sort: null,
      songList: []
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({
        path: "/addSong",
        query: {
          articleId: row.id
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      this.$request
        .fetchDelSong(row.id)
        .then(response => {
          console.log(response);
          that.$message({
            showClose: true,
            message: response.data.message,
            type: "success"
          });
          that.getList({
            currentPage: that.currentPage,
            pageSize: 10,
            sort: null
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    currentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.getList({
        currentPage: page,
        pageSize: 10,
        sort: null
      });
    },
    getList(postdata) {
      let that = this;
      this.$request
        .fetchSongList(postdata)
        .then(function(response) {
          debugger;
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].created_at = that.$getDateDiff(
              response.data.rows[i].created_at
            );
            debugger;
            if (response.data.rows[i].lyric_src) {
              response.data.rows[i].lyric_src = response.data.rows[
                i
              ].lyric_src.slice(
                response.data.rows[i].lyric_src.indexOf("/public/upload")
              );
            }
            if (response.data.rows[i].song_src) {
              response.data.rows[i].song_src = response.data.rows[
                i
              ].song_src.slice(
                response.data.rows[i].song_src.indexOf("/public/upload")
              );
            }
          }
          that.total = response.data.count;
          that.songList = response.data.rows;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getList({
      currentPage: 1,
      pageSize: 10,
      sort: null
    });
  }
};
</script>

<style scoped></style>
