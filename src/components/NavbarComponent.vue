<template>
    <nav>
        <div class="nav-logo">
            <router-link to="/">
                <img src="@/assets/img/logo.png" alt="VueSPA project">
            </router-link>
        </div>

        <div class="nav-links">

            <transition name="nav-fade" mode="out-in">
                <div key="1" v-if="$store.state.isLoggedIn">
                    <!-- <router-link to="/dashboard">Dashboard</router-link> -->
                    <router-link to="/salePoints">Sale points</router-link>
                    <router-link to="/clients">Clients</router-link>
                    <router-link to="/products">Products</router-link>
                    <router-link to="/sales">Sales</router-link>
                    <router-link to="/logout">Logout</router-link>
                </div>

                <div key="2" v-else>
                    <router-link to="/">Home</router-link>
                    <router-link to="/login">Login</router-link>
                </div>
            </transition>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarComponent',

    created() {
        this.$store.commit('isAuthenticated');
    },
}
</script>

<style scoped lang="scss">
    nav {
        display: flex;
        direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        height: 4rem;
        width: 100%;
        transition: 0.5s ease;
        border: 1px solid black;
        padding: 0 2rem;

        .nav-logo {
            display: flex;
            justify-content: flex-start;

            img {
                width: 2rem;
            }
        }

        .nav-links {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-end;

            a {
                text-decoration: none;
                padding: 0.5rem 0.5rem;
                margin: 0 0.1rem;
                color: black;
                border-radius: 0.2rem;
            }
        }
    }

    /* Nav user options animation */
    .nav-fade-enter-active, .nav-fade-leave-active { transition: 0.2s ease; }
    .nav-fade-enter-from, .nav-fade-leave-to { opacity: 0; }
</style>
