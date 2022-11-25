<template>
  <div class="app-container">
    payments
    <el-table
      height="300"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="40" fixed>
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="客户名" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="订单号" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="客户料号" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      
      <el-table-column label="产品料号" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="产品名称" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      
      <el-table-column label="出货单号" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="产品总数" >
        <template slot-scope="scope">
        </template>
      </el-table-column>      
      <el-table-column label="出库数" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="未出库数" >
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="收款金额" align="center">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="状态" >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
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
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
