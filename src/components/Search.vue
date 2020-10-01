<template>
    <v-container class="fill-height">
      <v-row class="fill-height">
        <v-card 
          width="480" 
          height="100%" 
          max-height="250" 
          class="mx-auto align-self-center px-4 px-sm-12 px-md-12 px-lg-12">
          <v-row class="fill-height d-flex flex-column justify-center px-4 px-sm-12 px-md-12 px-lg-12">
            <h1 class="text-h5 font-weight-medium mb-6">Введите внешний код</h1>
            <v-form>
              <v-text-field
                label="Внешний код"
                v-model="outerCode"
                filled
                dense
              />
            </v-form>
          <v-btn 
            @click="getNewSku"
            :loading="isLoading"
            class="align-self-center"
          >get sku
          </v-btn>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Search',
  methods: {
    getNewSku() {
      this.$store.dispatch('getSku');
    }
  },
  computed: {
    ...mapState([
        'resultsQuantity',
        'result',
        'isLoaded',
        'isLoading'
    ]),
    outerCode: {
      get() {
          return this.$store.state.outerCode
      },
      set(value) {
          this.$store.commit('updateOuterCode', value)
      }
    },
  }
}
</script>