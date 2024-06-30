<template>
  <v-container fluid class="my-container">
    <v-row>
      <v-col cols="12">
        <h2 class="primary--text">Add Task</h2>

        <v-card outlined>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="form.title"
                label="Title"
                outlined
                required
                dense
              ></v-text-field>
              <v-text-field
                v-model="form.description"
                label="Description"
                outlined
                dense
              ></v-text-field>
              <v-select
                v-model="form.status"
                :items="statusOptions"
                label="Status"
                outlined
                dense
              ></v-select>
              <v-btn color="primary" type="submit">Add Task</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      form: {
        title: "",
        description: "",
        status: "To Do",
      },
    };
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch("addTask", this.form);
      this.resetForm();
    },
    resetForm() {
      this.form.title = "";
      this.form.description = "";
      this.form.status = "To Do";
    },
  },
  computed: {
    statusOptions() {
      return ["To Do", "In Progress", "Done"];
    },
  },
};
</script>

<style scoped>
.my-container {
  background-color: #f0f0f0;
}
</style>
