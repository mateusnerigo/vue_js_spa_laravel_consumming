<template>
    <nav>
        <router-link to="/">Home</router-link>

        <div v-if="getIsLoggedIn">
            <router-link to="/salePoints">Sale points</router-link>
            <router-link to="/clients">Clients</router-link>
            <router-link to="/products">Products</router-link>
            <router-link to="/sales">Sales</router-link>
            <router-link to="/logout">Logout Direto</router-link>
        </div>

        <router-link v-else to="/login">Login</router-link>

    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NavbarComponent',
    created() {
        this.$store.commit('isAuthenticated');
    },

    computed: {
        ...mapGetters(['getIsLoggedIn'])
    }
}
</script>
