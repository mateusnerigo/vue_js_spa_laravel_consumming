<template>
    <DatatablePage
        :headerTitle="this.headerTitle"
        :registersKey="'products'"
        :registersGetter="'getProducts'"
        :identifier="'idProducts'"
        :nameField="'productName'"
        :datatableTextFields="this.datatableTextFields"
        :callbackUpdateDatatableOptions="'setProductsDatatableOptions'"
        @showModal="showProductsModal"
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
       }
    },
    methods: {
        showProductsModal(data) {
            this.modalData = data.data;
            this.modalType = data.type;

            this.$store.dispatch('toggleModal', 1);
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
