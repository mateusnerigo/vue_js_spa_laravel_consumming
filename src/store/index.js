import { createStore } from 'vuex'
import generalFunctions from '@/helpers/generalFunctions';

export default createStore({
  state: {
    isLoggedIn: false
  },
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    }
  },
  mutations: {
    isAuthenticated(state) {
      state.isLoggedIn = generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME);
    }
  },
  actions: {
  },
  modules: {
  }
})
