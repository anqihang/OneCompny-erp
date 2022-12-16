<template>
  <div class="app-container" id="role" :loading="FlistLoading">
    <div style="margin: 10px; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="openAdd" v-if="addR">添加</el-button>
    </div>
    <el-drawer
      title="添加"
      :visible.sync="visibleAdd"
      class="roleDrawer"
      @close="closeAdd"
      @opened="opend"
    >
      <Search
        class="searchrole"
        :search="[
          { title: '角色名', type: 'input' },
          { title: '角色描述', type: 'input' },
        ]"
        :button="[{ title: '确定', type: 'primary', if: true }]"
      ></Search>

      <div style="width: 100%; padding: 0 40px" class="move">
        <ul style="padding: 0">
          <div v-for="(item, index) in checkList" :key="index">
            <li
              style="
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0 0 0;
              "
            >
              <el-checkbox
                v-model="roleInfo.checked"
                :key="index"
                :label="item.id"
                @change="checkF(item.id)"
                >{{ item.auth_name }}
              </el-checkbox>
            </li>
            <ul
              :class="{
                isButton: item.children && item.children[0].is_menu == 0,
                children: item.children && item.children[0].is_menu == 0,
              }"
            >
              <li
                v-for="(item1, index1) in item.children"
                :key="index1"
                style="list-style: none; padding-top: 20px"
              >
                <el-checkbox
                  v-model="roleInfo.checked"
                  :key="index1"
                  :label="item1.id"
                  @change="checkC(item1.id)"
                  >{{ item1.auth_name }}
                </el-checkbox>
                <ul
                  v-if="item1.children"
                  class="childrenLi"
                  style="display: flex; padding-left: 0px"
                >
                  <li
                    v-for="(item2, index2) in item1.children"
                    :key="index2"
                    style="padding-left: 30px"
                  >
                    <el-checkbox
                      v-model="roleInfo.checked"
                      :key="index2"
                      :label="item2.id"
                      @change="checkCC(item2.id)"
                    >
                      {{ item2.auth_name }}
                    </el-checkbox>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </el-drawer>

    <!--  -->
    <div class="role">
      <el-table
        :row-style="{ height: '94px' }"
        style="margin: 0 auto"
        height="100%"
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
              v-if="editR"
              >编辑</el-button
            >
            <el-button
              type="info"
              style="
                height: 40px;
                width: 70px;
                vertical-align: top;
                margin-right: 10px;
              "
              v-if="!editR"
            ></el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deleteRole(scope.row)"
            >
              <el-button type="danger" slot="reference" v-if="deleteR">
                删除
              </el-button>
            </el-popconfirm>
            <el-button
              v-if="!deleteR"
              type="info"
              style="height: 40px; width: 70px; vertical-align: top"
            ></el-button>
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
  getMenuList,
} from "@/api/table";
import Search from "@/components/Search/index.vue";

export default {
  components: {
    Search,
  },
  computed: {
    auth_id() {
      return localStorage.getItem("auth_id").split(",");
    },
    addR() {
      return this.auth_id.includes("44");
    },
    editR() {
      return this.auth_id.includes("45");
    },
    deleteR() {
      return this.auth_id.includes("46");
    },
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
      FlistLoading: false,
      visibleAdd: false,
      //
      checkList: [],
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
      getMenuList(0).then((res) => {
        this.checkList = res.data.res;
      });
    },
    closeAdd() {
      this.isEdit = false;
      this.roleInfo.name = "";
      this.roleInfo.desc = "";
      this.roleInfo.checked = [];
      this.visibleAdd = false;
      this.$bus.$emit("edit", []);
    },
    addRole(searchInfo) {
      this.roleInfo.name = searchInfo[0];
      this.roleInfo.desc = searchInfo[1];
      if (!this.isEdit) {
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
        this.FlistLoading = true;
        this.$bus.$emit("edit", [this.row.name, this.row.desc]);
        getMenuList(0).then((res) => {
          this.checkList = res.data.res;
          this.FlistLoading = false;
        });
      }
    },
    openEdit(row) {
      this.row = row;
      this.isEdit = true;
      this.visibleAdd = true;
      this.roleInfo.name = row.name;
      this.id = row.id;
      this.roleInfo.checked = row.auth_ids.split(",");
      let a = [];
      for (const iterator of this.roleInfo.checked) {
        a.push(Number(iterator));
      }
      this.roleInfo.checked = a;
      console.log(this.roleInfo.checked);
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
    //check规则
    checkF(id) {
      let arr = [];
      for (const iterator of this.checkList) {
        if (id == iterator.id) {
          if (iterator.children) {
            for (const iterator1 of iterator.children) {
              arr.push(iterator1.id);
              if (iterator1.children) {
                for (const iterator2 of iterator1.children) {
                  arr.push(iterator2.id);
                }
              }
            }
          }
        }
      }
      //改变自己选择状态
      if (this.roleInfo.checked.includes(id)) {
        this.roleInfo.checked.push(...arr);
      } else {
        for (const iterator of arr) {
          if (this.roleInfo.checked.indexOf(iterator) != -1) {
            this.roleInfo.checked.splice(
              this.roleInfo.checked.indexOf(iterator),
              1
            );
          }
        }
      }
    },
    checkC(id) {
      let arr = [];
      let arr1 = [];
      for (const iterator of this.checkList) {
        if (iterator.children) {
          for (const iterator1 of iterator.children) {
            if (iterator1.id == id) {
              arr.push(iterator.id);
              if (iterator1.children) {
                for (const iterator2 of iterator1.children) {
                  arr1.push(iterator2.id);
                }
              }
            }
          }
        }
      }
      if (this.roleInfo.checked.includes(id)) {
        this.roleInfo.checked.push(...arr);
        this.roleInfo.checked.push(...arr1);
      } else {
        for (const iterator of arr1) {
          if (this.roleInfo.checked.indexOf(iterator) != -1) {
            this.roleInfo.checked.splice(
              this.roleInfo.checked.indexOf(iterator),
              1
            );
          }
        }
      }
      //
    },
    checkCC(id) {
      let arr = [];
      for (const iterator of this.checkList) {
        if (iterator.children) {
          for (const iterator1 of iterator.children) {
            if (iterator1.children) {
              for (const iterator2 of iterator1.children) {
                if (iterator2.id == id) {
                  arr.push(iterator.id);
                  arr.push(iterator1.id);
                }
              }
            }
          }
        }
      }
      if (this.roleInfo.checked.includes(id)) {
        this.roleInfo.checked.push(...arr);
      }
    },
  },
};
</script>
<style lang="scss">
.isButton {
  display: flex;
  // padding-top: 10px;
  li {
    padding-top: 10px !important;
  }
}
.childrenLi {
  list-style: none;
  li {
    padding-top: 10px;
  }
}
.children {
  li {
    padding: 20px 0 0 30px;
  }
}
.roleDrawer {
  .el-drawer {
    min-width: 1200px;
    // position: relative;
    .el-drawer__body {
      position: relative;
      padding: 0 20px;
      left: 0;
      right: 0;
      overflow: auto;
      .move {
        position: absolute;
        left: 0;
        right: 0;
        // bottom: 10px;
      }
    }
  }
}
.padd {
  padding-left: 20px;
}
.role {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 20px;
  left: 20px;
}
.searchrole {
  width: 100%;
  .title__left {
    min-width: unset;
  }
}
</style>
