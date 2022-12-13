<template>
  <div class="dashboard-container main">
    <div id="input">
      <div>
        <div style="display: flex;align-items: center;" v-if="!show.a">
          <svg
            @click="showInput(0)"
            class="icon"
            aria-hidden="true"
            style="height: 45px; font-size: 40px; vertical-align: top;cursor: pointer;"
          >
            <use xlink:href="#icon-jiahao-copy"></use>
          </svg>
          <el-select v-model="select" v-if="addShow[0]" @change="hiddenInput('a',0)">
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>        
      </div>
      <div>
        <div style="display: flex;align-items: center;" v-if="!show.b">
          <svg
            @click="showInput(1)"
            class="icon"
            aria-hidden="true"
            style="height: 45px; font-size: 40px; vertical-align: top;cursor: pointer;"
          >
            <use xlink:href="#icon-jiahao-copy"></use>
          </svg>
          <el-select v-model="select" v-if="addShow[1]" @change="hiddenInput('b',1)">
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
    <div id="sort">
      <div v-show="show.a" class="di" id="sharePie" @click="showBig(1)"></div>
      <div v-show="show.b" class="di" id="shareBar" @click="showBig(2)"></div>
      <div v-show="show.c" class="di">3</div>
      <div v-show="show.aa" class="di">4</div>
      <div v-show="show.bb" class="di">5</div>
      <div v-show="show.cc" class="di">6</div>
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

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
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
        { id: 1, name: "客户订单数" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
      ],
      show: {
        a: false,
        b: false,
        c: false,
        aa: false,
        bb: false,
        cc: false,
      },
      addShow:{
        0:false,
        1:false
      }
    };
  },
  mounted() {
    this.f();
    this.s();
    //拖拽排序
    let sort = document.querySelector("#sort");
    var sortable = new Sortable(sort, {
      animation: 150,
    });
  },
  updated(){
    // this.chart.resize();
    let sharePie = echarts.init(document.getElementById('sharePie'));
    sharePie.resize();
    let shareBar = echarts.init(document.getElementById('shareBar'));
    shareBar.resize();
  },
  methods: {
    showInput(index){
      this.addShow[index] = !this.addShow[index];
    },
    hiddenInput(a,index){
      this.show[a] = true;
      this.addShow[index] =false;
      this.select=null
    },
    showBig(num) {
      this.visibleDiolog = true;
      switch (num) {
        case 1:
          this.f("show");
          break;
        case 2:
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
            left: 20,
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
  }
  #sort {
    @include grid;
    & > .di {
      margin: 5px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
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
</style>
