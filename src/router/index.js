import { createRouter, createWebHistory } from "vue-router";
import MainMenu from "@/components/MainMenu.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainMenu
    },
    {
      path: "/set/:setNumber",
      name: "set",
      component: () => import("@/views/SetView.vue")
    },
    {
      path:"/set/:setNumber/:cardCode",
      name: "card",
      component: () => import("@/views/CardView.vue")
    }
  ]
});

export default router;
