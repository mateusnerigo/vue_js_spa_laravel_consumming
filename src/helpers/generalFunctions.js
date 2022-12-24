import Cookie from 'js-cookie';

export default {
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

    hasCookieByName(cookieName) {
        if (Cookie.get(cookieName)) {
            return true;
        }

        return false;
    }
}
