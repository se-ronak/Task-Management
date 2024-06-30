import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const apiUrl = "http://localhost:3000/api";

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get(`${apiUrl}/tasks`);
        commit("setTasks", response.data);
      } catch (error) {
        Vue.$toast.error("Failed to fetch tasks.");
        console.error(error);
      }
    },
    async addTask({ commit }, task) {
      try {
        const response = await axios.post(`${apiUrl}/tasks`, task);
        commit("addTask", response.data);
        Vue.$toast.success("Task added successfully!");
      } catch (error) {
        Vue.$toast.error("Failed to add task.");
        console.error(error);
      }
    },
    async updateTask({ commit }, task) {
      try {
        const response = await axios.put(`${apiUrl}/tasks/${task._id}`, task);
        commit("updateTask", response.data);
        Vue.$toast.success("Task updated successfully!");
      } catch (error) {
        Vue.$toast.error("Failed to update task.");
        console.error(error);
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        await axios.delete(`${apiUrl}/tasks/${taskId}`);
        commit("deleteTask", taskId);
        Vue.$toast.success("Task deleted successfully!");
      } catch (error) {
        Vue.$toast.error("Failed to delete task.");
        console.error(error);
      }
    },
  },
  modules: {},
});
