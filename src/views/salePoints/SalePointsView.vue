<template>
    <DatatablePage
        :headerTitle="this.headerTitle"
        :registersKey="'salePoints'"
        :registersGetter="'getSalePoints'"
        :identifier="'idSalePoints'"
        :nameField="'salePointName'"
        :datatableTextFields="this.datatableTextFields"
        :callbackUpdateDatatableOptions="'setSalePointsDatatableOptions'"
        @showModal="showSalePointsModal"
    >
        <SalePointModal
            v-if="$store.state.isModalActive"
            :type="this.modalType"
            :registerData="this.modalData"
        />
    </DatatablePage>
</template>

<script>
import DatatablePage from '@/components/DatatablePage.vue';
import SalePointModal from '@/components/SalePointModal.vue';

export default {
    name: 'SalePointsView',
    components: {
        DatatablePage,
        SalePointModal
    },
    data() {
        return {
            headerTitle: this.$t('SalePoints'),
            datatableTextFields: [
                { 'name': 'status', 'field': 'isActive'} ,
                { 'name': 'id', 'field': 'idSalePoints' },
                { 'name': 'name', 'field': 'salePointName' },
                { 'name': 'lastUpdate', 'field': 'updatedAt' }
            ],
            modalType: '',
            modalData: {},
        }
    },
    methods: {
        showSalePointsModal(data) {
            this.modalData = data.data;
            this.modalType = data.type;

            this.$store.dispatch('toggleModal', 1);
        },
    }
}
</script>

<style lang="scss" scoped>


</style>
