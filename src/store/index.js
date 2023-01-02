import { createStore } from 'vuex'
import generalFunctions from '@/helpers/generalFunctions';

export default createStore({
  state: {
    isLoggedIn: false
  },
  getters: {},
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
