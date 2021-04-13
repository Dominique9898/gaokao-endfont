<template>
  <div class="editcontainer">
    <header style="z-index: 10px; height: 50px">
      <div class="sub_navbar" style="z-index: 10px; height: 50px; width: auto">
        <el-button type="warning">取消</el-button>
        <el-button type="success">完成</el-button>
      </div>
    </header>
    <div class="createArticle-mian-container">
      <el-row>
        <el-col :span="24">
          <el-form label-position="top" label-width="80px" :model="form">
            <el-form-item label="Title">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-col :span="12">
            <el-form-item label="Author">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Public Time">
              <el-time-picker :model="form.createTime"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form>
        <div style="margin-bottom: 20px"></div>
        <el-col :span="24">
          <el-form :model="form">
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24"><h3 style="color:#606266">选择封面</h3></el-col>
        <el-col :span="24">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        title: "",
        author: "",
        createTime: "",
        content: "",
      },
    };
  },
};
</script>
<style>
header {
  background: #d0d0d0;
}
.sub_navbar {
  line-height: 50px;
  position: relative;
  text-align: right;
  padding-right: 20px;
  transition: 600ms ease position;
}
.createArticle-mian-container {
  padding: 40px 45px 20px 50px;
}
</style>