<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Income vs Expenses</v-card-title>
          <v-card-text>
            <canvas ref="radarChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Monthly Spending</v-card-title>
          <v-card-text>
            <canvas ref="lineChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Expense Categories</v-card-title>
          <v-card-text>
            <canvas ref="pieChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Investment Risk Analysis</v-card-title>
          <v-card-text>
            <canvas ref="barChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Savings Allocation</v-card-title>
          <v-card-text>
            <canvas ref="doughnutChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
export default {
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      new Chart(this.$refs.radarChart, {
        type: "radar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Income",
              data: [
                3000, 4000, 3500, 5000, 4500, 4800, 5100, 5300, 5000, 5200,
                5400, 5500,
              ],
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
            {
              label: "Expenses",
              data: [
                2000, 2500, 2200, 2700, 2600, 2800, 2900, 3000, 3100, 3200,
                3300, 3400,
              ],
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(54, 162, 235)",
            },
          ],
        },
      });
      new Chart(this.$refs.lineChart, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: "Monthly Spending",
              data: [
                1000, 1200, 1100, 1400, 1300, 1500, 1600, 1700, 1800, 1900,
                2000, 2100,
              ],
              borderColor: "blue",
              fill: false,
            },
          ],
        },
      });
      new Chart(this.$refs.pieChart, {
        type: "pie",
        data: {
          labels: ["Rent", "Food", "Transport", "Entertainment"],
          datasets: [
            {
              data: [40, 25, 20, 15],
              backgroundColor: ["red", "blue", "green", "yellow"],
            },
          ],
        },
      });
      new Chart(this.$refs.barChart, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Investment Risk",
              data: [8, 7, 6, 5, 4, 6, 7, 8, 9, 6, 5, 4],
              backgroundColor: "blue",
            },
          ],
        },
      });
      new Chart(this.$refs.doughnutChart, {
        type: "doughnut",
        data: {
          labels: ["Savings", "Investments", "Emergency Fund"],
          datasets: [
            {
              data: [50, 30, 20],
              backgroundColor: ["purple", "orange", "gray"],
            },
          ],
        },
      });
    },
  },
};
</script>

<style scoped>
v-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
