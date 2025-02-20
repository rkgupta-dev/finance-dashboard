<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="pa-6 rounded-lg elevation-12" width="450">
      <!-- Tabs -->
      <v-tabs v-model="tab" grow>
        <v-tab @click="tab = 0">Login</v-tab>
        <v-tab @click="tab = 1">Sign Up</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Login Tab -->
        <v-tab-item>
          <v-form @submit.prevent="login" ref="loginForm" class="pa-4">
            <v-text-field
              v-model="loginData.mobile"
              label="Mobile Number"
              outlined
              dense
              required
              :rules="[rules.required, rules.mobile]"
            ></v-text-field>
            <v-text-field
              v-model="loginData.password"
              label="Password"
              type="password"
              outlined
              dense
              required
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn type="submit" color="primary" block class="mt-4">
              Login
            </v-btn>
            <p v-if="loginError" class="red--text text-center mt-2">
              {{ loginError }}
            </p>
          </v-form>
          <!-- Divider & Signup Prompt -->
          <v-divider class="my-4"></v-divider>
          <p class="text-center">
            <span class="text--primary">Don't have an account?</span>
            <span
              class="text--primary font-weight-bold cursor-pointer"
              @click="tab = 1"
            >
              Sign Up
            </span>
          </p>
        </v-tab-item>

        <!-- Signup Tab -->
        <v-tab-item>
          <v-form @submit.prevent="signup" ref="signupForm" class="pa-4">
            <v-text-field
              v-model="signupData.name"
              label="Full Name"
              outlined
              dense
              required
              :rules="[rules.required, rules.minLength(3)]"
            ></v-text-field>
            <v-text-field
              v-model="signupData.email"
              label="Email"
              outlined
              dense
              required
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
              v-model="signupData.mobile"
              label="Mobile Number"
              outlined
              dense
              required
              :rules="[rules.required, rules.mobile]"
            ></v-text-field>
            <v-text-field
              v-model="signupData.password"
              label="Password"
              type="password"
              outlined
              dense
              required
              :rules="[rules.required, rules.passwordStrength]"
            ></v-text-field>
            <v-btn type="submit" color="success" block class="mt-4">
              Sign Up
            </v-btn>
            <p v-if="signupSuccess" class="green--text text-center mt-2">
              Signup successful! You can log in now.
            </p>
            <p v-if="signupError" class="red--text text-center mt-2">
              {{ signupError }}
            </p>
          </v-form>
          <!-- Divider & Signup Prompt -->
          <v-divider class="my-4"></v-divider>
          <p class="text-center">
            <span class="text--primary">You already signed up! Please</span>
            <span
              class="text--primary font-weight-bold cursor-pointer"
              @click="tab = 2"
            >
              Login
            </span>
          </p>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      loginData: { mobile: "", password: "" },
      signupData: { name: "", email: "", mobile: "", password: "" },
      loginError: "",
      signupError: "",
      signupSuccess: false,
      isLoggedIn: false,
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "Enter a valid email address",
        mobile: (v) =>
          /^\d{10}$/.test(v) || "Enter a valid 10-digit mobile number",
        minLength: (min) => (v) =>
          v.length >= min || `Must be at least ${min} characters`,
        passwordStrength: (v) =>
          /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(v) ||
          "Password must be at least 6 characters, include a number and an uppercase letter",
      },
    };
  },
  created() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      this.isLoggedIn = true;
      this.$router.push("/");
    }
  },
  methods: {
    signup() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) => user.mobile === this.signupData.mobile
      );

      if (existingUser) {
        this.signupError = "Mobile number already registered";
      } else {
        users.push({
          name: this.signupData.name,
          email: this.signupData.email,
          mobile: this.signupData.mobile,
          password: this.signupData.password,
        });
        localStorage.setItem("users", JSON.stringify(users));
        this.signupSuccess = true;
        this.signupError = "";
      }
    },
    login() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const validUser = users.find(
        (user) =>
          user.mobile === this.loginData.mobile &&
          user.password === this.loginData.password
      );

      if (validUser) {
        alert("Login Successful");
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        this.isLoggedIn = true;
        this.loginError = "";
        this.$router.push("/");
      } else {
        this.loginError = "Invalid mobile number or password";
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  min-height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}
.v-card {
  border-radius: 12px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
