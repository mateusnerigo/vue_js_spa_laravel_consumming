<template>
    <aside :class="`${isExpanded && 'is-expanded'}`">
        <div class="sidebar-logo">
            <router-link to="/">
                <img src="@/assets/img/logo.png" alt="VueSPA project">
            </router-link>
        </div>

        <div class="sidebar-toggle-wrap">
            <button class="sidebar-toggle" @click="toggleSidebar">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>

        <h3>{{ $t("menu") }}</h3>
        <div class="sidebar-links">
            <!-- <router-link to="/dashboard">Dashboard</router-link> -->
            <SidebarButton
                @click="closeSidebar"
                v-for="sidebarButton in sidebarButtons"
                :key="sidebarButton.route"
                :route="sidebarButton.route"
                :icon="sidebarButton.icon"
                :text="sidebarButton.text"
                :lastItem="sidebarButton.lastItem"
                :isLoggedIn="$store.state.isLoggedIn"
                :justLoggedIn="sidebarButton.justLoggedIn"
            />
        </div>
    </aside>
</template>

<script>
import SidebarButton from './SidebarButton.vue';

export default {
    name: 'Sidebar',
    components: {
        SidebarButton
    },

    data() {
        return {
            isExpanded: false,
            sidebarButtons: [
                {
                    "route": "sales",
                    "icon": "point_of_sale",
                    "text": this.$t("Sales"),
                },
                {
                    "route": "salePoints",
                    "icon": "store_front",
                    "text": this.$t("SalePoints"),
                },
                {
                    "route": "clients",
                    "icon": "group",
                    "text": this.$t("Clients"),
                },
                {
                    "route": "products",
                    "icon": "liquor",
                    "text": this.$t("Products"),
                },
                {
                    "route": "logout",
                    "icon": "logout",
                    "text": this.$t("Logout"),
                    "lastItem": true
                },
                {
                    "route": "",
                    "icon": "home",
                    "text": this.$t("Home"),
                    "justLoggedIn": false
                },
                {
                    "route": "login",
                    "icon": "login",
                    "text": this.$t("Login"),
                    "justLoggedIn": false,
                    "lastItem": true
                },

            ]
        }
    },

    created() {
        this.$store.dispatch('setIsAuthenticated');
    },

    methods: {
        toggleSidebar() {
            this.isExpanded = !this.isExpanded;
        },

        closeSidebar() {
            this.isExpanded = false;
        }
    }
}
</script>

<style scoped lang="scss">
    @import '/src/scss/variables.scss';

    aside {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: $sidebar_wraped_width;
        padding: 1rem;

        background-color: $purple;
        box-shadow: 0px 0px 10px 2px $shadow_black;

        overflow: hidden;
        transition: 0.2s ease-out;
        font-family: 'Lato', sans-serif;
        position: fixed;
        z-index: 99;

        .sidebar-toggle-wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;

            position: relative;
            top: 0;
            transition: .2s ease-out;

            .sidebar-toggle {
                transition: .2s ease-out;

                .material-icons{
                    font-size: 2rem;
                    color: $white;
                    transition: .2s ease-out;
                }

                &:hover {
                    .material-icons {
                        color: $dark_white;
                        transform: translateX(0.25rem);
                    }
                }
            }
        }

        h3 {
            font-size: 0.875rem;
            text-transform: uppercase;
            flex-shrink: 0;
            color: $dark_purple;

            margin-bottom: 0.5rem;

            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        &.is-expanded {
            width: $sidebar_width;

            .sidebar-toggle-wrap{
                top: -3rem;

                .sidebar-toggle {
                    transform: rotate(-180deg);
                }
            }

            h3, :deep(.sidebar-button .text) {
			    opacity: 1;
            }

            :deep(.mouse-over-text) {
                opacity: 0 !important;
            }

            :deep(.sidebar-button) {
                .material-icons {
                    margin-right: 1rem;
                }
            }
        }

        .sidebar-logo {
            margin-bottom: 1rem;

            img {
                width: 2rem;
            }
        }
        .sidebar-links {
            margin: 0 -1rem;
        }

        button {
            background-color: transparent;
        }
    }
</style>
