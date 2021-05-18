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
          <el-col :span="6">
            <el-form-item label="院校名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="院校代码">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="院校网站">
              <el-input v-model="form.website"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地区">
              <el-cascader
                size="large"
                :options="provinceOptions"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="办学类型">
              <el-select v-model="form.level" placeholder="请选择">
                <el-option
                  v-for="item in schoolType"
                  :key="item.value"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="学校标签">
              <el-tag
                v-for="tag in form.tags"
                :key="tag"
                closable
                @close="handleTagClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { provinceAndCityData, CodeToText } from "element-china-area-data";

export default {
  computed: {
    ...mapState({
      baseurl: (state) => state.app.baseurl,
    }),
    uploadForm() {
      if (this.isEdit) {
        return `${this.baseurl}/updatauniversity`;
      }
      return `${this.baseurl}/updateuniversity`;
    },
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      loading: false,
      isShowPreview: false,
      inputVisible: false,
      inputValue: "",
      schoolType: ['本科', '专科'],
      form: {
        name: "",
        id: "",
        province: "",
        city: "",
        tags: ["985", "211", "国重点", "双一流", "本科", "专科"],
        level: "",
        website: "",
      },
      provinceOptions: provinceAndCityData,
      selectedOptions: [],
      id: null,
    };
  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.params && this.$route.params.id;
      this.fetchData(this.id);
      console.log("编辑学校");
    }
  },
  methods: {
    fetchData(id) {
      this.request.get("/getuniversitybyid", { id }).then((res) => {
        this.form = res.data;
        if (this.form.icon) this.isShowPreview = true;
      });
    },
    getlocalPath(path) {
      return `https://dominikcloud.ltd${path}`;
    },
    rmImage() {
      this.isShowPreview = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleBeforeUpload(file) {
      if (this.isEdit) {
        this.isShowPreview = false;
        console.log(111);
      }

      let isLt2M = file.size / 1024 / 1024 < 2; // 判定图片大小是否小于4MB
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        this.loading = false;
        return;
      }
    },
    handleChange() {
      this.form.province = CodeToText[this.selectedOptions[0]];
      this.form.city = CodeToText[this.selectedOptions[1]];
    },
    resetForm() {
      this.form = {
        name: "",
        id: "",
        province: "",
        city: "",
        tags: ["985", "211", "国重点", "双一流", "本科", "专科"],
        level: "",
        website: "",
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
    handleTagClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      console.log("handleInputConfirm", this.inputValue);
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleError(err) {
      this.$message.error(err);
      this.loading = false;
    },
    async onFinished() {
      // this.$refs.upload.sumbit()
      let keys = Object.keys(this.form);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!this.form[key]) {
          this.loading = false;
          this.$message.error(`${key}不能为空`);
          return;
        }
      }
      const params = {
        id: this.form.id,
        name: this.form.name,
        level: this.form.level,
        province: this.form.province,
        city: this.form.city,
        tags: JSON.stringify(this.form.tags),
        website:  this.form.website
      }
      if (this.isEdit) {
        // this.request.get("/uoloaduniversity", this.form).then((res) => {
        //   console.log(res);
        //   this.loading = false;
        // });
      } else {
        console.log("创建院校");
        this.request.post("/createuniversity", params).then((res) => {
          console.log(res);
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style>
.el-tag:not(:first-child) {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
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
  .el-tag {
    margin-left: 10px;
  }
  &:hover {
    .image-preview-action {
      opacity: 1;
    }
  }
}
</style>