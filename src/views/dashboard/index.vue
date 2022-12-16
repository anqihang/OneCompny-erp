<template>
  <div class="dashboard-container main">
    <div id="sort">
      <!-- <Echart @showBigE="showBig(1)" @closeE="close('a')" :show="show.a"></Echart> -->
      <!-- <div v-show="show.a" class="s">
        <div class="di" id="sharePie" @click="showBig(1)"></div>
        <div class="close" @click="close('a')">
          <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
        </div>
      </div> -->
      <!-- <div v-show="show.b" class="s">
        <div class="di" id="shareBar" @click="showBig(2)"></div>
        <div class="close" @click="close('b')">
          <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
        </div>
      </div>
      <div v-show="show.c" class="s">
        <div class="di">3</div>
        <div class="close" @click="close('c')">
          <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
        </div>
      </div>
      <div v-show="show.aa" class="s">
        <div class="di">4</div>
        <div class="close" @click="close('aa')">
          <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
        </div>
      </div>
      <div v-show="show.bb" class="s">
        <div class="di">5</div>
        <div class="close" @click="close('bb')">
          <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
        </div>
      </div>
      <div v-show="show.cc" class="s">
        <div class="di">6</div>
        <div class="close" @click="close('cc')">
          <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
        </div>
      </div> -->
      <div v-if="allShow" id="add">
        <div style="display: flex; align-items: center">
          <el-image
            @click="showInput(0)"
            style="width: 45px; height: 45px; cursor: pointer"
            :src="require('@/assets/jia.png')"
            :fit="'fit'"
          ></el-image>
          <!-- <svg
            @click="showInput(0)"
            class="icon"
            aria-hidden="true"
            style="
              height: 45px;
              font-size: 40px;
              vertical-align: top;
              cursor: pointer;
            "
          >
            <use xlink:href="#icon-add2-copy"></use>
          </svg> -->
          <el-select v-model="select" v-if="addShow" @change="hiddenInput()">
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <el-dialog
      id="dialog"
      :visible.sync="visibleDiolog"
      width="80%"
      :destroy-on-close="true"
    >
      <div style="min-height: 80vh" id="show"></div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import { normalize } from "path";
import { sharePie, shareBar } from "@/api/table.js";
import Sortable from "sortablejs";
import { Icon } from "element-ui";
import Echart from "@/components/Echart/Echart.vue";
import Vue from "vue";

