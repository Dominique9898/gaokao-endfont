<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="编号" width="200">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专业代码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专业名称" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.isEdit">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="scope.row.name"
            >
            </el-input>
          </span>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专业课程" width="500">
        <template slot-scope="scope">
          <span v-if="scope.row.isEdit">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="scope.row.desc"
            >
            </el-input>
          </span>
          <span v-else>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.isEdit"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="onEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="!scope.row.isEdit"
            type="danger"
            size="small"
            icon="el-icon-edit"
            @click="onDelete(scope.row)"
          >
            删除
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="onFinished(scope.row)"
          >
            完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getMajorList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: [],
      listQuery: {
        page: 1,
        limit: 20,
      },
    };
  },
  created() {
    this.getMajorList();
  },
  methods: {
    getMajorList() {
      this.request
        .get("/getmajors", this.listQuery)
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.total;
          this.list.forEach((list) => {
            list.isEdit = false;
          });
          console.log(this.list);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    onFinished(row) {
      console.log(row);
      let params = {
        id: row.id,
        name: row.name,
        desc: row.desc,
      }
      this.request.post('/updatemajor', params)
      .then(res => {
        if (res.code === 0) {
          row.isEdit = false
          this.$message.success('修改成功')
          location.reload()
        }
      })
      .catch(err => {
        this.$message.error(err)
      })
    },
    onEdit(row) {
      row.isEdit = true
    },
    onDelete(row) {
      // let that = this
      this.request
        .post("/deletemajor", { id: row.id })
        .then((res) => {
          if (res.code === 0) this.$message.success("删除成功");
          location.reload();
          // that.getMajorList()
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style>
</style>