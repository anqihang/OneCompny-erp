<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" style="cursor:pointer">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <img :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <span style="height:100%;vertical-align: top;display: inline-block;margin-left:10px;cursor: pointer;">{{name}}</span>
          <!-- <i class="el-icon-caret-bottom" /> -->
          <svg class="icon" aria-hidden="true" style="height:45px;font-size: 40px;">
            <use xlink:href="#icon-caidan"></use>
          </svg>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
            <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


    <el-drawer
      title="修改密码"
      :visible.sync="visibleAdd"
      @close="closeAdd"
      class="addnavDrawer"
    >
      <el-form :model="userInfo" label-width="100px">
        <el-form-item label="密码">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right; margin-right: 30px">
        <el-button @click="closeAdd">取消</el-button>
        <el-button type="primary" @click="sendPwd">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {changePwd} from '@/api/table'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    // name(){
    //   return localStorage.getItem('name');
    // },
    ...mapGetters([
      'sidebar',
      'avatar',
      // 'name'
    ])
  },
  mounted(){
    this.$bus.$on('changeName',this.changeName);
    this.name = localStorage.getItem('name');
    console.log(this.name);
  },
  //+++++++++++++++++
  data(){return{
    visibleAdd:false,
    userInfo:{
      password:''
    },
    name:1,
  }},
  //
  methods: {
    changeName(name){
      this.name = name;
    },
    //+++++++++++++++++++++++++
    changePwd(){
      this.visibleAdd =true;
    },
    closeAdd(){
      this.visibleAdd =false;
    },
    sendPwd(){
      changePwd({id:localStorage.getItem('id'),password:this.userInfo.password}).then((res)=>{
        this.closeAdd();
      })
    },
    //
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
.addnavDrawer {
    .el-drawer {
      min-width: 478px !important;
      overflow: scroll !important;
      .el-drawer__body {
        margin: 20px;
      }
    }
    .el-input {
      width: 300px !important;
    }
  }
</style>
<style lang="scss" scoped>
.navbar {
  min-width:840px;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
