<template>
  <div class="editcontainer">
    <header style="z-index: 10px; height: 50px">
      <div class="sub_navbar" style="z-index: 10px; height: 50px; width: auto">
        <el-button type="success" @click="onFinished">完成</el-button>
      </div>
    </header>
    <div class="createArticle-mian-container">
      <el-form
        ref="ruleForm"
        label-position="top"
        label-width="80px"
        :model="form"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业代码">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业课程">
              <el-input
                :rows="10"
                type="textarea"
                v-model="form.desc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属类别">
              <el-select v-model="form.parentNode" placeholder="请选择">
                <el-option
                  v-for="item in parentNode"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getParentNode();
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        desc: "",
        parentNode: "",
      },
      parentNode: [],
    };
  },
  methods: {
    onFinished() {
      this.request
        .post("createmajor", this.form)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("创建成功");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    getParentNode() {
      this.request
        .get("/getmajorparentnode")
        .then((res) => {
          this.parentNode = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
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