<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="teal darken-4 text-center white--text">
          <v-card-text>
            <h2 class="white--text headline mb-0">Calendar</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-calendar
          color="teal darken-4"
          :value="currentDate"
          :type="type"
          :formats="calendarFormats"
          readonly
        ></v-calendar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      currentDate: new Date().toISOString().substr(0, 10),
      type: "month",
      calendarFormats: {
        title: "MMMM YYYY",
        weekdays: "W",
        navMonths: "MMM",
        input: ["L", "YYYY-MM-DD", "YYYY/MM/DD"],
        dayPopover: "L",
      },
    };
  },
};
</script>
