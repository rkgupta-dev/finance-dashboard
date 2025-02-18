<template>
  <v-app>
    <DashboardLayout>
      <router-view></router-view>
    </DashboardLayout>
  </v-app>
</template>

<script>
import DashboardLayout from "./components/DashboardLayout.vue";

export default {
  name: "App",
  components: {
    DashboardLayout,
  },
};
</script>

<style></style>
