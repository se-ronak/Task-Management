<template>
  <v-container fluid>
    <v-row justify="center" class="mb-3">
      <v-col cols="12">
        <v-card class="teal darken-4 text-center white--text">
          <v-card-text>
            <h2 class="white--text headline mb-0">
              Task List ({{ tasks.length }})
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="pa-3" outlined>
      <v-row justify="end" align="center">
        <v-col cols="12">
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn icon @click="refreshTasks" class="mt-1">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-model="quickFilterText"
                label="Search"
                outlined
                dense
                class="ag-theme-alpine"
              ></v-text-field>
            </v-col>
          </v-row>
          <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :rowData="tasks"
            :quickFilterText="quickFilterText"
            @grid-ready="onGridReady"
            :overlayLoadingTemplate="overlayLoadingTemplate"
            :overlayNoRowsTemplate="overlayNoRowsTemplate"
          ></ag-grid-vue>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridDeleteTaskButtonCellRenderer } from "../services/agGridDeleteTaskButtonCellRenderer";
import { AgGridUpdateTaskCellRenderer } from "../services/agGridUpdateTaskCellRenderer";

export default {
  name: "TaskList",
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.fetchTasks();
  },
  data() {
    return {
      columnDefs: [
        { headerName: "Title", field: "title", sortable: true, filter: true },
        {
          headerName: "Description",
          field: "description",
          sortable: true,
          filter: true,
        },
        { headerName: "Status", field: "status", sortable: true, filter: true },
        {
          headerName: "Update Task",
          cellRenderer: AgGridUpdateTaskCellRenderer,
          cellRendererParams: {
            updateTaskStatus: this.updateTaskStatus,
          },
          sortable: false,
        },
        {
          headerName: "Delete Task",
          cellRenderer: AgGridDeleteTaskButtonCellRenderer,
          cellRendererParams: {
            deleteTask: this.deleteTask,
            buttonTitle: "Delete Task",
          },
          sortable: false,
          cellStyle: { textAlign: "center" },
        },
      ],
      quickFilterText: "",
      overlayLoadingTemplate:
        '<div class="ag-overlay-loading-center">Loading...</div>',
      overlayNoRowsTemplate:
        '<div class="ag-overlay-loading-center">No data available</div>',
      gridApi: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    async fetchTasks() {
      try {
        this.showGridLoader(true);
        await this.$store.dispatch("fetchTasks");
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.showGridLoader(false);
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    },
    async updateTaskStatus(task) {
      try {
        this.showGridLoader(true);
        await this.$store.dispatch("updateTask", task);
        this.refreshTasks();
      } catch (error) {
        console.error("Error updating task status:", error);
      } finally {
        this.showGridLoader(false);
      }
    },
    async deleteTask(taskId) {
      try {
        this.showGridLoader(true);
        await this.$store.dispatch("deleteTask", taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        this.showGridLoader(false);
      }
    },
    refreshTasks() {
      this.fetchTasks();
    },
    showGridLoader(show) {
      if (show) {
        this.gridApi?.showLoadingOverlay();
      } else {
        this.gridApi?.hideOverlay();
      }
    },
  },
};
</script>

<style scoped>
.ag-overlay-loading-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.centered-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
