import { createStore } from 'vuex'

import axios from 'axios';

import generalFunctions from '@/helpers/generalFunctions';

const salePointsRoute = `${process.env.VUE_APP_ROOT_API}/salePoints`;

export default createStore({
  state: {
    isLoggedIn: false,
    isModalActive: false,
    isLoadingActive: false,
    isAlertActive: false,
    alertText: '',
    alertType: '',
    salePoints: [],
  },
  getters: {},
  mutations: {
    isAuthenticated(state) {
      state.isLoggedIn = generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME);
    },

    toggleModal(state, status) {
      state.isModalActive = status;
    },
    toggleLoading(state, status) {
      state.isLoadingActive = status;
    },
    toggleAlert(state, status) {
      state.isAlertActive = status;


      setTimeout(() => {
        state.isAlertActive = false;
      }, 2000);
    },
    updateAlertData(state, alertData) {
      state.alertText = alertData.text;
      state.alertType = alertData.type;
    },

    updateSalePoints(state, data) {
      state.salePoints = data;
    },
  },
  actions: {
    toggleModal({ commit }, isActive) {
      commit('toggleModal', (isActive ? true : false));
    },

    toggleLoading({ commit }, isActive) {
      commit('toggleLoading', (isActive ? true : false));
    },

    toggleAlert({ commit }, isActive) {
      commit('toggleAlert', (isActive ? true : false));
    },

    updateAlert({ commit }, alertData) {
      commit('updateAlertData', alertData)
    },

    async getSalePoints({ commit }, options) {
      if ((this.state.salePoints.length === 0) || options.updateList) {
        await axios.get(
          generalFunctions.prepareRouteParams({
            route: salePointsRoute,
            page: (options.page ?? 1),
            perPage: (options.perPage ?? 10),
            search: (options.search ?? '')
          }),
          {
            headers: {
              'Authorization': generalFunctions.getAuthorization()
            }
          },
        ).then(response => {
          if (response.data.total > 0) {
            commit('updateSalePoints', response.data);
          }
        }).catch((e) => {
          console.log(e)
          this.$router.push('/loginSuccess');
        });
      }

    },
    async saveSalePoints({ commit }, newSalePoint) {
      await axios.post(
        salePointsRoute,
        {
          data: JSON.stringify({
            idSalePoints: (newSalePoint.idSalePoints ?? ''),
            salePointName: (newSalePoint.name ?? ''),
            description: (newSalePoint.description ?? '')
          })
        },
        {
          headers: {
            'Authorization': generalFunctions.getAuthorization()
          }
        },
      ).then(response => {
        console.log(response);
      }).catch((e) => {
        console.log(e)
      });

      this.dispatch('getSalePoints', {
        "updateList": true
      });
      this.dispatch('toggleModal', 0);
    }
  },
  modules: {
  }
})

//{"idSalePoints":"3","salePointName":"NeriGoDev", "description":""}
