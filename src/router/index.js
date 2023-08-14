import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ActionsView from "../views/ActionsView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/actions",
    name: "Actions",
    component: ActionsView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
