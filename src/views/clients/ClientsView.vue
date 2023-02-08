<template>
    <div class="page-container">
        <div class="page-container-header">
            <h1>{{ $t('Clients') }}</h1>


        </div>
    </div>
</template>

<script>
import Datatable from '@/components/Datatable.vue';
import IconButton from '@/components/IconButton.vue';

export default {
    name: 'ClientsView',
    components: {
        Datatable,
        IconButton,
        // ClientModal
    }
}
</script>

<style lang="scss" scoped>

</style>
