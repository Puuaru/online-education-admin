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
        meta: {
          title: "Dashboard",
          icon: "dashboard",
        },
      },
    ],
  },

  {
    path: "/teacher",
    component: Layout,
    redirect: "/teacher/list",
    name: "讲师管理",
    meta: {
      title: "讲师管理",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "list",
        name: "讲师列表",
        component: () => import("@/views/edu/teacher/list"),
        meta: {
          title: "讲师列表",
          icon: "table",
        },
      },
      {
        path: "save",
        name: "添加讲师",
        component: () => import("@/views/edu/teacher/save"),
        meta: {
          title: "添加讲师",
          icon: "form",
        },
      },
      {
        path: "edit/:id",
        name: "更新讲师",
        component: () => import("@/views/edu/teacher/save"),
        meta: {
          title: "更新讲师",
          noCache: true,
        },
        hidden: true,
      },
    ],
  },

  {
    path: "/subject",
    component: Layout,
    redirect: "/subject/list",
    name: "课程分类管理",
    meta: {
      title: "课程分类管理",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "list",
        name: "课程分类列表",
        component: () => import("@/views/edu/subject/list"),
        meta: {
          title: "课程分类列表",
          icon: "tree",
        },
      },
      {
        path: "save",
        name: "添加课程分类",
        component: () => import("@/views/edu/subject/save"),
        meta: {
          title: "添加课程分类",
          icon: "form",
        },
      },
    ],
  },

  {
    path: "/course",
    component: Layout,
    redirect: "/course/list",
    name: "课程管理",
    meta: {
      title: "课程管理",
      icon: "nested",
    },
    children: [
      {
        path: "list",
        name: "课程列表",
        component: () => import("@/views/edu/course/list"),
        meta: {
          title: "课程列表",
          icon: "table",
        },
      },
      {
        path: "info",
        name: "添加课程基本信息",
        component: () => import("@/views/edu/course/info"),
        meta: {
          title: "添加课程基本信息",
          icon: "form",
          noCache: true,
        },
      },
      {
        path: "info/:id",
        name: "修改课程基本信息",
        component: () => import("@/views/edu/course/info"),
        meta: {
          title: "修改课程基本信息",
          icon: "form",
          noCache: true,
        },
        hidden: true,
      },
      {
        path: "chapter/:id",
        name: "编辑课程大纲",
        component: () => import("@/views/edu/course/chapter"),
        meta: {
          title: "编辑课程大纲",
          icon: "form",
          noCache: true,
        },
        hidden: true,
      },
      {
        path: "publish/:id",
        name: "发布课程",
        component: () => import("@/views/edu/course/publish"),
        meta: {
          title: "发布课程",
          icon: "form",
          noCache: true,
        },
        hidden: true,
      },
    ],
  },

  {
    path: "/acl",
    component: Layout,
    name: "管理菜单",
    meta: {
      title: "管理菜单",
      icon: "password",
    },
    children: [
      {
        path: "/permission/list",
        name: "权限管理",
        component: () => import("@/views/acl/permission/list"),
        meta: {
          title: "权限管理",
          icon: "password"
        },
      },
      {
        path: "user",
        name: "用户管理",
        meta: {
          title: "用户管理",
          icon: "user"
        },
      },
      {
        path: "/role/list",
        name: "角色管理",
        component: () => import("@/views/acl/role/list"),
        meta: {
          title: "角色管理",
          icon: "user"
        },
      },
      {
        path: "/role/perm-manager/:id",
        name: "角色权限管理",
        component: () => import("@/views/acl/role/permManager"),
        meta: {
          title: "角色权限管理",
          icon: "user"
        },
        hidden: true
      },
    ],
  },

  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: {
          title: "Form",
          icon: "form",
        },
      },
    ],
  },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: {
          title: "Menu1",
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: {
              title: "Menu1-1",
            },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: {
              title: "Menu1-2",
            },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: {
                  title: "Menu1-2-1",
                },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: {
                  title: "Menu1-2-2",
                },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: {
              title: "Menu1-3",
            },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        meta: {
          title: "menu2",
        },
      },
    ],
  },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: {
          title: "External Link",
          icon: "link",
        },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

export const asyncRoutes = [];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
