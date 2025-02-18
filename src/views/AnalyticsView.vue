<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="10" class="pa-4">
          <v-card-title class="headline primary--text"
            >Financial Analytics</v-card-title
          >
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-4" elevation="6">
                  <v-card-title>Expense Breakdown</v-card-title>
                  <v-card-text>
                    <canvas ref="expenseChart"></canvas>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4" elevation="6">
                  <v-card-title>Income vs Expenses</v-card-title>
                  <v-card-text>
                    <canvas ref="incomeExpenseChart"></canvas>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      transactions: [
        {
          description: "Salary",
          amount: 3000,
          category: "Income",
          date: "2025-02-01",
        },
        {
          description: "Groceries",
          amount: 200,
          category: "Food",
          date: "2025-02-05",
        },
        {
          description: "Rent",
          amount: 1200,
          category: "Housing",
          date: "2025-02-01",
        },
        {
          description: "Transport",
          amount: 100,
          category: "Transport",
          date: "2025-02-08",
        },
      ],
      categories: ["Income", "Food", "Housing", "Transport", "Entertainment"],
      expenseChart: null,
      incomeExpenseChart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderExpenseChart();
      this.renderIncomeExpenseChart();
    });
  },
  methods: {
    renderExpenseChart() {
      if (this.expenseChart) {
        this.expenseChart.destroy();
      }
      const ctx = this.$refs.expenseChart.getContext("2d");
      this.expenseChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.categories.slice(1), // Exclude Income
          datasets: [
            {
              data: this.categories
                .slice(1)
                .map((category) =>
                  this.transactions
                    .filter((t) => t.category === category)
                    .reduce((sum, t) => sum + t.amount, 0)
                ),
              backgroundColor: ["#f44336", "#2196F3", "#4CAF50", "#FF9800"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
    renderIncomeExpenseChart() {
      if (this.incomeExpenseChart) {
        this.incomeExpenseChart.destroy();
      }
      const ctx = this.$refs.incomeExpenseChart.getContext("2d");
      this.incomeExpenseChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Income", "Expenses"],
          datasets: [
            {
              label: "Amount",
              data: [
                this.transactions
                  .filter((t) => t.category === "Income")
                  .reduce((sum, t) => sum + t.amount, 0),
                this.transactions
                  .filter((t) => t.category !== "Income")
                  .reduce((sum, t) => sum + t.amount, 0),
              ],
              backgroundColor: ["#4CAF50", "#f44336"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
};
</script>
