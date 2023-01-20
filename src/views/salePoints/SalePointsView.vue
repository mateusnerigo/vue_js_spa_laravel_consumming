<template>
    <div class="page-container">
        <h1>{{ $t("SalePoints") }}</h1>
        <Datatable
            :registers="this.salePoints"
            :identifier="this.identifier"
            :textFields="this.textFields"
        />

        <SalePointModal
            v-if="showModal"
            :type="modalType"
        />
    </div>
</template>

<script>
import axios from 'axios';
import generalFunctions from '@/helpers/generalFunctions';

import Datatable from '@/components/Datatable.vue';
import SalePointModal from '@/components/SalePointModal.vue';

const salePointsRoute = `${process.env.VUE_APP_ROOT_API}/salePoints`;

export default {
    name: 'SalePointsView',
    components: {
        Datatable,
        SalePointModal
    },
    data() {
        return {
            salePoints: [],
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
            showModal: false,
            modalType: '',

        }
    },

    created() {
        this.getSalePoints();
    },

    watch: {
        dtPage(newDtPage) {
            this.getSalePoints();
        },

        dtPerPage(newDtPerPage) {
            this.getSalePoints();
        },

        dtSearch(newDtSearch) {
            this.getSalePoints();
        }
    },

    methods: {
        async getSalePoints() {
            await axios.get(
                generalFunctions.prepareRouteParams({
                    route: salePointsRoute,
                    page: this.dtPage,
                    perPage: this.dtPerPage,
                    search: this.dtSearch
                }),
                {
                    headers: {
                        'Authorization': generalFunctions.getAuthorization()
                    }
                },
            ).then(response => {
                console.log(response.data)
                if(response.data.total > 0) {
                    this.dtPage = (response.data.current_page > response.data.last_page) ? 1 : this.dtPage;
                    this.salePoints = response.data;
                }
            }).catch(() => {
                this.$router.push('/loginSuccess');
            });
        },

        showEditModal() {
            this.showModal = true;
            this.modalType= 'edit';
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
