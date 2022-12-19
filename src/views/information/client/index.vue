<template>
  <div class="app-container" v-loading.lock="FlistLoading">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '开户行', type: 'input' },
        { title: '地址', type: 'input' },
        { title: '负责人信息', type: 'input' },
      ]"
      :button="[
        { title: '搜索', type: '',if:true },
        { title: '重置', type: '' ,if:true},
        { title: '添加', type: 'primary',if:addC },
      ]"
    ></Search>
    <!-- //分页
    <el-pagination
      style="margin-bottom: 10px"
      background
      layout="sizes,prev, pager, next"
      :total="page_total"
      @current-change="pageChange"
      @size-change="sizeChange"
      :current-page="page_current"
      :page-size="page_size"
      :page-sizes="[10, 50, 100]"
    >
    </el-pagination> -->
    <!-- 添加客户 -->
    <el-drawer
      direction="rtl"
      size="35%"
      :title="isEdit ? '编辑客户信息' : '添加客户'"
      :visible.sync="visibleDialog"
      @close="shutDownDialog"
      class="drawerInput"
      ref="add"
      @mousedown.native="handleWrapperMousedown($event,'add')"
      @mouseup.native="handleWrapperMouseup($event,'add')"
      :wrapperClosable="false"
    >
      <el-form
        :model="clientInfo"
        label-width="100px"
        :rules="rulesClient"
        ref="clientForm"
        style="margin:20px"
      >
        <el-form-item label="客户名称" prop="companyName">
          <el-input
            v-model="clientInfo.companyName"
            placeholder="请输入客户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户简称" prop="nickName">
          <el-input
            v-model="clientInfo.nickName"
            placeholder="请输入客户简称"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="companyAdress">
          <el-input
            v-model="clientInfo.companyAdress"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
         <el-form-item label="税号" prop="taxCode">
          <el-input
            v-model="clientInfo.taxCode"
            placeholder="请输入税号"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input
            v-model="clientInfo.bankAccount"
            placeholder="请输入银行账号"
          ></el-input>
        </el-form-item>
       
        <el-form-item label="开户行" prop="openBankAccount">
          <el-input
            v-model="clientInfo.openBankAccount"
            placeholder="请输入开户行"
          ></el-input>
        </el-form-item>
        <template v-if="!isEdit">
          <el-form-item label="姓名" prop="personName">
            <el-input
              v-model="clientInfo.personName"
              placeholder="请输入负责人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="personPhone">
            <el-input
              v-model="clientInfo.personPhone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="personEmail">
            <el-input
              v-model="clientInfo.personEmail"
              placeholder="请输入电子邮件"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div style="float: right; margin-right: 30px">
        <el-button @click="shutDownDialog">取消</el-button>
        <el-button type="primary" @click="sendClient">确定</el-button>
      </div>
    </el-drawer>
    <!-- 添加负责人 -->
    <el-drawer
      direction="rtl"
      size="35%"
      class="drawerInput"
      title="添加负责人"
      :visible.sync="visibleDialog_Person"
      @close="shutDownDialog_person"
      ref="pers"
      @mousedown.native="handleWrapperMousedown($event,'pers')"
      @mouseup.native="handleWrapperMouseup($event,'pers')"
      :wrapperClosable="false"
    >
      <el-form
        :model="personInfo"
        label-width="100px"
        :rules="rulesPerson"
        ref="personForm"
        style="margin:20px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="personInfo.name"
            placeholder="请输入负责人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="personInfo.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input
            v-model="personInfo.email"
            placeholder="请输入电子邮件"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right; margin-right: 30px">
        <el-button @click="shutDownDialog_person">取消</el-button>
        <el-button type="primary" @click="sendPerson">确定</el-button>
      </div>
    </el-drawer>
    <!--  -->
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
      size="65%"
      @close="drawer = false"
      ref="his"
      @mousedown.native="handleWrapperMousedown($event,'his')"
      @mouseup.native="handleWrapperMouseup($event,'his')"
      :wrapperClosable="false"
    >
      <div class="drawer">
        <el-table
          height="100%"
          :data="listPerson"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          fit
          :row-style="{ height: '59px' }"
        >
          <el-table-column label="序号" min-width="60px" align="center" class-name="first">
            <template slot-scope="scope"> {{ scope.$index + 1 }} </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="100px" align="center">
            <template slot-scope="scope"> {{ scope.row.name }} </template>
          </el-table-column>
          <el-table-column label="手机号" min-width="140px" align="center">
            <template slot-scope="scope"> {{ scope.row.mobile }} </template>
          </el-table-column>
          <el-table-column label="电子邮件" min-width="180px" align="center">
            <template slot-scope="scope"> {{ scope.row.email }} </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="时间"
            min-width="180"
            label="创建时间"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span> {{ scope.row.create_time }} </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            min-width="100px"
            class="operation"
          >
            <template
              slot-scope="scope"
              style="display: flex; flex-wrap: wrap"
              class="operation"
            >
              <el-button
                type="primary"
                size="small"
                @click="editDrawer_person(scope.row)"
                v-if="editP"
                >编辑</el-button
              >
              <el-button type="info" size="small" v-if="!editP"></el-button>
              <el-popconfirm
                title="确定删除吗？"
                icon="el-icon-info"
                icon-color="red"
                @onConfirm="deleteDrawer_person(scope.row)"
              >
                <el-button type="danger" size="small" slot="reference" v-if="deleteP">
                  删除
                </el-button>
              </el-popconfirm>
              <el-button type="info" size="small" v-if="!deleteP"></el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- <div class="table"> -->
    <!-- height="100%" -->
    <div style="position: absolute;left: 20px;right: 20px;top: 94px;bottom: 50px;">
      <el-table
      height="100%"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        stripe
        fit
        highlight-current-row
        :row-style="{ height: '127px', }"
        @sort-change="sort"
        :header-cell-style="{left:0,right:0}"
      >
        <el-table-column align="center" label="序号" width="50" class-name="li first">
          <template slot-scope="scope">
            {{ (page_current-1)*100+scope.$index + 1}}
            <!-- 99999 -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" min-width="250" class-name="li">
          <template slot-scope="scope">
            <span
                class="threeLine"
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
            {{ scope.row.company_name }}
            </span>  
          </template>
          <!-- 深圳市艾联特电子科技有限公司 -->
        </el-table-column>
        <el-table-column align="center" label="客户简称" width="120" class-name="li">
          <template slot-scope="scope">
            <span
                class="threeLine"
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
            {{ scope.row.company_nickname }}
            </span>  
          </template>
          <!-- 深圳市艾联特电子科技有限公司 -->
        </el-table-column>
        <template v-if="!person_flag">
          <el-table-column align="center" label="地址" min-width="220" class-name="li" key="1">
            <template slot-scope="scope">
                <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.address"
              >
                <span class="threeLine" slot="reference" style="display:flex;justify-content:start;text-align:start!important">
                  {{ scope.row.address }}
                </span>
              </el-popover>
              <!-- aaaaaaaaaaaaaaaaa深圳市南山区西丽街道西丽社区打石一路万科云城四期(集中
              商业项目) B 1002 -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="税号" width="180" class-name="li" key="2">
            <template slot-scope="scope">{{ scope.row.tax_number }} </template>
            <!-- 91441300553659518X -->
          </el-table-column>
          <el-table-column align="center" label="开户行" width="220" class-name="li" key="3">
            <template slot-scope="scope">
              <span
                class="threeLine"
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
              {{ scope.row.bank_name }}
            </span> 
             
             </template>
            <!-- 工行惠州分行江南支行 -->
          </el-table-column>
          <el-table-column align="center" label="银行账号" width="190" class-name="li" key="4">
            <template slot-scope="scope"
              >{{ scope.row.bank_account }}
            </template>
            <!-- 2008030119000017591 -->
          </el-table-column>
        </template>
        <template v-if="person_flag">
          <el-table-column label="姓名" min-width="100px"  class-name="li" key="1">
            <template slot-scope="scope"> {{ scope.row.name }} </template>
          </el-table-column>
          <el-table-column label="手机号" min-width="140px"  class-name="li" key="2">
            <template slot-scope="scope"> {{ scope.row.mobile }} </template>
          </el-table-column>
          <el-table-column label="电子邮件" min-width="180px"  class-name="li" key="3">
            <template slot-scope="scope"> {{ scope.row.email }} </template>
          </el-table-column>
        </template>
        <el-table-column
          align="center"
          prop="time"
          label="创建时间"
          width="170"
          sortable="custom"
          class-name="li"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200"
          class="operation"
          class-name="button"
          style="border-left: 1px solid red"
        >
          <template
            slot-scope="scope"
            style="display: flex; flex-wrap: wrap"
            class="operation"
          >
            <el-button
              type="primary"
              size="small"
              @click="showDrawer(scope.row)"
              v-if="infoP"
              >负责人信息</el-button
            >
            <el-button type="info" size="small" v-if="!infoP"></el-button>


            <el-button
              type="primary"
              size="small"
              @click="showDialog_person(scope.row)"
              v-if="addP"
              >添加负责人</el-button
            >
            <el-button type="info" size="small" v-if="!addP"></el-button>


            <el-button
              type="primary"
              size="small"
              @click="editDialog(scope.row)"
              v-if="editC"
              >编辑</el-button
            >
            <el-button type="info" size="small" v-if="!editC"></el-button>


            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deleteClient(scope.row)"
            >
              <el-button type="danger" size="small" slot="reference" v-if="deleteC">
                删除
              </el-button>
            </el-popconfirm>
            <el-button type="info" size="small" v-if="!deleteC"></el-button>


            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- </div> -->
    <div class="footer">
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :total="page_total"
        @current-change="pageChange"
        @size-change="sizeChange"
        :current-page="page_current"
        :page-size="page_size"
        :page-sizes="[10, 50, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getList,
  addClient,
  editClient,
  getClientList,
  deleteClient,
  getPersonList,
  addPerson,
  editPerson,
  deletePerson,
} from "@/api/table";
import Search from "@/components/Search/index.vue";
import throttle from "lodash/throttle";
import { parseTime } from "@/utils/index";

