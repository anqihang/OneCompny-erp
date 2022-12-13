<template>
  <div class="print">
    <div class="t0">
      <div style="font-size: 20px; margin-bottom: 5px">
        东莞市同宇电子科技有限公司
      </div>
      <div class="inf" style="font-size: 10px; transform: translateX(30px)">
        <div style="font-family: SimSun; transform: scale(0.8)">
          电话：18925847662
        </div>
        <div style="margin: 0 0px; transform: scale(0.8)">
          传真：0769-82862871
        </div>
        <div style="transform: scale(0.8) translateX(-30px)">
          地址：东莞市塘厦镇林村鲤牙塘工业区106号A栋四楼402室（富佳工业园）
        </div>
      </div>
      <div style="font-size: 20px; margin: 7px 0 0">送货单</div>
    </div>
    <div class="t1">
      <div>
        <div>客户名称:{{ printInfo.company_name || "" }}</div>
        <div>送货单号:{{ out_number }}</div>
      </div>
      <div>
        <div>客户地址:{{ printInfo.address }}</div>
        <div style="display: flex">
          <div
            style="width: 55px; display: flex; justify-content: space-between"
          >
            <div style="padding: 0">日</div>
            <div style="padding: 0; text-align: end">期:</div>
          </div>
          <div>
            <!-- {{new Date().toLocaleString()}} -->
            {{ create_time }}
          </div>
        </div>
      </div>
    </div>
    <div class="t2">
      <table>
        <tbody>
          <tr>
            <th scope="col" style="width: 50px">序号</th>
            <th style="width: 160px">订单编号</th>
            <th style="width: 170px">物料编号</th>
            <th style="width: 220px">物料名称</th>
            <th style="width: 130px">规格型号</th>
            <th style="width: 100px">订单数量</th>
            <th style="width: 50px">单位</th>
            <th style="width: 100px">交货数量</th>
            <th style="width: 100px">累交数量</th>
            <th scope="col" style="width: 150px">备注</th>
          </tr>
          <!-- <tr v-for="(item, index1) in printInfo.order_infos" :key="index1">
            <td>{{ index1 + 1 }}</td>
            <td>{{ outInfo.order_number }}</td>
            <td>{{ item.product_code }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_specs }}</td>
            <td>{{  }}</td>
            <td></td>
            <td>{{ item.outblound_infos[index].number }}</td>
            <td>{{ item.out_total }}</td>
            <td>{{ item.outblound_infos[index].remarks }}</td>
          </tr> -->
          <tr v-for="(item, index1) in printInfo.order_infos" :key="index1">
            <td>{{ index1 + 1 }}</td>
            <td>{{ outInfo.order_number }}</td>
            <td>{{ item.product_code }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_specs }}</td>
            <td>{{ outInfo.order_infos[index1].number }}</td>
            <td></td>
            <td>{{ item.outblound_infos[index]?item.outblound_infos[index].number:0 }}</td>
            <td>{{ item.out_total }}</td>
            <td>{{ item.outblound_infos[index]?item.outblound_infos[index].remarks:'' }}</td>
          </tr>
          <tr v-if="!(printInfo.order_infos.length == 2)">
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-if="!(printInfo.order_infos.length == 3)">
            <td>3</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-if="!(printInfo.order_infos.length == 4)">
            <td>4</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-if="!(printInfo.order_infos.length == 5)">
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-if="!(printInfo.order_infos.length == 6)">
            <td>6</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="9">
              <div style="display: flex">
                <div style="width: 70%; text-align: start">
                  合计金额(大写):{{ valueU }}
                </div>
                <div style="">合计金额(小写):{{ valueL }}</div>
              </div>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="t3">
      <div style="width: 20%">制单人：</div>
      <div style="width: 50%">递货单位/经手人：</div>
      <div style="width: 30%">收货单位/收货人(盖章):</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Print",
  data() {
    return {};
  },
  props: {
    printInfo: {
      type: Object,
    },
    outInfo: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  computed: {
    out_number() {
      for (const iterator of this.printInfo.order_infos) {
        if (iterator.outblound_infos[this.index]) {
          return iterator.outblound_infos[this.index].out_number;
        }
      }
    },
    create_time() {
      for (const iterator of this.printInfo.order_infos) {
        if (iterator.outblound_infos[this.index]) {
          return iterator.outblound_infos[this.index].create_time;
        }
      }
    },
    valueL() {
      let value = 0;
      for (const iterator of this.printInfo.order_infos) {
        // value+=iterator.price+
        if (iterator.outblound_infos[this.index]) {
          value +=
            iterator.price * iterator.outblound_infos[this.index].number ;
        }
      }
      function NumFormat(value) {
        return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return NumFormat(value);
      // return NumFormat(123456.789);
    },
    valueU() {
      let value = 0;
      for (const iterator of this.printInfo.order_infos) {
        // value+=iterator.price+
        if (iterator.outblound_infos[this.index]) {
          value += iterator.price * iterator.outblound_infos[this.index].number;
        }
      }
      return this.numberToChinese(value);
    },
  },
  methods: {
    numberToChinese(n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        return "数据非法"; //判断数据是否大于0
      }

      var unit = "千百拾亿千百拾万千百拾元角分",
        str = "";
      n += "00";

      var indexpoint = n.indexOf("."); // 如果是小数，截取小数点前面的位数

      if (indexpoint >= 0) {
        n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
      }

      unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
      for (var i = 0; i < n.length; i++) {
        str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i); //遍历转化为大写的数字
      }

      return str
        .replace(/零(千|百|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万|壹(拾)/g, "$1$2")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果
    },
  },
};
</script>

<style lang="scss">
@page {
  margin-bottom: 1mm;
  margin-top: 1mm;
}
.print {
  font-family: SimSun;
  width: 700px;
  //   height: 500px;
  background-color: white;
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2000;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 10px 0;
  .t0 {
    width: 100%;
    font-family: SimSun;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    .inf {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 6px;
    }
  }
  .t1 {
    font-size: 12px;
    font-family: "Courier New", Courier, monospace;
    width: 100%;
    padding: 0 5px;
    display: flex;
    flex-wrap: wrap;
    & > div:first-child {
      width: 70%;
      div {
        margin: 5px 0 0;
      }
    }
    & > div:nth-child(2) {
      width: 30%;
      & > div {
        padding: 5px 0 0;
      }
    }
  }
  .t2 {
    font-family: "Courier New", Courier, monospace;
    width: 100%;
    table {
      margin: 0 auto;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0px;

      td,
      th {
        font-family: SimSun, Courier, monospace;
        font-weight: 400;
        font-size: 12px;
        text-align: center;
        border: 1px solid black;
        height: 30px;
      }
      tfoot {
        td {
          height: unset;
          padding: 5px 0;
        }
      }
    }
  }
  .t3 {
    font-family: "Courier New", Courier, monospace;
    margin-top: 40px;
    display: flex;
    width: 100%;
    div {
      font-size: 12px;
    }
  }
}
</style>
