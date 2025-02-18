<template>
  <v-card>
    <v-card-title class="d-flex flex-wrap align-center">
      Accounts
      <v-spacer></v-spacer>
      <div class="text-subtitle-1">Total Balance: ${{ totalBalance }}</div>
    </v-card-title>
    <v-list>
      <v-list-item v-for="account in accounts" :key="account.id">
        <v-list-item-avatar>
          <v-icon :color="getIconColor(account.type)">
            {{ getIcon(account.type) }}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ account.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ account.description }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-title class="text-right">
            {{ account.balance }}
          </v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-row dense class="w-100">
        <v-col cols="6" sm="3" md="3">
          <v-btn block text color="primary">
            <v-icon left>mdi-plus</v-icon>
            Add
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" md="3">
          <v-btn block text color="primary">
            <v-icon left>mdi-send</v-icon>
            Send
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" md="3">
          <v-btn block text color="primary">
            <v-icon left>mdi-arrow-down-bold</v-icon>
            Top-up
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" md="3">
          <v-btn block text color="primary">
            <v-icon left>mdi-arrow-right</v-icon>
            More
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AccountsList",
  data() {
    return {
      totalBalance: "26,540.25",
      accounts: [
        {
          id: "1",
          title: "Main Savings",
          description: "Personal savings",
          balance: "$8,459.45",
          type: "savings",
        },
        {
          id: "2",
          title: "Checking Account",
          description: "Daily expenses",
          balance: "$2,850.00",
          type: "checking",
        },
        {
          id: "3",
          title: "Investment Portfolio",
          description: "Stock & ETFs",
          balance: "$15,230.80",
          type: "investment",
        },
        {
          id: "4",
          title: "Credit Card",
          description: "Pending charges",
          balance: "$1,200.00",
          type: "debt",
        },
      ],
    };
  },
  methods: {
    getIcon(type) {
      switch (type) {
        case "savings":
          return "mdi-wallet";
        case "checking":
          return "mdi-qrcode";
        case "investment":
          return "mdi-chart-line";
        case "debt":
          return "mdi-credit-card";
        default:
          return "mdi-cash";
      }
    },
    getIconColor(type) {
      switch (type) {
        case "savings":
          return "green";
        case "checking":
          return "blue";
        case "investment":
          return "purple";
        case "debt":
          return "red";
        default:
          return "grey";
      }
    },
  },
};
</script>
