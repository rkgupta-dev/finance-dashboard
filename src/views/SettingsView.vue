<template>
  <v-container>
    <v-card outlined class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Settings</v-card-title>
      <v-divider class="mb-4"></v-divider>

      <!-- Profile Settings -->
      <v-row>
        <v-col cols="12" md="6">
          <p class="text-subtitle-1 font-weight-bold">Profile</p>
          <v-text-field
            label="Full Name"
            v-model="user.name"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="user.email"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="user.mobile"
            outlined
            dense
          ></v-text-field>
          <v-file-input
            label="Upload New Picture"
            outlined
            dense
            accept="image/*"
            @change="previewImage"
          ></v-file-input>

          <v-img
            v-if="imageUrl"
            :src="imageUrl"
            max-width="100"
            class="mb-4 rounded-lg"
            cover
          />
          <v-btn color="primary" class="mt-2" @click="openPasswordModal"
            >Change Password</v-btn
          >
        </v-col>
        <v-col cols="12" md="6" class="align-center">
          <v-card class="rounded align-center justify-center pa-4">
            <v-img
              src="https://img.freepik.com/free-vector/account-concept-illustration_114360-409.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid"
              max-width="400"
              class="mx-auto mb-4"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <!-- Security Settings -->
      <p class="text-subtitle-1 font-weight-bold">Security</p>
      <v-switch
        label="Enable Two-Factor Authentication"
        color="primary"
        v-model="security.twoFactor"
      ></v-switch>
      <v-switch
        label="Allow Login from New Devices"
        color="primary"
        v-model="security.newDevices"
      ></v-switch>

      <v-divider class="my-4"></v-divider>

      <!-- Notification Settings -->
      <p class="text-subtitle-1 font-weight-bold">Notifications</p>
      <v-switch
        label="Email Notifications"
        color="primary"
        v-model="notifications.email"
      ></v-switch>
      <v-switch
        label="Push Notifications"
        color="primary"
        v-model="notifications.push"
      ></v-switch>

      <v-divider class="my-4"></v-divider>

      <!-- Financial Preferences -->
      <p class="text-subtitle-1 font-weight-bold">Financial Preferences</p>
      <v-select
        label="Default Currency"
        :items="['USD', 'EUR', 'GBP', 'INR', 'JPY']"
        outlined
        dense
        v-model="financial.currency"
      ></v-select>
      <v-text-field
        label="Monthly Budget Alert (₹)"
        type="number"
        outlined
        dense
        v-model="financial.budget"
      ></v-text-field>

      <v-divider class="my-4"></v-divider>

      <!-- Theme Customization -->
      <p class="text-subtitle-1 font-weight-bold">Appearance</p>
      <!-- <v-select
        label="Theme"
        :items="['Light', 'Dark', 'System Default']"
        outlined
        dense
        v-model="appearance.theme"
        @change="updateTheme"
      /> -->
      <v-switch
        label="Enable Dark Mode"
        color="primary"
        v-model="appearance.darkMode"
        @change="toggleDarkMode"
      />

      <v-divider class="my-4"></v-divider>

      <!-- Account Actions -->
      <p class="text-subtitle-1 font-weight-bold">Account Actions</p>
      <v-btn color="error" outlined @click="confirmDeleteAccount"
        >Delete Account</v-btn
      >

      <v-divider class="my-4"></v-divider>

      <!-- Actions -->
      <v-row justify="end">
        <v-btn outlined class="mr-2">Cancel</v-btn>
        <v-btn color="primary" @click="saveChanges">Save Changes</v-btn>
      </v-row>
    </v-card>

    <!-- Change Password Dialog -->
    <v-dialog v-model="passwordDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Change Password</v-card-title>
        <v-card-text>
          <v-text-field
            label="Current Password"
            type="password"
            outlined
            dense
            v-model="currentPassword"
          ></v-text-field>
          <v-text-field
            label="New Password"
            type="password"
            outlined
            dense
            v-model="newPassword"
          ></v-text-field>
          <v-text-field
            label="Confirm New Password"
            type="password"
            outlined
            dense
            v-model="confirmPassword"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="passwordDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="updatePassword">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Account Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteAccount">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("loggedInUser")) || {
        name: "",
        email: "",
        mobile: "",
      },
      imageUrl: null,
      passwordDialog: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",

      security: {
        twoFactor: false,
        newDevices: true,
      },
      notifications: {
        email: true,
        push: false,
      },
      financial: {
        currency: "INR",
        budget: 10000,
      },
      appearance: {
        theme: localStorage.getItem("theme") || "Light",
        darkMode: localStorage.getItem("isDark") === "true",
      },

      deleteDialog: false,
    };
  },
  watch: {
    "appearance.darkMode"(newValue) {
      this.$vuetify.theme.dark = newValue; // Apply theme change
      localStorage.setItem("isDark", newValue);
    },
  },
  mounted() {
    this.$vuetify.theme.dark = this.appearance.darkMode; // Set theme on load
  },
  methods: {
    openPasswordModal() {
      this.passwordDialog = true;
    },
    previewImage(event) {
      const file = event;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveChanges() {
      localStorage.setItem("loggedInUser", JSON.stringify(this.user));
      alert("Profile updated successfully!");
    },
    updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let userIndex = users.findIndex((u) => u.mobile === this.user.mobile);
      if (userIndex !== -1) {
        users[userIndex].password = this.newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password updated successfully!");
        this.passwordDialog = false;
      } else {
        alert("User not found!");
      }
    },
    confirmDeleteAccount() {
      this.deleteDialog = true;
    },
    updateTheme() {
      localStorage.setItem("theme", this.appearance.theme);
    },
    toggleDarkMode() {
      this.$vuetify.theme.dark = this.appearance.darkMode;
      localStorage.setItem("isDark", this.appearance.darkMode);
    },
    deleteAccount() {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("theme");
      localStorage.removeItem("isDark");

      // Remove user from the users array if needed
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users = users.filter((u) => u.mobile !== this.user.mobile);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Account deleted successfully!");

      // Redirect or reload the page
      window.location.href = "/"; // Change to your actual logout or home page
    },
  },
};
</script>
