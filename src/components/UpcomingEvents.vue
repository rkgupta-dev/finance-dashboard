<template>
  <v-card>
    <v-card-title>
      Upcoming Events
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="event in events" :key="event.id" cols="12" sm="6" md="4">
          <v-card outlined>
            <v-card-title>
              <v-icon left :color="getIconColor(event.type)">{{
                getIcon(event.type)
              }}</v-icon>
              {{ event.title }}
            </v-card-title>
            <v-card-text>
              <p>{{ event.subtitle }}</p>
              <v-progress-linear
                :value="event.progress"
                :color="getProgressColor(event.progress)"
                height="10"
              ></v-progress-linear>
              <div class="d-flex justify-space-between mt-2">
                <span class="caption">Progress</span>
                <span class="caption">{{ event.progress }}%</span>
              </div>
              <v-chip
                small
                class="mt-2"
                :color="getStatusColor(event.status)"
                >{{ event.status }}</v-chip
              >
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary">
                View Details
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UpcomingEvents",
  data() {
    return {
      events: [
        {
          id: "1",
          title: "Emergency Fund",
          subtitle: "3 months of expenses saved",
          type: "savings",
          date: "Target: Dec 2024",
          amount: "$15,000",
          status: "in-progress",
          progress: 65,
        },
        {
          id: "2",
          title: "Stock Portfolio",
          subtitle: "Tech sector investment plan",
          type: "investment",
          date: "Target: Jun 2024",
          amount: "$50,000",
          status: "pending",
          progress: 30,
        },
        {
          id: "3",
          title: "Debt Repayment",
          subtitle: "Student loan payoff plan",
          type: "debt",
          date: "Target: Mar 2025",
          amount: "$25,000",
          status: "in-progress",
          progress: 45,
        },
      ],
    };
  },
  methods: {
    getIcon(type) {
      switch (type) {
        case "savings":
          return "mdi-piggy-bank";
        case "investment":
          return "mdi-chart-line";
        case "debt":
          return "mdi-credit-card";
        default:
          return "mdi-calendar";
      }
    },
    getIconColor(type) {
      switch (type) {
        case "savings":
          return "green";
        case "investment":
          return "blue";
        case "debt":
          return "red";
        default:
          return "grey";
      }
    },
    getProgressColor(progress) {
      if (progress < 30) return "red";
      if (progress < 70) return "orange";
      return "green";
    },
    getStatusColor(status) {
      switch (status) {
        case "pending":
          return "warning";
        case "in-progress":
          return "info";
        case "completed":
          return "success";
        default:
          return "grey";
      }
    },
  },
};
</script>
