<template>
    <button
        :class="[
            type || text,
            !icon && 'text-only'
        ]"
        :title="buttonTitles[text]"
    >
        <span v-if="icon"
            class="material-symbols-outlined"
            :class="[ !innerText && 'icon-only' ]"
        >{{ icon }} </span>
        <template v-if="innerText">{{ innerText }}</template>
    </button>
</template>

<script>
export default {
    name: 'SidebarButton',
    props: {
        icon: String,
        text: String,
        innerText: String,
        type: String
    },
    data() {
        return {
            buttonTitles: {
                'view': this.$t("ViewRegister"),
                'edit': this.$t("EditRegister"),
                'add': this.$t("AddRegister"),
                'activate': this.$t("ActivateRegister"),
                'deactivate': this.$t("DeactivateRegister"),
                'remove': this.$t("RemoveRegister"),
                'confirm': this.$t("Confirm"),
                'save': this.$t("Save"),
                'cancel': this.$t("Cancel"),
                'close': this.$t("Close"),
                'login': this.$t('Login')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';
button {
    padding: 0;
    
    .material-symbols-outlined.icon-only {
        padding: 0.5rem;
    }

    &.view  { background-color: $dark_yellow; }
    &.edit { background-color: $yellow; }
    &.add { background-color: $green; }
    &.activate { background-color: $dark_green; }
    &.deactivate { background-color: $dark_red; }
    &.remove { background-color: $dark_gray; }
    &.confirm { background-color: $blue ;}
    &.save { background-color: $green ;}
    &.cancel { background-color: $red ;}
    &.close { background-color: $gray ;}
    &.login { background-color: $dark_blue ;}

    &.add ,
    &.confirm,
    &.save,
    &.cancel,
    &.close,
    &.login,
    &.text-only {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        width: 5.5rem;
        height: 2.25rem;
        text-transform: capitalize;
    }

    &.text-only {
        justify-content: center;
    }
}
</style>

