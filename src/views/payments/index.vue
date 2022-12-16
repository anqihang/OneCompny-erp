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
          value: '2',
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
      title="开票"
      :visible.sync="visibleInfo"
      @close="closeInfo"
      :before-close="removeImg"
      size="60%"
      class="payInfo"
      ref="add"
      @mousedown.native="handleWrapperMousedown($event,'add')"
      @mouseup.native="handleWrapperMouseup($event,'add')"
      :wrapperClosable="false"
    >
      <Search
        v-if="show"
        ref="search1"
        :search="[
          { title: '发票号', type: 'input' },
          { title: '发票图片', type: 'file' },
        ]"
        :button="[{ title: '确定', type: 'primary', if: true }]"
      ></Search>
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 33%">
          <div>客户名称</div>
          <div>{{ customerInfo.company_name }}</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>{{ customerInfo.order_number }}</div>
        </div>
        <div style="width: 33%">
          <div>结款状态</div>
          <div>{{ customerInfo.bill_status == 0 ? "进行中" : "已完成" }}</div>
        </div>
      </div>
      <!-- // -->
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <div style="float: right; margin: 10px 0 20px">
        <div>
          未开发票总额：<span style="font-weight: 700">{{ rece_total }}</span>
        </div>
        <div>
          发票总额：<span style="font-weight: 700">{{ invoice_total }}</span>
        </div>
      </div>
      <!--  -->
      <div style="">
        <el-table
          class="infoD_t"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="invoicList"
          :row-style="{ height: '100px' }"
        >
          <el-table-column
            align="center"
            label="序号"
            width="50"
            class-name="li first"
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
                <span
                  class="threeLine"
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.customer_code }}
                </span>
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
                <span
                  class="threeLine"
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.product_code }}
                </span>
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
                  :content="scope.row.product_name"
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
                    {{ scope.row.product_name }}
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.number }}
                </span>
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.not_out_number }}
                </span>
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.out_total }}
                </span>
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.price }}
                </span>
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.out_total * scope.row.price }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="未开发票额"
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                <!-- {{scope.row.not_amount||sm-}} -->
                  {{ typeof(scope.row.not_amount) == 'undefined'? scope.row.price*scope.row.out_total:scope.row.not_amount }}
                </span>
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
              >{{perNum[scope.$index]}}
                <!-- <el-input
                  placeholder="请输入"
                  v-model="perNum[scope.$index]"
                ></el-input> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="未开票数"
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
              {{typeof(scope.row.not_amount) == 'undefined'? scope.row.price*scope.row.out_total/scope.row.price:scope.row.not_amount/scope.row.price}}
               <!-- {{(scope.row.not_amount||scope.row.price*scope.row.out_total)/scope.row.price}} -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="开票数"
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
                <el-input
                  placeholder="请输入"
                  @input="checkNum(scope)"
                  v-model="perNumber[scope.$index]"
                ></el-input>
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
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- //开发票记录 -->
    <el-drawer
      title="发票收款"
      :visible.sync="visibleClear"
      @close="closeClear"
      size="60%"
      class="payInfo"
      ref="his"
      @mousedown.native="handleWrapperMousedown($event,'his')"
      @mouseup.native="handleWrapperMouseup($event,'his')"
      :wrapperClosable="false"
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
            value: '2',
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
          <div>{{ customerInfo.company_name }}</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>{{ customerInfo.order_number }}</div>
        </div>
        <div style="width: 33%">
          <div>结款状态</div>
          <div>{{ customerInfo.bill_status == 0 ? "进行中" : "已完成" }}</div>
        </div>
      </div>
      <!-- // -->
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <!--  -->
      <div
        style="
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
          :data="invoicHistoryList"
          :row-style="{ height: '100px' }"
        >
          <el-table-column
            align="center"
            label="序号"
            width="50"
            class-name="li first"
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
                  v-for="(item, index) in scope.row.receipt_infos"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>{{ item.customer_code }}</span>
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
                  v-for="(item, index) in scope.row.receipt_infos"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>{{ item.product_code }}</span>
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
                  v-for="(item, index) in scope.row.receipt_infos"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>{{ item.product_name }}</span>
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
                  v-for="(item, index) in scope.row.receipt_infos"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>{{ item.out_total }}</span>
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
                  v-for="(item, index) in scope.row.receipt_infos"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>{{ item.price }}</span>
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
                  v-for="(item, index) in scope.row.receipt_infos"
                  :key="index"
                  style="width: 100%; border-bottom: 1px solid #ebeef5"
                >
                  <span>
                    {{ item.price*item.out_total }}
                  </span>
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
                {{ scope.row.rece_total }}
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
              {{ scope.row.receipt_amount }}
            </template>
          </el-table-column>
          <el-table-column
            label="发票图片"
            align="center"
            width="100"
            class-name="li image"
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
                    style="position: relative"
                    :src="url + scope.row.receipt_image"
                    :fit="'contain'"
                    :preview-src-list="[
                      url + scope.row.receipt_image,
                    ]"
                  ></el-image>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="发票号"
            align="center"
            width="100"
            class-name="li"
          >
            <template slot-scope="scope">
              {{ scope.row.receipt_number }}
            </template>
          </el-table-column>
          <el-table-column
            label="开票日期"
            align="center"
            width="170"
            class-name="li"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>
                {{ scope.row.create_time }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
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
                {{ scope.row.actual_receipt_amount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="未收金额"
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
                {{
                  new Number(scope.row.receipt_amount) -
                  new Number(scope.row.actual_receipt_amount)
                }}
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
              <el-tag
                effect="dark"
                :type="scope.row.receipt_status | statusFilter"
                >{{ scope.row.receipt_status == 0 ? "进行中" : "已完成" }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="200"
            class="operation"
            class-name="button editButton pay to"
            style="border-left: 1px solid #ebeef5"
          >
            <template slot-scope="scope" style="display: flex">
              <el-button type="info" size="small"></el-button>
              <el-button
                type="primary"
                size="small"
                @click="openCollection(scope)"
                v-if="payL"
                >收款</el-button
              >
              <el-button type="info" size="small" v-if="!payL"></el-button>

              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- 收款记录 -->
    <el-drawer
      title="收款"
      :visible.sync="visibleCollection"
      class="collection operation"
      class-name="button t pay"
      @close="closeCollection"
      :before-close="closeCollectBefore"
      ref="coll"
      @mousedown.native="handleWrapperMousedown($event,'coll')"
      @mouseup.native="handleWrapperMouseup($event,'coll')"
      :wrapperClosable="false"
    >
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <div style="padding-left: 20px">操作</div>
      <Search
      :value="value"
        :search="[
          { title: '付款金额', type: 'input' },
          { title: '凭证号', type: 'input' },
          { title: '回执单图片', type: 'file' },
        ]"
        :button="[{ title: '确定', type: 'primary', if: payI }]"
      ></Search>
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 0"></div>
      <div style="padding-left: 20px">记录</div>
      <div style="margin-top:10px;">
        <el-table
          class="infoD_t"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="collectList"
          :row-style="{ height: '100px' }"
        >
          <el-table-column
            align="center"
            label="序号"
            width="50"
            class-name="li first"
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
              {{ scope.row.receipt_amount }}
            </template>
          </el-table-column>
          <el-table-column
            label="发票图片"
            align="center"
            width="150"
            class-name="li image"
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
                    style="position: relative"
                    :fit="'contain'"
                    :src="
                      url + scope.row.receipt_image
                    "
                    :preview-src-list="[
                      url +
                        scope.row.receipt_image,
                    ]"
                  ></el-image>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.amount }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="回执单图片"
            align="center"
            width="150"
            class-name="li image"
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
                    style="position: relative"
                    :fit="'contain'"
                    :src="
                      url + scope.row.proof_image
                    "
                    :preview-src-list="[
                      url + scope.row.proof_image,
                    ]"
                  ></el-image>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="凭证号"
            align="center"
            min-width="150"
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
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.proof_number }}
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
              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
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
        class-name="lis"
      >
        <el-table-column
          align="center"
          label="序号"
          width="50"
          class-name="li hei first"
        >
          <template slot-scope="scope">
            {{ (page_current-1)*100+scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          align="center"
          min-width="250"
          class-name="li"
        >
          <template slot-scope="scope">
            {{ scope.row.company_name }}
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
          align="center"
          width="200"
          class-name="li"
        >
          <template slot-scope="scope">
            {{ scope.row.order_number }}
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.customer_code }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.product_code }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.product_name }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.number }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.price }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.price * item.number }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.not_out_number }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
                <span>{{ item.out_total }}</span>
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
                v-for="(item, index) in scope.row.order_infos"
                :key="index"
                style="width: 100%; border-bottom: 1px solid #ebeef5"
              >
              <span>{{item.out_total * item.price}}</span>
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
              <span>{{ scope.row.rece_total }}</span>
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
              <span>{{ scope.row.invoice_amount }}</span>
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
              <span>{{ scope.row.amount }}</span>
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
            <el-tag
              effect="dark"
              :type="scope.row.bill_status | statusFilter"
              >{{ scope.row.bill_status == 0 ? "进行中" : "已完成" }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200"
          class="operation"
          class-name="button t pay "
          style="border-left: 1px solid #ebeef5"
        >
          <template
            slot-scope="scope"
            style="display: flex; flex-wrap: wrap"
            class="operation"
          >
            <el-button type="primary" size="small" @click="openInfo(scope)"
            v-if="openIno">
              开票
            </el-button>
            <el-button type="info" size="small" v-if="!openIno"></el-button>

            <el-button type="primary" size="small" @click="openClear(scope)" v-if="infoI">
              发票收款
            </el-button>
            <el-button type="info" size="small" v-if="!infoI"></el-button>


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
import {
  getList,
  getCollectionList,
  Invoicing,
  invoiceHistory,
  Receipt,
  collectList,
  invoiceDe,
} from "@/api/table";
import Search from "@/components/Search/index.vue";
import throttle from "lodash/throttle";
import cloneDeep from "lodash/cloneDeep";
import {url} from '@/utils/url';

export default {
  mounted() {
    console.log(this.url);
    this.$bus.$on("storage", this.invoic);
    this.$bus.$on("goSearch", this.search);
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  components: {
    Search,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      value:0,
      show: true,
      list: [],
      invoicList: [],
      invoicHistoryList: [],
      collectList: [],
      listLoading: false,
      visibleInfo: false,
      visibleClear: false,
      visibleCollection: false,
      a: null,
      alist: [{ id: 1 }],
      customerInfo: {},
      //
      page_size: 50,
      page_current: 1,
      page_total: 1000,
      //
      imageList: [[]],
      orderID: null,
      perNum: [],//发票额
      perNumber:[],//发票数
      rece_total: 0,
      //
      isHistory: false,
      isCollection: false,
      receiptID: null,
      orderID: null,
      //
      classmodel:null,
      //应收
sm:0,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    invoice_total() {
      if (this.perNum.length > 0) {
        return this.perNum.reduce((pre, cur) => {
          return new Number(pre) + new Number(cur);
        });
      } else {
        return 0;
      }
    },
    url(){
      return url;
    },
    auth_id(){
      return localStorage.getItem('auth_id').split(',');
    },
    openIno(){
      return this.auth_id.includes('29')
    },
    infoI(){
      return this.auth_id.includes('30')
    },payI(){
      return this.auth_id.includes('31')
    },payL(){
      return this.auth_id.includes('32')
    },
    not_am(){
      
      return scope.row.price*scope.row.out_total
    }
  },
  methods: {
    mathValue(scope){
    //  this.perNum = this.perNumber.map((n)=>{
    //     return n*scope.row.price;
    //   })
      // for (const index in this.perNumber) {
        this.$set(this.perNum,scope.$index,this.perNumber[scope.$index]*scope.row.price)
        // this.perNum[scope.$index] = this.perNumber[scope.$index]*scope.row.price;
        console.log(this.perNum);
      // }
    },
    checkNum(scope){
      if((new Number(scope.row.not_amount)<this.perNumber[scope.$index]*scope.row.price)||
      this.perNumber[scope.$index]<0||
      (new Number(scope.row.price*scope.row.out_total)<this.perNumber[scope.$index]*scope.row.price)){
        this.perNumber[scope.$index]=0;
        this.$message({
          message:'输入数量错误',
          type:'error'
        })
      }
      this.mathValue(scope);
    },
    search(searchInfo) {
      if (!this.isHistory) {
        let newSearch = cloneDeep(searchInfo);
        if (newSearch[5]) {
          newSearch[5] = newSearch[5].split("/");
        }
        if (newSearch[6]) {
          newSearch[6] = newSearch[6].split("/");
        }
        if (newSearch[7]) {
          newSearch[7] = newSearch[7].split("/");
        }
        this.fetchData(newSearch);
      } else {
        invoiceHistory(this.orderID, searchInfo[0]).then((res) => {
          this.invoicHistoryList = res.data.res;
        });
      }
    },
    checkPrice(scope) {
      if (scope.row.not_amount) {
        if (new Number(scope.row.not_amount) < this.perNum[scope.$index]||this.perNum[scope.$index]<0) {
          this.$message({
            message: "输入的发票额错误",
            type: "error",
          });
          this.$set(this.perNum, scope.$index, 0);
        }
      } else {
        if (
          new Number(scope.row.product_rece_total) < this.perNum[scope.$index]||this.perNum[scope.$index]<0
        ) {
          this.$message({
            message: "输入的发票额错误",
            type: "error",
          });
          this.$set(this.perNum, scope.$index, 0);
        }
      }
    },
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
    //开票
    openInfo(scope) {
      console.log(scope.row);
      let not_mony = [];
      if (scope.row.invoice_amount > 0) {
        let a=[]
        invoiceDe(scope.row.order_id).then((res) => {
          // this.invoicList = res.data.res[0].order_infos;
          not_mony = res.data.res;
          let row = cloneDeep(scope.row.order_infos);
          for (const iterator of row) {
            for (const iterator1 of not_mony) {
              if (iterator.order_product_id == iterator1.order_product_id)
              {let obj={}
              obj.not_amount = iterator1.not_amount;
              a.push(obj)
                iterator.not_amount = iterator1.not_amount;}
            }
          }
          this.invoicList = row;
          this.visibleInfo = true;
          for (const iterator of a) {
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this.rece_total += new Number(iterator.not_amount);
          }
        });
      }else{
        this.invoicList = scope.row.order_infos;
        this.visibleInfo = true;
        for (const iterator of scope.row.order_infos) {
            this.rece_total += new Number(iterator.price*iterator.out_total);
          }
      }
      this.show = true;
      this.customerInfo = scope.row;
      this.orderId = scope.row.order_id;
    },
    removeImg() {
      // this.$refs.search1.remove([]);
      // this.$bus.$emit("edit", []);
      this.show = false;
      this.$nextTick(() => {
        // this.show=true;
      });
      this.visibleInfo = false;
    },
    closeInfo() {
      // this.$bus.$emit("edit", []);
      this.show=false;
      this.rece_total = 0;
      this.perNum.length = 0;
      this.perNumber.length=0;
      this.visibleInfo = false;
      this.fetchData();
    },
    //开发票
    invoic(searchInfo) {
      //不是收款界面
      // console.log(this.isCollection);
      if (!this.isCollection) {
        let data = new FormData();
        data.append("receipt_number", searchInfo[0]);
        data.append("receipt_image", searchInfo[1]);
        data.append("order_id", this.orderId);
        let arr = [];
        for (const index in this.invoicList) {
          let obj = {};
          if (
            this.perNum[index] == "" ||
            this.perNum[index] == undefined ||
            this.perNum[index] == 0
          ) {
            continue;
          }
          obj.order_product_id = this.invoicList[index].order_product_id;
          obj.amount =
            this.perNum[index] == ("" || undefined) ? 0 : this.perNum[index];
          arr.push(obj);
        }
        data.append("receipt_infos", JSON.stringify(arr));
        if(!searchInfo[0]){
          this.$message({
            message:'请填写发票号',
            type:'error'
          })
          return
        }
        if(!searchInfo[1]){
          this.$message({
            message:'请选择发票图片',
            type:'error'
          })
          return
        }
        if(arr.length<=0){
          this.$message({
            message:'请填写发票额',
            type:'error'
          })
          return
        }
        Invoicing(data).then((res) => {
          // console.log(res);
          this.closeInfo();
        });
      } else {
        let data = new FormData();
        data.append("receipt_id", this.receiptID);
        data.append("proof_number", searchInfo[1]);
        data.append("amount", searchInfo[0]);
        data.append("proof_image", searchInfo[2]);
        if(!searchInfo[0]){
          this.$message({
            message:'请填写付款金额',
            type:'error'
          })
          return
        }
        if(!searchInfo[1]){
          this.$message({
            message:'请填写凭证号',
            type:'error'
          })
          return
        }
        if(!searchInfo[2]){
          this.$message({
            message:'请选择回执单图片',
            type:'error'
          })
          return
        }
        Receipt(data).then((res) => {
          collectList(this.receiptID).then((res) => {
            this.collectList = res.data.res;
            this.mathIValue(res.data.res);
            this.$bus.$emit('edit',[]);
          });
        });
      }
    },
    //
    openClear(scope) {
      this.customerInfo = scope.row;

      this.isHistory = true;
      this.orderID = scope.row.order_id;
      invoiceHistory(scope.row.order_id).then((res) => {
        console.log("@", res);
        this.invoicHistoryList = res.data.res;
      });
      this.visibleClear = true;
    },
    closeClear() {
      this.isHistory = false;
      this.visibleClear = false;
      this.fetchData();
      // this.$bus.$emit('edit',[]);
    },
    //收款计算
    mathIValue(arra){
      let hasValue = 0;
      for (const iterator of arra) {
        hasValue+=new Number(iterator.amount);
      }
      this.value = new Number(arra[0].receipt_amount) - hasValue;
      // this.value = new Number(scope.row.receipt_amount) - new Number(scope.row.actual_receipt_amount);
    },
    openCollection(scope) {
      console.log(scope.row);
      this.value=new Number(scope.row.receipt_amount)- new Number(scope.row.actual_receipt_amount);
      this.receiptID = scope.row.receipt_id;
      this.isCollection = true;
      collectList(scope.row.receipt_id).then((res) => {
        this.collectList = res.data.res;
        // this.$bus.$emit("edit", []);
      });
      this.visibleCollection = true;
    },
    closeCollection() {
      // this.$bus.$emit("edit", []);
      this.receiptID = null;
      this.isCollection = false;
      this.visibleCollection = false;
      invoiceHistory(this.orderID).then((res) => {
        this.invoicHistoryList = res.data.res;
      });
      this.fetchData();
    },
    closeCollectBefore() {
      this.$bus.$emit("edit", []);
      this.visibleCollection = false;
    },
    fetchData(searchInfo) {
      this.listLoading = true;
      if (!searchInfo) {
        searchInfo = ["", "", "", "", "", "", "", "", ""];
      }
      getCollectionList({
        params: searchInfo,
        size: this.page_size,
        current: this.page_current,
      }).then((res) => {
        this.page_total = res.data.res.total;
        this.list = res.data.res.data;
        this.listLoading = false;
        console.log(1, res.data.res.data);
      });
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

.payInfo {
  .el-drawer {
    // overflow:auto;
    min-width: 1500px;
    padding: 0 20px;
    overflow: auto;
    .el-drawer__body {
      position: relative;
    }
  }
}

.info {
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
    padding: 0  20px;
    min-width: 1400px;
    overflow: auto;
    .el-drawer__body {
      position: relative;
      // padding: 0 10px;
    }
  }
}
.image {
  .cell {
    width: 100%;
    height: 100%;
  }
}
.to {
  margin-top: 10px;
}
.hei {
  min-height: 127px !important;
}
</style>
