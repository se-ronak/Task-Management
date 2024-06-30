import Vue from "vue";
import VueRouter from "vue-router";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import DashboardView from "../components/DashboardView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", component: DashboardView },
  { path: "/task-form", component: TaskForm },
  { path: "/task-list", component: TaskList },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
