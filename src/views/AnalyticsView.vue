<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Income vs Expenses</v-card-title>
          <v-card-text>
            <canvas ref="incomeExpenseChart" style="height: 400px"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar } from "chart.js";

export default {
  data() {
    return {
      chart: null,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Income",
            data: [
              5000, 7000, 8000, 7500, 9000, 10000, 12000, 11000, 9500, 10500,
              11500, 13000,
            ],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: "Expenses",
            data: [
              3000, 4000, 3500, 4500, 5000, 5500, 6000, 6500, 6000, 6200, 6500,
              7000,
            ],
            backgroundColor: "#f44336",
            borderColor: "#d32f2f",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      this.chart = new Bar(this.$refs.incomeExpenseChart, {
        data: this.chartData,
        options: this.chartOptions,
      });
    },
  },
};
</script>
