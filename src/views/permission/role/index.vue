<template>
  <div
    class="app-container"
    style="padding-top: 0; padding-right: 0; padding-left: 0"
  >
    <el-button type="primary" style="float: right; margin:10px 5px;" @click="addRole"
      >添加</el-button
    >
    <!--  -->
    <el-dialog :visible.sync="visibleDialog" title="添加角色">
        <el-form>
          <el-form-item label="角色名" label-width="100px">
            <template slot-scope="scope">
              <el-input v-model="roleName" placceholder="请输入角色名字"></el-input>
            </template>
          </el-form-item>
          <el-form-item label="权限列表" label-width="100px">
            <ul>
              <li>
                <div class="father">
                  <span>订单管理</span>
                </div>
                <div class="son">
                  <span></span>
                  <div></div>
                </div>
              </li>
              <li>
                <div class="father">
                  <span>库存管理</span>
                </div>
                <div class="son">
                  <span>入库管理</span>
                  <div></div>
                </div>
                <div class="son">
                  <span>出库管理</span>
                  <div></div>
                </div>
              </li>
            </ul>
          </el-form-item>
        </el-form>
    </el-dialog>
    <!--  -->
    <el-table
      :row-style="{ height: '94px' }"
      style="margin: 0 auto"
      height="400px"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="70%">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200%"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";
// import Search from "@/components/Search/index.vue";

export default {
  components: {
    // Search,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      // list: null,
      list: [
        { id: 0,username:'aaa', role: "管理员", 权限: [0, 1, 2, 3, 4] },
        { id: 0,username:'bbb', role: "仓库管理", 权限: [0, 1, 2, 3, 4] },
        { id: 0,username:'ccc', role: "财务管理", 权限: [0, 1, 2, 3, 4] },
      ],
      listLoading: false,
      //添加弹窗
      visibleDialog: false,
      roleName:null,
      
    };
  },
  created() {
    // this.fetchData();
  },
  
  beforeDestroy() {
  },
  methods: {
    addRole(){
      this.visibleDialog =true;
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        // this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
li{
  list-style: none;
}
ul{
  padding: 0;
  margin:0;
}
//三行显示，超过为省略
.threeLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.add {
  .el-form-item {
    margin-bottom: 0;
  }
}
.production {
  .el-select {
    width: 100%;
  }
}
//#region
// .title {
//   display: flex;
//   justify-content: space-between;
//   &__left {
//     display: flex;
//     align-items: flex-end;
//     .search {
//       box-sizing: border-box;
//       width: 600px;
//       height: 60px;
//       background-color: red;
//       display: flex;
//       padding: 5px 0;
//       .input {
//         width: 200px;
//         height: 100%;
//         background-color: pink;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         margin: 0 2px;
//         overflow: hidden;
//         div:first-child {
//           font-size: 14px;
//         }
//         .input-el {
//          &>>>.el-input__inner{
//             height: 30px!important;
//           }
//           input {
//             height: 30px!important;
//           }
//         }
//       }
//     }

//   }
//   &__right{

//   }
// }
//#endregion
</style>
