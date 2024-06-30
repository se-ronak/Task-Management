import Vue from "vue";
import Vuetify from "vuetify";
import UpdateTask from "../components/UpdateTask.vue";

const vuetify = new Vuetify();

class AgGridUpdateTaskCellRenderer {
  init(params) {
    this.eGui = document.createElement("div");

    const UpdateTaskComponent = Vue.extend(UpdateTask);
    this.vueComponent = new UpdateTaskComponent({
      vuetify,
      propsData: {
        task: params.node.data,
      },
    });

    this.vueComponent.$mount();
    this.eGui.appendChild(this.vueComponent.$el);

    this.vueComponent.$on("update-task-status", (updatedTask) => {
      params.updateTaskStatus(updatedTask);
    });
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return false;
  }

  destroy() {
    if (this.vueComponent) {
      this.vueComponent.$destroy();
    }
  }
}

export { AgGridUpdateTaskCellRenderer };
