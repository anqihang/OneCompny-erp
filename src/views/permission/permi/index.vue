<template>
  <div class="app-container" id="role" v-loading.clock="FlistLoading">
    <div style="margin: 10px; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="openAdd" v-if="addP">添加</el-button>
    </div>
    <!--  -->
    <el-drawer :title="isEdit?'编辑':'添加'" :visible.sync="visibleAdd" class="perDrawer" @close="closeAdd">
      <div
        style="
          display: flex;
          height: 50px;
          align-items: center;
          margin-left: 30px;
          margin-bottom: 10px;
        "
      >
        <div style="margin-right: 10px;display: flex;">
          <div>{{ isEdit?'编辑':'添加'}}</div>
          {{  Bswitch ? "菜单" : "按键" }}
        </div>
        <el-switch
        v-if="!isEdit"
          v-model="Bswitch"
          active-color="#13ce66"
          inactive-color="#2060dd"
        >
        </el-switch>
      </div>
      <el-form :model="perInfo" label-width="100px">
        <el-form-item :label="Bswitch ? '上级菜单' : '所属菜单'">
          <el-select v-model="perInfo.id" clearable>
            <el-option
              v-for="(item, index) in menuList"
              :key="index"
              :label="item.auth_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="Bswitch ? '菜单名称' : '按键名称'">
          <el-input v-model="perInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="权重" v-if="Bswitch">
          <el-input v-model="perInfo.weight"></el-input>
        </el-form-item>
        <el-form-item label="路由路径" v-if="Bswitch">
          <el-input v-model="perInfo.path"></el-input>
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input v-model="perInfo.func"></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right; margin-right: 30px">
        <el-button @click="closeAdd">取消</el-button>
        <el-button type="primary" @click="sendPer">确定</el-button>
      </div>
    </el-drawer>
    <!--  -->
    <div class="infoL">
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
              v-if="editP"
              >编辑</el-button
            >
            <el-button type="info"
        
            style="margin-right: 10px;height:40px;width:70px;vertical-align: top;"
            v-if="!editP"></el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deletePer(scope.row)"
            >
              <el-button type="danger" slot="reference" v-if="deleteP"> 删除 </el-button>
            </el-popconfirm>
            <el-button v-if="!deleteP" type="info" style="height:40px;width:70px;vertical-align: top;"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getPerList, perEdit, addPer, getMenuList,deletePer } from "@/api/table";
import Search from "@/components/Search/index.vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: {
    Search,
  },
  data() {
    return {
      Bswitch: false,
      list: [],
      menuList: [],
      listLoading: false,
      FlistLoading:false,
      visibleAdd: false,
      //
      perInfo: {
        id: "",
        name: "",
        weight: "",
        path: "",
        func: "",
        ismenu: "",
      },
      isEdit: false,
      id: "",
      ismenu:null,
    };
  },
  computed:{
    auth_id(){
      return localStorage.getItem('auth_id').split(',');
    },
    addP(){
      return this.auth_id.includes('47');
    },
    deleteP(){
      return this.auth_id.includes('48');
    },editP(){
      return this.auth_id.includes('49');
    },
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
      getMenuList(1).then((res) => {
        // this.menuList = res.data.list;
        // if(!Array.isArray(res.data)){
        //   res.data=[]
        // }
        let list = [];
        for (const iterator of res.data.res) {
          list.push(iterator);
          if (iterator.children) {
            let children = cloneDeep(iterator.children);
            // iterator.children=null;
            for (const iterator1 of children) {
              iterator1.auth_name = '--'+iterator1.auth_name;
              list.push(iterator1);
            }
          }
        }
        this.menuList = list;
        this.visibleAdd = true;
      });
    },
    closeAdd() {
      this.visibleAdd = false;
      this.isEdit = false;
      this.perInfo.id= "";
      this.perInfo.name= "";
      this.perInfo.weight= "";
      this.perInfo.path="";
      this.perInfo.func= "";
      this.perInfo.ismenu= "";
      this.id ='';
    },
    sendPer() {
      this.listLoading = true;
      if (!this.isEdit) {
        console.log(this.perInfo);
        if (this.Bswitch) {
          this.perInfo.ismenu = 1;
        } else {
          this.perInfo.ismenu = 0;
        }
        console.log(this.perInfo);
        this.FlistLoading = true;
        addPer(this.perInfo).then(() => {
          this.FlistLoading =false;
          this.closeAdd();
          this.fetchData();
        });
      } else {
        if (this.Bswitch) {
          this.perInfo.ismenu = 1;
        } else {
          this.perInfo.ismenu = 0;
        }
        for (const iterator of this.menuList) {
          if(this.perInfo.id==iterator.auth_name){
            this.perInfo.id = iterator.id;
          }
        }
        perEdit(this.id, this.perInfo,this.ismenu).then((res) => {
          this.closeAdd();
          this.fetchData();
        });
      }
    },
    openEdit(row) {
      getMenuList(1).then((res)=>{
        this.ismenu = row.is_menu;
        if(row.is_menu==1){
          this.Bswitch = true;
        }else{
          this.Bswitch =false;
        }
        let list = [];
        for (const iterator of res.data.res) {
          list.push(iterator);
          if (iterator.children) {
            let children = cloneDeep(iterator.children);
            for (const iterator1 of children) {
              iterator1.auth_name = '--' + iterator1.auth_name;
              list.push(iterator1);
            }
          }
        }
        this.menuList = list;
        for (const iterator of res.data.res) {
          if(row.pid==iterator.id){
            this.perInfo.id = iterator.auth_name;
          }
          if(iterator.children){
            for (const iterator1 of iterator.children) {
              if(row.pid==iterator1.id){
                this.perInfo.id=iterator1.auth_name;
              }
            }
          }
        }
      })
      this.id = row.id;
      this.perInfo.path = row.route;
      this.perInfo.name = row.auth_name;
      this.perInfo.weight = row.listorder;
      this.perInfo.func = row.uri;

      this.visibleAdd = true;
      this.isEdit = true;
    },
    deletePer(row){
      deletePer(row.id).then((res)=>{
        this.fetchData();
      })
    },
    //初始化
    fetchData() {
      this.listLoading = true;
      getPerList()
        .then((res) => {
          console.log(res);
          // if(!Array.isArray(res.data)){
          //   this.list = [];
          // }else{
            this.list = res.data.res;
          // }
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
.infoL{
  position: absolute;
  bottom:0;
  top: 60px;
  left:20px;
  right:20px;
}
</style>
