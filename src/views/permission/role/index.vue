<template>
  <div class="app-container" id="role">
    <Search
      :search="[]"
      :button="[{ title: '添加', type: 'primary', if: true }]"
    ></Search>

    <el-drawer title="添加" :visible.sync="visibleAdd" class="roleDrawer">
      <Search
        :search="[
          {title:'角色名',type:'input'},
        ]"
        :button="[
          {title:'确定',type:'primary',if:true}
        ]"
      ></Search>
      
      <div style="background-color:red;width:100%;height:100%;padding: 20px;">
        <ul>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="">产品管理</div>
            <div>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
            </div>
          </li>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="">订单管理</div>
            <div>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
            </div>
          </li>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="">库存管理</div>
          </li>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="padding:20px;">入库管理</div>
            <div>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
            </div>
          </li>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="padding:20px;">出库管理</div>
            <div>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
            </div>
          </li>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="">结款管理</div>
            <div>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
            </div>
          </li>
          <li style="height:40px;display:flex;justify-content: space-between;align-items: center;">
            <div style="">客户信息管理</div>
            <div>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
              <el-checkbox v-model="checked[0]">备选项</el-checkbox>
            </div>
          </li>
        </ul>
      </div>
    </el-drawer>

    <!--  -->
    <div class="role">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        stripe
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span> {{ scope.row.create_time }} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="250">
          <template slot-scope="scope">
            <span> {{ scope.row.create_time }} </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200"
          class="operation"
          class-name="button t"
          style="border-left: 1px solid #ebeef5"
        >
          <template
            slot-scope="scope"
            style="display: flex; flex-wrap: wrap"
            class="operation"
          >
            <el-button type="primary" size="small"> 编辑 </el-button>
            <el-button type="danger" size="small"> 删除 </el-button>
            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getRoleList } from "@/api/table";
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
      visibleAdd: false,
      //
      checked:[]
    };
  },
  mounted() {
    this.$bus.$on("add", this.addRole);
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    addRole() {
      this.visibleAdd = true;
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getRoleList()
        .then((res) => {
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
    .el-drawer__body{
      padding: 0 10px;
    }
  }
}
</style>
