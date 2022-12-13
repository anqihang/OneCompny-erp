<template>
  <div class="app-container production" v-loading.lock="FlistLoading">
    <Search
      :search="[
        { title: '客户名称', type: 'input' },
        { title: '客户料号', type: 'input' },
        { title: '产品料号', type: 'input' },
        { title: '产品名称', type: 'input' },
        { title: '产品规格', type: 'input' },
        { title: '描述', type: 'input' },
        { title: '备注', type: 'input' },
      ]"
      :button="[
        { title: '搜索', type: '', if: true },
        { title: '重置', type: '', if: true },
        { title: '添加', type: 'primary', if:addP},
      ]"
    ></Search>
    <!-- <el-pagination
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
    <!-- 添加 -->
    <el-drawer
      v-loading="addListLoading"
      class="addProductionDrawer"
      direction="rtl"
      size="60%"
      :title="isEdit ? '编辑' : '添加产品'"
      :visible.sync="visibleDialog"
      @close="closeAddDrawer"
      ref="product"
      @mousedown.native="handleWrapperMousedown($event,'product')"
      @mouseup.native="handleWrapperMouseup($event,'product')"
      :wrapperClosable="false"
    >
      <div>
        <Search
          ref="son"
          :info="propInfo"
          :search="[
            { title: '客户名称', type: 'autocomplate' },
            { title: '客户料号', type: 'input' },
            { title: '产品料号', type: 'input' },
            { title: '产品名称', type: 'input' },
            { title: '产品规格', type: 'input' },
            { title: '描述', type: 'input' },
            { title: '备注', type: 'input' },
          ]"
          :button="[{ title: '确定', type: 'primary', if: true }]"
        ></Search>
        <!-- <el-form
          :model="productionInfo"
          label-width="100px"
          :rules="rulesProduction"
          ref="productionForm"
        >
          <el-form-item label="客户名称" prop="companyName">
            <el-autocomplete
              class="inline-input"
              v-model="productionInfo.companyName"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          
        </el-form> -->
      </div>
      <div
        style="
          display: flex !important;
          justify-content: flex-end;
          align-items: center;
          margin: 0 30px;
          background-color: rgba(128, 128, 128, 0.1);
          border-radius: 5px;
          margin: 5px 0;
          padding: 10px 20px;
        "
      >
        <div slot="tip" class="el-upload__tip" style="margin-right: 5px">
          请上传EXCEL表格，会覆盖已有表格
        </div>
        <!-- <el-popover
              placement="top-start"
              min-width="200%"
              trigger="hover"
              :content="bomInfo.fileList[0].name"
            > -->
        <el-upload
          style="
            display: flex;
            position: relative;
            align-items: center;
            border: 1px solid black;
            width: 300px;
            height: 35px;
            overflow: hidden;
            border-radius: 5px;
          "
          class="upload-demo"
          action=""
          :before-remove="beforeRemove"
          :file-list="bomInfo.fileList"
          :auto-upload="false"
          ref="upload"
          :on-change="changeBOMList"
          :before-upload="beforeUpload"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            style="height: 100%; position: relative; z-index: 2"
          >
            选取BOM文件
          </el-button>
        </el-upload>
        <!-- </el-popover> -->
        <div>
          <el-button
            style="margin-left: 10px; margin-right: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            v-if="importBom"
            >上传</el-button
          >
        </div>
        <div>
          <el-button size="small" @click="download">
            <a :href="url+'/uploads/temple/产品BOM模板.xlsx'"
              >下载模板</a
            >
          </el-button>
        </div>
      </div>
      <div style="font-size: 30px; margin-left: 5px" v-if="bomList.length">
        产品BOM信息
      </div>
      <div v-if="bomList.length" style="margin: 5px">
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="bomList"
          :row-style="{ height: '100px' }"
          :header-cell-style="{ height: '40px' }"
        >
          <el-table-column
            align="center"
            label="项次"
            width="50"
            class-name="li first"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="原件料号"
            align="center"
            width="140"
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
                {{ scope.row.part_number }}
                <!-- IE-10-131-001-A -->
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="品名"
            align="center"
            min-width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.name"
              >
                <span
                  slot="reference"
                  style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  "
                >
                  {{ scope.row.name }}
                  <!-- UVA-UVC-杀菌灯-铝基板-PCB -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="规格"
            align="center"
            min-width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.specs"
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
                  {{ scope.row.specs }}
                  <!-- UVA-UVC-杀菌灯
                  260-280nm-395-405nm-3.5x3.5x1.41mm-3-6W-5-7V-3.0-3.4V-40-100mA -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="用量"
            align="center"
            width="85"
            class-name="li"
          >
            <template slot-scope="scope">
              {{ scope.row.phr }}
            </template>
          </el-table-column>
          <el-table-column
            label="位置号"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.position_code"
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
                  {{ scope.row.position_code }}
                  <!-- UVA-UVC-杀菌灯 -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.supplier"
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
                  {{ scope.row.supplier }}
                  <!-- 浙江锦顺 -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商料号"
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
                {{ scope.row.supplier_code }}
                <!-- IE-10-131-001-A -->
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            width="180"
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
                  <!-- {{ scope.row.id }} -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- 查看 -->
    <el-drawer
      ref="show"
      @mousedown.native="handleWrapperMousedown($event,'show')"
      @mouseup.native="handleWrapperMouseup($event,'show')"
      :wrapperClosable="false"

      class="addProductionDrawer"
      direction="rtl"
      size="35%"
      title="产品信息"
      :visible.sync="visibleDialog_info"
      @close="closeInfo"
    >
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="">
          <div>客户名称</div>
          <div>{{ infoList.customer_name }}</div>
        </div>
        <div style="width: 16.5%">
          <div>客户料号</div>
          <div>{{ infoList.customer_code }}</div>
        </div>
        <div style="width: 16.5%">
          <div>产品料号</div>
          <div>{{ infoList.product_code }}</div>
        </div>

        <div style="width: 20%">
          <div>产品规格</div>
          <div>
            {{ infoList.product_specs }}
          </div>
        </div>
        <div style="">
          <div>产品名称</div>
          <div>{{ infoList.product_name }}</div>
        </div>
        <div style="width: 33%">
          <div>描述</div>
          <div>{{ infoList.desc }}</div>
        </div>
        <div style="width: 30%">
          <div>备注</div>
          <div>{{ infoList.remarks }}</div>
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
          margin: 5px;
          padding: 10px 20px;
        "
      >
        <div>产品BOM信息</div>
        <div>
          <el-button size="small" type="primary" @click="download" :disabled="!exportP">
            <a
              :href="
                url+'/admin/Product/export_bom?id=' +
                editId
              "
            >
              下载BOM表格</a
            >
          </el-button>
        </div>
      </div>
      <div style="margin: 5px">
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          stripe
          highlight-current-row
          :data="infoList.product_bom"
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
            label="原件料号"
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
                {{ scope.row.part_number }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="物料名称"
            align="center"
            min-width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.name"
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
                  {{ scope.row.name }}
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="规格"
            align="center"
            min-width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.specs"
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
                  {{ scope.row.specs }}
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="用量"
            align="center"
            width="50"
            class-name="li"
          >
            <template slot-scope="scope">{{ scope.row.phr }}</template>
          </el-table-column>
          <el-table-column
            label="位置号"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.position_code"
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
                  {{ scope.row.position_code }}
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商"
            align="center"
            width="140"
            class-name="li"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                min-width="200%"
                trigger="hover"
                :content="scope.row.supplier"
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
                  {{ scope.row.supplier }}
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商料号"
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
                {{ scope.row.supplier_code }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            width="180"
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
        </el-table>
      </div>
      <div id="tabbar"></div>
    </el-drawer>
    <!--  -->
    <!-- <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="shutDownDrawer"
      size="60%"
    >
      <div>
        <div class="info">
          <div>产品名称：333</div>
          <div>料号：dfdf</div>
          <div>品牌商：dfdf</div>
          <div>备注：</div>
        </div>

        <div style="padding: 0 5px">
          产品BOM信息
          <el-table
            :data="productionsInfo"
            :header-cell-style="{ height: '30px', padding: '0' }"
            v-loading="listLoading"
            element-loading-text="Loading"
            border
            stripe
            highlight-current-row
          >
            <el-table-column label="序号" width="40" align="center">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>

            <el-table-column label="原件料号" width="200" align="center">
              <template slot-scope="scope">
                <span class="threeLine">
                  {{ scope.row.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="原件名称" width="200" align="center">
              <template slot-scope="scope">
                <span class="threeLine">
                  {{ scope.row.name }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="用量" width="60" align="center">
              <template slot-scope="scope">
                {{ scope.row.num }}
              </template>
            </el-table-column>
            <el-table-column label="规格" width="70" align="center">
              <template slot-scope="scope">
                {{ scope.row.price }}
              </template>
            </el-table-column>

            <el-table-column label="厂商" width="60" align="center">
              <template slot-scope="scope">
                {{ scope.row.totalPrice }}
              </template>
            </el-table-column>
            <el-table-column label="位置号" width="60" align="center">
              <template slot-scope="scope">
                {{ scope.row.totalPrice }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer> -->
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
        :row-style="{ height: '127px' }"
        :header-cell-style="{ left: 0, right: 0 }"
        @sort-change="sort"
      >
        <el-table-column align="center" label="序号" width="50" class-name="li first">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户名称"
          min-width="250"
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
              {{ scope.row.customer_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户料号"
          min-width="200"
          align="center"
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
              {{ scope.row.customer_code }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="产品料号"
          min-width="200"
          align="center"
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
          min-width="200"
          align="center"
          class-name="li"
        >
          <template slot-scope="scope">
            <span
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
        <el-table-column
          label="产品规格"
          min-width="200"
          align="center"
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
          label="描述"
          width="200"
          align="center"
          class-name="li"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              min-width="200%"
              trigger="hover"
              :content="scope.row.desc"
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
                {{ scope.row.desc }}
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          min-width="110"
          align="center"
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
          sortable="custom"
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
          class-name="button"
        >
          <template slot-scope="scope" style="display: flex; flex-wrap: wrap">
            <el-button type="primary" size="small" @click="showInfo(scope.row)"
              v-if="infoP">产品信息</el-button
            >
            <el-button type="info" size="small" v-if="!infoP"></el-button>

            <el-button
              type="primary"
              size="small"
              @click="editProduction(scope.row)"
              v-if="editP"
              >编辑</el-button
            >
            <el-button type="info" size="small" v-if="!editP"></el-button>

            <el-button type="info" size="small"></el-button>
            <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="deleteP(scope.row)"
            >
              <el-button type="danger" size="small" slot="reference" v-if="deletePro">
                删除
              </el-button>
            </el-popconfirm>
            <el-button type="info" size="small" v-if="!deletePro"></el-button>

            <el-button type="info" size="small"></el-button>
            <el-button type="info" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  getProductionList,
  getCompanyList,
  addProduction,
  addBOM,
  getBOMList,
  deleteProduction,
  downLoad,
  editProduction,
} from "@/api/table";
import Search from "@/components/Search/index.vue";
import throttle from "lodash/throttle";
let XLSX = require("xlsx");
// import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
import { Readable } from "stream";
XLSX.stream.set_readable(Readable);
import * as cpexcel from "xlsx/dist/cpexcel.full.mjs";
XLSX.set_cptable(cpexcel);
import {url} from '@/utils/url'

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
    url(){
      return url;
    },
    auth_id(){
      return localStorage.getItem('auth_id').split(',');
    },
    addP(){
      // return true;
      return this.auth_id.includes('13');
    },
    importBom(){
      return this.auth_id.includes('14');
    },
    editP(){
      // return true;
      return this.auth_id.includes('15');
    },exportP(){
      return this.auth_id.includes('16');
    },deletePro(){
      return this.auth_id.includes('17');
    },infoP(){
      return this.auth_id.includes('18');
    }
  },
  components: {
    Search,
  },
  data() {
    return {
      submit: 0,
      editSend: 0,
      propInfo: null,
      length: null,
      list: [],
      bomList: [],
      infoList: {
        customer_name: "",
        customer_code: "",
        product_code: "",
        product_name: "",
        product_specs: "",
        desc: "",
        remarks: "",
      },
      listLoading: false,
      FlistLoading: false,
      addListLoading: false,
      //
      page_size: 10,
      page_current: 1,
      page_total: 1000,
      //
      order: "desc",
      id: null,
      editId: null,
      searchIn: null,
      searchI: null,
      //
      visibleDialog: false,
      visibleDialog_info: false,
      isEdit: false,
      isEditId: null,
      aaa: null,
      //
      classmodel:null,
      //
      productionInfo: {
        companyName: "",
        companyMNumber: "",
        productionMNumber: "",
        productionName: "",
        specification: "",
        description: "",
        remarks: "",
      },
      searchInfo: {
        companyName: null,
        companyMNumber: null,
        productionMNumber: null,
        productionName: null,
        specification: null,
        description: null,
        remarks: null,
      },
      bomInfo: {
        fileList: [
          {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
      },
      rulesProduction: {
        companyName: [{ required: true, message: "请输入", trigger: "blur" }],
        companyMNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        productionMNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        productionName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        specification: [{ required: true, message: "请输入", trigger: "blur" }],
        description: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.fetchData();
    this.FlistLoading = true;
  },
  mounted() {
    this.$bus.$on("add", this.addProduction);
    this.$bus.$on("goSearch", this.search);
    this.$bus.$on("determine", this.Determine);
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  methods: {
    download() {
      
    },
    beforeUpload(file) {},
    changeBOMList(file, fileList) {
      this.bomInfo.fileList = [{ name: file.name }];
    },
    async slsx() {
      const file = document.querySelector(".el-upload__input");
      const target = document.querySelector("#tabbar");
      if (file.files.length > 0) {
        const data = await file.files[0].arrayBuffer();
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        let list = XLSX.utils.sheet_to_json(ws);
        this.bomList = list;
        console.log(22, this.bomList);
        if (this.bomList.length < 1) {
          this.$message({
            message: "请上传正确的文件",
            type: "error",
          });
        }
      }
    },
    //上传时添加
    submitUpload() {
      // this.slsx();
      // const file = document.querySelector(".el-upload__input");
      // const target = file.files[0];
      // let data = new FormData();
      // data.append("product_bom", target);
      // data.append("product_id", this.id);
      //
      let a = this.$refs.son.sendInfo();
      this.searchIn = a.info;
      this.searchI = a.id;
      if (!this.isEdit) {
        if (this.submit == 0) {
          addProduction(a.info, a.id).then((res) => {
            this.submit = 1;
            this.id = res.data.product_id;
            const file = document.querySelector(".el-upload__input");
            const target = file.files[0];
            let data = new FormData();
            data.append("product_bom", target);
            data.append("product_id", this.id);
            data.append("flag", this.editSend);
            if (file.files.length > 0) {
              addBOM(data).then((res) => {
                this.bomList = res.data;

                // this.closeAddDrawer();
              });
            }
          });
        } else {
          const file = document.querySelector(".el-upload__input");
          const target = file.files[0];
          let data = new FormData();
          data.append("product_bom", target);
          data.append("product_id", this.id);
          data.append("flag", this.editSend);
          if (file.files.length > 0) {
            addBOM(data).then((res) => {
              this.bomList = res.data;
              // this.closeAddDrawer();
            });
          }
        }
      } else {
        const file = document.querySelector(".el-upload__input");
        const target = file.files[0];
        let data = new FormData();
        data.append("product_bom", target);
        data.append("product_id", this.id);
        data.append("flag", this.editSend);
        if (file.files.length > 0) {
          addBOM(data).then((res) => {
            this.bomList = res.data;

            // if(this.bomList.length!=this.length){
            //   this.$message({
            //     message:'请勿传输相同的表格',
            //     type:'error'
            //   })
            // }
            // this.closeAddDrawer();
          });
        }
      }

      //  else {
      //   editProduction(a.info, this.isEditId).then((res) => {});
      // }
    },
    //文件上传后删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    search(search) {
      let searchInfo = {
        companyName: search[0],
        companyMNumber: search[1],
        productionMNumber: search[2],
        productionName: search[3],
        specification: search[4],
        description: search[5],
        remarks: search[6],
      };
      this.fetchData(searchInfo);
    },
    //打开添加抽屉
    addProduction() {
      this.addOpenDrawer();
    },
    //切换页面
    pageChange(current) {
      this.page_current = current;
      this.fetchData();
    },
    sizeChange(size) {
      this.page_size = size;
    },
    //时间排序
    sort(column) {
      this.order = column.order == "descending" ? "desc" : "asc";
      this.fetchData();
    },
    //添加抽屉的开关
    addOpenDrawer() {
      this.visibleDialog = true;
    },
    closeAddDrawer() {
      this.submit = 0;
      this.editSend = 0;
      this.productionInfo = {
        companyName: "",
        companyMNumber: "",
        productionMNumber: "",
        productionName: "",
        specification: "",
        description: "",
        remarks: "",
      };
      this.propInfo = [];
      this.$bus.$emit("edit", this.propInfo);
      (this.bomInfo = {
        fileList: [],
      }),
        (this.bomList = []);
      this.visibleDialog = false;
      this.isEdit = false;
      this.fetchData();
    },
    //产品详情的drawer的开关
    showInfo(row) {
      this.FlistLoading = true;
      this.editId = row.product_id;
      getBOMList(row.product_id)
        .then((res) => {
          this.infoList = res.data.res;
          this.visibleDialog_info = true;
        })
        .finally(() => {
          this.FlistLoading = false;
        });
    },
    closeInfo() {
      this.visibleDialog_info = false;
    },
    editProduction(row) {
      this.editSend = 1;
      this.addListLoading = true;
      getCompanyList(row.customer_name).then((res) => {
        this.searchI = res.data.res[0].id;
      });
      this.isEditId = row.product_id;
      this.id = row.product_id;
      this.isEdit = true;
      this.propInfo = [
        row.customer_name,
        row.customer_code,
        row.product_code,
        row.product_name,
        row.product_specs,
        row.desc,
        row.remarks,
      ];
      getBOMList(row.product_id)
        .then((res) => {
          this.infoList = res.data;
          this.bomList = res.data.res.product_bom;
          this.length = this.bomList.length;
          this.$bus.$emit("edit", this.propInfo);
          // this.FlistLoading = false;
        })
        .finally(() => {
          this.addListLoading = false;
        });
      this.addOpenDrawer();
    },
    //初始化
    fetchData(searchInfo) {
      if (!searchInfo) {
        searchInfo = ["", "", "", "", "", "", ""];
      }
      this.listLoading = true;
      getProductionList(this.page_size, this.page_current, searchInfo).then(
        (res) => {
          this.list = res.data.res.data;
          console.log(this.list);
          this.page_total = res.data.res.total;
          this.listLoading = false;
          this.FlistLoading = false;
        }
      );
    },
    //添加后确定
    Determine(searchInfo) {
      const file = document.querySelector(".el-upload__input");
      const target = file.files[0];
      let data = new FormData();
      data.append("product_bom", target);
      data.append("product_id", this.id);
      this.FlistLoading = true;
      if (this.isEdit) {
        let a = this.$refs.son.sendInfo();
        this.searchIn = a.info;
        editProduction(searchInfo, this.isEditId).then((res) => {
          if (res.code !== 200) {
            return;
          } else {
            this.closeAddDrawer();
            this.FlistLoading = false;
          }
          this.id = res.data.product_id;
        });
      } else {
        if (!this.id) {
          let a = this.$refs.son.sendInfo();
          this.searchIn = a.info;
          this.searchI = a.id;
          addProduction(this.searchIn, this.searchI).then((res) => {
            this.FlistLoading = false;
            if (res.code !== 200) {
              this.FlistLoading = false;
            } else {
              this.closeAddDrawer();
            }
          });
        }
      }
      this.closeAddDrawer();
      // if (file.files.length > 0) {
      //   addBOM(data).then((res) => {
      //     this.bomList =res.data;
      //     this.closeAddDrawer();
      //   });
      // }
    },
    deleteP(row) {
      deleteProduction(row.product_id).then((res) => {
        this.fetchData();
      });
    },
    //
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

.production {
  // position: none!important;
  .info {
    margin: 5px !important;
    justify-content: flex-start;
    background-color: rgba(230, 230, 230, 0.4);
    border-radius: 10px;
    padding: 20px;
    & > div {
      // border:1px solid black;
      height: 60px;
      width: 33%;
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
  .addProductionDrawer {
    .el-drawer__body {
      padding: 20px;
    }
    .el-drawer {
      min-width: 1500px !important;
      overflow: auto !important;
      height: 100%;
      display: flex;
      justify-content: center;
      width: 40% !important;
      .upload-demo {
        ul {
          position: absolute;
          right: 0;
          li {
            margin: 0;
          }
        }
      }
      .el-form {
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
          display: flex;
          justify-content: center;
          .el-form-item__content {
            margin: 0 !important;
            .el-input {
              width: 300px;
            }
          }
        }
      }
    }
  }
}
</style>
