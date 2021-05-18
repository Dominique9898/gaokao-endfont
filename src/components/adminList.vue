<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="onAdd"
      size="small"
      icon="el-icon-edit"
    >
      Add
    </el-button>
    <div style="margin-top: 20px"></div>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="编号" width="200">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.username">{{ scope.row.username }}</span>
          <input v-else type="text" v-model="form.username"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="密码" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.password">{{ scope.row.password }}</span>
          <input v-else type="text" v-model="form.password"/>
        </template>
      </el-table-column>
      <el-table-column align="center" width="calc(100% - 600px)">
        <template slot-scope="scope">
          <el-button v-if="scope.row.username && scope.row.password"
            type="primary"
            @click="onEdit(scope.$index, scope.row)"
            size="small"
            icon="el-icon-edit"
          >
            编辑
          </el-button>

          <el-button
          v-if="scope.row.username && scope.row.password"
            type="danger"
            size="small"
            icon="el-icon-edit"
            @click="onDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>

          <el-button v-else
            type="primary"
            @click="onFinished"
            size="small"
            icon="el-icon-edit"
          >
            完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      form: {
        username: '',
        password: ''
      }
    };
  },
  created() {
    this.getAdminList()
  },
  methods: {
    getAdminList() {
        this.request.get('/getadmins').then(res => {
            console.log(res);
            this.list = res.data
        })
    },
    onAdd() {
     let list = this.list
     list.push({
         id: list.length - 1,
         username: '',
         password: ''
     })
    },
    onFinished(){
     let username = this.form.username
     let password = this.form.password
     this.request.post('/createadmin', ({
         username,
         password
     }))
     .then(res => {
         this.list = res.data
     })
    },
    onEdit(row) {
      console.log(row);
    },
    onDelete(index, row) {
      this.request.post('/deleteadmin', ({
         username: row.username
     }))
     .then(res => {
         this.list = res.data
     })
    },
  },
};
</script>

<style>
</style>