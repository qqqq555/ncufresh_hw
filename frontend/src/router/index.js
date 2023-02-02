import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import MyPost from "@/views/MyPost.vue";
import LogIn from "@/views/LogIn.vue";
import Test from '../views/Test.vue'

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
