<template>
    <div class="page-container">
        <h1>{{ $t("SalePoints") }}</h1>
        <Datatable
            :registers="this.salePoints"
            :identifier="this.identifier"
            :textFields="this.textFields"
        />
    </div>
</template>

<script>
import axios from 'axios';
import generalFunctions from '@/helpers/generalFunctions';

import Datatable from '@/components/Datatable.vue';

const salePointsRoute = `${process.env.VUE_APP_ROOT_API}/salePoints`;

export default {
    name: 'SalePointsView',
    components: {
        Datatable
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
        }
    },

    mounted() {
    },

    created() {
        this.getSalePoints();
    },

    methods: {
        async getSalePoints(page, perPage, search) {
            this.salePoints = [];

            await axios.get(
                salePointsRoute,
                {
                    headers: {
                        'Authorization': generalFunctions.getAuthorization()
                    }
                },
            ).then(response => {
                this.salePoints = response.data;
            });
        }
    }
}
</script>

<style lang="scss" scoped>


</style>
