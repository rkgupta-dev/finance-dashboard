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
            v-model="user.phone"
            outlined
            dense
          ></v-text-field>
          <v-btn color="primary" class="mt-2" @click="openPasswordModal"
            >Change Password</v-btn
          >
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column align-center">
          <v-avatar size="100">
            <v-img :src="user.avatar" alt="Profile"></v-img>
          </v-avatar>
          <v-file-input
            label="Upload New Picture"
            dense
            outlined
            @change="uploadImage"
          ></v-file-input>
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
        label="Monthly Budget Alert ($)"
        type="number"
        outlined
        dense
        v-model="financial.budget"
      ></v-text-field>

      <v-divider class="my-4"></v-divider>

      <!-- Theme Customization -->
      <p class="text-subtitle-1 font-weight-bold">Appearance</p>
      <v-select
        label="Theme"
        :items="['Light', 'Dark', 'System Default']"
        outlined
        dense
        v-model="appearance.theme"
      ></v-select>
      <v-switch
        label="Enable Dark Mode"
        color="primary"
        v-model="appearance.darkMode"
      ></v-switch>

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
        <v-btn color="primary">Save Changes</v-btn>
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
          ></v-text-field>
          <v-text-field
            label="New Password"
            type="password"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Confirm New Password"
            type="password"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="passwordDialog = false">Cancel</v-btn>
          <v-btn color="primary">Update</v-btn>
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
          <v-btn color="error">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+123456789",
        avatar: "https://via.placeholder.com/100",
      },
      security: {
        twoFactor: false,
        newDevices: true,
      },
      notifications: {
        email: true,
        push: false,
      },
      financial: {
        currency: "USD",
        budget: 1000,
      },
      appearance: {
        theme: "Light",
        darkMode: false,
      },
      passwordDialog: false,
      deleteDialog: false,
    };
  },
  methods: {
    openPasswordModal() {
      this.passwordDialog = true;
    },
    confirmDeleteAccount() {
      this.deleteDialog = true;
    },
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.user.avatar = URL.createObjectURL(file);
      }
    },
  },
};
</script>
