import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import MyPost from "@/views/MyPost.vue";
import LogIn from "@/views/LogIn.vue";

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
  ],
});

export default router;
