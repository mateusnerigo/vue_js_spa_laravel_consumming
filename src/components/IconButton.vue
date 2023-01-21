<template>
    <button
        :class="text"
        :title="buttonTitles[text]"
    >
        <span v-if="icon" class="material-icons">{{ icon }} </span>
        <template v-if="innerText">{{ innerText }}</template>
    </button>
</template>

<script>
export default {
    name: 'SidebarButton',
    props: {
        icon: String,
        text: String,
        innerText: String
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
    &.add { background-color: $green; }
    &.activate { background-color: $dark_green; }
    &.deactivate { background-color: $dark_red; }
    &.remove { background-color: $dark_gray; }

    &.add ,
    &.confirm,
    &.save,
    &.cancel,
    &.close {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        width: 5.5rem;
        height: 2.25rem;
        text-transform: capitalize;
    }

    &.confirm { background-color: $blue ;}
    &.save { background-color: $green ;}
    &.cancel { background-color: $red ;}
    &.close { background-color: $gray ;}
}
</style>

