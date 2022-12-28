<template>
    <nav>
        <router-link to="/">Home</router-link>

        <div v-if="this.isLoggedIn">
            <router-link to="/salePoints">Sale points</router-link>
            <router-link to="/clients">Clients</router-link>
            <router-link to="/products">Products</router-link>
            <router-link to="/sales">Sales</router-link>
            <router-link to="/logout">Logout</router-link>
        </div>

        <router-link v-else to="/login">Login</router-link>
    </nav>
</template>

<script>
import generalFunctions from '@/helpers/generalFunctions';

export default {
    name: 'NavbarComponent',
    data() {
        return {
            isLoggedIn: generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME),
        }
    },
}
</script>
