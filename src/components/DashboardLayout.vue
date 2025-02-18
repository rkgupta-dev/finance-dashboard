<template>
  <v-app :dark="isDark">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> MoneyMatrix </v-list-item-title>
          <v-list-item-subtitle> Financial Dashboard </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{
          $vuetify.theme.dark ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>

      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="32">
              <v-img
                src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "DashboardLayout",
  data: () => ({
    drawer: null,
    snackbar: false,
    snackbarText: "",
    isDark: true, // Dark mode enabled by default
    menuItems: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
      { title: "Analytics", icon: "mdi-chart-bar", route: "/analytics" },
      {
        title: "Organization",
        icon: "mdi-office-building",
        route: "/organization",
      },
      { title: "Projects", icon: "mdi-folder", route: "/projects" },
      { title: "Transactions", icon: "mdi-wallet", route: "/transactions" },
      { title: "Invoices", icon: "mdi-receipt", route: "/invoices" },
      { title: "Payments", icon: "mdi-credit-card", route: "/payments" },
      { title: "Members", icon: "mdi-account-group", route: "/members" },
      { title: "Settings", icon: "mdi-cog", route: "/settings" },
      { title: "Help", icon: "mdi-help-circle", route: "/help" },
    ],
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    showNotifications() {
      this.snackbar = true;
      this.snackbarText = "You have no new notifications";
    },
    logout() {
      console.log("Logout clicked");
    },
  },
};
</script>
