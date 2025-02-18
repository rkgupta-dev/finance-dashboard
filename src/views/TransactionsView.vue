<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline primary--text">
            Transactions
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="dialog = true"
              >Add Transaction</v-btn
            >
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="transactions"
            class="elevation-2"
            :search="search"
            dense
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search Transactions"
                class="mx-4"
                clearable
                outlined
              ></v-text-field>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title class="headline primary--text"
            >Transaction Summary</v-card-title
          >
          <v-card-text>
            <canvas ref="chartCanvas" width="300" height="420"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card elevation="10">
        <v-card-title class="headline">Add Transaction</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newTransaction.description"
            label="Description"
            outlined
          ></v-text-field>
          <v-text-field
            v-model.number="newTransaction.amount"
            label="Amount"
            type="number"
            outlined
          ></v-text-field>
          <v-select
            v-model="newTransaction.category"
            :items="categories"
            label="Category"
            outlined
          ></v-select>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="newTransaction.date"
                label="Date"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newTransaction.date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" dark @click="addTransaction"
            >Save</v-btn
          >
          <v-btn color="red darken-1" dark @click="dialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Chart } from "chart.js"; // Ensure you're using the right import based on your version

export default {
  data() {
    return {
      transactions: [
        {
          description: "Groceries",
          amount: 50,
          category: "Food",
          date: "2025-02-10",
        },
        {
          description: "Rent",
          amount: 1200,
          category: "Housing",
          date: "2025-02-01",
        },
      ],
      headers: [
        { text: "Description", value: "description" },
        { text: "Amount", value: "amount" },
        { text: "Category", value: "category" },
        { text: "Date", value: "date" },
      ],
      search: "",
      dialog: false,
      menu: false,
      newTransaction: { description: "", amount: null, category: "", date: "" },
      categories: ["Food", "Housing", "Transport", "Entertainment", "Other"],
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart(); // Initial render
    });
  },
  methods: {
    addTransaction() {
      this.transactions.push({ ...this.newTransaction });
      this.dialog = false;
      this.newTransaction = {
        description: "",
        amount: null,
        category: "",
        date: "",
      };

      // Re-render the chart after adding a transaction
      this.$nextTick(() => {
        this.renderChart();
      });
    },
    renderChart() {
      if (this.chart) {
        this.chart.destroy(); // Destroy the previous chart if it exists
      }
      const ctx = this.$refs.chartCanvas.getContext("2d");

      // Data to be displayed in the chart
      const data = this.categories.map((category) =>
        this.transactions
          .filter((t) => t.category === category)
          .reduce((sum, t) => sum + t.amount, 0)
      );

      this.chart = new Chart(ctx, {
        type: "doughnut", // You can change the type to 'bar' or 'pie' as needed
        data: {
          labels: this.categories,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#f44336",
                "#2196F3",
                "#4CAF50",
                "#FF9800",
                "#9C27B0",
              ],
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
