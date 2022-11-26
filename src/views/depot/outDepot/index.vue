<template>
  <div class="app-container outDepot">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '订单号', type: 'input' },
        { title: '客户料号', type: 'input' },
        { title: '产品料号', type: 'input' },
        { title: '产品名称', type: 'input' },
        { title: '产品总数', type: 'input' },
        { title: '出库数', type: 'input' },
        { title: '库存量', type: 'input' },
        { title: '未出库数', type: 'input' },
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
      class="addDrawer"
      @close="closeAddDrawer"
    >
      <Search
        :search="[
          { title: '出库人', type: 'input' },
          { title: '发货号', type: 'input' },
          { title: '备注', type: 'input' },
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
              label="当前库存量"
              align="center"
              min-width="100"
              class-name="li "
            >
              <template slot-scope="scope"> 111 </template>
            </el-table-column>
            <el-table-column
              label="未出库数"
              align="center"
              min-width="100"
              class-name="li "
            >
              <template slot-scope="scope"> 111 </template>
            </el-table-column>
            <el-table-column
              label="出库数"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input placeholder="请输入"></el-input>
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
                <el-button type="info" size="small"></el-button>

                <el-popconfirm
                  title="确定删除吗？"
                  icon="el-icon-info"
                  icon-color="red"
                  @onConfirm=""
                >
                  <el-button type="info" size="small" slot="reference">
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
    </el-drawer>
    <!-- 详情 -->
    <el-drawer
      class="infoD"
      title="详情"
      :visible.sync="visibleInfo"
      direction="rtl"
      @close="closeInfo"
    >
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 33%">
          <div>客户名称</div>
          <div>ds</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>sdv</div>
        </div>
        <div style="width: 33%">
          <div>订单状态</div>
          <div>v</div>
        </div>
        <div style="width: 33%">
          <div>备注</div>
          <div>a</div>
        </div>
      </div>
      <div style="margin: 10px">
        <el-table
          :header-cell-style="{ height: '30px', padding: '0' }"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
        >
          <el-table-column align="center" label="出货单号">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="发货人">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="发货信息">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="收货方信息">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="物流费用">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="物流单号">
            <template slot-scope="scope">
              {{ scope.$index }}
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
        top: 178px;
        bottom: 50px;
      "
    >
      <el-table
        height="100%"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        :row-style="{ height: '127px' }"
        :header-cell-style="{ left: 0, right: 0 }"
      >
        <el-table-column align="center" width="50" class-name="li" label="序号">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户名"
          min-width="250"
          class-name="li"
        >
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          class-name="li"
          label="订单号"
        >
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="140"
          class-name="mor"
          label="客户料号"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="140"
          class-name="mor"
          label="产品料号"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
          class-name="mor"
          label="产品名称"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          class-name="mor"
          label="产品总数"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          class-name="mor"
          label="累计出库数"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          class-name="mor"
          label="当前库存量"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          class-name="mor"
          label="未出库数"
        >
          <template slot-scope="scope">
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.c"
                :key="index"
                style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "
              >
                {{ item.cc }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="出库时间"
          width="170"
          class-name="mor"
        >
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.c"
              :key="index"
              style="
                height: 127px;
                position: relative;
                text-align: start;
                border-top: 1px solid #ebeef5;
                margin-top: -2px;
              "
            >
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" class-name="li" align="center">
          <template slot-scope="scope">
            <span>进行中</span>
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
          label="操作"
          fixed="right"
          width="200"
          class="operation"
          class-name="button t"
          style="border-left: 1px solid red"
        >
          <template
            slot-scope="scope"
            style="display: flex; flex-wrap: wrap"
            class="operation"
          >
            <el-button type="primary" size="small" @click="openAddDrawer">
              出库
            </el-button>
            <el-button type="primary" size="small" @click="openInfo">
              详情
            </el-button>
            <el-button type="info" size="small"></el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm=""
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
      list: [
        {
          a: 1,
          b: 2,
          c: [{ cc: 11 }, { cc: 22 }, { cc: 33 }],
        },
        {
          a: 1,
          b: 2,
          c: [{ cc: 11 }, { cc: 22 }],
        },
      ],
      listLoading: false,
      drawer: false,
      //
      page_size: 10,
      page_current: 1,
      page_total: 1000,
      //
      visibleAdd: false,
      visibleInfo: false,
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    pageChange(current) {
      this.page_current = current;
    },
    sizeChange(size) {
      this.page_size = size;
    },
    //
    openAddDrawer() {
      this.visibleAdd = true;
    },
    closeAddDrawer() {
      this.visibleAdd = false;
    },
    //
    openInfo() {
      this.visibleInfo = true;
    },
    closeInfo() {
      this.visibleInfo = false;
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
.outDepot {
  .row {
    min-height: 127px;
  }
}
.mor {
  padding: 0;
  .cell {
    width: 100% !important;
    height: 100% !important;
    padding-left: 0;
    padding-right: 0;
  }
}
//不要和mor放在.outDepot里
.outDepot {
  .infoD {
    .el-drawer {
      min-width: 1400px;
    }
  }
  .t {
    position: relative;
    .cell {
      position: absolute !important;
      top: 0 !important;
      left: 0;
      line-height: 49px;
    }
  }
}
.addDrawer {
  .el-drawer {
    min-width: 1400px;
    .el-drawer__body {
      padding: 0 20px;
    }
  }
}
</style>
