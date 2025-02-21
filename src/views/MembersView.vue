<template>
  <v-container>
    <v-card class="mx-auto pa-5">
      <!-- User Profile Section -->
      <div class="d-flex mb-2">
        <div class="mr-4">
          <v-avatar size="80">
            <v-img
              src="https://randomuser.me/api/portraits/men/10.jpg"
              alt="User Avatar"
            />
          </v-avatar>
        </div>
        <div class="my-2">
          <h2 class="text-h5 font-weight-bold">Rohit Kr. Gupta</h2>
          <p class="text-subtitle-1">rohitkrgupta333@email.com</p>
        </div>
      </div>

      <!-- Membership Info -->
      <v-card outlined class="pa-4 mb-4">
        <v-row align="center" justify="space-between">
          <v-col cols="6">
            <p class="text-subtitle-1 font-weight-bold mb-1">Membership Plan</p>
            <p class="text-h6 primary--text">Premium</p>
          </v-col>
          <v-col cols="6" class="text-right">
            <p class="text-subtitle-1 font-weight-bold mb-1">Plan Status</p>
            <v-chip color="success" class="font-weight-medium">Active</v-chip>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <v-row align="center" justify="space-between">
          <v-col cols="6">
            <p class="text-subtitle-1 font-weight-bold mb-1">Expiration Date</p>
            <p class="text-body-1">March 15, 2025</p>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn color="primary" outlined small>Renew</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <!-- Recent Transactions Table -->
      <v-card outlined class="pa-3 mb-4">
        <p class="text-h6 font-weight-bold">Recent Transactions</p>
        <v-data-table
          :headers="headers"
          :items="transactions"
          dense
          class="elevation-1"
        ></v-data-table>
      </v-card>

      <!-- Account Actions -->
      <v-row>
        <v-col>
          <v-btn color="primary" block>Upgrade Plan</v-btn>
        </v-col>
        <v-col>
          <v-btn color="error" block>Manage Subscription</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Description", value: "description" },
        { text: "Amount", value: "amount" },
      ],
      transactions: [
        {
          date: "2025-02-10",
          description: "Monthly Subscription",
          amount: "₹1400",
        },
        {
          date: "2025-01-10",
          description: "Monthly Subscription",
          amount: "₹1000",
        },
        {
          date: "2024-12-10",
          description: "Annual Renewal",
          amount: "₹2000",
        },
      ],
    };
  },
};
</script>

<style scoped>
.primary--text {
  color: #1976d2 !important;
}
</style>
