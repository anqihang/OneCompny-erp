<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.info{
  // margin:10px!important;
}
.first{
  // display:flex;
  // justify-content:center;
  .cell{
    width:100%;
  }
}
.threeLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box!important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.el-table tbody tr:hover>td{
  // background-color: #eeecec;
}
.el-table__body .el-table__row.hover-row td{
  // background-color: #eeecec;
}
.el-input-group__prepend{
  width:120px;
}
.li{
  padding-top: 0!important;
  padding-bottom: 0!important;
  // height:30px!important;
  // display:flex;
  position: relative;
  & > div{
    // padding-top: 12px;
    position: absolute;
    top: 0;
    // padding:0!important;
  }
}

.el-table {
  bottom: initial;
  .el-table__row {
    .button{
      padding-top:0;
    .cell {
      padding-top:12px;
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center;
      align-items: center;
      .el-button {
        margin: 2px !important;
        width: 78px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  }
}
.app-container,
.drawer {
  overflow: auto;
  // padding-bottom: 0;
  // padding-right: 0;
  // padding-left: 0;
  padding-top: 0;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // height: 100%;
  // .table{
  // flex:1;
  // position:relative;
  // &>>>.el-table{
  // position:absolute;
  // }
  // }
}
.drawer {
  overflow: auto;
  // padding-bottom: 0;
  // padding-right: 0;
  // padding-left: 0;
  padding-top: 0;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  // .table{
  // flex:1;
  // position:relative;
  // &>>>.el-table{
  // position:absolute;
  // }
  // }
}
.drawerInput {
  .el-drawer {
    min-width: 478px !important;
    overflow: scroll !important;
  }
  .el-input {
    width: 300px !important;
  }
}

.el-pagination {
  display: flex;
  justify-content: flex-end;
}
.footer {
  // width: 100%;
  display: flex;
  justify-content: flex-end;
  left:0;
  height: 50px;
  right: 0;
  padding-right: 44px;
  float: right;
  position: fixed;
  background-color: white;
  bottom: -10px;
  margin: 5px 0 10px 0;
  align-items:center;
  border-top: 1px solid rgba(0,0,0,0.2);
  z-index: 10;
  // padding-top: 10px;
}
:focus{
  outline:0
}
#el-drawer__title{
  // margin-bottom: 0;
}
.el-drawer__body{
  padding-top: 0!important;
}
#el-drawer__title{
  margin-bottom: 0;
}
</style>

