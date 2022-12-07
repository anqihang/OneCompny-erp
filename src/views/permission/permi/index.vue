<template>
  <div class="app-container" id="role">
    <div style="margin: 10px; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="openAdd">添加</el-button>
    </div>
    <!--  -->
    <el-drawer title="添加" :visible.sync="visibleAdd" class="perDrawer">
      <el-form :model="perInfo" label-width="100px">
        <el-form-item label="父级ID">
          <el-input v-model="perInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="功能名称">
          <el-input v-model="perInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="perInfo.weight"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="perInfo.path"></el-input>
        </el-form-item>
        <el-form-item label="功能路径">
          <el-input v-model="perInfo.func"></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right; margin-right: 30px">
        <el-button @click="closeAdd">取消</el-button>
        <el-button type="primary" @click="sendPer">确定</el-button>
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
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="模块名" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="threeLine" slot="reference">
              {{ scope.row.auth_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="路径" min-width="200" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.route }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="功能路径" min-width="200" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.uri }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="权重" min-width="200" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.listorder }}
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
import { getList, getPerList, perEdit, addPer } from "@/api/table";
import Search from "@/components/Search/index.vue";

export default {
  components: {
    Search,
  },
  data() {
    return {
      list: [{ id: 1 }],
      listLoading: false,
      visibleAdd: false,
      //
      perInfo: {
        id: "",
        name: "",
        weight: "",
        path: "",
        func: "",
      },
      isEdit: false,
      id: "",
    };
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    openAdd() {
      this.visibleAdd = true;
    },
    closeAdd() {
      this.visibleAdd = false;
      this.isEdit = false;
    },
    sendPer() {
      this.listLoading =true;
      if (!this.isEdit) {
        addPer(this.perInfo).then(() => {
          this.closeAdd();
          this.fetchData();
        });
      } else {
        perEdit(this.id, this.perInfo).then((res) => {
          this.closeAdd();
          this.fetchData();
        });
      }
    },
    openEdit(row) {
      this.id = row.id;
      this.perInfo.id = row.pid;
      this.perInfo.name = row.auth_name;

      this.perInfo.weight = row.listorder;
      // this.perInfo.path =
      this.perInfo.func = row.uri;

      this.visibleAdd = true;
      this.isEdit = true;
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getPerList()
        .then((res) => {
          console.log(res);
          this.list = res.data;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.perDrawer {
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
.padd {
  padding-left: 20px;
}
</style>
