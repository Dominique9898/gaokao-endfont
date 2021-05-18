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
          <div class="image-preview" v-if="scope.row.icon">
            <div class="image-preview-wrapper">
              <img
                :src="getlocalPath(scope.row.icon)"
                style="width: 100px; height: 100px"
              />
              <div class="image-preview-action">
                <i class="el-icon-delete" @click="rmImage(scope.row)" />
              </div>
            </div>
          </div>
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

      <el-table-column width="120px" align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.tags.toString() }}</span>
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
            @click="onEdit(scope)"
          >
            编辑
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
import { mapState } from "vuex";

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
        name: "",
        level: "",
        province: "",
        city: "",
        website: "",
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
        that.list = data.list;
        that.total = data.total;
        // console.log(that.list);
      });
    },
    uploadIconUrl(id) {
      return `${this.baseurl}/uploadicon/${id}`;
    },
    handleSuccess(res) {
      console.log('handleSuccess', res);
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
    onEdit(scope) {
      this.$router.push({ path: `/university/edit/${scope.row.id}` });
    },
    onFinished(index, scope) {
      scope.row.isEdit = false;
      console.log(index, scope);
    },
    rmImage(row) {
      row.icon = ''
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.image-preview {
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  left: 50%;
  transform: translate(-50%);
  position: relative;

  .image-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .image-preview-action {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    cursor: pointer;
    line-height: 200px;
    .el-icon-delete {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
    }
  }
  &:hover {
    .image-preview-action {
      opacity: 1;
    }
  }
}
</style>
