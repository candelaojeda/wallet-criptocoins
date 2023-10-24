import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ActionsView from "../views/ActionsView.vue";
import ActualStateView from "../views/ActualStateView.vue";
import HistoryView from "../views/HistoryView.vue";
import EditForm from "../components/EditForm";
import InvestmentsView from "../views/InvestmentsView.vue";

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
    path: "/current-state",
    name: "ActualState",
    component: ActualStateView,
  },
  {
    path: "/history",
    name: "History",
    component: HistoryView,
  },
  {
    path: "/edit",
    name: "EditForm",
    component: EditForm,
  },
  {
    path: "/investments",
    name: "Investments",
    component: InvestmentsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
