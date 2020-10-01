import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    result: null,
    isLoaded: false,
    isLoading: false,
    resultsQuantity: null,
    outerCode: '',
    importDate: ''
  },
  mutations: {
    updateSku(state, payload) {
      state.result = payload.data.skus.map(el => {
        const mapPrices = el.prices.map(price => {
          return {
            name: 'price',
            children: [
              { name: `old: ${price.old}` },
              { name: `new: ${price.new}` },
              { name: `type: ${price.type}` },
            ]
          }
        })
        return {
          name: el.name || 'Название МЦ отсутствует',
          children: [
            { name: `actual_date: ${el.actual_date}` },
            { name: `good_id: ${el.good_id}` },
            { name: `info: ${el.info}` },
            { 
              name: `prices:`,
              children: mapPrices
            }
          ]
        }
      });
      state.isLoaded = true;
    },
    updateQuantity(state, payload) {
      state.resultsQuantity = payload;
    },
    updateOuterCode(state, payload) {
      state.outerCode = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    updateImportDate(state, payload) {
      state.importDate = payload;
    }
  },
  actions: {
    getSku() {
      this.commit('setLoading', true);
      axios.get(`https://sknesb.ru/api.php/esb.get.skus?good_id=${this.state.outerCode}&access_token=${localStorage.getItem('access-token')}&v=4`)
      .then(response => {
        console.log(response.data);
        this.commit('updateSku', response);
        this.commit('updateQuantity', response.data.total);
        router.push('/results');
        this.commit('setLoading', false);
        this.commit('updateImportDate', response.data.updated);
      })
      .catch(error => {
        console.log(error);
        this.commit('setLoading', false);
      }) 
    }
  }
})
