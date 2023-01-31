<template>
    <Modal
        :headerText="headerText"
        :size="'md'"
        :confirmButtonOptions="this.confirmButtonOptions"
        :cancelButtonOptions="this.cancelButtonOptions"
        @emitCallback="saveSalePoint"
    >
        <div class="form-group">
            <div class="form-row">
                <input type="hidden" v-model="this.idSalePoints">
                <InputGroup
                    v-bind="this.inputGroups.nameInput"
                    v-model="this.name"
                />

                <InputGroup
                    v-bind="this.inputGroups.descriptionInput"
                    v-model="this.description"
                />
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import InputGroup from './InputGroup.vue';

export default {
    name: 'EditSalePointModal',
    props: {
        salePointsData: Object,
        type: String,
        registerData: {
            type: Object,
            default: {}
        }
    },
    components: {
        Modal,
        InputGroup
    },
    data() {
        return {
            headerText: this.$t('SalePoint'),
            confirmButtonOptions: {
                "show": (this.type != 'view'),
                "text": "confirm",
                "innerText": "confirm"
            },
            cancelButtonOptions: {
                "show": (this.type != 'view'),
                "text": "close",
                "innerText": "close",
            },

            idSalePoints: (this.registerData.idSalePoints ?? ''),
            name: (this.registerData.salePointName ?? ''),
            description: (this.registerData.description ?? ''),

            inputGroups: {
                nameInput: {
                    "name": "salePointName",
                    "type": "text",
                    "readonly": (this.type === 'view'),
                    "id": "sale-point-name",
                    "label": this.$t("name"),
                    "placeholder": this.$t("SalePointName"),
                    "width": 'md'
                },
                descriptionInput: {
                    "name": "salePointDescription",
                    "type": "text",
                    "readonly": (this.type === 'view'),
                    "id": "sale-point-description",
                    "label": this.$t("description"),
                    "placeholder": (this.type === 'view') ? this.$t("noDescription") : this.$t("SalePointDescription"),
                    "width": 'md'
                },
            },

        }
    },
    mounted() {
        this.headerText += ` - ${this.$t(this.type)}`;
    },
    methods: {
        saveSalePoint() {
            this.$store.dispatch(
                'saveSalePoints',
                {
                    "idSalePoints": this.idSalePoints,
                    "name": this.name,
                    "description": this.description
                }
            );
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

</style>

