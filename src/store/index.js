import { createStore } from 'vuex'

import axios from 'axios';

import generalFunctions from '@/helpers/generalFunctions';

const salePointsRoute = `${process.env.VUE_APP_ROOT_API}/salePoints`;

export default createStore({
  state: {
    isLoggedIn: false,
    isModalActive: false,
    salePoints: [],
  },
  getters: {},
  mutations: {
    isAuthenticated(state) {
      state.isLoggedIn = generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME);
    },

    activeModal(state) {
      state.isModalActive = true;
    },
    deactiveModal(state) {
      state.isModalActive = false;
    },
    toggleModal(state, data) {
      state.isModalActive = data;
    },

    updateSalePoints(state, data) {
      state.salePoints = data;
    },
  },
  actions: {
    toggleModal({ commit }, isActive) {
      commit('toggleModal', (isActive ? true : false));
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
