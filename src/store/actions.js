import router from '@/router';
import axios from 'axios';

const ROUTES = {
    'login': `${process.env.VUE_APP_ROOT_API}/login`,
    'salePoints': `${process.env.VUE_APP_ROOT_API}/salePoints`,
    'products': `${process.env.VUE_APP_ROOT_API}/products`,
}

import generalFunctions from '@/helpers/generalFunctions';

export default {
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

    setConfirmModalData({ commit, dispatch }, callbackData) {
        let title = '';
        let text = '';

        if (callbackData.type == 'activate') {
            title = "ActivateRegister";
            text = "onConfirmThisRegisterWillBeAbleForUseAndEdits";
        } else if (callbackData.type == 'deactivate') {
            title = "DeactivateRegister";
            text = "onConfirmThisRegisterWillNotBeAbleForUseOrEdits";
        }

        dispatch('updateConfirmModal', { title, text });
        commit('updateConfirmModalCallbackData', callbackData);
    },

    toggleLoading({ commit }, isActive) {
        commit('toggleLoading', (isActive ? true : false));
    },

    toggleAlert({ commit }, isActive) {
        if (this.state.alertProps.texts.length && this.state.alertProps.type) {
            commit('toggleAlert', (isActive ? true : false));
        }
    },

    updateAlert({ commit }, alertData) {
        commit('updateAlertData', alertData)
    },

    login({ dispatch }, loginData) {
        dispatch('toggleLoading', 1);

        return new Promise(async (resolve, reject) => {
            await axios.post(ROUTES['login'],
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
                        "text": [response.data.msg],
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
            reject('app');
            return;
        })
    },

    async toggleRegister({ dispatch }) {
        dispatch('toggleConfirmModal', 0);
        dispatch('toggleLoading', 1);

        const registerData = this.state.confirmModalProps.callbackData;

        await axios.get(
            `${ROUTES[registerData.route]}/toggle/${registerData.registerIdToToggle}`,
            {
                headers: {
                    'Authorization': generalFunctions.getAuthorization()
                }
            },
        ).then(response => {
            dispatch(registerData.registersGetter, true);

            const alertText = (registerData.registerStatus)
                ? "deactivatedSuccessfully"
                : "activatedSuccessfully"

            dispatch('updateAlert', {
                'text': [
                    {'raw': registerData.registerName, 'translate': false},
                    " ",
                    alertText
                ],
                'type': 'success'
            })
            dispatch('toggleAlert', 1);
        }).catch((e) => {
            const alertText = (registerData.registerStatus)
                ? "Deactivating"
                : "Activating"

            dispatch('getProducts', true);
            dispatch('updateAlert', {
                'text': [`errorOn${alertText}Register`],
                'type': 'danger'
            })
        });
    },

    setSalePointsDatatableOptions({ commit }, options) {
        commit('setSalePointsDatatableOptions', options);
    },

    async getSalePoints({ dispatch, commit }, updateRegisters = false) {
        if ((this.state.registers.salePoints.length === 0) || updateRegisters) {
            dispatch('toggleLoading', 1);

            await axios.get(
                generalFunctions.prepareRouteParams({
                    route: ROUTES['salePoints'],
                    page: (this.state.dtProps.salePoints.page ?? 1),
                    perPage: (this.state.dtProps.salePoints.perPage ?? 10),
                    search: (this.state.dtProps.salePoints.search ?? '')
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
            ROUTES['salePoints'],
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
            dispatch('updateAlert', {
                'text': [response.data.type == 'success' ? alertTexts.success : response.data.msg],
                'type': response.data.type
            })
            dispatch('toggleAlert', 1);


            if (response.data.type != 'success') {
                dispatch('toggleAlert', 1);
                return;
            }
        }).catch((e) => {
            console.log(e)
            dispatch('updateAlert', {
                'text': [alertTexts.error],
                'type': 'danger'
            })
            dispatch('toggleAlert', 1);
        });

        this.dispatch('getSalePoints', true);
        this.dispatch('toggleLoading', 0);
        this.dispatch('toggleModal', 0);
    },

    setProductsDatatableOptions({ commit }, options) {
        commit('setProductsDatatableOptions', options);
    },

    async getProducts({ dispatch, commit }, updateRegisters = false) {
        if ((this.state.registers.products.length === 0) || updateRegisters) {
            dispatch('toggleLoading', 1);

            await axios.get(
                generalFunctions.prepareRouteParams({
                    route: ROUTES['products'],
                    page: (this.state.dtProps.products.page ?? 1),
                    perPage: (this.state.dtProps.products.perPage ?? 10),
                    search: (this.state.dtProps.products.search ?? '')
                }),
                {
                    headers: {
                        'Authorization': generalFunctions.getAuthorization()
                    }
                },
            ).then(response => {
                if (response.data.total > 0) {
                    commit('updateProducts', response.data);
                }

                dispatch('toggleLoading', 0);
            }).catch((e) => {
                console.log(e)
                router.push('/login');
            });
        }
    },

    async saveProducts({ dispatch }, newProduct) {
        dispatch('toggleLoading', 1);

        let alertTexts = {
            success: newProduct.idProducts ? "registerUpdatedSuccessfully" : "newRegisterCreatedSuccessfully",
            error: newProduct.idProducts ? "errorOnUpdatingRegister" : "errorOnCreatingNewRegister"
        }

        await axios.post(
            ROUTES['products'],
            {
                data: JSON.stringify({
                    idProducts: (newProduct.idProducts ?? ''),
                    productName: (newProduct.productName ?? ''),
                    standardValue: (newProduct.standardValue ?? '')
                })
            },
            {
                headers: {
                    'Authorization': generalFunctions.getAuthorization()
                }
            },
        ).then(response => {
            dispatch('updateAlert', {
                'text': [response.data.type == 'success' ? alertTexts.success : response.data.msg],
                'type': response.data.type
            })
            dispatch('toggleAlert', 1);


            if (response.data.type != 'success') {
                dispatch('toggleAlert', 1);
                return;
            }
        }).catch((e) => {
            console.log(e)
            dispatch('updateAlert', {
                'text': [alertTexts.error],
                'type': 'danger'
            })
            dispatch('toggleAlert', 1);
        });

        this.dispatch('getProducts', true);
        this.dispatch('toggleLoading', 0);
        this.dispatch('toggleModal', 0);
    },
}
