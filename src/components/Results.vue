<template>
  <v-main>
    <v-container>
      <v-row class="mt-8 flex-column">
        <router-link class="to-search-link" to="/">
          <v-btn class="align-self-start mb-6">
            Вернуться к поиску
          </v-btn>
        </router-link>
        <v-alert
          :type="resultsQuantity > 0 ? 'info' : 'error'"
          dense
          text
          :color="resultsQuantity > 0 ? 'teal' : 'red darken-3'"
        >
          {{ message }}
        </v-alert>
        <v-text-field
          label="Поиск по названию МЦ"
          v-model="searchQuery"
          filled
          dense
          solo
        />
        <v-treeview
          dense
          :items="filteredSku"
        >
        <v-alert
          v-if="filteredSku.length === 0 && result.length !== 0"
        >
        Совпадений не найдено :(
        </v-alert>
        </v-treeview>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Results',
  data: () => ({
    searchQuery: ''
  }),
  computed: {
    ...mapState([
        'resultsQuantity',
        'result',
        'isLoaded',
        'outerCode',
        'importDate'
    ]),
    message() {
      if (this.resultsQuantity > 0) {
        return `По внешнему коду ${this.outerCode} найдено ${this.resultsQuantity} SKU. Дата импорта - ${this.importDate}`
      }
      else {
        return `По внешнему коду ${this.outerCode} ничего не найдено`
      }
    },
    filteredSku() {
      return this.result.filter(el => {
        return this.searchQuery ? el.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : this.result
      })
    }
  }
}
</script>

<style scoped>
.to-search-link {
  text-decoration: none;
}
</style>