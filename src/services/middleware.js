import axios from 'axios';
import Cookie from 'js-cookie';

import generalFunctions from '@/helpers/generalFunctions';

export default {
    async auth(to, from, next) {
        const tokenType = Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_TYPE_NAME);
        const token = Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_NAME);
        const verifyAccessRoute = `${process.env.VUE_APP_ROOT_API}/verifyAccess`;

        // verifies if the token is created
        if (!token) {
            next('/login');
            return;
        }

        // verifies if the token is still valid
        const response = await axios.get(
            verifyAccessRoute,
            {
                headers: { 'Authorization': `${tokenType} ${token}` }
            }
        );

        // if it is not valid, redirects to login
        if(!(response.data.data.hasAccess ?? 0)) {
            generalFunctions.removeAppCookies();

            next('/login');
            return;
        }

        next();
        return;
    }
}
