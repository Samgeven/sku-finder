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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon
              v-bind="attrs"
              v-on="on"
              @click="changeToken"
            >
              <v-icon>mdi-account-reactivate</v-icon>
            </v-btn>
          </template>
          <span>Сменить access token</span>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    changeToken() {
      localStorage.removeItem('access-token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.sku-logo {
  color: #ffffff !important;
  text-decoration: none !important;
}
</style>