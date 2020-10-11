import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    result: null,
    rawResult: null,
    isLoaded: false,
    isLoading: false,
    resultsQuantity: null,
    outerCode: '',
    importDate: '',
    activeError: null
  },
  mutations: {
    setRawResult(state, payload) {
      state.rawResult = payload;
    },
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
        });

        const optionsArr = [];
        const options = el.options;
        for (let prop in options) {
          optionsArr.push({ name: `${prop}: ${options[prop]}` })
        }

        return {
          name: el.name || 'Название МЦ отсутствует',
          children: [
            { name: `actual_date: ${el.actual_date}` },
            { name: `good_id: ${el.good_id}` },
            { name: `info: ${el.info}` },
            { name: `NREC: ${el.options.TKANNREC || 'не указан'}` },
            { 
              name: 'prices:',
              children: mapPrices
            },
            {
              name: 'options:',
              children: optionsArr
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
    },
    setError(state, payload) {
      state.activeError = payload;
    }
  },
  actions: {
    getSku() {
      this.commit('setLoading', true);
      axios.get(`https://sknesb.ru/api.php/esb.get.skus?good_id=${this.state.outerCode}&access_token=${localStorage.getItem('access-token')}&v=4`)
      .then(response => {
        console.log(response.data);
        this.commit('setError', null)
        this.commit('setRawResult', response.data.skus);
        this.commit('updateSku', response);
        this.commit('updateQuantity', response.data.total);
        router.push('/results');
        this.commit('setLoading', false);
        this.commit('updateImportDate', response.data.updated);
      })
      .catch(error => {
        console.log(error);
        console.log(error.request.status);
        if (error.request.status === 401) {
          this.commit('setError', 'authError')
        }
        else if (error.request.status === 400) {
          this.commit('setError', 'invalidRequest')
        }
        else if (error.request.status === 0) {
          this.commit('setError', 'networkError')
        }
        this.commit('setLoading', false);
      }) 
    }
  }
})
