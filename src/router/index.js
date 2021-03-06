import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        pageTitle: "Home",
        breadcrumb: [
          {
            text: "Home",
            active: true,
          },
        ],
      },
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/Categories.vue"),
      meta: {
        pageTitle: "Manage Categories",
        breadcrumb: [
          {
            text: "Categories",
            active: true,
          },
        ],
      },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/Products.vue"),
      meta: {
        pageTitle: "Manage Products",
        breadcrumb: [
          {
            text: "Products",
            active: true,
          },
        ],
      },
    },
    {
      path: "/dogs-page",
      name: "dogs-page",
      component: () => import("@/views/Dogs.vue"),
      meta: {
        pageTitle: "Dogs 🐶",
        breadcrumb: [
          {
            text: "Dogs",
            active: true,
          },
        ],
      },
    },
    {
      path: "/cats-page",
      name: "cats-page",
      component: () => import("@/views/Cats.vue"),
      meta: {
        pageTitle: "Cats",
        breadcrumb: [
          {
            text: "Cats",
            active: true,
          },
        ],
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

export default router;
