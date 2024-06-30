import Vue from "vue";
import DeleteButton from "../components/DeleteTaskButton.vue";

class AgGridDeleteTaskButtonCellRenderer {
  init(params) {
    this.eGui = document.createElement("div");

    const DeleteButtonComponent = Vue.extend(DeleteButton);
    this.vueComponent = new DeleteButtonComponent({
      propsData: {
        buttonTitle: params.buttonTitle,
      },
    });

    this.vueComponent.$mount();
    this.eGui.appendChild(this.vueComponent.$el);

    this.vueComponent.$on("delete-task", () => {
      params.deleteTask(params.node.data._id);
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

export { AgGridDeleteTaskButtonCellRenderer };
