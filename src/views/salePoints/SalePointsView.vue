<template>
    <div>
        <h1>Sale points</h1>
        <div v-for="salePoint in salePoints" :key="salePoint.idSalePoints">
            {{ salePoint.salePointName }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SalePointsView',
    data() {
        return {
            msg: null,
            msgType: null,
            salePoints: []
        }
    },

    mounted() {

    },

    created() {
        fetch('http://localhost:8000/api/salePoints')
            .then(response => response.json())
            .then(res => {
                this.msg = res.msg;
                this.msgType = res.type;
                this.salePoints = res.data;
            });
    }
}
</script>

<style lang="scss" scoped>

</style>
