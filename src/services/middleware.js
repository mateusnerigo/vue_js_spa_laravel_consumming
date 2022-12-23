import axios from 'axios';
import Cookie from 'js-cookie';

export default {
    async auth(to, from, next) {
        // verifies if the token is created
        if (!Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_NAME)) {
            next('/login');
            return;
        }

        // prepares the header with the current authorization cookies
        const authHeader = Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_TYPE_NAME) +
        " " + Cookie.get(process.env.VUE_APP_COOKIE_TOKEN_NAME);

        // verifies if the token is still valid
        const response = await axios.get(
            `${process.env.VUE_APP_ROOT_API}/verifyAccess`,
            {
                headers: { 'Authorization': authHeader }
            }
        );

        // if it is not valid, redirects to login
        if(!(response.data.data.hasAccess ?? 0)) {
            next('/login');
            return;
        }

        next();
        return;
    }
}
