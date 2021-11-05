<template>
  <div class="app-container">
    醫院設置列表

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>
    <!-- 工具條 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序號" width="50"> </el-table-column>
      <el-table-column prop="hosname" label="醫院名稱"> </el-table-column>
      <el-table-column prop="hoscode" label="醫院編號"> </el-table-column>
      <el-table-column prop="apiUrl" label="api基礎路徑" width="200">
      </el-table-column>
      <el-table-column prop="contactsName" label="聯繫人姓名">
      </el-table-column>
      <el-table-column prop="contactsPhone" label="聯繫人手機">
      </el-table-column>

      <el-table-column label="狀態" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
          </el-button>
          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id, 0)"
            >鎖定
          </el-button>
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id, 1)"
            >取消鎖定
          </el-button>

          <!--router/index-->
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入街口定義的js文件

import hospset from "@/api/hospset.js";

export default {
  //定義變量和初始值
  data() {
    return {
      current: 1, //當前頁
      limit: 5, //每頁顯示記錄數
      searchObj: {}, //條件封裝對象
      list: [], //每頁數據集合
      total: 0, //總紀錄數
      multipleleSelection: []
    };
  },
  //在頁面渲染之前執行
  //一般調用method定義的方法，得到數據
  created() {
    this.getList();
  },

  //定義方法，進行請求接口調用
  //醫院設置列表
  methods: {
    //鎖定合取消鎖定
    lockHospSet(id, status) {
      hospset.lockHospSet(id, status).then(response => {
        //刷新
        this.getList();
      });
    },
    //獲取選擇選框的id值
    handleSelectionChange(selection) {
      this.multipleleSelection = selection;
    },
    //批量刪除
    removeRows() {
      this.$confirm("此操作将永久删除醫院設置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //確定執行then方法
        //調用接口
        var idList = [];
        //遍歷數組得到每個id值，設置到idList裡面
        for (var i = 0; i < this.multipleleSelection.length; i++) {
          var obj = this.multipleleSelection[i];
          var id = obj.id;
          idList.push(id);
        }
        hospset.batchRemoveHospSet(idList).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //刷新頁面
          this.getList(1);
        });
      });
    },
    getList(page = 1) {
      //添加當前頁參數
      this.current = page;
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => {
          //response 接口返回數據
          //console.log(response);

          //返回集合
          this.list = response.data.records;
          //總紀錄數
          this.total = response.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //刪除醫院設置方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除醫院設置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //確定執行then方法
        //調用接口
        hospset.deleteHospSet(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //刷新頁面
          this.getList(1);
        });
      });
    }
  }
};
</script>
