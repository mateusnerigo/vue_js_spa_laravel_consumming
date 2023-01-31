<template>
    <router-link
        v-if="(isLoggedIn && justLoggedIn) || (!isLoggedIn && !justLoggedIn)"
        :to="`/${route}`"
        class="sidebar-button"
        :class="{
            'sidebar-subitem': subitem,
            'sidebar-last-item': lastItem
        }"
    >
        <span class="material-symbols-outlined">{{ icon }}</span>
        <span class="text">{{ text }}</span>
        <span class="mouse-over-text">{{ text }}</span>
    </router-link>
</template>

<script>
export default {
    name: 'SidebarButton',
    props: {
        route: String,
        icon: String,
        text: String,
        subitem: Boolean,
        lastItem: Boolean,
        justLoggedIn: {
            type: Boolean,
            default: true
        },
        isLoggedIn: Boolean,
    },
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.sidebar-button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    flex-shrink: 0;
}

.sidebar-button {
    display: flex;
    align-items: center;
    text-decoration: none;

    transition: .2s ease-in-out;
    padding: 0.5rem 1.25rem;

    .material-symbols-outlined {
        font-size: 1.5rem;
        width: 1.5rem;
        color: $white;
        transition: 0.2s ease-in-out;
    }

    .text {
        color: $white;
        transition: 0.2s ease-in-out;
    }

    .mouse-over-text {
        position: fixed;
        background-color: $purple;
        color: $white;
        padding: .25rem .5rem;
        border-radius: .125rem;
        margin-left: 3.5rem;
        pointer-events: none;
        opacity: 0;
        transition: .2s ease-in-out;
    }

    &:hover {
        background-color: $dark_purple;

        .material-symbols-outlined, .text {
            color: $dark_white;
        }

        .mouse-over-text {
            opacity: 1;
        }
    }

    &.router-link-exact-active {
        background-color: $dark_purple;
        border-right: 5px solid $dark_white;
        padding: 0.5rem 1rem;


        .material-symbols-outlined, .text {
            color: $dark_white;
        }
    }
}

.sidebar-last-item {
    width: 100%;
    position: absolute;
    bottom: 1rem;
}

</style>

