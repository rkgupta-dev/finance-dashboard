import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import TransactionsView from "@/views/TransactionsView.vue";
import AnalyticsView from "@/views/AnalyticsView.vue";
import OrganizationView from "@/views/OrganizationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardLayout,
  },
  {
    path: "/transactions",
    name: "transactions",
    component: TransactionsView,
  },
  {
    path: "/analytics",
    name: "analytics",
    component: AnalyticsView,
  },
  {
    path: "/organization",
    name: "organization",
    component: OrganizationView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
