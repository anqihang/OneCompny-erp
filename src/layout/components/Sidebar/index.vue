<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { checkRouter } from "@/api/table";
import cloneDeep from "lodash/cloneDeep";

export default {
  components: { SidebarItem, Logo },
  mounted() {
    console.log("#", this.$router);
  },
  created() {
    let routes = cloneDeep(this.$router.options.routes);
    checkRouter().then((res) => {
      console.log("#", res.data.list);
      // let newO = [];
      // for (const iterator of res.data.list) {
      //   let obj = {};
      //   let b = iterator.route.split("/");
      //   obj.path = b[1];
      //   if (b[2]) {
      //     obj.children = [];
      //     obj.children.push(b[2]);
      //   } else if (iterator.children) {
      //     let arr = [];
      //     for (const iterator1 of iterator.children) {
      //       let b = iterator1.route.split("/");
      //       if (b[2]) arr.push(b[2]);
      //     }
      //     obj.children = arr;
      //   }
      //   newO.push(obj);
      // }
      //---
      let newR = [];
      for (const iterator of res.data.list) {
        let obj = {};
        obj.title = "";
        let b = iterator.route.split("/");
        obj.path = b[1];
        if (b[2]) {
          obj.children = [];
          obj.children.push({ path: b[2], title: iterator.menu_name });
        } else if (iterator.children) {
          obj.title = iterator.menu_name;
          let arr = [];
          for (const iterator1 of iterator.children) {
            let ar = {};
            let b = iterator1.route.split("/");
            if (b[2]) {
              // arr.push(b[2]);
              ar.path = b[2];
              ar.title = iterator1.menu_name;
            }
            arr.push(ar);
          }
          obj.children = arr;
        } else {
          obj.title = iterator.menu_name;
        }
        newR.push(obj);
      }
      console.log("@", newR);
      let newRe = [];
      for (const a of newR) {
        for (const iterator of routes) {
          if (iterator.path.includes(a.path)) {
            if (!a.children && a.title != "") {
              iterator.children.meta.title = a.title;
            } else {
              iterator.meta.title = a.title;
            }
            let f = cloneDeep(iterator);
            f.children = [];
            newRe.push(f);
            //
            if (a.children) {
              for (const b of a.children) {
                for (const iterator1 of iterator.children) {
                  if (iterator1.path.includes(b.path)) {
                    iterator1.meta.title = b.title;
                    f.children.push(iterator1);
                  }
                }
              }
            }
          }
        }
      }
      for (let index = 0; index < 3; index++) {
        newRe.unshift(routes[2 - index]);
      }
      newRe.push(routes[routes.length - 1]);
      newRe[2].children[0].meta.title = newR[0].title;
      console.log("@@", newRe);
      //---
      // console.log(newO);
      //
      // let newRoute = [];
      // for (const a of newO) {
      //   for (const iterator of routes) {
      //     if (iterator.path.includes(a.path)) {
      //       let f = cloneDeep(iterator);
      //       f.children = [];
      //       newRoute.push(f);
      //       //
      //       if (a.children) {
      //         for (const b of a.children) {
      //           for (const iterator1 of iterator.children) {
      //             if (iterator1.path.includes(b)) {
      //               f.children.push(iterator1);
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // for (let index = 0; index < 3; index++) {
      //   newRoute.unshift(routes[2 - index]);
      // }
      // newRoute.push(routes[routes.length - 1]);
      // console.log("##", newRoute, newRe);
      // this.router = newRoute;
      this.router = newRe;
    });
  },
  data() {
    return {
      router: [],
    };
  },
  // mounted() {
  //   this.$bus.$on("changeLogo", this.changeLogo);
  // },
  methods: {
    changeLogo(bo) {
      this.showLogo = !bo;
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      let routes = this.$router.options.routes;
      // checkRouter().then((res) => {
      //   console.log(this.$router.options.routes);
      //   let newO = [];
      //   for (const iterator of res.data.list) {
      //     let obj = {};
      //     let b = iterator.route.split("/");
      //     obj.path = b[1];
      //     if (b[2]) {
      //       obj.children = [];
      //       obj.children.push(b[2]);
      //     } else if (iterator.children) {
      //       let arr = [];
      //       for (const iterator1 of iterator.children) {
      //         let b = iterator1.route.split("/");
      //         if (b[2]) arr.push(b[2]);
      //       }
      //       obj.children = arr;
      //     }
      //     newO.push(obj);
      //   }
      //   console.log(newO);
      //   //
      //   let newRoute = [];
      //   for (const a of newO) {
      //     for (const iterator of routes) {
      //       if (iterator.path.includes(a.path)) {
      //         let f = cloneDeep(iterator);
      //         f.children = [];
      //         newRoute.push(f);
      //         //
      //         if (a.children) {
      //           for (const b of a.children) {
      //             for (const iterator1 of iterator.children) {
      //               if (iterator1.path.includes(b)) {
      //                 f.children.push(iterator1);
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      //   for (let index = 0; index < 3; index++) {
      //     newRoute.unshift(routes[2 - index]);
      //   }
      //   newRoute.push(routes[routes.length-1])
      //   // return newRoute;
      // });
      return this.router;
      // return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
