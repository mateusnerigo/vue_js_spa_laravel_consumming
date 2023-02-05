<template>
    <Modal
        :headerText="headerText"
        :size="'md'"
        :confirmButtonOptions="this.confirmButtonOptions"
        :cancelButtonOptions="this.cancelButtonOptions"
        @emitCallback="saveProducts"
    >
        <div class="form-group">
            <div class="form-row">
                <input type="hidden" v-model="this.idProducts">
                <InputGroup
                    v-bind="this.inputGroups.nameInput"
                    v-model="this.name"
                />

                <InputGroup
                    v-bind="this.inputGroups.standardValueInput"
                    v-model="this.standardValue"
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

            idProducts: (this.registerData.idProducts ?? ''),
            name: (this.registerData.productName ?? ''),
            standardValue: (this.registerData.standardValue ?? ''),

            inputGroups: {
                nameInput: {
                    "name": "productName",
                    "type": "text",
                    "readonly": (this.type === 'view'),
                    "id": "product-name",
                    "label": this.$t("name"),
                    "placeholder": this.$t("ProductName"),
                    "width": 'md'
                },
                standardValueInput: {
                    "name": "standardValue",
                    "type": "number",
                    "readonly": (this.type === 'view'),
                    "id": "standard-value",
                    "label": this.$t("standardValue"),
                    "placeholder": (this.type === 'view') ? '0.00' : this.$t("standardValue"),
                    "width": 'md'
                },
            },

        }
    },
    mounted() {
        this.headerText += ` - ${this.$t(this.type)}`;
    },
    methods: {
        saveProducts() {
            this.$store.dispatch(
                'saveProducts',
                {
                    "idProducts": this.idProducts,
                    "productName": this.name,
                    "standardValue": this.standardValue
                }
            );
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

</style>

