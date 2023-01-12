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
                    <router-link to="/salePoints">{{ $t("SalePoints") }}</router-link>
                    <router-link to="/clients">{{ $t("Clients") }}</router-link>
                    <router-link to="/products">{{ $t("Products") }}</router-link>
                    <router-link to="/sales">{{ $t("Sales") }}</router-link>
                    <router-link to="/logout">{{ $t("Logout") }}</router-link>
                </div>

                <div key="2" v-else>
                    <router-link to="/">{{ $t("Home") }}</router-link>
                    <router-link to="/login">{{ $t("Login") }}</router-link>
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
    @import '/src/scss/variables.scss';

    nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 12rem;
        // border: 1px solid $black;
        transition: 0.5s ease;
        padding: 2rem 0;
        background: $purple;
        box-shadow: 0px 0px 10px 2px $dark_white;

        .nav-logo {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 2rem;

            img {
                width: 2rem;
            }
        }

        .nav-links {
            display: flex;
            flex-direction: column;

            &>div {
                display: flex;
                flex-direction: column;
            }

            a {
                text-decoration: none;
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                // border: 1px solid black;
                color: $white;
                border-radius: 0.2rem;

                font-family: 'Lato', sans-serif;
                font-size: 1rem;
                font-weight: 600;

                transition: .3s ease;
                word-wrap: normal;

                &:hover, &:focus, &:active {
                    color: $light_black;
                }
            }
        }
    }

    /* Nav user options animation */
    .nav-fade-enter-active, .nav-fade-leave-active { transition: 0.2s ease; }
    .nav-fade-enter-from, .nav-fade-leave-to { opacity: 0; }
</style>
