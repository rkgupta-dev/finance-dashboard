<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="text-center pa-6" elevation="10">
          <v-img
            src="https://cdn-icons-png.flaticon.com/128/8281/8281994.png"
            max-width="150"
            class="mx-auto mb-4"
          />

          <!-- <v-icon size="100" color="error">mdi-alert-circle-outline</v-icon> -->
          <!-- <h1 class="text-h2 font-weight-bold error--text mt-4">404</h1> -->
          <h2 class="text-h4 my-4 error--text">Page Not Found</h2>
          <p class="text-body-1 mb-4">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
          <v-btn color="amber" rounded class="mr-2" @click="goBack">
            <v-icon left>mdi-arrow-left</v-icon> Back
          </v-btn>
          <v-btn color="primary" rounded to="/">
            <v-icon left>mdi-home</v-icon> Home
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    goBack() {
      this.$router.go(-1); // Go to the previous page
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 90vh;
}
</style>
