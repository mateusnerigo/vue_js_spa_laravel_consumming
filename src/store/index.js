import { createStore } from 'vuex'

import router from '@/router';
import axios from 'axios';
import i18n from '@/i18n';

import generalFunctions from '@/helpers/generalFunctions';

const salePointsRoute = `${process.env.VUE_APP_ROOT_API}/salePoints`;
const loginRoute = `${process.env.VUE_APP_ROOT_API}/login`;

export default createStore({
  state: {
    isLoggedIn: false,

    isModalActive: false,

    isConfirmModalActive: false,
    confirmModalTitle: '',
    confirmModalText: '',

    isLoadingActive: false,

    isAlertActive: false,
    alertText: [],
    alertType: '',

    salePoints: [],
  },
  getters: {},
  mutations: {
    setIsAuthenticated(state) {
      state.isLoggedIn = generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME);
    },

    toggleModal(state, status) {
      state.isModalActive = status;
    },

    toggleConfirmModal(state, status) {
      state.isConfirmModalActive = status;
    },

    updateConfirmModal(state, modalData) {
      state.confirmModalTitle = modalData.title;
      state.confirmModalText = modalData.text;
    },

    toggleLoading(state, status) {
      state.isLoadingActive = status;
    },

    toggleAlert(state, status) {
      state.isAlertActive = status;


      setTimeout(() => {
        state.isAlertActive = false;
      }, 5000);
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
    setIsAuthenticated({ commit }) {
      commit('setIsAuthenticated');
    },

    toggleModal({ commit }, isActive) {
      commit('toggleLoading', false);
      commit('toggleModal', (isActive ? true : false));
    },

    toggleConfirmModal({ commit }, isActive) {
      commit('toggleConfirmModal', (isActive ? true : false));
    },

    updateConfirmModal({ commit }, modalData) {
      commit('updateConfirmModal', modalData);
    },

    toggleLoading({ commit }, isActive) {
      commit('toggleLoading', (isActive ? true : false));
    },

    toggleAlert({ commit }, isActive) {
      commit('toggleLoading', false);
      commit('toggleAlert', (isActive ? true : false));
    },

    updateAlert({ commit }, alertData) {
      commit('updateAlertData', alertData)
      commit('toggleAlert', true);
    },

    login({ dispatch }, loginData) {
      dispatch('toggleLoading', 1);

      return new Promise(async (resolve, reject) => {
        await axios.post(loginRoute,
          {
            data: JSON.stringify({
              userName: loginData.userName,
              password: loginData.password
            })
          },
        ).then(response => {
          if ((response.data.type == 'success') &&
            response.data.data.access_token &&
            response.data.data.expires_in > 0
          ) {
            generalFunctions.setAppCookies([
              {
                'name': process.env.VUE_APP_COOKIE_TOKEN_NAME,
                'value': response.data.data.access_token
              },
              {
                'name': process.env.VUE_APP_COOKIE_TOKEN_TYPE_NAME,
                'value': response.data.data.token_type
              }
            ]);

            dispatch('setIsAuthenticated');
            dispatch('toggleLoading', 0);
            resolve(response);
            return;
          }

          if (response.data.msg != '') {
            dispatch('toggleLoading', 0);
            dispatch('updateAlert', {
              "text": [ response.data.msg ],
              "type": response.data.type
            })
            reject('auth')
            return;
          }
        }).catch((errorCatch) => {
          dispatch('toggleLoading', 0);
          reject('internal')
          return;
        });
      }, error => {
        dispatch('toggleLoading', 0);
        reject ('app');
        return;
      })
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
          this.$router.push('/login');
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

      this.dispatch('getSalePoints', { "updateList": true });
      this.dispatch('toggleModal', 0);
    }
  },
  modules: {
  }
})

//{"idSalePoints":"3","salePointName":"NeriGoDev", "description":""}
