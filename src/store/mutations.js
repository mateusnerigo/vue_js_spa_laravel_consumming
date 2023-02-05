import generalFunctions from '@/helpers/generalFunctions';

export default {
    setIsAuthenticated(state) {
        state.isLoggedIn = generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME);
    },

    toggleModal(state, status) {
        state.isModalActive = status;
    },

    toggleConfirmModal(state, status) {
        state.confirmModalProps.isActive = status;
    },

    updateConfirmModal(state, modalData) {
        state.confirmModalProps.title = modalData.title;
        state.confirmModalProps.text = modalData.text;
        state.confirmModalProps.callbackFn = modalData.callback;
    },

    updateConfirmModalCallbackData(state, modalCallbackData) {
        state.confirmModalProps.callbackFn = modalCallbackData.callback;
        state.confirmModalProps.callbackData = modalCallbackData.data;
    },

    toggleLoading(state, status) {
        state.isLoadingActive = status;
    },

    toggleAlert(state, status) {
        state.alertProps.isActive = status;


        setTimeout(() => {
            state.alertProps.isActive = false;
        }, 2500);
    },

    updateAlertData(state, alertData) {
        state.alertProps.type = alertData.type;
        state.alertProps.texts = alertData.text;
    },

    setSalePointsDatatableOptions(state, options) {
        state.dtProps.salePoints.page = options.page;
        state.dtProps.salePoints.perPage = options.perPage;
        state.dtProps.salePoints.search = options.search;
    },

    setProductsDatatableOptions(state, options) {
        state.dtProps.products.page = options.page;
        state.dtProps.products.perPage = options.perPage;
        state.dtProps.products.search = options.search;
    },

    updateSalePoints(state, data) {
        state.registers.salePoints = data;
    },

    updateProducts(state, data) {
        state.registers.products = data;
    },
}
