<template>
  <div class="app-container order" v-loading.lock="FlistLoading">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '订单号', type: 'input' },
        { title: '客户料号', type: 'input' },
        { title: '产品料号', type: 'input' },
        { title: '产品名称', type: 'input' },
        { title: '订单状态', type: 'select' },
        { title: '备注', type: 'input' },
      ]"
      :button="[
        { title: '搜索', type: '', if: true },
        { title: '重置', type: '', if: true },
        { title: '添加', type: 'primary', if: addO },
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
    <!-- //添加 -->
    <el-drawer
      ref="add"
      class="orderDrawer"
      :visible.sync="visibleAdd"
      direction="rtl"
      size="70%"
      :title="isEdit ? '编辑订单' : '添加订单'"
      style="min-width: 1400px"
      @close="closeAddDrawer"
      @opened="openEdit"
      @mousedown.native="handleWrapperMousedown($event,'add')"
      @mouseup.native="handleWrapperMouseup($event,'add')"
      :wrapperClosable="false"
      
      
    >
      <Search
        ref="search"
        :search="[
          { title: '客户名称', type: 'autocomplate', disabled: isEdit },
          { title: '订单号', type: 'input', disabled: isEdit },
          { title: '订单PDF图片', type: 'file', disabled: isEdit },
          { title: '项目名称', type: 'input', disabled: isEdit },
          { title: '工单号', type: 'input', disabled: isEdit },
          { title: '备注', type: 'input', disabled: isEdit },
        ]"
        :button="[
          { title: '确定', type: 'primary', if: true },
          { title: '选择产品', type: 'primary', if: !isEdit },
        ]"
      ></Search>
      <div style="background-color: #f5f7fa; height: 3px; margin: 2px"></div>
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
          <div>订单总价：{{ totalPrice }}</div>
        </div>
        <div class="inpu" style="margin:5px;">
          <el-table
            :data="addProductsList"
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
              class-name="li first"
            >
              <template slot-scope="scope">
                {{ scope.$index+1 }}
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
                  {{ scope.row.customer_code }}
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
                  {{ scope.row.product_code }}
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
                  {{ scope.row.product_name }}
                </span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="当前库存"
              align="center"
              width="90"
              class-name="li"
            >
              <template slot-scope="scope"> #100000 </template>
            </el-table-column> -->
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
                  :content="scope.row.product_specs"
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
                    {{ scope.row.product_specs }}
                  </span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isEdit"
              label="产品单价"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input
                  style="width: 100%"
                  placeholder="请输入"
                  @change="checkValue(scope)"
                  v-model="perValue[scope.$index]"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              v-if="isEdit"
              label="产品单价"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope"> {{ scope.row.price }} </template>
            </el-table-column>
            <el-table-column
              label="数量"
              align="center"
              min-width="100"
              class-name="li inputLi"
            >
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入"
                  @change="checkNumber(scope)"
                  v-model="perNum[scope.$index]"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="小计"
              align="center"
              min-width="100"
              class-name="li"
            >
              <template slot-scope="scope">
                {{
                  isEdit
                    ? perNum[scope.$index] * scope.row.price
                    : perValue[scope.$index] * perNum[scope.$index]
                }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="200"
              fixed="right"
              class-name="button"
            >
              <template
                slot-scope="scope"
                style="display: flex; flex-wrap: wrap"
              >
                <el-button type="info" size="small"></el-button>
                <el-popconfirm
                  title="确定删除吗？"
                  icon="el-icon-info"
                  icon-color="red"
                  @onConfirm="deleteProduct(scope.row)"
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
    </el-drawer>
    <!-- 产品列表 -->
    <el-drawer
      class="selectDrawer"
      :visible.sync="visibleProductions"
      title="产品列表"
      size="60%"
      style="min-width: 1300px"
      direction="rtl"
      
      ref="product"
      @mousedown.native="handleWrapperMousedown($event,'product')"
      @mouseup.native="handleWrapperMouseup($event,'product')"
      :wrapperClosable="false"

    >
      <el-button
        @click="closeSelectDrawer"
        type="primary"
        size="small"
        style="float: right; margin-bottom: 10px; width: 78px"
        >确定</el-button
      >
      <el-table
        :data="productsList"
        border
        stripe
        fit
        :row-style="{ height: '127px' }"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="40" align="center">
        </el-table-column>
        <el-table-column width="50" label="序号" align="center" class-name="li first">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
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
              {{ scope.row.customer_code }}
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
              {{ scope.row.product_code }}
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
              {{ scope.row.product_name }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="当前库存"
          align="center"
          width="90"
          class-name="li"
        >
          <template slot-scope="scope"> 100000 </template>
        </el-table-column> -->
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
              :content="scope.row.product_specs"
            >
              <span
                slot="reference"
                style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                "
              >
                {{ scope.row.product_specs }}
              </span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <!--信息  -->
    <el-drawer
      class="details"
      :visible.sync="visibleDetails"
      title="订单信息"
      size="60%"
      direction="rtl"
      @close="closeDetails"
      ref="inf"
      @mousedown.native="handleWrapperMousedown($event,'inf')"
      @mouseup.native="handleWrapperMouseup($event,'inf')"
      :wrapperClosable="false"

    >
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 25%">
          <div>客户名称</div>
          <div>{{ productInfoList.company_name }}</div>
        </div>
        <div style="width: 25%">
          <div>订单号</div>
          <div>{{ productInfoList.order_number }}</div>
        </div>
        <div style="width: 25%">
          <div>订单总价</div>
          <div>{{ productInfoList.total_price }}</div>
        </div>
        <div style="width: 25%">
          <div>订单状态</div>
          <div>{{ productInfoList.status == 0 ? "进行中" : "已完成" }}</div>
        </div>
        <div>
          <div>备注</div>
          <div>{{ productInfoList.remarks }}</div>
        </div>
      </div>
      <!-- <div
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
      ></div> -->
      <div style="background-color: #f5f7fa; height: 4px; margin: 10px 10px"></div>

      <div style="margin: 10px">
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="productInfoList.order_infos"
          :row-style="{ height: '100px' }"
          :header-cell-style="{ height: '40px' }"
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
                {{ scope.row.customer_code }}
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
            </template>
          </el-table-column>
          <el-table-column
            label="出库数"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              {{scope.row.out_total}}
            </template>
          </el-table-column>
          <el-table-column
            label="未出库数"
            align="center"
            width="140"
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
                {{scope.row.not_out_number}}
                </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品单价"
            align="center"
            width="160"
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
                  {{ scope.row.price }}
                </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品总价"
            align="center"
            width="160"
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
                  {{ scope.row.price * scope.row.number }}
                </span>
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
        <el-table-column align="center" label="序号" width="50" class-name="li first">
          <template slot-scope="scope">
            {{ (page_current-1)*100+scope.$index + 1 }}
            <!-- 100 -->
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
              {{ scope.row.company_name }}
              <!-- 深圳市艾联特电子科技有限公司 -->
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单号"
          width="200"
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
              <!-- {{ scope.$index + 1 }} -->
              {{ scope.row.order_number }}
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                  {{ scope1.row.customer_code }}
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                  {{ scope1.row.product_code }}
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                  {{ scope1.row.product_name }}
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                  {{ scope1.row.number }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品单价"
          width="90"
          class-name="more"
        >
          <template slot-scope="scope">
            <el-table
              fit
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                  {{scope1.row.price}}
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                  {{ scope1.row.price * scope1.row.number }}
                </template>
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1"> 
                  {{scope1.row.out_total}} 
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
              :data="scope.row.order_infos"
              :show-header="false"
              :row-style="{ height: '126px' }"
            >
              <el-table-column class-name="li">
                <template slot-scope="scope1">
                 {{scope1.row.not_out_number}}
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
          <template slot-scope="scope"> {{ scope.row.total_price }}</template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          align="center"
          width="100"
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
              <el-tag effect="dark" :type="(scope.row.status==0?'danger':'success')">{{
                scope.row.status == 0 ? "进行中" : "已完成"
              }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单PDF"
          align="center"
          width="100"
          class-name="imagePDF"
        >
          <template slot-scope="scope">
            <el-image
              style="position: relative"
              :src="url + scope.row.order_image"
              :fit="'contain'"
              :preview-src-list="[
                url + scope.row.order_image,
              ]"
            ></el-image>
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
              :content="scope.row.remarks"
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
                {{ scope.row.remarks }}
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="创建时间"
          width="170"
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
          width="200"
          fixed="right"
          class-name="button orderButton"
        >
          <template slot-scope="scope" style="display: flex; flex-wrap: wrap">
            <el-button type="primary" size="small" @click="details(scope.row)"
             v-if="infoO" >订单信息</el-button
            >
            <el-button type="info" size="small" v-if="!infoO"></el-button>

            <el-button type="primary" size="small" @click="edit(scope.row)"
             v-if="editO" >
              编辑
              </el-button
            >
            <el-button type="info" size="small" v-if="!editO"></el-button>

            <el-button type="info" size="small"></el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deleteOrder(scope.row)"
            >
              <el-button type="danger" size="small" slot="reference" v-if="deleteO">
                删除
              </el-button>
            </el-popconfirm>
            <el-button type="info" size="small" v-if="!deleteO"></el-button>

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
        :page-sizes="[ 50, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getList,
  getProductList,
  addOrder,
  getOrderList,
  getOrderInfo,
  deleteOrder,
  editOrder,
} from "@/api/table";
import Search from "@/components/Search/index.vue";
import throttle from "lodash/throttle";
import cloneDeep from "lodash/cloneDeep";
import {url} from '@/utils/url';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "danger",
      };
      return statusMap[status];
    },
  },
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
      imglist: [
      ],
      //展示的list
      list: [],
      listLoading: false,
      FlistLoading: false,
      productsList: [],
      beforeList: [],
      addProductsList: [],
      maddProductsList: [],
      productInfoList: [],

      //
      order: "desc",
      page_current: 1,
      page_size: 50,
      page_total: 1000,
      //
      visibleAdd: false,
      visibleProductions: false,
      visibleDetails: false,
      //
      //添加的单价
      perValue: [],
      perNum: [],
      //
      isEdit: false,
      row: '',
      img: '',
      editData: {},
      //
      deleteList: [],
      addList: [],
      // totalPrice: 0,
      classmodel:null,

    };
  },
  computed: {
    url(){
      return url;
    },
    totalPrice: {
      get() {
        if (!this.isEdit) {
          let to = 0;
          for (let index = 0; index < this.perNum.length; index++) {
            to += this.perNum[index] * this.perValue[index];
          }
          return to;
        }else{
          return this.toPrice;
        }
      },
    },
    auth_id(){
      return localStorage.getItem('auth_id').split(',');
    },
    addO(){
      return this.auth_id.includes('19')
    },
    editO(){
      return this.auth_id.includes('20')
    },infoO(){
      return this.auth_id.includes('21')
    },deleteO(){
      return this.auth_id.includes('22')
    }
  },
  watch: {
   
  },
  created() {
    this.FlistLoading = true;
    this.fetchData();
  },
  mounted() {
    this.$bus.$on("add", this.addOpenDrawer);
    this.$bus.$on("select", this.selectOpenDrawer);
    this.$bus.$on("goSearch", this.search);
    this.$bus.$on("determine", this.sendOrder);
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    checkValue(scope){
      if(this.perValue[scope.$index]<0){
        this.$set(this.perValue,scope.$index,0);
      }
    },
    checkNumber(scope){
      if(this.perNum[scope.$index]<0){
        this.$set(this.perNum,scope.$index,0);
      }
    },
    search(searchInfo) {
      this.fetchData(searchInfo);
    },
    //添加的确定按钮
    sendOrder(a) {
      console.log(a);
      if (!this.isEdit) {
        let products = [];
        for (const index in this.addProductsList) {
          let arr = {};
          arr.product_id = this.addProductsList[index].product_id || "";
          arr.price = this.perValue[index] || "";
          arr.number = this.perNum[index] || "";
          products.push(arr);
        }
        let data = new FormData();
        data.append("customer_id", a.id);
        data.append("order_number", a.info[1]);
        data.append("project_name", a.info[3] || "");
        data.append("work_order_number", a.info[4] || "");
        data.append("product_orders", JSON.stringify(products));
        data.append("order_image", a.info[2] || "");
        console.log(a);
        if(!a.id){
          this.$message({
            message:'请选择客户',
            type:'error'
          })
          return;
        }
        if(!a.info[1]){
          this.$message({
            message:'请填写订单号',
            type:'error'
          })
          return;

        }if(products.length<=0){
          this.$message({
            message:'请选择产品',
            type:'error'
          })
          return;

        }if(!a.info[2]){
          this.$message({
            message:'请选择订单图片',
            type:'error'
          })
          return;
        }
        this.FlistLoading = true;
        addOrder(data).then((res) => {
          this.closeAddDrawer();
          this.fetchData();
        });
      } else {
        this.editProduct();
        let arr = [];
        for (const index in this.addProductsList) {
          let obj = {};
          obj.product_id = this.addProductsList[index].product_id;
          obj.number = this.perNum[index];
          obj.price = this.addProductsList[index].price;
          obj.flag = this.addProductsList[index].flag;
          arr.push(obj);
        }

        let product_orders = [...this.deleteList, ...this.addList, ...arr];
        editOrder({
          list: product_orders,
          da: this.editData,
          id: a.info0,
        }).then(() => {
          this.closeAddDrawer();
        });
      }
    },
    pageChange(current) {
      this.page_current = current;
    },
    sizeChange(size) {
      this.page_size = size;
    },
    //添加编辑抽屉开关
    addOpenDrawer() {
      this.visibleAdd = true;
    },
    closeAddDrawer() {
      this.isEdit = false;
      this.perNum = [];
      this.perValue = [];
      this.maddProductsList = [];
      this.row = ""; 
      this.img = ""; 
      this.addProductsList = [];
      this.$bus.$emit("edit", []);
      this.visibleAdd = false;
      this.fetchData();
    },
    //产品选择
    selectOpenDrawer(customer_id) {
      getProductList(customer_id).then((res) => {
        //  this.productsList =  res.data.res.filter((item)=>{
        //      for (const iterator of this.productsList) {
        //       if(iterator.product_id == item.product_id){
        //         return true;
        //       }
        //     }
        //   })
        this.productsList = res.data.res;
        this.visibleProductions = true;
      });
    },
    closeSelectDrawer() {
      // let a = this.$refs.search.sendInfo();
      // this.addProductsList =
      // console.log('@@@',this.addProductsList);
      // this.addProductsList = cloneDeep(this.beforeList);
      this.addProductsList.push(...cloneDeep(this.beforeList));
      this.beforeList = [];
      this.visibleProductions = false;
    },
    deleteProduct(row) {
      for (const index in this.addProductsList) {
        if (this.addProductsList[index].product_id == row.product_id) {
          this.addProductsList.splice(index, 1);
          this.perNum.splice(index, 1);
          this.perValue.splice(index, 1);
        }
      }
      if (this.isEdit) {
        this.deleteList.push({
          product_id: row.product_id,
          price: row.price,
          number: row.number,
          flag: 1,
        });
      }
    },
    //获取产品序号
    selectChange(val) {
      this.beforeList = val;
      // this.beforeList.unshift(...val);
      if (this.isEdit) {
        for (const iterator of val) {
          let obj = {};
          obj.product_id = iterator.product_id;
          obj, (number = iterator.number);
          obj.price = iterator.price;
          this.addList.push(obj);
        }
        for (const iterator of this.addList) {
          iterator.flag = 2;
        }
      }
    },
    //点击编辑
    edit(row) {
      this.toPrice = row.total_price;
      let img = row.order_image.split("/");
      this.img = img[img.length - 1];
      
      this.isEdit = true;
      this.addOpenDrawer();
      this.row = row;
      this.addProductsList = cloneDeep(row.order_infos);
      this.maddProductsList = cloneDeep(row.order_infos);
      for (const iterator of row.order_infos) {
        this.perNum.push(iterator.number);
      }

      this.editData = {
        order_id: row.order_id,
        order_number: row.order_number,
        project_name: "",
        work_order_number: "",
        // product_orders: row.order_infos,
      };
    },
    editProduct() {

      for (const iterator of this.maddProductsList) {
        for (const index in this.addProductsList) {
          if (iterator.product_id == this.addProductsList[index].product_id) {
            // if (iterator.number != this.addProductsList[index].number) {
            this.addProductsList[index].flag = 3;
            // this.addProductsList[index].number = this.perNum[index];
            // }
          }
        }
      }
    },
    openEdit() {
      if (this.isEdit) {
        // console.log("openEdit");
        this.$bus.$emit("edit", [
          this.row.company_name,
          this.row.order_number,
          this.img,
          "",
          "",
          this.row.remarks,
        ]);
      }
    },
    //打开订单信息的抽屉
    details(row) {
      getOrderInfo(row.order_id).then((res) => {
        console.log("@", res);
        this.productInfoList = res.data.res;
      });
      this.visibleDetails = true;
    },
    closeDetails() {
      this.visibleDetails = false;
    },
    //删除
    deleteOrder(row) {
      deleteOrder(row.order_id).then((res) => {
        this.fetchData();
      });
    },
    //初始化
    fetchData(searchInfo) {
      // this.listLoading = true;
      // getList().then((response) => {
      //   this.list = response.data.items;
      //   this.listLoading = false;
      // });
      if (!searchInfo) {
        searchInfo = ["", "", "", "", "", "", ""];
      }
      this.listLoading = true;
      getOrderList({
        size: this.page_size,
        current: this.page_current,
        searchInfo,
      }).then((res) => {
        // console.log('@',res);
        this.page_total = res.data.res.total;
        this.list = res.data.res.data;
        this.listLoading = false;
        this.FlistLoading = false;
        // for (const iterator of this.list) {
        //     iterator.status = 1;
        //     for (const iterator1 of iterator.order_infos) {
        //       if (iterator1.not_out_number > 0) {
        //         // console.log(iterator1.not_in_number);
        //         iterator.status = 0;
        //       }
        //     }
        //   }
      });
      this.FlistLoading = false;
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
.el-image-viewer__wrapper {
  position: fixed !important;
  top: 0 !important;
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
        padding: 0 15px;
      }
    }
  }
  .selectDrawer {
    .el-drawer {
      min-width: 1000px;
      overflow: auto !important;
      height: 100%;
      .el-drawer__body {
        margin: 20px;
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
.details {
  .el-drawer {
    min-width: 1400px;
  }
  .el-drawer__body {
    padding: 0 10px;
  }
}
.imagePDF{
  position:relative;
  padding: 0;
  .cell{
    position: absolute;
    top:0;
    right:0;
    left:0;
    padding: 0;
  }
}
</style>
