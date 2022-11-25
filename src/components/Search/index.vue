<template>
  <div class="title">
    <div class="title__left">
      <div
        class="search"
        :class="{ flexcol: search.length >= 6 }"
        :style="{ maxHeight: search.length < 6 ? '84px' : 'none' }"
      >
        <div v-for="(item, index) in search" :key="index" class="input">
          <div
            v-if="item.type == 'file'"
            style="
              border: 1px solid #dcdfe6;
              height: 100%;
              overflow: hidden;
              border-radius: 4px;
            "
          >
            <button
              style="
                width: 120px;
                height: 100%;
                background-color: #409eff;
                position: relative;
                color: #fff;
                border: 0;
                border-right: 1px solid #dcdfe6;
              "
            >
              选择订单图片
            </button>
            <span
              style="height: 100%; width: 100%; position: absolute; left: 124px;color:#606266;"
            >
              {{ fileName }}
            </span>
            <input
              class="file"
              type="file"
              @change="showName(index)"
              style="
                opacity: 0;
                position: relative;
                top: -29px;
                left: 12px;
                z-index: 2;
              "
            />
          </div>
          <!-- // -->
          <div v-if="item.type == 'input'">
            <el-input
              :placeholder="item.placeholder"
              class="input-el"
              v-model="searchInfo[index]"
            >
              <template slot="prepend">{{ item.title }}</template>
            </el-input>
          </div>
          <!--  -->
          <div v-if="item.type == 'textarea'">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="searchInfo[index]"
            >
            </el-input>
          </div>
          <!--  -->
          <div v-if="item.type == 'date'">
            <el-date-picker
              type="date"
              :placeholder="item.placeholder"
              v-model="searchInfo[index]"
              class="input-el"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div v-if="item.type == 'autocomplate'" class="com">
            <div
              style="
                font-size: 14px;
                color: #909399;
                display: flex;
                align-items: center;
                padding-left: 10px;
                width: 120px;
                background-color: #f5f7fa;
                box-sizing: border-box;
                border: 1px solid #dcdfe6;
                border-right: 0;
                border-radius: 4px 0 0 4px;
              "
            >
              客户名称
            </div>
            <el-autocomplete
              class="inline-input"
              v-model="searchInfo[index]"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </div>
      </div>
      <!-- <el-button  style="height:30px;margin-left: 5px;margin-bottom: 5px;" size="small" @click="goSearch">搜索</el-button>
        <el-button  style="height:30px;margin-left: 5px;margin-bottom: 5px;" size="small" @click="searchInfo=[]">重置</el-button> -->
    </div>
    <div class="title__right">
      <div class="button">
        <el-button
          :type="item.type"
          @click="clickAtt(item.title)"
          size="small"
          v-for="(item, index) in button"
          :key="index"
        >
          {{ item.title }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompanyList } from "@/api/table";

export default {
  name: "Search",
  data() {
    return {
      // date: "",
      // order: "",
      searchInfo: [],
      selectId: null,
      fileName: null,
    };
  },
  props: {
    search: {
      type: Array,
      default: [],
    },
    button: {
      type: Array,
      default: [],
    },
    info: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  /**
   * search:[
   *  {
   *    title:'客户名'，
   *    type:'input',
   * }
   * ]
   */
  mounted() {
    // this.searchInfo = this.info;
    this.$bus.$on("edit", this.copy);
  },
  methods: {
    showName(index) {
      let fi = document.querySelector(".file");
      this.fileName = fi.files[0].name;
      this.searchInfo[index] = fi.files[0];
    },
    copy(info) {
      this.searchInfo = info;
    },
    sendInfo() {
      return { info: this.searchInfo, id: this.selectId };
    },
    querySearch(value, cb) {
      // cb([{value:''}])
      getCompanyList(value).then((res) => {
        cb(
          res.data.res.length == 0
            ? [{ value: "不存在相关客户" }]
            : res.data.res
        );
      });
    },
    //选中客户名字
    handleSelect(select) {
      this.selectId = select.id;
    },

    clickAtt(name) {
      switch (name) {
        case "添加":
          this.$bus.$emit("add");
          break;
        case "搜索":
          this.$bus.$emit("goSearch", this.searchInfo);
          break;
        case "重置":
          {
            this.searchInfo = [];
          }
          // this.$bus.$emit("reset");
          break;
        case "确定":
          {
            getCompanyList(this.searchInfo[0]).then((res) => {
              // this.searchInfo[0]=res.data.res[0].id
              this.$bus.$emit("determine", {
                info: this.searchInfo,
                id: this.selectId,
                info0: res.data.res[0].id,
              });
            });
          }
          break;
        case "选择产品":
          this.$bus.$emit("select");
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.com {
  height: 100%;
  display: flex;
  .el-autocomplete {
    flex: 1;
  }
  div {
    height: 100%;
    input {
      height: 100%;
      border-radius: 0 4px 4px 0;
      width: 100%;
    }
  }
}
.title {
  // background-color: #fafafa;
  // margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
  &__left {
    display: flex;
    // flex-direction: column;
    // align-items: flex-end;
    flex-wrap: wrap;
    min-width: 1080px;
    margin-right: 200px;

    .search {
      flex-direction: column;
      flex-wrap: wrap;

      box-sizing: border-box;
      max-width: 1080px;
      max-height: 84px;
      //   background-color: red;
      display: flex;
      flex-wrap: wrap;
      // padding: 5px 0;
      .input {
        position: relative;
        box-sizing: border-box;
        width: 350px;
        // flex:1;
        // height: 60px;
        // background-color: pink;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 2px;
        height: 32px;
        margin: 5px;
        // margin: 0 2px;
        // div:first-child {
        //   position: absolute;
        //   font-size: 14px;
        // }
        & > div {
          position: relative;
          span {
            position: absolute;
            height: calc(100%-2px);
            line-height: 26px;
            z-index: 1;
            font-size: 14px;
            // color:#c0c4cc;
            padding-left: 2px;
            top: 1px;
            left: 1px;
            border-radius: 3px 0 0 3px;
            box-sizing: border-box;
            padding: 1px;
            // border:1px solid #dcdfe6;
            // transform: translateY(-50%);
            border-right: 1px solid #dcdfe6;
          }
        }
        .input-el {
          // display: flex;
          // align-items: center;
          & > div {
            font-size: 14px;
            line-height: 28px;
            width: none;
            padding: 0 0 0 10px;
          }
          input {
            height: 30px;
            width: none !important;
          }
          .el-input__icon {
            line-height: 30px;
          }
        }
      }
    }
  }
  &__right {
    // width: 264px;

    .button {
      box-sizing: border-box;
      max-width: 264px;
      max-height: 84px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex-wrap: wrap-reverse;
      .el-button {
        margin: 5px;
        width: 78px;
        height: 30px;
      }
    }
  }
}
.flexcol {
  flex-direction: row !important;
}
</style>
