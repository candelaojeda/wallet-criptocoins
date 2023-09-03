import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ActionsView from "../views/ActionsView.vue";
import ActualStateView from "../views/ActualStateView.vue";
import History from "../views/History.vue";
import EditForm from "../components/EditForm";

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
    path: "/actual-state",
    name: "ActualState",
    component: ActualStateView,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/edit",
    name: "EditForm",
    component: EditForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
