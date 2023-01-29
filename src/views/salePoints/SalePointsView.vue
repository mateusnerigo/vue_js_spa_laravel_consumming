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

        <transition name="modal-fade" appear>
            <ConfirmModal
                v-if="$store.state.isConfirmModalActive"
            />
        </transition>

    </div>
</template>

<script>
import Datatable from '@/components/Datatable.vue';
import IconButton from '@/components/IconButton.vue';
import SalePointModal from '@/components/SalePointModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';

import generalFunctions from '@/helpers/generalFunctions';

export default {
    name: 'SalePointsView',
    components: {
        Datatable,
        SalePointModal,
        ConfirmModal,
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
            dtPerPage: 10,
            dtSearch: '',
            modalType: '',
            salePointData: {},
            confirmModalTitle: '',
            confirmModalText: '',
            addRegisterText: this.$t("New")
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
            this.modalType = type;
        },

        toggleRegister(registerData) {
            this.salePointData = {
                idSalePoints: registerData.idSalePoints,
                isActive: registerData.isActive
            };
        },

        showConfirmModal(salePointData, type) {
            generalFunctions.handleConfirmModalTexts(type);

            this.$store.dispatch('toggleConfirmModal', 1);
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