export default {
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
  computed:{
    auth_id(){
      return localStorage.getItem('auth_id').split(',');
    },
    addC(){
      return this.auth_id.includes('33');
    },
    editC(){
      return this.auth_id.includes('34');
    },deleteC(){
      return this.auth_id.includes('35');
    },infoP(){
      return this.auth_id.includes('36');
    },addP(){
      return this.auth_id.includes('37');
    },editP(){
      return this.auth_id.includes('38');
    },deleteP(){
      return this.auth_id.includes('39');
    },

  },
  data() {
    let check_companyName = (rule, value, callback) => {
      if (/^[\u4e00-\u9fa5\(\)（）\da-zA-Z&]{2,24}$/gi.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的公司名"));
      }
    };
    let check_bankAccount = (rule, value, callback) => {
      if (/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的银行卡号"));
      }
    };
    let check_taxCode = (rule, value, callback) => {
      if (
        /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(
          value
        )
      ) {
        callback();
      } else {
        callback(new Error("请输入正确的税号"));
      }
    };
    let check_personName = (rule, value, callback) => {
      if (/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的姓名"));
      }
    };
    let check_personPhone = (rule, value, callback) => {
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    let check_personEmail = (rule, value, callback) => {
      if (
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱"));
      }
    };
    return {
      drawer: false,
      visibleDialog: false,
      visibleDialog_Person: false,
      FlistLoading: false,
      //编辑状态
      isEdit: false,
      list: null,
      listPerson: null,
      listLoading: false,
      id: null,
      personId: null,
      //
      page_size: 10,
      page_current: 1,
      page_total: 1000,
      //
      person_flag: 0,
      order: "desc",
      //客户信息
      clientInfo: {
        companyName: "",
        nickName: "",
        companyAdress: "",
        bankAccount: "",
        taxCode: "",
        openBankAccount: "",
        personName: "",
        personPhone: "",
        personEmail: "",
      },
      //负责人信息
      personInfo: {
        name: "",
        phone: "",
        email: "",
      },
      //
      classmodel:null,

      //
      rulesClient: {
        companyName: [
          { required: true, message: "请输入", trigger: "blur" },
          // {
          //   validator: check_companyName,
          //   trigger: "blur",
          // },
        ],
        nickName: [{ required: true, message: "请输入", trigger: "blur" }],
        companyAdress: [{ required: true, message: "请输入", trigger: "blur" }],
        bankAccount: [
          { required: true, message: "请输入", trigger: "blur" },
          // { validator: check_bankAccount, trigger: "blur" },
        ],
        taxCode: [
          { required: true, message: "请输入", trigger: "blur" },
          // {
          //   validator: check_taxCode,
          //   trigger: "blur",
          // },
        ],
        openBankAccount: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        personName: [
          { required: true, message: "请输入", trigger: "blur" },
          // {
          //   validator: check_personName,
          //   trigger: "blur",
          // },
        ],
        personPhone: [
          { required: true, message: "请输入", trigger: "blur" },
          // { validator: check_personPhone, trigger: "blur" },
        ],
        personEmail: [
          { required: true, message: "请输入", trigger: "blur" },
          // { validator: check_personEmail, trigger: "blur" },
        ],
      },
      rulesPerson: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          // {
          //   validator: check_personName,
          //   trigger: "blur",
          // },
        ],
        phone: [
          { required: true, message: "请输入", trigger: "blur" },
          // { validator: check_personPhone, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入", trigger: "blur" },
          // { validator: check_personEmail, trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Search,
  },
  mounted() {
    this.$bus.$on("add", this.addClient);
    this.$bus.$on("goSearch", this.search);
  },
  beforeDestroy(){
    this.$bus.$off();
  },
  created() {
    this.fetchData();
    this.FlistLoading = true;
  },
  methods: {
    search(r) {
      if (r[3]) {
        this.person_flag = 1;
      } else {
        this.person_flag = 0;
      }
      this.fetchData(r);
    },
    addClient() {
      this.showDialog();
    },
    //负责人抽屉
    showDrawer(row) {
      if (row) {
        this.id = row.id;
      }
      throttle(
        () => {
          this.FlistLoading = true;
          getPersonList(this.id).then((res) => {
            this.listPerson = res.data.res;
            this.drawer = true;
            this.FlistLoading = false;
          });
        },
        1000,
        { leading: true }
      )();
    },
    showDrawerRow(row, a, b) {
      if (a.label == "客户名称") {
        this.drawer = true;
        throttle(() => {}, 1000, { leading: true });
      }
    },
    //添加负责人弹窗
    showDialog_person(row) {
      //-----------------------------------------
      this.id = row.id;
      this.visibleDialog_Person = true;
    },
    shutDownDialog_person() {
      this.$refs.personForm.resetFields();
      this.isEdit = false;
      this.personInfo = {
        name: "",
        phone: "",
        email: "",
      };
      this.visibleDialog_Person = false;
    },
    //编辑负责人
    editDrawer_person(row) {
      this.personId = row.id;
      console.log(row);
      this.personInfo = {
        name: row.name,
        phone: row.mobile,
        email: row.email,
      };
      this.isEdit = true;
      this.drawer = false;
      this.visibleDialog_Person = true;
    },
    //删除负责人
    deleteDrawer_person(row) {
      this.listLoading = true;
      deletePerson(row.id)
        .then((res) => {})
        .finally(() => {
          // this.drawer=false;
          this.showDrawer();
          this.listLoading = false;
        });
    },
    //时间排序
    sort(column) {
      // console.log(1, column);
      this.order = column.order == "descending" ? "desc" : "asc";
      this.fetchData();
    },
    fetchData(data) {
      if (!data) {
        data = ["", "", "", ""];
      }
      //#region
      // this.listLoading = true;
      //----------------------------------------------
      // getList().then((response) => {
      //   this.list = response.data.items;
      //   this.listLoading = false;
      //   this.FlistLoading = false;
      // });
      //----------
      //#endregion
      this.listLoading = true;
      getClientList({
        size: this.page_size,
        current: this.page_current,
        data,
        flag: this.person_flag,
        order: this.order,
      }).then((response) => {
        console.log(2, response);
        this.page_total = response.data.res.total;
        this.list = response.data.res.data;
        this.listLoading = false;
        this.FlistLoading = false;
      });
    },
    //添加/编辑客户
    sendClient() {
      throttle(
        () => {
          //发请求
          this.$refs["clientForm"].validate((valid) => {
            if (valid) {
              // this.FlistLoading = true;
              this.listLoading = true;
              if (this.isEdit) {
                editClient(this.clientInfo, this.id)
                  .then((res) => {})
                  .finally(() => {
                    // this.FlistLoading = false;
                    this.listLoading = false;
                    this.shutDownDialog();
                    this.fetchData();
                  });
              } else {
                addClient(this.clientInfo)
                  .then((res) => {
                    if(res.code==200){
                      this.shutDownDialog();
                    }
                  })
                  .finally(() => {
                    // this.FlistLoading = false;
                    this.listLoading = false;
                    this.fetchData();
                  });
              }
            } else {
              console.log("clientForm err");
              return false;
            }
          });
        },
        1000,
        { leading: true }
      )();
    },
    //添加/编辑客户弹窗
    showDialog() {
      this.visibleDialog = true;
    },
    shutDownDialog() {
      this.$refs.clientForm.resetFields();
      this.visibleDialog = false;
      this.$refs["clientForm"].resetFields();
      this.isEdit = false;
      this.clientInfo = {
        companyName: "",
        companyAdress: "",
        bankAccount: "",
        taxCode: "",
        openBankAccount: "",
        personName: "",
        personPhone: "",
        personEmail: "",
      };
    },
    //编辑客户弹窗
    editDialog(row) {
      //-------------------------
      this.id = row.id;
      this.clientInfo = {
        companyName: row.company_name,
        nickName: row.company_nickname,
        companyAdress: row.address,
        bankAccount: row.bank_account,
        taxCode: row.tax_number,
        openBankAccount: row.bank_name,
      };
      this.isEdit = true;
      this.showDialog();
    },
    //删除客户
    deleteClient(row) {
      throttle(
        () => {
          this.listLoading = true;
          deleteClient(row.id).then(() => {
            this.listLoading = false;
            this.fetchData();
          });
        },
        1000,
        { leading: true }
      )();
    },
    //添加负责人
    sendPerson() {
      throttle(
        () => {
          this.$refs["personForm"].validate((valid) => {
            if (valid) {
              this.listLoading = true;
              if (!this.isEdit) {
                addPerson(this.personInfo, this.id)
                  .then((res) => {})
                  .finally(() => {
                    this.shutDownDialog_person();
                    this.listLoading = false;
                  });
              } else {
                editPerson(this.personInfo, this.id, this.personId)
                  .then((res) => {})
                  .finally(() => {
                    this.shutDownDialog_person();
                    this.listLoading = false;
                  });
              }
            } else {
              return false;
            }
          });
        },
        1000,
        { leading: true }
      )();
    },
    //换页
    pageChange(currentPage) {
      this.current = currentPage;
      this.fetchData();
    },
    sizeChange(size) {
      this.page_size = size;
    },
    handleWrapperMousedown(e, product) {
      // 如果为true，则表示点击发生在遮罩层
      this.classmodel = !!e.target.classList.contains("el-drawer__container");
    },
    handleWrapperMouseup(e, product) {
      if (
        !!e.target.classList.contains("el-drawer__container") &&
        this.classmodel
      ) {
        this.$refs[product].closeDrawer();
      } else {
        this.product = true;
      }
      this.classmodel = false;
    },
  },
};
</script>
<style lang="scss">
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
.page_top {
  display: flex;
  justify-content: flex-end;
}
.app-container,
.drawer {
  overflow: auto;
  // padding-bottom: 0;
  // padding-right: 0;
  // padding-left: 0;
  padding-top: 0;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // height: 100%;
  // .table{
  // flex:1;
  // position:relative;
  // &>>>.el-table{
  // position:absolute;
  // }
  // }
}
.drawer {
  overflow: auto;
  // padding-bottom: 0;
  // padding-right: 0;
  // padding-left: 0;
  padding-top: 0;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  // .table{
  // flex:1;
  // position:relative;
  // &>>>.el-table{
  // position:absolute;
  // }
  // }
}
.el-table {
  bottom: initial;
  .el-table__row {
    .button{
    .cell {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center;
      align-items: center;
      .el-button {
        margin: 2px !important;
        width: 78px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  }
}
.el-drawer__wrapper {
  .el-drawer__body {
    height: 100px;
  }
}
.el-drawer .rtl {
  height: 90% !important;
  .el-drawer__body {
    height: 100%;
  }
}
.el-dialog__wrapper {
  display: flex;
  align-items: center;
}
.footer {
  margin: 5px 0 10px 0;
}

.drawerInput {
  .el-drawer {
    min-width: 478px !important;
    overflow: scroll !important;
  }
  .el-input {
    width: 300px !important;
  }
}

</style>
