<template>
  <div class="app-container">
    outDepot
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="shutDownDrawer"
    >
    <div style="padding:0 5px">
      <el-table
      :header-cell-style="{height:'30px',padding:'0'}"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      stripe
      highlight-current-row
      >
        <el-table-column align="center" label="出货单号"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> 
       <el-table-column align="center" label="发货人" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货信息"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收货方信息" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="物流费用" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="物流单号" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      </el-table>
    </div>
    </el-drawer>

    <el-table
      height="300"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="showDrawer"
    >
      
      <el-table-column align="center" label="序号"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户料号"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品料号"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品名称"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品总数"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出库数"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存量"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="未出库数"  >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      
      
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      drawer:false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showDrawer(){
      this.drawer = true;
    },
    shutDownDrawer(){
      this.drawer = false;
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
