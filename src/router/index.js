import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "看板", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    redirect: "/product/production",
    name: "Product",
    meta: { title: "", icon: "el-icon-s-help" },
    children:[
      {
        path: "production",
        name: "Production",
        component: () => import("@/views/production/index"),
        meta: { title: "产品管理", icon: "table" },
      },
    ]
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order/orders",
    name: "Order",
    meta: { title: "", icon: "el-icon-s-help" },
    children: [
      //#region
      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: 'Table', icon: 'table' }
      // },
      //#endregion
      {
        path: "orders",
        name: "Orders",
        component: () => import("@/views/orders/index"),
        meta: { title: "订单管理", icon: "table" },
      },
      //#region
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
      //#endregion
    ],
  },
  
  //#region
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //#endregion

  {
    path: "/depot",
    component: Layout,
    redirect: "/depot/depotHistory",
    name: "Depot",
    meta: {
      title: "库存管理",
      icon: "nested",
    },
    children: [
      {
        path: "inDepot",
        component: () => import("@/views/depot/depotHistory/index"), // Parent router-view
        name: "InDepot",
        meta: { title: "入库管理" },
        //#region
        // children: [
        //   {
        //     path: 'menu1-1',
        //     component: () => import('@/views/nested/menu1/menu1-1'),
        //     name: 'Menu1-1',
        //     meta: { title: 'Menu1-1' }
        //   },
        //   {
        //     path: 'menu1-2',
        //     component: () => import('@/views/nested/menu1/menu1-2'),
        //     name: 'Menu1-2',
        //     meta: { title: 'Menu1-2' },
        //     children: [
        //       {
        //         path: 'menu1-2-1',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        //         name: 'Menu1-2-1',
        //         meta: { title: 'Menu1-2-1' }
        //       },
        //       {
        //         path: 'menu1-2-2',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        //         name: 'Menu1-2-2',
        //         meta: { title: 'Menu1-2-2' }
        //       }
        //     ]
        //   },
        //   {
        //     path: 'menu1-3',
        //     component: () => import('@/views/nested/menu1/menu1-3'),
        //     name: 'Menu1-3',
        //     meta: { title: 'Menu1-3' }
        //   }
        // ]
        //#endregion
      },
      {
        path: "outDepot",
        component: () => import("@/views/depot/outDepot/index"),
        name: "OutDepot",
        meta: { title: "出库管理" },
      },
    ],
  },
  //#region
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  //#endregion
  {
    path: "/pay",
    component: Layout,
    redirect: "/pay/payments",
    name: "Pay",
    meta: { title: "", icon: "el-icon-s-help" },
    children: [
      {
        path: "payments",
        name: "Payments",
        component: () => import("@/views/payments/index"),
        meta: { title: "结款管理", icon: "table" },
      },
    ],
  },
  {
    path: "/information",
    component: Layout,
    redirect: "/information/production",
    name: "Information",
    meta: {
      title: "信息管理",
      icon: "nested",
    },
    children: [
      //#region
      // {
      //   path: "production",
      //   component: () => import("@/views/information/production/index"), // Parent router-view
      //   name: "Production",
      //   meta: { title: "产品信息管理" },
      // },
      //#endregion
      {
        path: "client",
        component: () => import("@/views/information/client/index"),
        name: "Client",
        meta: { title: "客户信息管理" },
      },
    ],
  },
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/role",
    name: "Permission",
    meta: {
      title: "权限管理",
      icon: "nested",
    },
    children: [
      {
        path: "role",
        component: () => import("@/views/permission/role/index"), // Parent router-view
        name: "Role",
        meta: { title: "角色管理" },
      },
      {
        path: "user",
        component: () => import("@/views/permission/user/index"), // Parent router-view
        name: "User",
        meta: { title: "用户管理" },
      }, 
      {
        path: "per",
        component: () => import("@/views/permission/permi/index"), // Parent router-view
        name: "Per",
        meta: { title: "权限控制" },
      }     
    ],
  },
  //
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
