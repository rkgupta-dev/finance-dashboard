<template>
  <v-card>
    <v-card-title>
      Recent Transactions
      <v-spacer></v-spacer>
      <v-chip small>This Month</v-chip>
    </v-card-title>
    <v-list>
      <v-list-item v-for="transaction in transactions" :key="transaction.id">
        <v-list-item-avatar>
          <v-icon :color="getIconColor(transaction.type)">{{
            getIcon(transaction.category)
          }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ transaction.title }}</v-list-item-title>
          <v-list-item-subtitle>{{
            transaction.timestamp
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-title
            :class="{
              'green--text': transaction.type === 'incoming',
              'red--text': transaction.type === 'outgoing',
            }"
          >
            {{ transaction.type === "incoming" ? "+" : "-"
            }}{{ transaction.amount }}
          </v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn block color="primary" to="/transactions">
        View All Transactions
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RecentTransactions",
  data() {
    return {
      transactions: [
        {
          id: "1",
          title: "Apple Store Purchase",
          amount: "$999.00",
          type: "outgoing",
          category: "shopping",
          timestamp: "Today, 2:45 PM",
          status: "completed",
        },
        {
          id: "2",
          title: "Salary Deposit",
          amount: "$4,500.00",
          type: "incoming",
          category: "income",
          timestamp: "Today, 9:00 AM",
          status: "completed",
        },
        {
          id: "3",
          title: "Netflix Subscription",
          amount: "$15.99",
          type: "outgoing",
          category: "entertainment",
          timestamp: "Yesterday",
          status: "pending",
        },
        {
          id: "4",
          title: "Supabase Subscription",
          amount: "$15.99",
          type: "outgoing",
          category: "software",
          timestamp: "Yesterday",
          status: "pending",
        },
      ],
    };
  },
  methods: {
    getIcon(category) {
      switch (category) {
        case "shopping":
          return "mdi-cart";
        case "income":
          return "mdi-cash-multiple";
        case "entertainment":
          return "mdi-movie";
        case "software":
          return "mdi-laptop";
        default:
          return "mdi-cash";
      }
    },
    getIconColor(type) {
      return type === "incoming" ? "green" : "red";
    },
  },
};
</script>
