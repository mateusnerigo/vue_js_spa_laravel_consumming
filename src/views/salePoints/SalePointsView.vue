<template>
    <div>
        <h1>Sale points</h1>
        <div v-for="salePoint in salePoints" :key="salePoint.idSalePoints">
            {{ salePoint.salePointName }}
        </div>
    </div>
</template>

<script>
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
        
    }
}
</script>

<style lang="scss" scoped>

</style>
