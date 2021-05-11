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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="校名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" label="校徽" align="center">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.icon"
            style="width: 100px; height: 100px"
            :src="getlocalPath(scope.row.icon)"
          >
          </el-image>
          <el-upload
            v-else
            :limit="1"
            :show-file-list="false"
            :action="uploadIconUrl(scope.row.id)"
            :on-success="handleSuccess"
          >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleUploadClick(scope.row)"
            >
              上传图片
            </el-button>
          </el-upload>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="办学类型">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="排名">
        <template slot-scope="scope">
          <span >{{ scope.row.rank }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="标签">
        <template slot-scope="scope">
          <span >{{ scope.row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="省份">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="城市">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240px" align="center" label="学校官网">
        <template slot-scope="scope">
          <span>{{ scope.row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="140">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="onEdit(scope.index, scope)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { mapState } from 'vuex'

export default {
  name: "ArticleList",
  components: { Pagination },
  computed: {
    ...mapState({
      baseurl: (state) => state.app.baseurl,
    }),
  },
  data() {
    return {
      editContent: {
        name:'',
        level:'',
        province: '',
        city: '',
        website:''
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
      isEdit: false,
      currentRow: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getlocalPath(path) {
      return `https://dominikcloud.ltd${path}`;
    },
    getList() {
      this.listLoading = true;
      let that = this;
      this.request.get("/getlistUniversity", this.listQuery).then((res) => {
        console.log(res);
        that.listLoading = false;
        let data = res.data;
        that.list = data.list
        that.total = data.total;
        // console.log(that.list);
      });
    },
    uploadIconUrl(id) {
      return `${this.baseurl}/uploadicon/${id}`;
    },
    handleSuccess(res) {
      const data = res.data;
      this.currentRow.icon = data.url;
    },
    handleBeforeUpdate(file) {
      file.school_id = this.currentRow.id;
      console.log(file);
    },
    handleUploadClick(row) {
      this.currentRow = row;
    },
    onEdit(index, scope) {
      scope.row.isEdit = true;
      console.log(index, scope);
    },
    onFinished(index, scope) {
      scope.row.isEdit = false;
      console.log(index, scope);
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
