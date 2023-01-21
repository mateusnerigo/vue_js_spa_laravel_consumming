<template>
    <Modal
        :headerText="headerText"
        :size="'md'"
        :confirmButtonOptions="this.confirmButtonOptions"
        :cancelButtonOptions="this.cancelButtonOptions"
    >
        <InputGroup
            v-bind="this.inputGroups.nameInput"
            v-model="this.name"
        />

        <InputGroup
            v-bind="this.inputGroups.descriptionInput"
            v-model="this.description"
        />
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import InputGroup from './InputGroup.vue';

export default {
    name: 'EditSalePointModal',
    props: {
        salePointsData: Object,
        type: String
    },
    components: {
        Modal,
        InputGroup
    },
    data() {
        return {
            headerText: this.$t('SalePoint'),
            confirmButtonOptions: {
                "show": true,
                "text": "confirm",
                "innerText": "confirm",
            },
            cancelButtonOptions: {
                "show": true,
                "text": "close",
                "innerText": "close",
            },

            name: '',
            description: '',

            inputGroups: {
                nameInput: {
                    "name": "salePointName",
                    "type": "text",
                    "id": "sale-point-name",
                    "label": this.$t("nome"),
                    "placeholder": this.$t("nomeDoPontoDeVenda"),
                },
                descriptionInput: {
                    "name": "salePointDescription",
                    "type": "text",
                    "id": "sale-point-description",
                    "label": this.$t("description"),
                    "placeholder": this.$t("descricaoDoPontoDeVenda"),
                },
            },

        }
    },
    mounted() {
        this.headerText += ` - ${this.$t(this.type)}`;
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

</style>

