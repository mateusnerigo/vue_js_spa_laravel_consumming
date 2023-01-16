<template>
    <h1>{{ $t("Products") }}</h1>
</template>

<script>
import generalFunctions from '@/helpers/generalFunctions';
import axios from 'axios';

const productsRoute = `${process.env.VUE_APP_ROOT_API}/products`;

export default {
    name: 'ProductsView',
    components: {},
    data() {
        products: []
    },
    created() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            this.products = [];

            await axios.get(
                productsRoute,
                {
                    headers: {
                        'Authorization': generalFunctions.getAuthorization()
                    }
                },
            ).then(response => {
                this.products = response.data;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
