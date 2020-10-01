<template>
  <v-app-bar
      app
      color="teal darken-3"
      dark
  >
    <v-container>
      <v-row>
    <div class="d-flex align-center">
      <h1>
        <router-link class="sku-logo" to="/">SKU finder</router-link>
      </h1>
    </div>
    <v-spacer></v-spacer>
    <v-icon>mdi-open-in-new</v-icon>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.sku-logo {
  color: #ffffff !important;
  text-decoration: none !important;
}
</style>