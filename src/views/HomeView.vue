<template>
  <v-container>
    <v-row>
      <!-- Financial Summary Cards -->
      <v-col
        v-for="(card, index) in financialSummary"
        :key="index"
        cols="12"
        md="3"
      >
        <v-card class="mb-4" :color="card.color" dark>
          <v-card-title class="text-h6">{{ card.title }}</v-card-title>
          <v-card-subtitle class="text-h4">₹{{ card.value }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Charts Section -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Expenses Vs Income</v-card-title>
          <v-card-text>
            <canvas id="myChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Monthly Income</v-card-title>
          <v-card-text>
            <canvas id="incomeChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Transactions Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Recent Transactions</v-card-title>
          <v-data-table
            :headers="tableHeaders"
            :items="transactions"
            item-value="name"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.date }}</td>
                <td>{{ item.name }}</td>
                <td :class="item.amount > 0 ? 'green--text' : 'red--text'">
                  ₹{{ item.amount.toFixed(2) }}
                </td>
              </tr>
            </template>
          </v-data-table>
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
      financialSummary: [
        { title: "Total Balance", value: "125,000", color: "primary" },
        { title: "Expenses", value: "32,000", color: "danger" },
        { title: "Income", value: "98,000", color: "success" },
        { title: "Investments", value: "45,000", color: "warning" },
      ],

      tableHeaders: [
        { text: "Date", value: "date" },
        { text: "Transaction", value: "name" },
        { text: "Amount", value: "amount" },
      ],
      transactions: [
        { date: "2025-02-15", name: "Office Supplies", amount: -120.5 },
        { date: "2025-02-14", name: "Client Payment", amount: 5000.0 },
        { date: "2025-02-13", name: "Investment Return", amount: 1500.0 },
        { date: "2025-02-12", name: "Office Rent", amount: -2000.0 },
      ],
    };
  },
  mounted() {
    this.createChart();
    this.createIncomeChart();
  },
  methods: {
    createChart() {
      new Chart(document.getElementById("myChart"), {
        type: "line",
        data: {
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
              label: "Expenses",
              data: [
                5000, 7000, 8000, 7500, 9000, 10000, 12000, 11000, 9500, 10500,
                11500, 13000,
              ],
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
            },
            {
              label: "Income",
              data: [
                3000, 4000, 3500, 4500, 5000, 5500, 6000, 6500, 6000, 6200,
                6500, 7000,
              ],
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.5)",
              yAxisID: "y-axis-2",
            },
          ],
        },
        options: {
          responsive: true,
          tooltips: {
            mode: "index",
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
              },
              {
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
          },
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "Expenses vs Income Overview",
          },
        },
      });
    },
    createIncomeChart() {
      new Chart(document.getElementById("incomeChart"), {
        type: "bar",
        data: {
          labels: [
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
          ],
          datasets: [
            {
              label: "Income (₹)",
              data: [
                3000, 4500, 6000, 8000, 10000, 12000, 15000, 16000, 18000,
                20000, 21000, 25000,
              ],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          tooltips: {
            mode: "index",
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    return "₹" + value;
                  },
                },
                scaleLabel: {
                  display: true,
                  labelString: "Income in Rupees",
                },
              },
            ],
          },
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "Monthly Income Overview",
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
.v-data-table {
  border-radius: 8px;
}
</style>
