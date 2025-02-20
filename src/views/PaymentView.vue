<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-6" max-width="500">
          <v-card-title class="text-h5 text-center">Payment</v-card-title>

          <v-card-subtitle>Secure your transaction</v-card-subtitle>

          <v-divider class="my-4"></v-divider>

          <v-form ref="paymentForm" @submit.prevent="processPayment">
            <v-text-field
              v-model="cardNumber"
              label="Card Number"
              placeholder="1234 5678 9101 1121"
              outlined
              dense
              required
              :rules="[rules.cardNumber]"
              maxlength="12"
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="expiryDate"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  outlined
                  dense
                  required
                  :rules="[rules.expiryDate]"
                  @input="formatExpiryDate"
                  maxlength="5"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="cvv"
                  label="CVV"
                  placeholder="123"
                  outlined
                  dense
                  type="password"
                  required
                  :rules="[rules.cvv]"
                  maxlength="3"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="cardHolder"
              label="Cardholder Name"
              placeholder="John Doe"
              outlined
              dense
              required
            ></v-text-field>

            <v-btn color="primary" block large class="mt-3" type="submit">
              <v-icon left>mdi-credit-card</v-icon>
              Pay Now
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-6">
          <v-card-title class="text-h5">Recent Transactions</v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-list>
            <v-list-item
              v-for="(transaction, index) in transactions"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon>mdi-cash-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ transaction.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ transaction.date }} - ₹{{ transaction.amount }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      v-if="snackbarError"
      timeout="3000"
      color="error"
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="dark" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar"
      v-if="!snackbarError"
      timeout="3000"
      color="success"
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="dark" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
      transactions: [
        { name: "Rajeev", date: "02/15/2025", amount: "4500" },
        { name: "Sonu", date: "02/14/2025", amount: "7800" },
        { name: "Deepak", date: "02/13/2025", amount: "3200" },
        { name: "Akhil", date: "02/12/2025", amount: "9000" },
      ],
      snackbar: false,
      snackbarMessage: "",
      snackbarError: false,
      rules: {
        cardNumber: (v) =>
          /^[0-9]{12}$/.test(v) || "Card number must be 12 digits",
        expiryDate: (v) =>
          /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(v) ||
          "Enter a valid expiry date (MM/YY)",
        cvv: (v) => /^[0-9]{3}$/.test(v) || "CVV must be 3 digits",
      },
    };
  },
  methods: {
    processPayment() {
      if (
        !this.cardNumber ||
        !this.expiryDate ||
        !this.cvv ||
        !this.cardHolder
      ) {
        this.snackbarMessage = "Please fill all fields correctly";
        this.snackbarError = true;
        this.snackbar = true;
        return;
      }

      this.transactions.push({
        name: this.cardHolder,
        date: new Date().toLocaleDateString(),
        amount: (Math.random() * 100).toFixed(2),
      });

      this.cardNumber = "";
      this.expiryDate = "";
      this.cvv = "";
      this.cardHolder = "";

      this.snackbarMessage = "Payment Successful!";
      this.snackbarError = false;
      this.snackbar = true;
    },
    formatExpiryDate() {
      if (this.expiryDate.length === 2 && !this.expiryDate.includes("/")) {
        this.expiryDate += "/";
      }
    },
  },
};
</script>
