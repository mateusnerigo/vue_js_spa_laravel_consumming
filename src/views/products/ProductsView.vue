<template>
    <div class="page-container">
        <div class="page-container-header">
            <h1>{{ $t("Products") }}</h1>

            <IconButton
                :icon="'add'"
                :text="'add'"
                :innerText="this.addRegisterText"
                @click="this.showModal('New')"
            />
        </div>

        <Datatable
            :registers="$store.state.registers.products"
            :identifier="this.identifier"
            :textFields="this.textFields"
        />

        <transition name="modal-fade" appear>
            <ProductModal
                v-if="$store.state.isModalActive"
                :type="this.modalType"
                :registerData="this.modalData"
            />
        </transition>
    </div>
</template>

<script>
import Datatable from '@/components/Datatable.vue';
import IconButton from '@/components/IconButton.vue';
import ProductModal from '@/components/ProductModal.vue';

const productsRoute = `${process.env.VUE_APP_ROOT_API}/products`;

export default {
    name: 'ProductsView',
    components: {
        Datatable,
        IconButton,
        ProductModal
    },
    data() {
       return {
           identifier: 'idProducts',
           textFields: [
               { 'name': 'status', 'field': 'isActive' },
               { 'name': 'id', 'field': 'idProducts' },
               { 'name': 'name', 'field': 'productName' },
               { 'name': 'standardValue', 'field': 'standardValue' },
               { 'name': 'lastUpdate', 'field': 'updatedAt' }
           ],
           dtPage: 1,
           dtPerPage: 10,
           dtSearch: '',
           modalType: '',
           modalData: {},
           productData: {},
           addRegisterText: this.$t("New")
       }
    },
    created() {
        this.getProducts();
    },

    watch: {
        dtPage(newDtPage) {
            this.getProducts(true);
        },

        dtPerPage(newDtPerPage) {
            this.getProducts(true);
        },

        dtSearch(newDtSearch) {
            this.getProducts(true);
        }
    },

    methods: {
        getProducts(updateList = false) {
            this.$store.dispatch('setProductsDatatableOptions', {
                page: this.dtPage,
                perPage: this.dtPerPage,
                search: this.dtSearch
            })
            this.$store.dispatch('getProducts', updateList);
        },

        showModal(type, data) {
            this.modalData = data;
            this.modalType = type;

            this.$store.dispatch('toggleModal', 1);
        },

        toggleRegister(registerData) {
            this.productData = {
                idProducts: registerData.idProducts,
                isActive: registerData.isActive
            };
        },

        showConfirmModal(productData, type) {
            this.$store.dispatch('setConfirmModalData', {
                type,
                callback: 'toggleRegister',
                data: {
                    registerIdToToggle: productData.idProducts,
                    registerName: productData.productName,
                    registerStatus: productData.isActive,
                    route: 'products'
                }
            });
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
