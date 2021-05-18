<template>
  <div class="editcontainer">
    <header style="z-index: 10px; height: 50px">
      <div class="sub_navbar" style="z-index: 10px; height: 50px; width: auto">
        <el-button type="warning">取消</el-button>
        <el-button type="success" @click="onFinished">完成</el-button>
      </div>
    </header>
    <div class="createArticle-mian-container">
      <el-form
        v-loading="loading"
        ref="ruleForm"
        label-position="top"
        label-width="80px"
        :model="form"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="Title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="Author">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-bottom: 20px"></div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="内容">
              <el-input
                :rows="10"
                type="textarea"
                v-model="form.content"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><h3 style="color: #606266">选择封面</h3></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="image-preview" v-if="isShowPreview">
              <div class="image-preview-wrapper">
                <img :src="getlocalPath(form.img)" />
                <div class="image-preview-action">
                  <i class="el-icon-delete" @click="rmImage" />
                </div>
              </div>
            </div>
            <el-upload
              ref="upload"
              list-type="picture-card"
              accept=".png,.jpg,.jpeg"
              :on-preview="handlePictureCardPreview"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :on-error="handleError"
              :auto-upload="false"
              :action="requestBase"
              :data="form"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      baseurl: (state) => state.app.baseurl,
    }),
    requestBase() {
      if (this.isEdit) {
        return `${this.baseurl}/updatenews`;
      }
      return `${this.baseurl}/uploadnews`;
    },
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.params && this.$route.params.id;
      this.fetchData(this.id);
    }
  },
  methods: {
    fetchData(id) {
      this.request.get("/getnewsbyid", { id }).then((res) => {
        this.form = res.data;
        if(this.form.img) this.isShowPreview = true
      });
    },
    getlocalPath(path) {
      return `https://dominikcloud.ltd${path}`;
    },
    rmImage() {
      this.isShowPreview = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleBeforeUpload(file) {

      if(this.isEdit) {
        this.isShowPreview = false
        console.log(111);
      }

      let isLt2M = file.size / 1024 / 1024 < 2; // 判定图片大小是否小于4MB
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        this.loading = false;
        return;
      }
    },
    resetForm() {
      this.form = {
        title: "",
        author: "",
        content: "",
      };
    },
    handleSuccess(res) {
      this.loading = false;
      console.log("success:", res);
      if (this.isEdit) {
        this.$message.success("编辑成功");
      } else {
        this.resetForm();
        this.$message.success("发送成功");
        this.$refs.upload.clearFiles();
      }
    },
    handleError(err) {
      this.$message.error(err);
      this.loading = false;
    },
    async onFinished() {
      console.log('onFinished')
      this.$refs.upload.sumbit()
      let keys = Object.keys(this.form);
      console.log(this.form);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!this.form[key]) {
          this.loading = false;
          this.$message.error(`${key}不能为空`);
          return;
        }
      }
      if (this.isEdit) {
        this.form.id = this.id;
        console.log("修改文章");
      }
      this.loading = true;
      this.$refs.upload.submit(); //图片上传
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      loading: false,
      isShowPreview: false,
      form: {
        title: "",
        author: "",
        content: "",
      },
      id: null,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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
.image-uploader {
  width: 35%;
  float: left;
}
.image-preview {
  width: 148px;
  height: 148px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  float: left;
  margin: 0 8px 8px 0;
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