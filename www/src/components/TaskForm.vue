<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="teal darken-4 text-center white--text">
          <v-card-text>
            <h2 class="white--text headline mb-0">Add Task</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-form ref="form" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="form.title"
                :rules="[(v) => !!v || 'Title is required']"
                label="Title"
                outlined
                required
                dense
                class="mt-2"
              ></v-text-field>
              <v-text-field
                v-model="form.description"
                :rules="[(v) => !!v || 'Description is required']"
                label="Description"
                outlined
                dense
                class="mt-2"
              ></v-text-field>
              <v-select
                v-model="form.status"
                :items="statusOptions"
                :rules="[(v) => !!v || 'Status is required']"
                label="Status"
                outlined
                dense
                class="mt-2"
              ></v-select>
              <v-row justify="end">
                <v-col cols="auto">
                  <v-btn
                    color="teal darken-4"
                    class="white--text"
                    :disabled="!formIsValid"
                    type="submit"
                  >
                    Add Task
                  </v-btn>
                </v-col>
              </v-row>
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
  computed: {
    statusOptions() {
      return ["To Do", "In Progress", "Done"];
    },
    formIsValid() {
      return !!this.form.title && !!this.form.description && !!this.form.status;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.$refs.form.validate() && this.formIsValid) {
        await this.$store.dispatch("addTask", this.form);
        this.resetForm();
      }
    },
    resetForm() {
      this.form.title = "";
      this.form.description = "";
      this.form.status = "To Do";

      this.$nextTick(() => {
        this.$refs.form.resetValidation();
      });
    },
  },
};
</script>
