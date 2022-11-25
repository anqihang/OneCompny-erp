<template>
  <div
    class="app-container"
    style="padding-top: 0; padding-right: 0; padding-left: 0"
  >
    <div style="padding-right: 5px">
      <Search></Search>
    </div>
    <!--  -->
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="shutDownDrawer"
    >
      <div style="padding: 0 5px">
        <el-table
          :data="productionsInfo"
          :header-cell-style="{ height: '30px', padding: '0' }"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
        >
          <el-table-column label="id" width="40" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="元件名称" width="200" align="center">
            <template slot-scope="scope">
              <span class="threeLine">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="料号" width="60" align="center">
            <template slot-scope="scope">
              {{ scope.row.num }}
            </template>
          </el-table-column>
          <el-table-column label="相关产品" width="70" align="center">
            <template slot-scope="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column label="产品料号" width="60px" align="center">
            <template slot-scope="scope">
              {{ scope.row.totalPrice }}
            </template>
          </el-table-column>
         
          <el-table-column label="规格" width="60" align="center">
            <template slot-scope="scope">
              {{ scope.row.totalPrice }}
            </template>
          </el-table-column>
          <el-table-column label="库存数" width="60" align="center">
            <template slot-scope="scope">
              {{ scope.row.totalPrice }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- 添加弹窗 -->
    <el-dialog
      title="添加订单"
      :visible.sync="visibleDialog"
      :before-close="closeDialog"
    >
      <el-form
        :rules="rules"
        class="add"
        :model="ordersInfo"
        style="display: flex; flex-wrap: wrap; justify-content: space-between"
      >
        <el-form-item label="公司名称" style="width: 48%" prop="companyName">
          <el-input v-model="ordersInfo.companyName"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" style="width: 48%" prop="adress">
          <el-input v-model="ordersInfo.adress"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" style="width: 48%">
          <el-input v-model="ordersInfo.bankAccount"></el-input>
        </el-form-item>
        <el-form-item class="production" label="产品信息" style="width: 48%">
          <el-select
            v-model="ordersInfo.productions"
            multiple
            filterable
            placeholder="请选择"
            @change="addProductionInfo"
          >
            <el-option
              v-for="(item, index) in productionList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" style="flex: 1">
          <el-input v-model="ordersInfo.name"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          style="flex: 2; margin-left: 5px; margin-right: 5px"
        >
          <el-input v-model="ordersInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" style="flex: 2">
          <el-input v-model="ordersInfo.email"></el-input>
        </el-form-item>
        <!-- 产品详情 -->
        <div
          style="
            width: 100%;
            border-top: 1px solid red;
            padding-top: 5px;
            margin-top: 5px;
          "
          label-position="left"
          v-for="(item, index) in ordersInfo.productions"
          :key="index"
        >
          <div style="text-align: center; font-weight: 700; font-size: 20px">
            {{ productionList[item].abbr }}
          </div>
          <el-form-item label="产品名称:">
            <span>{{ productionList[item].name }}</span>
          </el-form-item>
          <div style="display: flex; margin: 10px 0 20px 0">
            <el-form-item
              label="数量(个):"
              label-width="80px"
              style="flex: 2; margin-left: -12px"
            >
              <el-input
                v-model="ordersInfo.productionInfo[index].number"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="单价(元):"
              label-width="80px"
              style="flex: 2; margin: 0 20px"
            >
              <el-input
                v-model="ordersInfo.productionInfo[index].price"
              ></el-input>
            </el-form-item>
            <el-form-item label="总价(元):" label-width="80px" style="flex: 2">
              <!-- <span>{{ ordersInfo.productionInfo[index].totalPrice }}</span> -->
              <span>{{
                ordersInfo.productionInfo[index].price *
                ordersInfo.productionInfo[index].number
              }}</span>
            </el-form-item>
          </div>
          <el-form-item
            label="客户料号"
            label-width="100px;"
            style="display: flex"
          >
            <el-input
              v-model="ordersInfo.productionInfo[index].materialNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户料号描述">
            <el-input
              v-model="ordersInfo.productionInfo[index].materialDescription"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sendOrderInfo">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <!-- <el-dialog
      title="编辑订单"
      :visible.sync="visibleDialogEdit"
      :before-close="editCloseDialog"
    >
      <el-form>
        <el-form-item label="公司名称">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-form-item>
        <el-form-item label="公司地址">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-form-item>
        <el-form-item label="银行账号">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-form-item>
        <el-form-item label="产品">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog> -->
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
      :span-method="arraySpanMethod"
    >
      <el-table-column align="center" label="ID" min-width="40%" fixed>
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="原料名称" min-width="100%">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="料号" min-width="200%" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            min-width="200%"
            trigger="hover"
            :content="scope.row.title"
          >
            <span class="threeLine" slot="reference">
              {{ scope.row.title }}
            </span>
          </el-popover>
        </template>
      </el-table-column>  
      <el-table-column label="相关产品" min-width="110%" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showDrawer(scope.row.id)"
            >产品信息</el-button
          >
        </template>
      </el-table-column>  
      <el-table-column label="规格" min-width="110%" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showDrawer(scope.row.id)"
            >产品信息</el-button
          >
        </template>
      </el-table-column> 
      <el-table-column label="库存" min-width="110%" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showDrawer(scope.row.id)"
            >产品信息</el-button
          >
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
      <el-table-column
        align="center"
        label="操作"
        min-width="180"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="editDialog">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import Search from "@/components/Search/index.vue";
import throttle from "lodash/throttle";
import { validAllChinese } from "@/utils";

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
    const validAllChinese = (rule, value, callback) => {
      if (/^[\u4e00-\u9fa5]{1,}$/.test(value) == false) {
        callback(new Error("请输入正确的公司名"));
      } else {
        callback();
      }
    };
    const validAdress = (rule, value, callback) => {
      if (!/.+?(省|市|自治区|自治州|县|区)/g.test(value)) {
        callback(new Error("请输入正确的地址"));
      } else {
        callback();
      }
    };
    return {
      list: [{id:0}],
      listLoading: false,
      //产品信息抽屉
      drawer: false,
      //添加订单弹窗
      visibleDialog: false,
      //
      visibleDialogEdit: false,
      //抽屉显示产品信息
      productionsInfo: [
        {
          id: 1,
          name: "产品aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafdfsfd",
          num: 13,
          price: 10,
          totalPrice: 130,
        },
        {
          id: 1,
          name: "产品a",
          num: 13,
          price: 10,
          totalPrice: 130,
        },
      ],
      //收集发送后台//编辑
      ordersInfo: {
        companyName: "aaa",
        companyAdress: "444",
        adress: "什么路",
        bankAccount: "41231",
        name: "333",
        phone: "222",
        email: "111",
        productions: [0],
        productionInfo: [
          {
            productionID: 0,
            number: 10,
            price: 13,
            totalPrice: null,
            materialNum: "12",
            materialDescription: "123a",
          },
        ],
      },
      //添加时用selecct后端拿
      productionList: {
        0: {
          id: 0,
          name: "产品aaaaaaaaaaaaaaaaaaaaa",
          abbr: "产品a",
        },
        1: {
          id: 1,
          name: "产品bbbbbbbbbbbbbbbbbbbb",
          abbr: "产品b",
        },
        2: {
          id: 2,
          name: "产品cccccccccccccccccccc",
          abbr: "产品c",
        },
      },
      //抽屉里用/后端拿
      customerProductionMaterialNum: [
        {
          name: "abc",
          number: "123",
        },
        {
          name: "def",
          number: "456",
        },
        {
          name: "ghi",
          number: "789",
        },
        {
          name: "jkl",
          number: "101112",
        },
      ],
      rules: {
        companyName: [
          { required: true, message: "请填写公司名", trigger: "blur" },
          { validator: validAllChinese, trigger: "blur" },
        ],
        companyAdress: [
          { required: true, message: "请填写公司地址", trigger: "blur" },
          { validator: validAdress, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
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
      this.visibleDialog = true;
    },
    //关闭添加弹窗：before-close/确定和点击空白
    closeDialog() {
      this.visibleDialog = false;
    },
    //取消
    cancel() {
      this.ordersInfo = {
        companyName: "",
        companyAdress: "",
        name: "",
        phone: "",
        email: "",
        productions: [],
        productionInfo: [],
      };
      this.visibleDialog = false;
    },
    //打开编辑弹窗
    editDialog() {
      // this.visibleDialogEdit = true;
      this.visibleDialog = true;
    },
    editCloseDialog() {
      // this.visibleDialogEdit = false;
      this.visibleDialog = false;
    },
    //
    //控制产品信息抽屉的开
    showDrawer(id) {
      this.drawer = true;
    },
    //抽屉的关before-close
    shutDownDrawer() {
      this.drawer = false;
    },
    //
    //初始化
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    //合并表格行列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 0||columnIndex === 1||columnIndex === 2||columnIndex==3||columnIndex==4||columnIndex === 5) {
      //     if (rowIndex % 2 === 0) {
      //       return {
      //         rowspan: 2,
      //         colspan: 1
      //       };
      //     } else {
      //       return {
      //         rowspan: 0,
      //         colspan: 0
      //       };
      //     }
      //   }
    },
    //添加弹窗确定、发请求
    sendOrderInfo() {
      // this.closeDialog();
      this.ordersInfo.productionInfo.totalPrice =
        this.ordersInfo.productionInfo.price *
        this.ordersInfo.productionInfo.number;
      console.log(1, this.ordersInfo);
      this.cancel();
      //节流，立即触发
      throttle(
        () => {
          //发请求
          // console.log(1);
        },
        1000,
        { leading: true }
      )();
    },
    //选择产品后添加承接变量
    addProductionInfo() {
      console.log(1);
      let a = {
        productionID: 0,
        number: 0,
        price: 0,
        totalPrice: 0,
        materialNum: "",
        materialDescription: "",
      };
      let obj = [];
      for (const iterator of this.ordersInfo.productions) {
        obj.push(a);
      }
      // this.ordersInfo.productions.forEach(element => {
      //   obj.push(a);

      // });
      this.ordersInfo.productionInfo = obj;
      // this.ordersInfo.productionInfo.push(a);
    },
  },
};
</script>
<style lang="scss" scoped>
// >>>.el-table__body-wrapper::-webkit-scrollbar{
//   display: none;
// }
//三行显示，超过为省略
.threeLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
// .add {
//   .el-form-item {
//     // margin-bottom: 0;
//   }
// }
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
