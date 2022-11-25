<template>
  <div class="app-container order">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '订单号', type: 'input' },
        { title: '客户料号', type: 'input' },
        { title: '产品料号', type: 'input' },
        { title: '产品名称', type: 'input' },
        { title: '订单状态', type: 'input' },
        { title: '描述', type: 'input' },
        { title: '备注', type: 'input' },
      ]"
      :button="[
        { title: '搜索', type: '' },
        { title: '重置', type: '' },
        { title: '添加', type: 'primary' },
      ]"
    ></Search>
    <!-- //添加 -->
    <el-drawer
      class="orderDrawer"
      :visible.sync="visibleAdd"
      direction="rtl"
      size="70%"
      title="添加订单"
      @close="closeAddDrawer"
    >
      <Search
      ref="search"
        :search="[
          { title: '客户名称', type: 'autocomplate' },
          { title: '订单号', type: 'input' },
          { title: '订单PDF文件', type: 'file' },
          { title: '项目名称', type: 'input' },
          { title: '工单号', type: 'input' },
          { title: '备注', type: 'input' },
        ]"
        :button="[
          { title: '确定', type: 'primary' },
          { title: '选择产品', type: 'primary' },
        ]"
      ></Search>
      <div style="background-color: #f5f7fa; height: 3px; margin: 10px"></div>
      <div>
        <div
          style="
            font-size: 25px;
            margin: 10px;
            display: flex;
            justify-content: space-between;
          "
        >
          <div>产品</div>
          <div style="width: 250px">订单总价：11111111</div>
        </div>
        <div class="inpu">
          <el-table
            :data="list"
            border
            stripe
            fit
            :row-style="{ height: '127px' }"
            :header-cell-style="{ height: '36px' }"
          >
            <el-table-column
              width="50"
              label="序号"
              align="center"
              class-name="li"
            >
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column
              label="客户料号"
              align="center"
              min-width="100"
              class-name="li"
              prop="kehu"
            >
              <template slot-scope="scope">
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  PCBA-全格-蓝牙版-UVC-杀菌灯板
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="产品料号"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope">
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  PCBA-全格-蓝牙版-UVC-杀菌灯板
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="产品名称"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope">
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  PCBA-全格-蓝牙版-UVC-杀菌灯板
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="当前库存"
              align="center"
              width="90"
              class-name="li"
            >
              <template slot-scope="scope"> 100000 </template>
            </el-table-column>
            <el-table-column
              label="产品规格"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  min-width="200%"
                  trigger="hover"
                  content="aaaaaaaaaaaaaa"
                >
                  <span
                    class="threeLine"
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    UVA-UVC-杀菌灯260-280nm-395-405nm-3.5x3.5x1.41mm-3-6W-5-7V-3.0-3.4V-40-100mA
                  </span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="产品单价"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input
                  style="
                    width: 100%;
                  "
                  placeholder="请输入"
                  v-model="perValue[scope.$index]"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input placeholder="请输入" v-model="perNum[scope.$index]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="小计"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope">
                {{perValue[scope.$index]*perNum[scope.$index]}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
    <!-- 产品列表 -->
    <el-drawer
      class="selectDrawer"
      :visible.sync="visibleProductions"
      title="产品列表"
      size="60%"
      @close="closeSelectDrawer"
      direction="rtl"
    >
    <el-button @click="closeSelectDrawer" type="primary" size='small' style="float:right;margin-bottom:10px;width:78px;">确定</el-button>
      <el-table
        :data="list"
        border
        stripe
        fit
        :row-style="{ height: '127px' }"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="40" align="center">
        </el-table-column>
        <el-table-column width="50" label="序号" align="center" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          label="客户料号"
          align="center"
          min-width="100"
          class-name="li"
          prop="kehu"
        >
          <template slot-scope="scope">
            <span
              slot="reference"
              style="
                display: flex;
                justify-content: start;
                text-align: start !important;
              "
            >
              PCBA-全格-蓝牙版-UVC-杀菌灯板
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="产品料号"
          align="center"
          min-width="100"
          class-name="li"
        >
          <template slot-scope="scope">
            <span
              slot="reference"
              style="
                display: flex;
                justify-content: start;
                text-align: start !important;
              "
            >
              PCBA-全格-蓝牙版-UVC-杀菌灯板
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="产品名称"
          align="center"
          min-width="100"
          class-name="li"
        >
          <template slot-scope="scope">
            <span
              slot="reference"
              style="
                display: flex;
                justify-content: start;
                text-align: start !important;
              "
            >
              PCBA-全格-蓝牙版-UVC-杀菌灯板
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="当前库存"
          align="center"
          width="90"
          class-name="li"
        >
          <template slot-scope="scope"> 100000 </template>
        </el-table-column>
        <el-table-column
          label="产品规格"
          align="center"
          min-width="100"
          class-name="li"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              min-width="200%"
              trigger="hover"
              content="aaaaaaaaaaaaaa"
            >
              <span
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
                UVA-UVC-杀菌灯260-280nm-395-405nm-3.5x3.5x1.41mm-3-6W-5-7V-3.0-3.4V-40-100mA
              </span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <!--信息  -->
<el-drawer class="details"
    :visible.sync = "visibleDetails"
    title="订单信息"
    size="60%"
    direction="rtl"
    @close="closeDetails"
>
<div style="display: flex; flex-wrap: wrap" class="info">
        <div>
          <div>客户名称</div>
          <div>ds</div>
        </div>
        <div>
          <div>订单号</div>
          <div>sdv</div>
        </div>
        <div>
          <div>订单总价</div>
          <div>ds</div>
        </div>
        <div>
          <div>订单状态</div>
          <div>
            v
          </div>
        </div>
        <div>
          <div>备注</div>
          <div>a</div>
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 30px;
          background-color: rgba(128, 128, 128, 0.2);
          border-radius: 5px;
          margin: 10px;
          padding: 10px 20px;
        "
      >
      </div>

      <div style="margin: 10px">
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="list"
          :row-style="{ height: '100px' }"
          :header-cell-style="{ height: '40px' }"
        >
          <el-table-column
            align="center"
            label="序号"
            width="50"
            class-name="li"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="客户料号"
            align="center"
            min-width="140"
            class-name="li"
          >
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
                fasds
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品料号"
            align="center"
            min-width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                content="scope.row.address"
              >
                <span
                  class="threeLine"
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  dvadsv
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            align="center"
            min-width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                content="scope.row.address"
              >
                <span
                  class="threeLine"
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                 vasvas
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="出库数"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">asvsv</template>
          </el-table-column>
          <el-table-column
            label="未出库数"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                content="scope.row.address"
              >
                <span
                  class="threeLine"
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                 savas
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="产品总价"
            align="center"
            width="160"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                content="scope.row.address"
              >
                <span
                  class="threeLine"
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                asv
                </span>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
</el-drawer>
    <!-- 列表 -->
    <div
      style="
        position: absolute;
        left: 20px;
        right: 20px;
        top: 136px;
        bottom: 50px;
      "
    >
      <el-table
        height="100%"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        stripe
        highlight-current-row
        fit
        :row-style="{ height: '127px' }"
        :header-cell-style="{
          left: 0,
          right: 0,
          height: '48.49px!important',
          position: 'relative',
          top: '0!important',
        }"
      >
        <el-table-column align="center" label="序号" width="50" class-name="li">
          <template slot-scope="scope">
            <!-- {{ scope.$index }} -->
            100
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          align="center"
          min-width="250"
          class-name="li"
        >
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
              深圳市艾联特电子科技有限公司
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单号"
          min-width="200"
          class-name="li"
        >
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
              {{ scope.$index + 1 }}

              <!-- QG-E-RES-0010-iNNO-1 -->
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户料号"
          min-width="140"
          class-name="more"
        >
          <template slot-scope="scope">
            <!-- {{scope.$index}} -->
            <el-table
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品料号"
          min-width="140"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope">
                  PCBA-全格-蓝牙版-UVC-杀菌灯板
                  {{ scope.$index }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品名称"
          min-width="200"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope">
                  PCBA-全格-蓝牙版-UVC-杀菌灯板
                  {{ scope.$index }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品总数"
          width="90"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope"> 1000 </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="出库数"
          width="90"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope">
                  1000000
                  {{ scope.$index }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="未出库数"
          width="90"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope">
                  10000
                  {{ scope.$index }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品总价"
          width="90"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="list"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope">
                  1000000
                  {{ scope.$index }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单总价"
          width="100"
          class-name="li"
        >
          <template slot-scope="scope"> 10000</template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          align="center"
          width="100"
          class-name="li"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              min-width="200%"
              trigger="hover"
              content="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssaaaaaaaaaaaaaaa"
            >
              <span
                class="threeLine"
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
                完成中啊啊
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="订单PDF"
          align="center"
          width="100"
          class-name="li"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              min-width="200%"
              trigger="hover"
              content="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssaaaaaaaaaaaaaaa"
            >
              <span
                class="threeLine"
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
                完成中啊啊
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          width="100"
          class-name="li"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              min-width="200%"
              trigger="hover"
              content="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssaaaaaaaaaaaaaaa"
            >
              <span
                class="threeLine"
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
                完成中啊啊
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="下单时间"
          width="170"
          class-name="li"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="200"
          fixed="right"
          class-name="button orderButton"
        >
          <template slot-scope="scope" style="display: flex; flex-wrap: wrap">
            <el-button type="primary" size="small" @click="details">订单信息</el-button>
            <el-button type="primary" size="small" @click="edit"
              >编辑</el-button
            >
            <el-button type="info" size="small"></el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
            >
              <el-button type="danger" size="small" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
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
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList,getProductList } from "@/api/table";
import Search from "@/components/Search/index.vue";
import throttle from "lodash/throttle";

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
      //展示的list
      list: [
        { id: 0 },
        { id: 1 },
      ],
      listLoading: false,
      productsList: [],
      //
      order: "desc",
      page_current: 1,
      page_size: 10,
      page_total: 1000,
      //
      visibleAdd: false,
      visibleProductions: false,
      visibleDetails:false,
      //
      //添加的单价
      perValue:[],
      perNum:[],
      //#region
      //产品信息抽屉
      // drawer: false,
      //添加订单弹窗
      // visibleDialog: false,
      //
      //抽屉显示产品信息
      //   productionsInfo: [
      //     {
      //       id: 1,
      //       name: "产品aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafdfsfd",
      //       num: 13,
      //       price: 10,
      //       totalPrice: 130,
      //     },
      //     {
      //       id: 1,
      //       name: "产品a",
      //       num: 13,
      //       price: 10,
      //       totalPrice: 130,
      //     },
      //   ],
      //   //收集发送后台//编辑
      //   ordersInfo: {
      //     companyName: "aaa",
      //     companyAdress: "444",
      //     adress: "什么路",
      //     bankAccount: "41231",
      //     name: "333",
      //     phone: "222",
      //     email: "111",
      //     productions: [0],
      //     productionInfo: [
      //       {
      //         productionID: 0,
      //         number: 10,
      //         price: 13,
      //         totalPrice: null,
      //         materialNum: "12",
      //         materialDescription: "123a",
      //       },
      //     ],
      //   },
      //   //添加时用selecct后端拿
      //   productionList: {
      //     0: {
      //       id: 0,
      //       name: "产品aaaaaaaaaaaaaaaaaaaaa",
      //       abbr: "产品a",
      //     },
      //     1: {
      //       id: 1,
      //       name: "产品bbbbbbbbbbbbbbbbbbbb",
      //       abbr: "产品b",
      //     },
      //     2: {
      //       id: 2,
      //       name: "产品cccccccccccccccccccc",
      //       abbr: "产品c",
      //     },
      //   },
      //   //抽屉里用/后端拿
      //   customerProductionMaterialNum: [
      //     {
      //       name: "abc",
      //       number: "123",
      //     },
      //     {
      //       name: "def",
      //       number: "456",
      //     },
      //     {
      //       name: "ghi",
      //       number: "789",
      //     },
      //     {
      //       name: "jkl",
      //       number: "101112",
      //     },
      //   ],
      //   rules: {
      //     companyName: [
      //       { required: true, message: "请填写公司名", trigger: "blur" },
      //       { validator: validAllChinese, trigger: "blur" },
      //     ],
      //     companyAdress: [
      //       { required: true, message: "请填写公司地址", trigger: "blur" },
      //       { validator: validAdress, trigger: "blur" },
      //     ],
      //   },
      //#endregion
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$bus.$on("add", this.addOpenDrawer);
    this.$bus.$on("select", this.selectOpenDrawer);
    this.$bus.$on('determine',this.sendOrder)
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    //添加的确定按钮
    sendOrder(a){
      console.log('@',this.perValue,this.perNum,a);
    },
    pageChange(current) {
      this.page_current = current;
    },
    sizeChange(size) {
      this.page_size = size;
    },
    //添加
    addOpenDrawer() {
      this.visibleAdd = true;
    },
    closeAddDrawer() {
      this.visibleAdd = false;
    },
    //产品选择
    selectOpenDrawer() {
      getProductList().then(()=>{

      });
      this.visibleProductions = true;
    },
    closeSelectDrawer() {
      let a = this.$refs.search.sendInfo();
      this.visibleProductions = false;
    },
    //获取产品序号
    selectChange(val) {
      console.log(val);
    },
    //点击编辑
    edit() {
      this.addOpenDrawer();
    },
    //打开订单信息的抽屉
    details(){
      this.visibleDetails = true;
    },
    closeDetails(){
      this.visibleDetails =false;
    },
    //初始化
    fetchData() {
      // this.listLoading = true;
      // getList().then((response) => {
      //   this.list = response.data.items;
      //   this.listLoading = false;
      // });
    },
  },
};
</script>
<style lang="scss">
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
.order {
  // position: none;
  // margin-bottom:30px;
  .el-table tbody tr:hover > td {
    background-color: white !important;
  }
  .el-table__body .el-table__row.hover-row td {
    background-color: white !important;
  }
}
.lli {
  padding: 0 !important;
}
.orderButton {
  position: relative;
  & > div {
    position: absolute;
    top: 0px;
  }
}
.uli {
  height: 126px !important;
}
.ull {
  padding: 0 !important;
  height: 126px;
  & > div {
    //cell
    padding: 0 !important;
    height: 100% !important;
    // position: absolute;
    // top:0;
    // bottom:0;
    // left:0;
    // right:0;
    & > div {
      height: 100%;
      // position: absolute;
      // bottom:0;
      // top: 0;
      & > div {
        height: 100%;

        // position:absolute;
        // bottom:0;
        .el-table__body {
          height: 100% !important;

          // height:100%;
        }
      }
    }
    td {
      border-right: 0;
      max-height: 126px;
    }
  }
}
.more {
  padding: 0 !important;
  td {
    border-right: 0 !important;
  }
  & > div {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}
.inputLi {
  .cell {
    height: 100%;
    width: 100%;
    line-height: 34.5px;
    .el-input{
      height: 100%;
      position: absolute;
      left: 0;
      right:0;
      input{
        height: 100%;
      }
    }
  }
}
.order {
  .orderDrawer {
    .inpu {
      .cell {
        // width: 100%;
        // display: flex;
        // align-items:center;
        // height:100%;
        input {
          // border: 1px solid red;
        }
      }
    }
    .el-drawer {
      height: 100%;
      min-width: 1500px;
      overflow: auto !important;
      .el-drawer__body {
        // margin: 10px;
        padding: 20px;
      }
    }
  }
  .selectDrawer {
    .el-drawer {
      min-width: 1000px;
      overflow: auto !important;
      height: 100%;
      .el-drawer__body {
        margin: 10px;
      }
    }
  }
}
  .info {
    margin: 10px;
    justify-content: flex-start;
    background-color: rgba(230, 230, 230, 0.4);
    border-radius: 10px;
    padding: 20px;
    & > div {
      // border:1px solid black;
      height: 60px;
      width: 30%;
      // background-color: pink;
      div:first-child {
        font-weight: 700;
        height: 30px;
        line-height: 30px;
        color: #909399;
        // background-color: yellow;
      }
    }
  }
  .details{
    .el-drawer__body{
      padding:20px;
    }
  }
</style>
