import Cookie from 'js-cookie';
import store from '@/store';

export default {
    getAuthorization() {
        return `${Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_TYPE_NAME)} ${Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_NAME)}`
    },

    removeAppCookies() {
        const cookiesToRemove = [
            process.env.VUE_APP_COOKIE_TOKEN_NAME,
            process.env.VUE_APP_COOKIE_TOKEN_TYPE_NAME
        ]

        cookiesToRemove.forEach(cookieToRemove => {
            Cookie.remove(cookieToRemove, { sameSite: 'strict' });
        });
    },

    setAppCookies(cookiesToSet) {
        cookiesToSet.forEach(cookieToSet => {
            Cookie.set(
                cookieToSet.name,
                cookieToSet.value,
                { sameSite: 'strict' }
            )
        })
    },

    /**
     * Verifies a cookie by its name
     * @param   string cookieName A cookie name to verify
     * @returns boolean
     */
    hasCookieByName(cookieName) {
        if (Cookie.get(cookieName)) {
            return true;
        }

        return false;
    },

    prepareRouteParams({ route, page, perPage, search }) {
        let routeWithParameters = route;

        if (page || perPage || search) {
            let getParameters = [];
            if (page) { getParameters.push((`page=${page}`).trim()); }
            if (perPage) { getParameters.push((`perPage=${perPage}`).trim()); }
            if (search) { getParameters.push((`search=${search}`).trim()); }
            routeWithParameters = route.concat("?", getParameters.join('&'));
        }

        return routeWithParameters;
    },

    handleRequisitionErrors(error) {
        if (error == 'internal') {
            store.dispatch('updateAlert', {
                "text": [ "internalServerError", "tryAgainLater" ],
                "type": "danger"
            });
            return;
        }

        if (error == 'app') {
            store.dispatch('updateAlert', {
                "text": [ "unexpectedApplicationError", "pleaseContactSupport" ],
                "type": "danger"
            });
            return;
        }
    },

    handleConfirmModalTexts(type) {
        let title = '';
        let text = '';

        if (type == 'activate') {
            title = "ActivateRegister";
            text = "onConfirmThisRegisterWillBeAbleForUseAndEdits";
        } else if (type == 'deactivate') {
            title = "DeactivateRegister";
            text = "onConfirmThisRegisterWillNotBeAbleForUseOrEdits";
        } else if (type == 'remove') {
            title = "RemoveRegister";
            text = "beCarefulOnConfirmThisRegisterWillNeverBeAbleForUseOrEditsAgain";
        }

        store.dispatch('updateConfirmModal', { title, text });
    }
}
