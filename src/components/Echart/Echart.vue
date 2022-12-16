<template>
  <div class="s" v-show="show[id]" :class="id" :id="id">
    <div  class="di" :id="list[id]" @click="showBig(id)"></div>
    <div class="close" @click="close(id)">
      <el-image
            style="width: 30px; height: 30px"
            :src="require('@/assets/cha.png')"
            :fit="'fit'"
          ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: "Echart",
  props: ['show','id'],
  mounted() {
    // console.log(this.show);
  },
  data(){
    return {
      list:{
        'a':'sharePie',
        'b':'shareBar'
      }
    }
  },
  methods: {
    showBig(id) {
      this.$bus.$emit("showBigE",id);
    },
    close(id) {
      this.$bus.$emit("closeE",id);
    },
  },
};
</script>

<style></style>
