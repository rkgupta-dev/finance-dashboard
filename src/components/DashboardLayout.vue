<template>
  <v-app :dark="isDark">
    <v-navigation-drawer v-if="!hideLayout" v-model="drawer" app>
      <v-list-item>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1041/1041888.png"
          alt="logo"
          width="42"
          height="42"
          class="mr-2"
        />

        <v-list-item-content>
          <v-list-item-title class="text-h6">MoneyMatrix</v-list-item-title>
          <v-list-item-subtitle>Financial Dashboard</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.route"
          link
          active-class="primary--text"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <div class="text-center pa-3">
          <v-icon class="mb-1" color="primary">mdi-code-braces</v-icon>
          <small class="font-weight-medium text-subtitle-2 primary--text">
            Developed by
            <a
              href="https://www.linkedin.com/in/rohit-kr-gupta-921760208/"
              target="_blank"
              class="font-weight-bold text-decoration-underline primary--text"
            >
              Rohit Kr Gupta
            </a>
          </small>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar v-if="!hideLayout" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{
          isDark ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>

      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="32">
              <v-img
                src="https://cdn-icons-png.flaticon.com/128/4139/4139981.png"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-2" max-width="300">
          <v-list v-if="isLoggedIn">
            <v-list>
              <!-- User Profile Section -->
              <v-list-item>
                <v-avatar size="40" tile class="mr-2 rounded" color="indigo">
                  <v-icon dark size="35">mdi-account-circle </v-icon>
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ user.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2" color="white"></v-divider>

              <!-- Navigation Items -->
              <v-list-item @click="dialog = true" class="menu-item">
                <v-list-item-icon>
                  <v-icon color="deep-purple">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>

              <v-list-item to="/settings" class="menu-item">
                <v-list-item-icon>
                  <v-icon color="warning">mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>

              <v-divider class="my-2" color="white"></v-divider>

              <!-- Logout -->
              <v-list-item @click="logout" class="menu-item">
                <v-list-item-icon>
                  <v-icon color="red">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-red font-weight-bold"
                  >Logout</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-list>

          <v-list v-else>
            <v-card flat v-if="!isLoggedIn" class="text-center">
              <div>
                <v-icon size="50" color="warning">mdi-key</v-icon>
              </div>
              <div class="font-weight-bold text-primary">
                You are not logged In
              </div>
              <div class="my-4">Please log in or sign up to continue.</div>
              <v-btn color="primary" dark class="mr-2" to="/login">
                <v-icon left>mdi-login</v-icon> Login
              </v-btn>

              <v-btn color="success" dark to="/login">
                <v-icon left>mdi-account-plus</v-icon> Sign Up
              </v-btn>
            </v-card>
          </v-list>
        </v-card>
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
    <!-- Profile Dialog -->
    <v-dialog v-model="dialog" max-width="450" persistent>
      <v-card class="pa-4">
        <!-- Profile Header -->
        <div class="text-center">
          <v-avatar size="100" class="elevation-3">
            <v-img
              :src="user.avatar || defaultAvatar"
              alt="User Avatar"
            ></v-img>
          </v-avatar>

          <v-btn icon small class="edit-avatar-btn" @click="changeAvatar">
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>

          <div class="text-center">
            <div class="mt-2 text-h6">{{ user.name }}</div>
            <div class="grey--text text-subtitle-1">
              {{ user.email }}
            </div>
          </div>
        </div>

        <v-divider class="my-3"></v-divider>

        <!-- Profile Details -->
        <v-list dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Role</v-list-item-title>
              <v-list-item-subtitle>{{
                user.role || "User"
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-calendar-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Joined</v-list-item-title>
              <v-list-item-subtitle>{{
                user.joined || "26 Feb 2025"
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider class="my-3"></v-divider>

        <!-- Actions -->
        <v-card-actions class="justify-space-between">
          <v-btn color="red darken-2" outlined @click="logout">
            <v-icon left>mdi-logout</v-icon> Logout
          </v-btn>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "DashboardLayout",
  data() {
    return {
      drawer: null,
      snackbar: false,
      snackbarText: "",
      isDark: localStorage.getItem("isDark") === "true",
      dialog: false,
      defaultAvatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("loggedInUser");
    },
    user() {
      return (
        JSON.parse(localStorage.getItem("loggedInUser")) || {
          name: "Guest",
          email: "guest@example.com",
          avatar: "",
          role: "Guest",
          joined: "26 Feb 2025",
        }
      );
    },
    hideLayout() {
      return this.$route.name === "login" || this.$route.name === "notfound"; // Hide layout for the 404 page
    },
  },
  watch: {
    isDark(newValue) {
      this.$vuetify.theme.dark = newValue; // Apply the theme change
      localStorage.setItem("isDark", newValue); // Save to localStorage
    },
  },
  mounted() {
    this.$vuetify.theme.dark = this.isDark; // Ensure theme is set on load
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
    showNotifications() {
      this.snackbar = true;
      this.snackbarText = "You have no new notifications";
    },
    logout() {
      localStorage.removeItem("loggedInUser");
      this.snackbarText = "Logged Out Successfully!";
      this.snackbar = true;
      this.dialog = false;
      location.reload();
    },
    changeAvatar() {
      alert("Feature coming soon!"); // You can add a file upload here
    },
  },
};
</script>
