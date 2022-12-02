<template>
  <div
    class="app-container"
    style="padding-top: 0; padding-right: 0; padding-left: 0"
  >
    <Search :button="[
      {title:'添加',type:'primary',if:true}
    ]"></Search>
    <!--  -->
    <el-dialog :visible.sync="visibleDialog" title="添加用户">
          <el-form>
            <el-form-item label="用户名">
              <template>
                <el-input placeholder="请输入用户名"></el-input>
              </template>
            </el-form-item>
            <el-form-item label="密码">
              <template>
                <el-input placeholder="请输入密码"></el-input>
              </template>
            </el-form-item>
          </el-form>
          <el-form-item>
            <template>
              <el-select>
                <el-option>

                </el-option>
              </el-select>
            </template>
          </el-form-item>
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
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="200%"
            trigger="hover"
            :content="scope.row.title"
          >
            <span class="threeLine" slot="reference">
              {{ scope.row.username }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" align="center">
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
import { getUserList } from "@/api/table";
import Search from "@/components/Search/index.vue";

export default {
  components: {
    Search,
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
      //添加订单弹窗
      visibleDialog: false,
      pageL:10,
      roleList:[
        // {id:0,name:''}
      ]
    };
  },
  created() {
    // this.fetchData();
  },
  mounted() {
    this.$bus.$on("dialog", this.dialog);
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    //
    dialog() {
      // console.log(1);
      this.visibleDialog = true;
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getUserList(this.pageL).then((response) => {
        console.log(2,response);
        this.list = response.data.res.data;
        this.listLoading = false;
      });
    },
    
  },
};
</script>
<style lang="scss" scoped>
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
