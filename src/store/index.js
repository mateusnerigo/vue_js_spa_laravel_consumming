import { createStore } from 'vuex'
import generalFunctions from '@/helpers/generalFunctions';

export default createStore({
  state: {
    isLoggedIn: false,
    isModalActive: false
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
    }
  },
  actions: {
  },
  modules: {
  }
})
