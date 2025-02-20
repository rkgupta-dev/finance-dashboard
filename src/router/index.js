import Vue from "vue";
import VueRouter from "vue-router";

// Import Views
import HomeView from "@/views/HomeView.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import TransactionsView from "@/views/TransactionsView.vue";
import AnalyticsView from "@/views/AnalyticsView.vue";
import OrganizationView from "@/views/OrganizationView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import InvoicesView from "@/views/InvoicesView.vue";
import LoginSignup from "@/views/LoginSignup.vue";
import PaymentView from "@/views/PaymentView.vue";
import MembersView from "@/views/MembersView.vue";
import SettingsView from "@/views/SettingsView.vue";
import HelpView from "@/views/HelpView.vue";
import PageNotFound from "@/components/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/dashboard", name: "dashboard", component: DashboardLayout },
  { path: "/transactions", name: "transactions", component: TransactionsView },
  { path: "/analytics", name: "analytics", component: AnalyticsView },
  { path: "/organization", name: "organization", component: OrganizationView },
  { path: "/projects", name: "projects", component: ProjectsView },
  { path: "/invoices", name: "invoices", component: InvoicesView },
  { path: "/login", name: "login", component: LoginSignup },
  { path: "/payments", name: "payments", component: PaymentView },
  { path: "/members", name: "members", component: MembersView },
  { path: "/settings", name: "settings", component: SettingsView },
  { path: "/help", name: "help", component: HelpView },

  // Catch-all route for 404 Page
  { path: "*", name: "notfound", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }; // Always scroll to the top on route change
  },
});

export default router;
