<template>
  <div class="app-container" id="role" :loading = FlistLoading>
    <div style="margin: 10px; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="openAdd">添加</el-button>
    </div>
    <!-- <search
    :search="[
    ]"
      :button="[
        {title:'添加',type:'primary',if:true}
      ]"
    ></search> -->

    <el-drawer
      title="添加"
      :visible.sync="visibleAdd"
      class="roleDrawer"
      @close="closeAdd"
      @opened="opend"
    >
      <Search
        :search="[
          { title: '角色名', type: 'input' },
          { title: '角色描述', type: 'input' },
        ]"
        :button="[{ title: '确定', type: 'primary', if: true }]"
      ></Search>

      <div style="width: 100%; height: 100%; padding: 20px">
        <ul style="padding: 0">
          <div v-for="(item, index) in checkList" :key="index">
            <!-- <li
            style="
              height: 40px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
            v-if="item.fName"
          >
            <div style="padding: 20px">{{item.fName}}</div>
          </li>        -->
            <li
              style="
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
              :class="{ padd: item.padd }"
            >
              <div style="padding: 20px">{{ item.auth_name }}</div>
              <div>
                <el-checkbox
                  v-model="roleInfo.checked"
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                  :label="item1.id"
                  >{{ item1.auth_name }}</el-checkbox
                >
              </div>
            </li>
          </div>
        </ul>
      </div>
    </el-drawer>

    <!--  -->
    <div class="role">
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
        <el-table-column align="center" label="ID" width="70%">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="角色名" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="threeLine" slot="reference">
              {{ scope.row.name }}
            </span>
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
        <el-table-column label="备注" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="threeLine" slot="reference">
              {{ scope.row.desc }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="300" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="openEdit(scope.row)"
              style="margin-right: 10px"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deleteRole(scope.row)"
            >
              <el-button type="danger" slot="reference"> 删除 </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getList,
  getRoleList,
  addRole,
  deleteRole,
  editRole,
  getPerList,
} from "@/api/table";
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
      list: [],
      listLoading: false,
      FlistLoading:false,
      visibleAdd: false,
      //
      checkList: [
      ],
      roleInfo: {
        name: "",
        desc: "",
        checked: [],
      },
      id: null,
      isEdit: false,
      row: "",
    };
  },
  mounted() {
    this.$bus.$on("storage", this.addRole);
    this.$bus.$on("add", this.openAdd);
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    openAdd() {
      this.visibleAdd = true;
      getPerList().then((res) => {
        this.checkList = res.data;
      });
    },
    closeAdd() {
      this.isEdit =false;
      this.roleInfo.name = "";
      this.roleInfo.desc = "";
      this.roleInfo.checked=[];
      this.visibleAdd = false;
      this.$bus.$emit('edit',[]);
    },
    addRole(searchInfo) {
      if (!this.isEdit) {
        this.roleInfo.name = searchInfo[0];
        this.roleInfo.desc = searchInfo[1];
        console.log(this.roleInfo);
        addRole(this.roleInfo).then((res) => {
          this.closeAdd();
          this.fetchData();
        });
      } else {
        editRole(this.id, this.roleInfo).then((res) => {
          this.closeAdd();
          this.fetchData();
        });
      }
    },
    deleteRole(row) {
      deleteRole(row.id).then((rew) => {
        this.fetchData();
      });
    },
    opend() {
      if (this.isEdit) {
        this.FlistLoading =true;
        this.$bus.$emit("edit", [this.row.name, this.row.desc]);
        getPerList().then((res) => {
        this.checkList = res.data;
        this.FlistLoading = false;
      });
      }
    },
    openEdit(row) {
      this.row = row;
      this.isEdit =true;
      this.visibleAdd = true;
      this.roleInfo.name = row.name;
      this.id = row.id;
      this.roleInfo.checked = row.checked;
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getRoleList()
        .then((res) => {
          console.log(res);
          this.list = res.data.res;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.roleDrawer {
  .el-drawer {
    min-width: 1400px;
    .el-drawer__body {
      padding: 0 10px;
    }
  }
}
.padd {
  padding-left: 20px;
}
</style>
