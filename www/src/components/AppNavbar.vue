<template>
  <v-navigation-drawer app permanent dark color="teal darken-4">
    <v-toolbar flat color="teal darken-4">
      <v-toolbar-title>Task Management</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppDrawer",
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-calendar", to: "/dashboard" },
        { title: "Add Task", icon: "mdi-plus-circle", to: "/task-form" },
        { title: "Task List", icon: "mdi-view-list", to: "/task-list" },
      ],
    };
  },
};
</script>
