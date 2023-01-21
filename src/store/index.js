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
    updateSalePoints(state, data) {
      state.salePoints = data;
    },
    toggleModal(state, data) {
      state.isModalActive = data;
    }
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
            page: options.page,
            perPage: options.perPage,
            search: options.search
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

    }
  },
  modules: {
  }
})
