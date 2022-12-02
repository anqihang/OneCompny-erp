<template>
  <div class="app-container">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '订单号', type: 'input' },
        { title: '客户料号', type: 'input' },
        { title: '产品料号', type: 'input' },
        { title: '产品名称', type: 'input' },
        {
          title: '产品总数',
          type: 'input',
          placeholder: '输入范围,例:10/20(10到20)',
        },
        {
          title: '出库数',
          type: 'input',
          placeholder: '输入范围,例:10/20(10到20)',
        },
        {
          title: '未出库数',
          type: 'input',
          placeholder: '输入范围,例:10/20(10到20)',
        },
        { title: '状态', type: 'select' },
      ]"
      :button="[
        { title: '搜索', type: '', if: true },
        { title: '重置', type: '', if: true },
      ]"
      :selectInfo="[
        {
          value: '0',
          label: '进行中',
        },
        {
          value: '1',
          label: '已完成',
        },
      ]"
    ></Search>
    <!-- 开票 -->
    <el-drawer
      title="结款"
      :visible.sync="visibleInfo"
      @close="closeInfo"
      size="60%"
      class="payInfo"
    >
      <Search
        :search="[
          { title: '发票号', type: 'input' },
          { title: '发票图片', type: 'file' },
        ]"
        :button="[{ title: '确定', type: 'primary', if: true }]"
      ></Search>
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 33%">
          <div>客户名称</div>
          <div>aaaaa</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>bbbbb</div>
        </div>
        <div style="width: 33%">
          <div>订单状态</div>
          <div>ccccc</div>
        </div>
      </div>
      <!-- // -->
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <div style="float: right; margin: 10px 10px 20px">
        <div>
          应收总额：<span style="font-weight: 700">{{ 1000 }}</span>
        </div>
        <div>
          发票总额：<span style="font-weight: 700">{{ 2000 }}</span>
        </div>
      </div>
      <!--  -->
      <div style="margin: 10px">
        <el-table
          class="infoD_t"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="list"
          :row-style="{ height: '100px' }"
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
            min-width="100"
            class-name="li"
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
                    <!-- {{ scope.row.customer_code }} -->
                  </span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品料号"
            align="center"
            min-width="100"
            class-name="li"
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
                    <!-- {{ scope.row.product_code }} -->
                  </span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            align="center"
            min-width="100"
            class-name="li"
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
                    <!-- {{ scope.row.product_name }} -->
                  </span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品总数"
            align="center"
            width="100"
            class-name="li"
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
                  v-for="(item, index) in scope.row.inblound_infos"
                  :key="index"
                  style="
                    height: 135px;
                    position: relative;
                    text-align: start;
                    border-top: 1px solid #ebeef5;
                    margin-top: -2px;
                  "
                >
                  <span
                    v-if="
                      !(
                        showIndex == scope.row.customer_code &&
                        showTime == item.create_time
                      )
                    "
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    <!-- {{ item.number }} -->
                  </span>
                  <el-input
                    v-if="
                      showIndex == scope.row.customer_code &&
                      showTime == item.create_time
                    "
                    placeholder="请输入"
                    v-model="perInfo.number"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="未出库数"
            align="center"
            width="100"
            class-name="li"
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
                  v-for="(item, index) in scope.row.inblound_infos"
                  :key="index"
                  style="
                    height: 135px;
                    position: relative;
                    text-align: start;
                    border-top: 1px solid #ebeef5;
                    margin-top: -2px;
                  "
                >
                  <span
                    v-if="
                      !(
                        showIndex == scope.row.customer_code &&
                        showTime == item.create_time
                      )
                    "
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    <!-- {{ item.number }} -->
                  </span>
                  <el-input
                    v-if="
                      showIndex == scope.row.customer_code &&
                      showTime == item.create_time
                    "
                    placeholder="请输入"
                    v-model="perInfo.number"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="出库数"
            align="center"
            width="100"
            class-name="li"
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
                  v-for="(item, index) in scope.row.inblound_infos"
                  :key="index"
                  style="
                    height: 135px;
                    position: relative;
                    text-align: start;
                    border-top: 1px solid #ebeef5;
                    margin-top: -2px;
                  "
                >
                  <span
                    v-if="
                      !(
                        showIndex == scope.row.customer_code &&
                        showTime == item.create_time
                      )
                    "
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    <!-- {{ item.number }} -->
                  </span>
                  <el-input
                    v-if="
                      showIndex == scope.row.customer_code &&
                      showTime == item.create_time
                    "
                    placeholder="请输入"
                    v-model="perInfo.number"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品单价"
            align="center"
            width="100"
            class-name="li"
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
                  v-for="(item, index) in scope.row.inblound_infos"
                  :key="index"
                  style="
                    height: 135px;
                    position: relative;
                    text-align: start;
                    border-top: 1px solid #ebeef5;
                    margin-top: -2px;
                  "
                >
                  <span
                    v-if="
                      !(
                        showIndex == scope.row.customer_code &&
                        showTime == item.create_time
                      )
                    "
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    <!-- {{ item.number }} -->
                  </span>
                  <el-input
                    v-if="
                      showIndex == scope.row.customer_code &&
                      showTime == item.create_time
                    "
                    placeholder="请输入"
                    v-model="perInfo.number"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="应收金额"
            align="center"
            width="100"
            class-name="li"
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
                  v-for="(item, index) in scope.row.inblound_infos"
                  :key="index"
                  style="
                    height: 135px;
                    position: relative;
                    text-align: start;
                    border-top: 1px solid #ebeef5;
                    margin-top: -2px;
                  "
                >
                  <span
                    v-if="
                      !(
                        showIndex == scope.row.customer_code &&
                        showTime == item.create_time
                      )
                    "
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    <!-- {{ item.number }} -->
                  </span>
                  <el-input
                    v-if="
                      showIndex == scope.row.customer_code &&
                      showTime == item.create_time
                    "
                    placeholder="请输入"
                    v-model="perInfo.number"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="发票额"
            align="center"
            width="100"
            class-name="li inputLi"
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
                <!-- <div v-for="(item, index) in scope.row.inblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "> -->
                <!-- <span 
                  v-if=
                   slot="reference" style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                ">

                  </span> -->
                <el-input placeholder="请输入" v-model="a"></el-input>
                <!-- </div> -->
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            width="200"
            class="operation"
            class-name="button payButton editButton "
            style="border-left: 1px solid #ebeef5"
          >
            <template slot-scope="scope" style="display: flex">
              <!-- <div v-for="(item, index) in scope.row.inblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  align-content: center;
                "
                > -->
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <!-- </div> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- //开发票记录 -->
    <el-drawer
      title="开票记录"
      :visible.sync="visibleClear"
      @close="closeClear"
      size="60%"
      class="payInfo"
    >
      <Search
        :search="[
          // {title:'发票单号',type:'input'},
          { title: '状态', type: 'select' },
        ]"
        :button="[
          { title: '搜索', type: '', if: true },
          { title: '重置', type: '', if: true },
        ]"
        :selectInfo="[
          {
            value: '0',
            label: '进行中',
          },
          {
            value: '1',
            label: '已完成',
          },
        ]"
      ></Search>
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 33%">
          <div>客户名称</div>
          <div>aaaaa</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>bbbbb</div>
        </div>
        <div style="width: 33%">
          <div>结款状态</div>
          <div>ccccc</div>
        </div>
      </div>
      <!-- // -->
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <!--  -->
      <div
        style="
          margin: 10px;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 218px;
        "
      >
        <el-table
          class="infoD_t"
          height="100%"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="list"
          :row-style="{ height: '100px' }"
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
            class-name="mul"
          >
            <template slot-scope="scope">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                "
              >
                <div
                  v-for="(item, index) in scope.row.num"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>NS124235453</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品料号"
            align="center"
            min-width="140"
            class-name="mul"
          >
            <template slot-scope="scope">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                "
              >
                <div
                  v-for="(item, index) in scope.row.num"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>NS124235453</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            align="center"
            min-width="200"
            class-name="mul"
          >
            <template slot-scope="scope">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                "
              >
                <div
                  v-for="(item, index) in scope.row.num"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>NS124235453</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="出库数"
            align="center"
            width="90"
            class-name="mul"
          >
            <template slot-scope="scope">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                "
              >
                <div
                  v-for="(item, index) in scope.row.num"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>1000003</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="产品单价"
            align="center"
            width="90"
            class-name="mul"
          >
            <template slot-scope="scope">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                "
              >
                <div
                  v-for="(item, index) in scope.row.num"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>1000003</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="应收金额"
            align="center"
            width="90"
            class-name="mul"
          >
            <template slot-scope="scope">
              <div
                style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                "
              >
                <div
                  v-for="(item, index) in scope.row.num"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>1000003</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="应收总额"
            align="center"
            width="100"
            class-name="li"
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
                  v-for="(item, index) in scope.row.inblound_infos"
                  :key="index"
                  style="
                    height: 135px;
                    position: relative;
                    text-align: start;
                    border-top: 1px solid #ebeef5;
                    margin-top: -2px;
                  "
                >
                  <span
                    v-if="
                      !(
                        showIndex == scope.row.customer_code &&
                        showTime == item.create_time
                      )
                    "
                    slot="reference"
                    style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    "
                  >
                    <!-- {{ item.number }} -->
                  </span>
                  <el-input
                    v-if="
                      showIndex == scope.row.customer_code &&
                      showTime == item.create_time
                    "
                    placeholder="请输入"
                    v-model="perInfo.number"
                  ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="发票额"
            align="center"
            width="100"
            class-name="li"
          >
            <template slot-scope="scope">
              {{ 1000 }}
            </template>
          </el-table-column>
          <el-table-column
            label="发票图片"
            align="center"
            width="100"
            class-name="li"
          >
            <template slot-scope="scope">
              <div style="height: 100%; width: 100%">
                <div
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  "
                >
                  <el-image
                    fit="contain"
                    :src="imageList[0][0]"
                    :preview-src-list="imageList[0]"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            align="center"
            width="100"
            class-name="li inputLi"
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  1111
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            width="80"
            class-name="li index"
          >
            <template slot-scope="scope">
              <!-- <el-tag :type="scope.row.status | statusFilter">{{
                scope.row.status == 0 ? "进行中" : "已完成"
            }}</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column
            label="开票日期"
            align="center"
            width="170"
            class-name="li index"
          >
            <template slot-scope="scope"> </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="200"
            class="operation"
            class-name="button editButton pay"
            style="border-left: 1px solid #ebeef5"
          >
            <template slot-scope="scope" style="display: flex">
              <el-button type="info" size="small"></el-button>
              <el-button type="primary" size="small" @click="openCollection"
                >收款</el-button
              >
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!--  -->
    <el-drawer
      title="收款"
      :visible.sync="visibleCollection"
      class="collection operation"
      class-name="button t pay"
      @close="closeCollection"
    >
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <div style="padding-left: 20px">操作</div>
      <Search
        :search="[
          { title: '付款金额', type: 'input' },
          { title: '凭证号', type: 'input' },
          { title: '回执单图片', type: 'file' },
        ]"
        :button="[{ title: '确定', type: 'primary', if: true }]"
      ></Search>
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <div style="padding-left: 20px">记录</div>
      <div style="margin: 10px">
        <el-table
          class="infoD_t"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="list"
          :row-style="{ height: '100px' }"
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
            label="发票额"
            align="center"
            min-width="100"
            class-name="li"
          >
            <template slot-scope="scope">
              {{ 1000 }}
            </template>
          </el-table-column>
          <el-table-column
            label="发票图片"
            align="center"
            width="100"
            class-name="li"
          >
            <template slot-scope="scope">
              <div style="height: 100%; width: 100%">
                <div
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  "
                >
                  <el-image
                    fit="contain"
                    :src="imageList[0][0]"
                    :preview-src-list="imageList[0]"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            align="center"
            min-width="100"
            class-name="li inputLi"
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  <!-- {{ item.number }} -->
                </span>
                <!-- <el-input
                 placeholder="请输入"
                 v-model="a"
               ></el-input> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="回执单图片"
            align="center"
            width="100"
            class-name="li"
          >
            <template slot-scope="scope">
              <div style="height: 100%; width: 100%">
                <div
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  "
                >
                  <el-image
                    fit="contain"
                    :src="imageList[0][0]"
                    :preview-src-list="imageList[0]"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <!-- <input v-if="!imageList[0][0]" type="file" @change="inputFile" style="position:absolute;top:0;right:0;bottom:0;left:0;opacity: 0;"> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="凭证号"
            align="center"
            min-width="150"
            class-name="li inputLi"
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="200"
            class="operation"
            class-name="button payButton  editButton"
            style="border-left: 1px solid #ebeef5"
          >
            <template slot-scope="scope" style="display: flex">
              <el-button type="primary" size="small"></el-button>
              <el-button type="primary" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- // -->
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
        fit
        highlight-current-row
      >
        <el-table-column
          align="center"
          label="序号"
          width="50"
          class-name="li hei"
        >
          <template slot-scope="scope">
            {{( scope.$index +1)}}
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          align="center"
          min-width="250"
          class-name="li"
        >
          <template slot-scope="scope">
            {{ scope.row.$id }}
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
          align="center"
          width="200"
          class-name="li"
        >
          <template slot-scope="scope"> </template>
        </el-table-column>
        <el-table-column
          label="客户料号"
          align="center"
          min-width="140"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>NS124235453</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="产品料号"
          align="center"
          min-width="140"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>NS124235453</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="产品名称"
          align="center"
          min-width="200"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>NS124235453</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="产品总数"
          align="center"
          width="90"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>1000003</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="产品单价"
          align="center"
          width="90"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>1000003</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="产品总价"
          align="center"
          width="90"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>1000003</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="未出库数"
          align="center"
          width="90"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>1000003</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="出库数"
          align="center"
          width="90"
          class-name="mul"
        >
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>1000003</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="应收金额" align="center" class-name="mul">
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                v-for="(item, index) in scope.row.num"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>1000003</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="应收总额" align="center" class-name="li">
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <!-- <div v-for="(item,index) in scope.row.num" :key="index" style="width:100%;border-bottom:1px solid #ebeef5;"> -->
              <span>1000003</span>
              <!-- </div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发票额" align="center" class-name="li">
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <!-- <div v-for="(item,index) in scope.row.num" :key="index" style="width:100%;border-bottom:1px solid #ebeef5;"> -->
              <span>1000003</span>
              <!-- </div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实收金额" align="center" class-name="li">
          <template slot-scope="scope">
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
              "
            >
              <!-- <div v-for="(item,index) in scope.row.num" :key="index" style="width:100%;border-bottom:1px solid #ebeef5;"> -->
              <span>1000003</span>
              <!-- </div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          width="80"
          class-name="li index"
        >
          <template slot-scope="scope">
            <!-- <el-tag :type="scope.row.status | statusFilter">{{
                scope.row.status == 0 ? "进行中" : "已完成"
            }}</el-tag> -->
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200"
          class="operation"
          class-name="button t pay"
          style="border-left: 1px solid #ebeef5"
        >
          <template
            slot-scope="scope"
            style="display: flex; flex-wrap: wrap"
            class="operation"
          >
            <el-button type="primary" size="small" @click="openInfo"
              >开票</el-button
            >
            <el-button type="primary" size="small" @click="openClear"
              >发票收款</el-button
            >
            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
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
        { id: 1, num: [{ id: 1 }, { id: 2 }] },
        { id: 2, num: [{ id: 1 }] },
        { id: 3, num: [{ id: 1 }] },
      ],
      listLoading: false,
      visibleInfo: false,
      visibleClear: false,
      visibleCollection: false,
      a: null,
      //
      page_size: 50,
      page_current: 1,
      page_total: 1000,
      //
      imageList: [[]],
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    inputFile(e) {
      console.log(e.target.files);
      let src = window.URL.createObjectURL(e.target.files[0]);
      this.imageList[0].push(src);
    },
    pageChange(current) {
      this.page_current = current;
    },
    sizeChange(size) {
      this.page_size = size;
    },
    openInfo() {
      this.visibleInfo = true;
    },
    closeInfo() {
      this.visibleInfo = false;
    },
    //
    openClear() {
      this.visibleClear = true;
    },
    closeClear() {
      this.visibleClear = false;
    },
    //
    openCollection() {
      this.visibleCollection = true;
    },
    closeCollection() {
      this.visibleCollection = false;
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">
.mul {
  padding: 0 !important;

  .cell {
    padding: 0;

    & > div {
      & > div {
        height: 126px;
        text-align: start;
        padding: 0 10px;
        margin-bottom: -1px;
      }
    }
  }
}

.pay {
  // position: relative;
  .cell {
    position: absolute;
    top: 0;
  }
}

.hei {
  min-height: 127px !important;
}

.payInfo {
  .el-drawer {
    // overflow:auto;
    min-width: 1500px;
    padding: 0 10px;

    .el-drawer__body {
      position: relative;
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

.mor {
  // padding-top: 0!important;
  padding: 0 !important;

  .cell {
    // padding-top:12px;
    // padding-bottom: 12px;
    width: 100% !important;
    height: 100% !important;
    padding-left: 0;
    padding-right: 0;
  }
}

.payButton {
  padding-top: 12px !important;
}

.collection {
  .el-drawer {
    padding: 0 10px;
    min-width: 1400px;
  }
}
</style>
