<template>
  <v-container>
    <v-alert prominent type="info" text color="info" dismissible class="mb-4">
      <v-row align="center">
        <v-col cols="12" md="9">
          <strong>
            Reduce the amount you owe by applying credit notes to invoices
          </strong>
          <div>
            You can now use your credit notes directly towards paying your
            invoices, saving your time and decreasing the amount left to pay.
          </div>
        </v-col>
        <v-col cols="12" md="3" class="text-md-right text-center">
          <v-btn color="primary" class="mt-2 mt-md-0">See credit notes</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-row>
      <v-col cols="6">
        <v-alert
          border="left"
          colored-border
          color="deep-purple darken-4"
          elevation="2"
        >
          <div class="ml-4">
            <div>
              Unpaid Invoices
              <v-icon small>mdi-information-outline</v-icon>
            </div>
            <div class="text-h5 font-weight-bold">INR 1200.00</div>
            <div class="subtitle-2 grey--text">From Invoices</div>
          </div>
        </v-alert>
      </v-col>
      <v-col cols="6">
        <v-alert
          border="left"
          colored-border
          color="pink darken-4"
          elevation="2"
        >
          <div class="ml-4">
            <div>
              Remaining Credits
              <v-icon small>mdi-information-outline</v-icon>
            </div>
            <div class="text-h5 font-weight-bold">INR 2300.00</div>
            <div class="subtitle-2 grey--text">From Credit Notes</div>
          </div>
        </v-alert>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="invoices" class="elevation-1 mt-4">
      <template slot="item.status" slot-scope="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark small outlined>
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Person", value: "client" },
        { text: "Invoice Reference", value: "reference" },
        { text: "Payroll Month", value: "payrollMonth" },
        { text: "Due Date", value: "dueDate" },
        { text: "Invoice Amount", value: "amount" },
        { text: "Amount Due", value: "amountDue" },
        { text: "Status", value: "status" },
      ],
      invoices: [
        {
          client: "Charles John",
          reference: "ID-XYZ-015",
          payrollMonth: "12/12/2023",
          dueDate: "1 day",
          amount: "INR 1200.0",
          amountDue: "12/13/2023",
          status: "Pending",
        },
        {
          client: "Dianne Rusell",
          reference: "NY-ASD-021",
          payrollMonth: "10/08/2023",
          dueDate: "1 day",
          amount: "INR 1100.0",
          amountDue: "10/09/2022",
          status: "Approved",
        },
        {
          client: "Anette Black",
          reference: "CN-ASX-051",
          payrollMonth: "10/08/2023",
          dueDate: "3 day",
          amount: "INR 1130.0",
          amountDue: "10/10/2022",
          status: "Approved",
        },
        {
          client: "Darell Steward",
          reference: "UK-XTZ-015",
          payrollMonth: "10/08/2023",
          dueDate: "5 day",
          amount: "INR 1120.0",
          amountDue: "10/13/2022",
          status: "Approved",
        },
        {
          client: "Marvin McKinney",
          reference: "ID-UXP-022",
          payrollMonth: "10/08/2023",
          dueDate: "5 day",
          amount: "INR 1580.0",
          amountDue: "10/13/2022",
          status: "Rejected",
        },
      ],
    };
  },
  methods: {
    getStatusColor(status) {
      if (status === "Pending") return "orange";
      if (status === "Approved") return "green";
      if (status === "Rejected") return "red";
      return "grey";
    },
  },
};
</script>
