<template>
    <DatatablePage
        :headerTitle="this.headerTitle"
        :registersKey="'clients'"
        :registersGetter="'getClients'"
        :identifier="'idClients'"
        :nameField="'clientName'"
        :datatableTextFields="this.datatableTextFields"
        :callbackUpdateDatatableOptions="'setClientsDatatableOptions'"
        @showModal="showClientsModal"
    >
        <ClientModal
            v-if="$store.state.isModalActive"
            :type="this.modalType"
            :registerData="this.modalData"
        />
    </DatatablePage>
</template>

<script>
import DatatablePage from '@/components/DatatablePage.vue';
import ClientModal from '@/components/ClientModal.vue';

export default {
    name: 'ClientsView',
    components: {
        DatatablePage,
        ClientModal,
    },
    data() {
        return {
            headerTitle: this.$t('Clients'),
            datatableTextFields: [

            ],
            modalType: '',
            modalData: {},
        }
    },
    methods: {
        showClientsModal(data) {
            this.modalData = data.data;
            this.modalType = data.type;

            this.$store.dispatch('toggleModal', 1);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
