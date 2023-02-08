<template>
    <DatatablePage
        :headerTitle="this.headerTitle"
        :registersKey="'products'"
        :identifier="'idProducts'"
        :nameField="'productName'"
        :datatableTextFields="this.datatableTextFields"
        :callbackUpdateDatatableOptions="'setProductsDatatableOptions'"
        @showModal="showModal"
        @toggleRegister="toggleRegister"
        @getRegisters="getProducts"
    >
        <ProductModal
            v-if="$store.state.isModalActive"
            :type="this.modalType"
            :registerData="this.modalData"
        />
    </DatatablePage>
</template>

<script>
import DatatablePage from '@/components/DatatablePage.vue';
import ProductModal from '@/components/ProductModal.vue';

export default {
    name: 'ProductsView',
    components: {
        DatatablePage,
        ProductModal
    },
    data() {
       return {
           headerTitle: this.$t('Products'),
           datatableTextFields: [
               { 'name': 'status', 'field': 'isActive' },
               { 'name': 'id', 'field': 'idProducts' },
               { 'name': 'name', 'field': 'productName' },
               { 'name': 'standardValue', 'field': 'standardValue' },
               { 'name': 'lastUpdate', 'field': 'updatedAt' }
           ],
           modalType: '',
           modalData: {},
           productData: {},
       }
    },
    methods: {
        getProducts(updateList = false) {
            this.$store.dispatch('getProducts', updateList);
        },

        toggleRegister(registerData) {
            this.productData = {
                idProducts: registerData.idProducts,
                isActive: registerData.isActive
            };
        },

        showModal(data) {
            this.modalData = data.data;
            this.modalType = data.type;

            this.$store.dispatch('toggleModal', 1);
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
