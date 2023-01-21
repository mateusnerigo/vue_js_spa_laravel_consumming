<template>
    <div class="page-container">
        <div class="page-container-header">
            <h1>{{ $t("SalePoints") }}</h1>

            <IconButton
                :icon="'add'"
                :text="'add'"
                :innerText="this.addRegisterText"
                @click="this.showModal('New')"
            />
        </div>

        <Datatable
            :registers="$store.state.salePoints"
            :identifier="this.identifier"
            :textFields="this.textFields"
        />

        <transition name="modal-fade" appear>
            <SalePointModal
                v-if="$store.state.isModalActive"
                :type="this.modalType"
            />
        </transition>

    </div>
</template>

<script>
import Datatable from '@/components/Datatable.vue';
import IconButton from '@/components/IconButton.vue';
import SalePointModal from '@/components/SalePointModal.vue';

export default {
    name: 'SalePointsView',
    components: {
        Datatable,
        SalePointModal,
        IconButton
    },
    data() {
        return {
            identifier: 'idSalePoints',
            textFields: [
                { 'name': 'status', 'field': 'isActive'} ,
                { 'name': 'id', 'field': 'idSalePoints' },
                { 'name': 'name', 'field': 'salePointName' },
                { 'name': 'lastUpdate', 'field': 'updatedAt' }
            ],
            dtPage: 1,
            dtPerPage: 3,
            dtSearch: '',
            modalType: '',
            addRegisterText: this.$t("novo")
        }
    },

    created() {
        this.getSalePoints();
    },

    watch: {
        dtPage(newDtPage) {
            this.getSalePoints(true);
        },

        dtPerPage(newDtPerPage) {
            this.getSalePoints(true);
        },

        dtSearch(newDtSearch) {
            this.getSalePoints(true);
        }
    },

    methods: {
        getSalePoints(updateList = false) {
            this.$store.dispatch('getSalePoints', {
                updateList,
                page: this.dtPage,
                perPage: this.dtPerPage,
                search: this.dtSearch
            });
        },

        showModal(type) {
            this.$store.dispatch('toggleModal', 1);
            this.modalType= type;
        },

        updateDtPage(newDtPage) {
            this.dtPage = newDtPage;
        },

        updateDtPerPage(newDtPerPage) {
            this.dtPerPage = newDtPerPage;
        },

        updateDtSearch(newDtSearch) {
            this.dtSearch = newDtSearch;
        }
    }
}
</script>

<style lang="scss" scoped>


</style>
