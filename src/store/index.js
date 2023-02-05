import { createStore } from 'vuex'
import mutations from './mutations';
import actions from './actions';

export default createStore({
  state: {
    isLoggedIn: false,
    isLoadingActive: false,

    isModalActive: false,

    userData: {},

    registers: {
      salePoints: [],
      clients: [],
      sales: [],
      products: [],
    },

    alertProps: {
      isActive: false,
      type: '',
      texts: []
    },

    confirmModalProps: {
      isActive: false,
      title: '',
      text: '',
      callbackFn: '',
      callbackData: {}
    },

    dtProps: {
      salePoints: {
        page: 1,
        perPage: 10,
        search: ''
      },
      clients: {
        page: 1,
        perPage: 10,
        search: ''
      },
      sales: {
        page: 1,
        perPage: 10,
        search: ''
      },
      products: {
        page: 1,
        perPage: 10,
        search: ''
      },
    },
  },
  getters: {},
  mutations,
  actions,
  modules: {
  }
})

