import Cookie from 'js-cookie';

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
    }
}
