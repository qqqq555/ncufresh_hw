import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import MyPost from "@/views/MyPost.vue";
import LogIn from "@/views/LogIn.vue";
import Test from '../views/Test.vue'
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/mypost",
      name: "MyPost",
      component: MyPost,
      beforeEnter: (to, from, next) => {
        if (Cookies.get("jwt")) {
          next();
        } else {
          alert("登入後才能使用此功能");
          next("/");
        }
      },
    },
    {
      path: "/login",
      name: "LogIn",
      component: LogIn,
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
    }
  ],
});

export default router;
