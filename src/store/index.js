import { createStore } from 'vuex'

import router from '@/router';
import axios from 'axios';

import generalFunctions from '@/helpers/generalFunctions';

const routes = {
  'login': `${process.env.VUE_APP_ROOT_API}/login`,
  'salePoints': `${process.env.VUE_APP_ROOT_API}/salePoints`,
}


export default createStore({
  state: {
    isLoggedIn: false,

    isModalActive: false,

    isConfirmModalActive: false,
    confirmModalTitle: '',
    confirmModalText: '',
    confirmModalCallback: '',
    confirmModalCallbackData: {},

    isLoadingActive: false,

    isAlertActive: false,
    alertText: [],
    alertType: '',

    salePoints: [],
    salePointsDtPage: 1,
    salePointsDtPerPage: 10,
    salePointsDtSearch: '',
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
      state.confirmModalCallback = modalData.callback;
    },

    updateConfirmModalCallbackData(state, modalCallbackData) {
      state.confirmModalCallback = modalCallbackData.callback;
      state.confirmModalCallbackData = modalCallbackData.data;
    },

    toggleLoading(state, status) {
      state.isLoadingActive = status;
    },

    toggleAlert(state, status) {
      state.isAlertActive = status;


      setTimeout(() => {
        state.isAlertActive = false;
      }, 2500);
    },

    updateAlertData(state, alertData) {
      state.alertText = alertData.text;
      state.alertType = alertData.type;
    },

    setSalePointsDatatableOptions(state, options) {
      state.salePointsDtPage = options.page;
      state.salePointsDtPerPage = options.perPage;
      state.salePointsDtSearch = options.search;
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
      commit('toggleModal', (isActive ? true : false));
    },

    toggleConfirmModal({ commit }, isActive) {
      commit('toggleConfirmModal', (isActive ? true : false));
    },

    updateConfirmModal({ commit }, modalData) {
      commit('updateConfirmModal', modalData);
    },

    setConfirmModalData({ commit }, callbackData) {
      generalFunctions.handleConfirmModalTexts(callbackData.type);

      commit('updateConfirmModalCallbackData', callbackData);
    },

    toggleLoading({ commit }, isActive) {
      commit('toggleLoading', (isActive ? true : false));
    },

    toggleAlert({ commit }, isActive) {
      if (this.state.alertText && this.state.alertType) {
        commit('toggleAlert', (isActive ? true : false));
      }
    },

    updateAlert({ commit }, alertData) {
      commit('updateAlertData', alertData)
    },

    login({ dispatch }, loginData) {
      dispatch('toggleLoading', 1);

      return new Promise(async (resolve, reject) => {
        await axios.post(routes['login'],
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
            dispatch('toggleAlert', 1);

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

    setSalePointsDatatableOptions({ commit }, options) {
      commit('setSalePointsDatatableOptions', options);
    },

    async getSalePoints({ dispatch, commit }, updateList = false) {
      if ((this.state.salePoints.length === 0) || updateList) {
        dispatch('toggleLoading', 1);

        await axios.get(
          generalFunctions.prepareRouteParams({
            route: routes['salePoints'],
            page: (this.state.salePointsDtPage ?? 1),
            perPage: (this.state.salePointsDtPerPage ?? 10),
            search: (this.state.salePointsDtSearch ?? '')
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

          dispatch('toggleLoading', 0);
          dispatch('toggleAlert', 1);
        }).catch((e) => {
          console.log(e)
          router.push('/login');
        });
      }
    },

    async saveSalePoints({ dispatch }, newSalePoint) {
      dispatch('toggleLoading', 1);

      let alertTexts = {
        success: newSalePoint.idSalePoints ? "registerUpdatedSuccessfully" : "newRegisterCreatedSuccessfully",
        error: newSalePoint.idSalePoints ? "errorOnUpdatingRegister" : "errorOnCreatingNewRegister"
      }

      await axios.post(
        routes['salePoints'],
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
        dispatch('updateAlert', {
          'text': [ response.data.type == 'success' ? alertTexts.success : response.data.msg ],
          'type': response.data.type
        })

        if (response.data.type != 'success') {
          dispatch('toggleAlert', 1);
          return;
        }
      }).catch((e) => {
        console.log(e)
        dispatch('updateAlert', {
          'text': [ alertTexts.error ],
          'type': 'danger'
        })
        dispatch('toggleAlert', 1);
      });

      this.dispatch('getSalePoints', true);
      this.dispatch('toggleLoading', 0);
      this.dispatch('toggleModal', 0);
    },

    async toggleRegister({ dispatch }) {
      dispatch('toggleConfirmModal', 0);
      dispatch('toggleLoading', 1);

      const registerData = this.state.confirmModalCallbackData;

      await axios.get(
        `${routes[registerData.route]}/toggle/${registerData.registerIdToToggle}`,
        { headers: { 'Authorization': generalFunctions.getAuthorization() } },
      ).then(response => {
        dispatch('getSalePoints', true);

        const alertText = (registerData.registerStatus)
          ? "deactivatedSuccessfully"
          : "activatedSuccessfully"

        dispatch('updateAlert', {
          'text': [ registerData.registerName, " ", alertText ],
          'type': 'success'
        })
        dispatch('toggleAlert', 1);
      }).catch((e) => {
        const alertText = (registerData.registerStatus)
          ? "Deactivating"
          : "Activating"

        dispatch('getSalePoints', true);
        dispatch('updateAlert', {
          'text': [ `errorOn${alertText}Register` ],
          'type': 'danger'
        })
      });
    }

  },
  modules: {
  }
})

//{"idSalePoints":"3","salePointName":"NeriGoDev", "description":""}
