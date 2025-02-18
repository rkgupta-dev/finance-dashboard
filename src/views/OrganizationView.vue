<template>
  <v-container fluid>
    <!-- <h1 class="text-h4 mb-4">Personal Finance Dashboard</h1> -->
    <v-row>
      <v-col cols="12" md="6">
        <AccountsList />
      </v-col>
      <v-col cols="12" md="6">
        <RecentTransactions />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <UpcomingEvents />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountsList from "@/components/AccountsList.vue";
import RecentTransactions from "@/components/RecentTransactions.vue";
import UpcomingEvents from "@/components/UpcomingEvents.vue";

export default {
  name: "HomeView",
  components: {
    AccountsList,
    RecentTransactions,
    UpcomingEvents,
  },
};
</script>
