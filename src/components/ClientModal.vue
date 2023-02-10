<template>
    <Modal
        :headerText="headerText"
        :size="'md'"
        :confirmButtonOptions="this.confirmButtonOptions"
        :cancelButtonOptions="this.cancelButtonOptions"
        @emitCallback="saveClients"
    >
        <div class="form-group">
            <div class="form-row">
                <input type="hidden" v-model="this.idClients">
                <InputGroup
                    v-bind="this.inputGroups.nameInput"
                    v-model="this.name"
                />

                <InputGroup
                    v-bind="this.inputGroups.salePointsInput"
                    v-model="this.salePoints"
                />
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import InputGroup from './InputGroup.vue';

export default {
    name: 'ProductModal',
    props: {
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
            headerText: this.$t('Product'),
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

            idClients: (this.registerData.idClients ?? ''),
            name: (this.registerData.productName ?? ''),
            salePoints: (this.registerData.salePoints ?? ''),

            inputGroups: {
                nameInput: {
                    "name": "clientName",
                    "type": "text",
                    "readonly": (this.type === 'view'),
                    "id": "client-name",
                    "label": this.$t("name"),
                    "placeholder": this.$t("ClientName"),
                    "width": 'md'
                },
                salePointsInput: {
                    "name": "salePoints",
                    "type": "text",
                    "readonly": (this.type === 'view'),
                    "id": "sale-points",
                    "label": this.$t("salePoints"),
                    "placeholder": (this.type === 'view') ? '0.00' : this.$t("salePoints"),
                    "width": 'md'
                },
            },

        }
    },
    mounted() {
        this.headerText += ` - ${this.$t(this.type)}`;
    },
    methods: {
        saveClients() {
            this.$store.dispatch(
                'saveClients',
                {
                    "idClients": this.idClients,
                    "clientName": this.name,
                    "salePoints": this.salePoints
                }
            );
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

</style>

