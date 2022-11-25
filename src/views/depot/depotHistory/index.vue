<template>
  <div class="app-container">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '订单号', type: 'input' },
        { title: '客户料号', type: 'input' },
        { title: '产品料号', type: 'input' },
        { title: '产品名称', type: 'input' },
        { title: '产品总数', type: 'input' },
        { title: '入库数', type: 'input' },
        { title: '库存量', type: 'input' },
        { title: '未入库数', type: 'input' },
        { title: '状态', type: 'input' },
      ]"
      :button="[
        { title: '搜索', type: '' },
        { title: '重置', type: '' },
      ]"
    ></Search>
    <!-- 添加弹窗 -->
    <el-drawer
      title="添加入库信息"
      size="70%"
      :visible.sync="visibleAdd"
      class="inbound"
    >
      <Search
        :search="[
          { title: '客户名称', type: 'input' },
          { title: '订单号', type: 'input' },
          { title: '客户料号', type: 'input' },
          { title: '产品料号', type: 'input' },
          { title: '产品名称', type: 'input' },
        ]"
        :button="[{ title: '确定', type: 'primary' }]"
      ></Search>
      <div style="background-color: #f5f7fa; height: 3px; margin: 10px 0"></div>

      <div>
        <div
          style="
            font-size: 25px;
            margin: 10px;
            display: flex;
            justify-content: space-between;
          "
        ></div>
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
                <el-input style="width: 100%" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="小计"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope">
                {{ 111 }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
    <!--  -->
    <div
      style="
        position: absolute;
        left: 20px;
        right: 20px;
        top: 178px;
        bottom: 50px;
      "
    >
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        height="100%"
        stripe
        :row-style="{ height: '127px' }"
        :header-cell-style="{ left: 0, right: 0 }"
      >
        <el-table-column align="center" label="序号" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" class-name="li">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单号" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户料号" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品料号" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品总数" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="入库数" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="库存量" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="未入库数" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="订单内容"  >
        <template slot-scope="scope">
          产品名称-产品料号-采购数-入库数-未入库数
        </template>
      </el-table-column> -->

        <!-- <el-table-column label="入库人信息" >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column> -->

        <el-table-column label="状态" align="center" class-name="li">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="入库时间"
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
            <el-button type="primary" size="small">入库</el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deleteClient(scope.row)"
            >
              <el-button type="danger" size="small" slot="reference">
                删除
              </el-button>
            </el-popconfirm>

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
import { getList } from "@/api/table";
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
      list: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }],
      listLoading: false,
      //
      visibleAdd: false,
    };
  },
  mounted() {
    this.$bus.$on("add", this.openAddDrawer);
    this.$bus.$on("goSearch");
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  created() {
    // this.fetchData();
  },
  methods: {
    openAddDrawer() {
      this.visibleAdd = true;
    },
    // fetchData() {
    //   this.listLoading = true;
    //   getList().then((response) => {
    //     this.list = response.data.items;
    //     this.listLoading = false;
    //   });
    // },
  },
};
</script>
<style lang="scss">
.inbound {
  .el-drawer__body {
    padding: 20px;
  }
}
</style>
