<template>
    <button
        v-if="(active && (text != 'activate') && (text != 'edit')) || (!active && (text != 'deactivate') && (text != 'view'))"
        :class="text"
        :title="buttonTitles[text]"
    >
        <span class="material-icons">{{ icon }} </span>
    </button>
</template>

<script>
export default {
    name: 'SidebarButton',
    props: {
        class: String,
        icon: String,
        text: String,
        active: Boolean
    },
    data() {
        return {
            buttonTitles: {
                'view': this.$t("ViewRegister"),
                'edit': this.$t("EditRegister"),
                'activate': this.$t("ActivateRegister"),
                'deactivate': this.$t("DeactivateRegister"),
                'remove': this.$t("RemoveRegister"),
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';
button {
    &.view  { background-color: $dark_yellow; }
    &.edit { background-color: $yellow; }
    &.activate { background-color: $dark_green; }
    &.deactivate { background-color: $dark_red; }
    &.remove { background-color: $dark_gray; }
}
</style>

