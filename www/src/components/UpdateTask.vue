<template>
  <v-row>
    <v-select
      :items="statusOptions"
      v-model="selectedStatus"
      density="compact"
    ></v-select>
  </v-row>
</template>

<script>
export default {
  name: "UpdateTask",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  watch: {
    selectedStatus(newStatus) {
      this.updateTaskStatus(newStatus);
    },
  },
  data() {
    return {
      selectedStatus: this.task.status,
      statusOptions: ["To Do", "In Progress", "Done"],
    };
  },
  methods: {
    updateTaskStatus(newStatus) {
      this.$emit("update-task-status", { ...this.task, status: newStatus });
    },
  },
};
</script>
