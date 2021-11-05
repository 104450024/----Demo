<template>
  <div class="app-container">
    醫院設置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>

      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>

      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>

      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>

      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import hospset from "@/api/hospset";
export default {
  data() {
    return {
      hospitalSet: {}
    };
  },
  created() {
    //頁面炫染之前執行
    //獲取id值
    //調用接口得到醫院設置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getHostSet(id);
    } else {
      this.hospitalSet = {};
    }
  },
  methods: {
    //根據id查詢
    getHostSet(id) {
      hospset.getHospSet(id).then(response => {
        //alert(response.data.id);
        this.hospitalSet = response.data;
      });
    },
    //修改
    upadte() {
      hospset.updateHospSet(this.hospitalSet).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        //跳轉列表頁面，使用路由跳轉方式
        this.$router.push({ path: "/hospSet/list" });
      });
    },
    //添加
    save() {
      if (this.hospitalSet.hosname == null) {
        this.$router.push({ path: "/hospSet/add" });
      }
      hospset.saveHospSet(this.hospitalSet).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        //跳轉列表頁面，使用路由跳轉方式
        this.$router.push({ path: "/hospSet/list" });
      });
    },
    saveOrUpdate() {
      if (!this.hospitalSet.id) {
        //添加
        this.save();
      } else {
        //修改
        this.upadte();
      }
    }
  }
};
</script>