export default {
  name: "Dashboard",
  components: {
    Echart,
  },
  computed: {
    ...mapGetters(["name"]),
    allShow() {
      let a = false;
      for (const index in this.show) {
        if (this.show[index] == false) {
          a = true;
        }
      }
      return a;
    },
  },
  created() {},
  data() {
    return {
      list1: [],
      list2: {
        name: [],
        value: [],
      },
      visibleDiolog: false,
      select: null,
      list: [
        { id: "a", name: "客户订单数" },
        { id: "b", name: "客户订单额" },
        { id: "c", name: "每月订单额" },
        { id: "aa", name: "每月订单额状态" },
        { id: "bb", name: "订单出货数" },
        { id: "cc", name: "订单额状态" },
      ],
      show: {
        a: false,
        b: false,
        c: false,
        aa: false,
        bb: false,
        cc: false,
      },
      addShow: false,
    };
  },
  mounted() {
    // this.f();
    // this.s();
    this.$bus.$on("closeE", this.close);
    this.$bus.$on("showBigE", this.showBig);
    //拖拽排序
    let sort = document.querySelector("#sort");
    var sortable = new Sortable(sort, {
      animation: 150,
    });
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  updated() {
    // this.chart.resize();
    // let sharePie = echarts.init(document.getElementById("sharePie"));
    // sharePie.resize();
    // let shareBar = echarts.init(document.getElementById("shareBar"));
    // shareBar.resize();
  },
  methods: {
    close(index) {
      this.show[index] = false;
      let add = document.querySelector('#add');
      let mo = document.querySelector(`#${index}`);
      let sort = document.getElementById('sort');
      sort.insertBefore(mo,add);
    },
    showInput(index) {
      this.addShow = !this.addShow;
    },
    hiddenInput() {
      this.show[this.select] = true;
      let se = this.select;
      // this.show[a] = true;
      this.addShow = false;
      this.select = null;
      // let sort = document.querySelector('#sort');
      let add = document.querySelector("#add");
      let sort = document.querySelector("#sort");
      // add.insertAdjacentElement('beforebegin',Echart);
      let showE = this.show;
      let ok = true;
      for (const index of sort.children) {
        if (index.classList[1] == se) {
          ok = false;
        }
      }
      if (ok) {
        let instance = Vue.extend({
          render: (h) =>
            h(Echart, {
              props: {
                show: showE,
                id: se,
              },
            }),
        });
        //在文档外渲染随后挂载
        let t = new instance().$mount();
        add.insertAdjacentElement("beforebegin", t.$el);
      }
      switch (se) {
        case "a":
          {
            this.f();
          }
          break;
        case "b":
          this.s();
          break;
      }
    },
    showBig(index) {
      this.visibleDiolog = true;
      switch (index) {
        case "a":
          this.f("show");
          break;
        case "b":
          this.s("show");
          break;
      }
    },
    f(t) {
      this.list1 = [];
      sharePie().then((res) => {
        for (const iterator of res.data.res) {
          let obj = {};
          obj.name = iterator.company_name;
          obj.value = iterator.order_amount;
          this.list1.push(obj);
        }
        let target = t || "sharePie";
        let sharePie = echarts.init(document.getElementById(target));
        let sharePieOption = {
          title: {
            id: "sharePie",
            text: "客户订单数占比图",
            textStyle: {
              color: "#333",
              fontStyle: "normal",
            },
            left: 10,
            top: 10,
          },
          // grid: {
          //   // top: 100,
          //   // right: 100,
          //   bottom: 0,
          //   // left: 20,
          //   // containLabel: true,
          //   // width: "auto",
          // },
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            enterable: true,
          },
          series: [
            {
              type: "pie",
              // name:'sharePie',
              top: 20,
              selectedMode: true,
              label: {
                show: true,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: 14,
                alignTo: "labelLine",
                formatter: "{b}-{c}",
              },
              data: JSON.parse(JSON.stringify(this.list1)),
            },
          ],
        };
        sharePie.setOption(sharePieOption);
      });
    },
    s(t) {
      this.list2.value = [];
      this.list2.name = [];
      shareBar().then((res) => {
        for (const iterator of res.data.res) {
          this.list2.name.push(iterator.company_nickname);
          this.list2.value.push(parseInt(iterator.order_total_amount));
        }
        let target = t || "shareBar";
        let shareBar = echarts.init(document.getElementById(target));
        let shareBarOption = {
          title: {
            text: "客户订单额图",
            textStyle: {
              color: "#333",
              fontStyle: "normal",
            },
            left: "center",
            top: 10,
          },
          legend: {
            // type:'scroll',
            // right:10,
            // top:10
          },
          grid: {
            top: 80,
            right: 100,
            bottom: 10,
            left: 30,
            containLabel: true,
            width: "auto",
          },
          dataZoom: [
            {
              type: "inside",
              start: 0,
              end: 100,
            },
          ],
          xAxis: {
            // show:false,
            name: "客户名称",
            type: "category",
            axisTick: {
              show: false,
            },
            data: this.list2.name,
          },
          yAxis: {
            name: "订单额",
            type: "value",
            minInterval: 1,
          },
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            enterable: true,
          },
          series: [
            {
              type: "bar",
              colorBy: "data",
              label: {
                show: true,
                position: "top",
                formatter: "{c}",
              },
              data: this.list2.value,
              barMaxWidth: 40,
            },
          ],
        };
        shareBar.setOption(shareBarOption);
      });
    },
  },
};
</script>

<style lang="scss">
.main {
  // position: absolute;
  // top: 0;
  // bottom: 0;
  @mixin grid {
    min-height: 876px !important;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    // display: flex;
    // flex-direction: column;
    overflow: auto !important;
    display: grid;
    // grid: repeat(3, 1fr) / repeat(2, 1fr);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-areas:
      "a b"
      "c aa"
      "bb cc";
  }
  #sort {
    @include grid;
    & > .s {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
      margin: 5px;
      position: relative;
      padding: 0 auto;
      & > .di {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        // margin: 5px;
        // position: relative;
        // box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 30px;
        width: 30px;
        cursor: pointer;
      }
    }
  }
  #input {
    @include grid;
    position: absolute;
    top: 0;
  }
}
#dialog {
  display: flex;
  align-items: center;
  .el-dialog {
    margin: 0 auto !important;
  }
}
.clo {
  width: 100%;
  height: 100%;
}
.b {
  // grid-area: b;
}
</style>
