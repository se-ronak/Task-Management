<template>
  <v-btn color="error" small @click="handleClick"> Delete Task </v-btn>
</template>

<script>
export default {
  name: "DeleteTaskButton",
  methods: {
    handleClick() {
      this.$emit("delete-task");
    },
  },
};
</script>
