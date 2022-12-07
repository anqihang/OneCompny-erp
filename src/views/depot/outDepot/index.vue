<template>
  <div class="app-container outDepot" v-loading.clock="FlistLoading">
    <Search :search="[
      { title: '客户名称', type: 'input' },
      { title: '订单号', type: 'input' },
      { title: '客户料号', type: 'input' },
      { title: '产品料号', type: 'input' },
      { title: '产品名称', type: 'input' },
      { title: '产品总数', type: 'input', placeholder: '输入范围,例:10/20(10到20)' },
      { title: '出库数', type: 'input', placeholder: '输入范围,例:10/20(10到20)' },
      { title: '库存量', type: 'input', placeholder: '输入范围,例:10/20(10到20)' },
      { title: '未出库数', type: 'input', placeholder: '输入范围,例:10/20(10到20)' },
      { title: '状态', type: 'select' },
    ]" :button="[
  { title: '搜索', type: '', if: true },
  { title: '重置', type: '', if: true },
]" :selectInfo="[
  {
    value: '0',
    label: '进行中',
  },
  {
    value: '1',
    label: '已完成',
  },
]"></Search>
    <!-- 添加弹窗 -->
    <el-drawer title="添加出库信息" size="70%" :visible.sync="visibleAdd" class="addDrawer" @close="closeAddDrawer">
      <Search :search="[
        { title: '出库人', type: 'input' },
        { title: '出库单号', type: 'input' },
        { title: '选择出库单图片', type: 'file' },
        { title: '备注', type: 'input' },
      ]" :button="[
  { title: '确定', type: 'primary', if: true }
]"></Search>
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 33%">
          <div>客户名称</div>
          <div>{{ addObj.company_name }}</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>{{ addObj.order_number }}</div>
        </div>
        <div style="width: 33%">
          <div>订单状态</div>
          <div>{{ addObj.status == 0 ? '进行中' : '已完成' }}</div>
        </div>
      </div>
      
      
      <div style="background-color: #f5f7fa; height: 3px; margin: 10px 0"></div>

      <div>
        <div style="
            font-size: 25px;
            margin: 10px;
            display: flex;
            justify-content: space-between;
          "></div>
        <div class="inpu">
          <el-table :data="addObj.order_infos" border stripe fit :row-style="{ height: '127px' }"
            :header-cell-style="{ height: '36px' }">
            <el-table-column width="50" label="序号" align="center" class-name="li">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="客户料号" align="center" min-width="100" class-name="li" prop="kehu">
              <template slot-scope="scope">
                <span slot="reference" style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  ">
                  {{scope.row.customer_code}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="产品料号" align="center" min-width="100" class-name="li">
              <template slot-scope="scope">
                <span slot="reference" style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  ">
                  {{scope.row.product_code}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" align="center" min-width="100" class-name="li">
              <template slot-scope="scope">
                <span slot="reference" style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  ">
                  {{scope.row.product_name}}
                </span>
              </template>
            </el-table-column>
            
            <el-table-column label="产品规格" align="center" min-width="100" class-name="li">
              <template slot-scope="scope">
                <el-popover placement="top-start" min-width="200%" trigger="hover" :content="scope.row.product_specs">
                  <span class="threeLine" slot="reference" style="
                      display: flex;
                      justify-content: start;
                      text-align: start !important;
                    ">
                    {{scope.row.product_specs}}
                  </span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="当前库存量" align="center" min-width="100" class-name="li ">
              <template slot-scope="scope">
                {{scope.row.stock_number}}
              </template>
            </el-table-column>
            <el-table-column label="未出库数" align="center" min-width="100" class-name="li ">
              <template slot-scope="scope"> 
                {{scope.row.not_out_number}} </template>
            </el-table-column>
            <el-table-column label="出库数" align="center" min-width="100" class-name="li inputLi">
              <template slot-scope="scope">
                <el-input placeholder="请输入" v-model="perNumber[scope.$index]"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="200" class="operation" class-name="button"
              style="border-left: 1px solid red">
              <template slot-scope="scope" style="display: flex; flex-wrap: wrap" class="operation">
                <el-button type="info" size="small"></el-button>

                <el-popconfirm title="确定删除吗？" icon="el-icon-info" icon-color="red" @onConfirm="">
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
    <!-- 出库记录 -->
    <el-drawer class="outS" title="出库记录" :visible.sync="visibleInfo" direction="rtl" @close="closeInfo">
      <Search
        :search="[
          {title:'出库单号',type:'input'},
          {title:'出库人',type:'input'}
        ]"
        :button="[
          {title:'搜索',type:'',if:true},
          {title:'重置',type:'',if:true},
        ]"
      ></Search>
      <div style="display: flex; flex-wrap: wrap" class="info">
        <div style="width: 33%">
          <div>客户名称</div>
          <div>{{orderInfo.company_name}}</div>
        </div>
        <div style="width: 33%">
          <div>订单号</div>
          <div>{{orderInfo.order_number}}</div>
        </div>
        <div style="width: 33%">
          <div>订单状态</div>
          <div>{{(orderInfo.status==0?'进行中':'已完成')}}</div>
        </div>
      </div>
      <div style="margin: 10px;position: absolute;left:0;right:0;bottom:0;top:218px">
        <el-table class="infoD_t" height="100%" v-loading="listLoading" element-loading-text="Loading" border stripe
          highlight-current-row :data="infoList.order_infos||[]" :row-style="{ height: '100px' }">
          <el-table-column align="center" label="序号" width="50" class-name="li">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="客户料号" align="center" min-width="140" class-name="li">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                  <span class="threeLine" slot="reference" style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                ">
                    {{ scope.row.customer_code }}
                  </span>
              </div>
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="产品料号" align="center" min-width="140" class-name="li">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                  <span class="threeLine" slot="reference" style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  ">
                    {{ scope.row.product_code }}
                  </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" align="center" min-width="140" class-name="li">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                
                <el-popover placement="top-start" min-width="200%" trigger="hover" :content="scope.row.product_name">
                  <span class="threeLine" slot="reference" style="
                    display: flex;
                    justify-content: start;
                    text-align: start !important;
                  ">
                    {{ scope.row.product_name }}
                  </span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="累计出库数" align="center" width="100" class-name="li">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                <!-- <div v-for="(item, index) in scope.row.info" :key="index" style="
                  height: 70px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                "> -->
                <span class="threeLine" slot="reference" style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                ">
                  {{ scope.row.out_total }}
                </span>
                <!-- </div> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="未出库数" align="center" width="90" class-name="li">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                <span class="threeLine" slot="reference" style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                ">
                  {{ scope.row.not_out_number }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="出库单号" width="170" class-name="mor inputLi">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.outblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                <!-- <span v-if="!(showIndex == scope.row.customer_code&&showTime == item.create_time)"> -->
                {{ item.out_number }}
              <!-- </span> -->
              <!-- <el-input
              v-if="(showIndex == scope.row.customer_code&&showTime == item.create_time)"
                  placeholder="请输入"
                  v-model="perInfo.orderId"
                ></el-input> -->
              </div>

            </template>
          </el-table-column>
          <el-table-column align="center" label="出库人" width="80" class-name="mor inputLi">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.outblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                <!-- <span v-if="!(showIndex == scope.row.customer_code&&showTime == item.create_time)"> -->
                {{ item.outdown_name }}
              <!-- </span> -->
              <!-- <el-input
              v-if="(showIndex == scope.row.customer_code&&showTime == item.create_time)"
                  placeholder="请输入"
                  v-model="perInfo.person"
                ></el-input> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="出库数" align="center" width="100" class-name="mor inputLi">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                <div v-for="(item, index) in scope.row.outblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                  <span v-if="!(showIndex == scope.row.customer_code&&showTime == item.create_time)"
                    slot="reference" style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                ">
                    {{ item.number }}
                  </span>
                  <el-input
              v-if="(showIndex == scope.row.customer_code&&showTime == item.create_time)"
                  placeholder="请输入"
                  v-model="perInfo.number"
                ></el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="出库时间" width="160" class-name="mor">
            <template slot-scope="scope">

              <div v-for="(item, index) in scope.row.outblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                <i class="el-icon-time" />
                <span>
                  {{ item.create_time }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="出库单图片" width="100" class-name="mor">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.outblound_infos" :key="index" style="
                  height: 135px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                <!-- <el-image style="position: relative" :src="'http://192.168.1.122:8080' + item.outdown_image"
                  :preview-src-list="[
                    'http://192.168.1.122:8080' + item.outdown_image,
                  ]"></el-image> -->
                  <el-image style="position: relative" :src="'http://tongyu.devapi.ltokay.cn' + item.outdown_image"
                  :preview-src-list="[
                    'http://tongyu.devapi.ltokay.cn' + item.outdown_image,
                  ]"></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="100" class-name="li">
            <template slot-scope="scope">
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
                  <span
                   slot="reference" style="
                  display: flex;
                  justify-content: start;
                  text-align: start !important;
                ">
                    {{ scope.row.remarks }}
                  </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right"  width="200" class="operation" class-name="button editButton"
              style="border-left: 1px solid red">
              <template slot-scope="scope" style="display: flex;" class="operation">
                <div v-for="(item, index) in scope.row.outblound_infos" :key="index" style="
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
                >
              
              <el-button type="primary" size="small" @click="edit(scope,index,item)">编辑</el-button>

                <el-button type="primary" size="small" slot="reference" @click="editSend(scope,item)">
                  确定
                </el-button>

              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>

              <el-button type="info" size="small"></el-button>
              <el-button type="info" size="small"></el-button>
            </div>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <!-- 列表 -->
    <div style="
        position: absolute;
        left: 20px;
        right: 20px;
        top: 178px;
        bottom: 50px;
      ">
      <el-table class="listTable" height="100%" v-loading="listLoading" :data="list" element-loading-text="Loading"
        border fit highlight-current-row :row-style="{ height: '127px' }" :header-cell-style="{ left: 0, right: 0 }">
        <el-table-column align="center" label="序号" width="50" class-name="li">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称" min-width="250" class-name="li">
          <template slot-scope="scope">
           {{scope.row.company_name}}
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" class-name="li" label="订单号">
          <template slot-scope="scope">
           {{scope.row.order_number}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="140" class-name="mor" label="客户料号">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{item.customer_code}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="140" class-name="mor" label="产品料号">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{ item.product_code }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" class-name="mor" label="产品名称">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{ item.product_name }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" class-name="mor" label="产品总数">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{ item.number }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" class-name="mor" label="累计出库数">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{ item.out_total }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" class-name="mor" label="当前库存量">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{ item.stock_number }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" class-name="mor" label="未出库数">
          <template slot-scope="scope">
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
              ">
              <div v-for="(item, index) in scope.row.order_infos" :key="index" style="
                  height: 127px;
                  position: relative;
                  text-align: start;
                  border-top: 1px solid #ebeef5;
                  margin-top: -2px;
                ">
                {{ item.not_out_number }}
              </div>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="状态" width="80" class-name="li indext" align="center">
          <template slot-scope="scope">
            <el-tag effect="dark" :type="(scope.row.status==0?'danger':'success')">{{
                scope.row.status == 0 ? "进行中" : "已完成"
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right" width="200" class="operation" class-name="button t"
          style="border-left: 1px solid red">
          <template slot-scope="scope" style="display: flex; flex-wrap: wrap" class="operation">
            <el-button type="primary" size="small" @click="openAddDrawer(scope.row)">
              出库
            </el-button>
            <el-button type="primary" size="small" @click="openInfo(scope.row)">
              出库记录
            </el-button>
            <el-button type="info" size="small"></el-button>
            <el-popconfirm title="确定删除吗？" icon="el-icon-info" icon-color="red" @onConfirm="deleteOut(scope.row)">
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
      <el-pagination style="margin-bottom: 10px" background layout="sizes,prev, pager, next" :total="page_total"
        @current-change="pageChange" @size-change="sizeChange" :current-page="page_current" :page-size="page_size"
        :page-sizes="[ 50, 100]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList,getOutStorage,outStorage,outStorageHistory,deleteOut,editOut } from "@/api/table";
import Search from "@/components/Search/index.vue";
import cloneDeep from "lodash/cloneDeep";

export default {
  components: {
    Search,
  },
  computed:{
    // status(){
    //   for (const iterator of this.list) {
    //     iterator.status = 1;
    //     for (const iterator1 of iterator.order_infos) {
    //       if(iterator1.not_out_number > 0){
    //         console.log(iterator1.not_out_number);
    //         iterator.status = 0;
    //       }
    //     }
    //   }
    // }
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
      list: null,
      listLoading: false,
      FlistLoading:false,
      drawer: false,
      //
      page_size: 50,
      page_current: 1,
      page_total: 1000,
      //
      visibleAdd: false,
      visibleInfo: false,
      //
      addObj:{},
      perNumber:[],
      infoList:[],
      //
      showIndex:0,
      showTime:'',
      perNum:[],
      perInfo:{
        person:'',
        orderId:'',
        number:''
      },
      isInfo:false,
      infoId:null,
      orderInfo:{
        company_name:null,
        order_number:null,
        status:null,
      }
    };
  },
  created() {
    this.fetchData();
    this.FlistLoading =true;
  },
  mounted(){
    this.$bus.$on('goSearch',this.search);
    this.$bus.$on('storage',this.outStorage);
  },
  beforeDestroy(){
    this.$bus.$off();
  },
  methods: {
    search(searchInfo){
      if(!this.isInfo){
        let newSearch = cloneDeep(searchInfo);
        if (newSearch[5]) {
          newSearch[5] = newSearch[5].split('/');
        }
        if (newSearch[6]) {
          newSearch[6] = newSearch[6].split('/');
        }
        if (newSearch[7]) {
          newSearch[7] = newSearch[7].split('/');
        }
        if (newSearch[8]) {
          newSearch[8] = newSearch[8].split('/');
        }
        this.fetchData(newSearch);
      }else{
      //  this.listLoading =true;
      outStorageHistory(this.infoId).then((res)=>{
        this.infoList = res.data.res;
        let code = searchInfo[0];
        let person = searchInfo[1];
        
        let newInfoList = [];
        for (const iterator of this.infoList.order_infos) {
          let newInblound_info=[];
          for (const iterator1 of iterator.outblound_infos) {
            if((iterator1.out_number.includes(code)||typeof(code)=='undefined'||code=='')&&(iterator1.outdown_name.includes(person)||typeof(person)=='undefined'||person=='')){
              newInblound_info.push(iterator1);
            }
          }
          iterator.outblound_infos = newInblound_info;
          newInfoList.push(iterator);
        }
        this.infoList.order_infos = newInfoList;
      });
      }
    },
    pageChange(current) {
      this.page_current = current;
    },
    sizeChange(size) {
      this.page_size = size;
    },
    //
    openAddDrawer(row) {
      this.addObj =row;
      // console.log(this.addObj);
      this.visibleAdd = true;
    },
    closeAddDrawer() {
      this.perNumber = [];
      this.$bus.$emit('edit',[]);
      this.visibleAdd = false;
    },
    //发送出库信息
    outStorage(searchInfo){
      let data = new FormData();
      let infos=[];
      let ok=true;
      for (const index in this.addObj.order_infos) {
       let obj ={};
       obj.outblound_id = this.addObj.order_infos[index].inblound_id;
        
       if(this.addObj.order_infos[index].stock_number<this.perNumber[index]){
        ok=false;
        this.$message({
            message: '库存不足',
            type: 'error'
          });
       }else{
        if(this.perNumber[index]<0){
          this.$message({
            message: '不可为负数',
            type: 'error'
          });
          ok=false;
        }else{
        obj.number = this.perNumber[index]?this.perNumber[index]:0;
        }
        infos.push(obj);
       }
      }
      data.append('outdown_name',searchInfo[0]||'');
      data.append('out_number', searchInfo[1]||'');
      data.append('remarks', searchInfo[3]||'');
      data.append('outblound_image', searchInfo[2]||'');
      data.append('outblound_infos', JSON.stringify(infos)||'');
      console.log(this.addObj);
      data.append('order_id',this.addObj.order_id||'');
        if(ok){
      outStorage(data).then((res)=>{
        console.log(res);
        this.closeAddDrawer();
        this.fetchData()
      })
    }
    },
    //
    openInfo(row) {
      this.addObj =row;
      console.log('@',row);
      this.orderInfo = {
        company_name:row.company_name,
        order_number:row.order_number,
        status:row.status,
      }
      this.infoId = row.order_id;
      outStorageHistory(row.order_id).then((res)=>{
        this.infoList = res.data.res||{order_infos:[]};
        // console.log('@',this.infoList);
      });
      console.log('$');
      this.isInfo = true;
      this.visibleInfo = true;
    },
    closeInfo() {
      this.isInfo =false;
      this.visibleInfo = false;
      this.showIndex =0;
      this.showTime = 0;
    },
    fetchData(searchInfo) {
      if(!searchInfo){
        searchInfo =['', '', '', '', '', '', '', '', '', '']
      }
      this.listLoading = true;
      
      getOutStorage(searchInfo,this.page_size,this.page_current).then((res)=>{
        this.page_total = res.data.total;
        console.log(res);
        this.list = res.data.res.data.filter(item=>item.order_infos.length>0);
        this.listLoading =false;
        this.FlistLoading = false;
        //
        for (const iterator of this.list) {
        iterator.status = 1;
        for (const iterator1 of iterator.order_infos) {
          if(iterator1.not_out_number > 0){
            console.log(iterator1.not_out_number);
            iterator.status = 0;
          }
        }
      }
      })
    },
    edit(scope,index,item){
      // this.showIndex = scope.$index;
      this.showIndex = scope.row.customer_code;
      this.showTime = item.create_time;
      this.perInfo ={
        person:item.outdown_name,
        orderId:item.odd_number,
        number:item.number
      }
    },
    editSend(scope,item){
      console.log(scope);
      this.showIndex =0;
      this.showTime = 0;
      this.listLoading = true;
      let data = [{outblound_message_id:item.id,number:this.perInfo.number}];
      this.listLoading = true;
      editOut(JSON.stringify(data)).then((res)=>{
        outStorageHistory(this.infoId).then((res)=>{
          this.infoList = res.data.res;
          this.listLoading = false;
        });
      });
      this.listLoading = false;
    },
    deleteOut(row){
      console.log(row);
      let p = [];
      for (const iterator of row.order_infos) {
        p.push(iterator.inblound_id);
      }
      deleteOut(JSON.stringify(p)).then((res)=>{
          this.fetchData();
      })
    }
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
  padding: 0 !important;

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
        overflow: auto;
    .el-drawer__body {
      padding: 0 20px;
    }
  }
}

.info {
  // margin: 10px;
  justify-content: flex-start;
  background-color: rgba(230, 230, 230, 0.4);
  border-radius: 10px;
  padding: 20px;

  &>div {
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

.indext {
  .cell {
    margin: 12px 0;
  }
}

.table {
  .infoD_t {
    .el-table__header-wrapper {
      .has-gutter {
        tr {
          th {
            .cell {
              // padding: 12px 0;
            }
          }
        }
      }
    }
  }
}
.outS{
  .el-drawer {
    overflow: auto;
    min-width: 1400px;
    padding: 0 10px 0;
    .el-drawer__body{
      position:relative;
    }
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
.editButton{
 .cell{
  padding-left: 0!important;
  padding-top: 0!important;

  // padding-right:0!important;
 }
}
</style>
