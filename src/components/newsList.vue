<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容" width="calc(100%/2)">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="calc(100%/6)">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="onEdit(scope.$index, scope.row)"
            size="small"
            icon="el-icon-edit"
          >
            Edit
          </el-button>

          <el-button
            type="danger"
            size="small"
            icon="el-icon-edit"
            @click="onDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
      total: 0,
    };
  },
  computed: {
    ...mapState({
      baseurl: (state) => state.app.baseurl,
    }),
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.request.get("/getnewslist", this.listQuery).then((res) => {
        let data = res.data;
        this.list = data.list;
        this.listLoading = false;
      });
    },
    onDelete(index, row) {
      this.listLoading = true
      let id = row.id
      this.request.post("/deletenews", {id}).then(() => {
        this.$message.success('删除成功')
        this.getNewsList()
      });
    },
    onEdit(index, row) {
      this.$router.push({ path: `/news/edit/${row.id}`});
    },
  },
};
</script>

<style>
</style>