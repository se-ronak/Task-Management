import Vue from "vue";
import VueRouter from "vue-router";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/task-form" },
  { path: "/task-form", component: TaskForm },
  { path: "/task-list", component: TaskList },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
