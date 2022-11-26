<template>
  <div class="app-container indeop">
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
      @close="closeAddDrawer"
      class="inbound"
    >
      <Search
        :search="[
          { title: '入库人', type: 'input' },
          { title: '入库单号', type: 'input' },
          { title: '选择入库单图片', type: 'file' },
          { title: '备注', type: 'input' },
        ]"
        :button="[]"
      ></Search>
      <div style="position: absolute; right: 20px; top: 10px">
        <el-button
          size="small"
          type="primary"
          style="width: 78px; position: relative; right: 0"
          >确定</el-button
        >
      </div>
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
            <!-- <el-table-column
              label="产品单价"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input style="width: 100%" placeholder="请输入"></el-input>
              </template>
            </el-table-column> -->
            <!-- <el-table-column
              label="当前库存"
              align="center"
              width="90"
              class-name="li"
            >
              <template slot-scope="scope"> 100000 </template>
            </el-table-column> -->
            <el-table-column
              label="当前库存量"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope"> 11111 </template>
            </el-table-column>
            <el-table-column
              label="未入库数"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope"> 1111 </template>
            </el-table-column>
            <el-table-column
              label="入库数"
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
    <!--详情  -->
    <el-drawer
      :visible.sync="visibleInfo"
      @close="closeInfo"
      size="60%"
      class="infoD"
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
        <div>入库记录</div>
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
            label="累计入库数"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">asvsv</template>
          </el-table-column>
          <el-table-column
            label="未入库数"
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
        </el-table>
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
        :data="alist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        height="100%"
        stripe
        :row-style="{ height: '127px' }"
        row-class-name="row"
        :header-cell-style="{ left: 0, right: 0 }"
      >
        <el-table-column align="center" label="序号" width="50" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户名称"
          min-width="250"
          class-name="li"
        >
          <template slot-scope="scope"> 惠州软件测试有限公司 </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单号"
          width="200"
          class-name="li"
        >
          <template slot-scope="scope"> QG-P-EPE-0007-iNNO </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户料号"
          min-width="140"
          class-name="mor"
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
          label="产品料号"
          min-width="140"
          class-name=" mor"
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
          label="产品名称"
          min-width="200"
          class-name="mor"
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
          label="产品总数"
          width="100"
          class-name="mor"
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
          label="累计入库数"
          width="100"
          class-name="mor"
        >
          <template slot-scope="scope"
            ><div
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
          label="未入库数"
          width="100"
          class-name="mor"
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
          label="当前库存量"
          width="100"
          class-name="mor"
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
        <el-table-column label="状态" align="center" width="80" class-name="li">
          <template slot-scope="scope"> 进行中 </template>
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
            <el-button type="primary" size="small" @click="openAddDrawer"
              >入库</el-button
            >
            <el-button type="primary" size="small" @click="openInfo"
              >详情</el-button
            >
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
      list: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }],
      listLoading: false,
      //
      visibleAdd: false,
      visibleInfo: false,
      //
      page_size: 10,
      page_current: 1,
      page_total: 1000,
      alist: [
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
    };
  },
  mounted() {
    this.$bus.$on("goSearch");
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  created() {
    // this.fetchData();
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // for (const iterator in this.alist) {
      //   if ((columnIndex === 1 || columnIndex == 2)) {
      //     if (rowIndex % this.alist[iterator].c.length === 0) {
      //       return {
      //         rowspan: 2,
      //         colspan: 1,
      //       };
      //     } else {
      //       return {
      //         rowspan: 0,
      //         colspan: 0,
      //       };
      //     }
      //   }
      // }
    },
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
.row {
  min-height: 127px;
}
.inbound {
  .el-drawer {
    min-width: 1400px;
  }
  .el-drawer__body {
    padding:0 20px;
    position: relative;
  }
}
.inputLi {
  .cell {
    height: 100%;
    width: 100%;
    line-height: 47px;
    .el-input {
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      input {
        height: 100%;
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
.infoD {
  .el-drawer {
    min-width: 1400px;
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
.indeop {
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
</style>
