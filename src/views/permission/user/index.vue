<template>
  <div class="app-container user">
    <!-- <Search
      :search="[]"
      :button="[{ title: '添加', type: 'primary', if: true }]"
    ></Search> -->
    <div style="margin: 10px; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="openAdd" v-if="addU">添加</el-button>
    </div>
    <!--  -->
    <el-drawer
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible.sync="visibleAdd"
      @close="closeAdd"
      class="adduserDrawer"
    >
      <el-form :model="userInfo" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="账号" prop="account">
          <el-input v-model="userInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="!isEdit" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="role">
          <el-select v-model="userInfo.role">
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right; margin-right: 30px">
        <el-button @click="closeAdd">取消</el-button>
        <el-button type="primary" @click="sendUser">确定</el-button>
      </div>
    </el-drawer>
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
      <el-table-column align="center" label="序号" width="70%">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="账号" min-width="200" align="center">
        <template slot-scope="scope">
         
            <span class="threeLine" slot="reference">
              {{ scope.row.account }}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="200" align="center">
        <template slot-scope="scope">
          <span class="threeLine" slot="reference">
            {{ scope.row.admin_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" min-width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="300" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="openEdit(scope.row)"
            style="margin-right: 10px"
            v-if="editU"
            >编辑</el-button
          >
          <el-button type="info" 
          style="height:40px;width:70px;vertical-align: top;margin-right:10px;"
          
          v-if="!editU"
          ></el-button>
          <el-popconfirm
            title="确定删除吗？"
            icon="el-icon-info"
            icon-color="red"
            @onConfirm="deleteUser(scope.row)"
          >
            <el-button type="danger" slot="reference" v-if='deleteU'> 删除 </el-button>
          </el-popconfirm>
          <el-button type="info" 
          style="height:40px;width:70px;vertical-align: top;"
          v-if="!deleteU"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getUserList,
  addUser,
  getRoleList,
  editUser,
  deleteUser,
} from "@/api/table";
import Search from "@/components/Search/index.vue";

export default {
  components: {
    Search,
  },
  computed:{
    auth_id(){
      return localStorage.getItem('auth_id').split(',');
    },
    addU(){
      return this.auth_id.includes('40')
    },
    editU(){
      return this.auth_id.includes('41')
    },
    deleteU(){
      return this.auth_id.includes('43')
    },
  },
  data() {
    return {
      // list: null,
      isEdit: false,
      list: [],
      listLoading: false,
      //添加订单弹窗
      visibleAdd: false,
      roleList: [],
      //
      userInfo: {
        account: "",
        password: "",
        name: "",
        role: "",
        email: "",
      },
      id: null,
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        role: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$bus.$on("add", this.openAdd);
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    openAdd() {
      this.visibleAdd = true;
      getRoleList().then((res) => {
        this.roleList = res.data.res;
      });
    },
    closeAdd() {
      this.visibleAdd = false;
      this.isEdit = false;
      this.userInfo.account = "";
      this.userInfo.password = "";
      this.userInfo.name = "";
      this.userInfo.role = "";
      this.userInfo.email = "";
      this.fetchData();
    },
    sendUser() {
      if (!this.isEdit) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            console.log(this.userInfo);
            addUser(this.userInfo)
              .then((res) => {
                this.closeAdd();
              })
              .finally(() => {
              });
          }
        });
      } else {
        for (const iterator of this.roleList) {
          if (iterator.name == this.userInfo.role) {
            this.userInfo.role = iterator.id;
          }
        }
        editUser(this.id, this.userInfo)
          .then((res) => {
            console.log(res);
            localStorage.setItem('name',res.data.name)
            this.$bus.$emit('changeName',res.data.name)
          })
          .finally(() => {
            this.closeAdd();
          });
      }
    },
    openEdit(row) {
      this.userInfo.account = row.account;
      this.userInfo.name = row.admin_name;
      this.userInfo.email = row.email;
      this.userInfo.role = row.role_name;
      this.id = row.id;
      this.visibleAdd = true;
      this.isEdit = true;
      getRoleList().then((res) => {
        this.roleList = res.data.res;
      });
    },
    deleteUser(row) {
      deleteUser(row.id)
        .then((res) => {})
        .finally(() => {
          this.fetchData();
        });
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getUserList().then((res) => {
        this.list = res.data.res.data;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">
.user {
  .adduserDrawer {
    .el-drawer {
      min-width: 478px !important;
      overflow: scroll !important;
      .el-drawer__body {
        margin: 20px;
      }
    }
    .el-input {
      width: 300px !important;
    }
  }
  .input-el {
    width: 346px;
    // display: flex;
    // align-items: center;
    & > div {
      font-size: 14px;
      line-height: 28px;
      width: none;
      padding: 0 0 0 10px;
    }
    input {
      height: 30px;
      width: none !important;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
}
</style>
