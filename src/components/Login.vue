<template>
    <v-container class="fill-height">
      <v-row class="fill-height">
        <v-card 
          width="480" 
          height="100%" 
          max-height="250" 
          class="mx-auto align-self-center px-4 px-sm-12 px-md-12 px-lg-12">
          <v-row class="fill-height d-flex flex-column justify-center px-4 px-sm-12 px-md-12 px-lg-12">
            <h1 class="text-h5 font-weight-medium mb-6">Введите токен</h1>
            <v-form>
              <v-text-field
                label="SKNESB access token"
                v-model="accessToken"
                filled
                dense
              />
            </v-form>
          <v-btn 
            @click="saveToken"
            class="align-self-center"
          >Войти
          </v-btn>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    accessToken: ''
  }),
  methods: {
    saveToken() {
      localStorage.setItem('access-token', this.accessToken);
      this.$router.push('/');
    }
  }
}
</script>