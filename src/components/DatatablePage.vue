<template>
    <div class="page-container">
        <div class="page-container-header">
            <h1>{{ this.headerTitle }}</h1>

            <IconButton
                :icon="'add'"
                :text="'add'"
                :innerText="this.addRegisterText"
                @click="this.showModal('New')"
            />
        </div>

        <Datatable
            :registers="$store.state.registers[this.registersKey]"
            :identifier="this.identifier"
            :textFields="this.datatableTextFields"
        />

        <transition name="modal-fade" appear>
            <slot>

            </slot>
        </transition>
    </div>
</template>

<script>
import Datatable from '@/components/Datatable.vue';
import IconButton from '@/components/IconButton.vue';

export default {
    name: 'DatatablePage',
    components: {
        Datatable,
        IconButton,
    },
    props: {
        headerTitle: {
            type: String,
            required: true
        },
        registersKey: {
            type: String,
            required: true
        },
        identifier: {
            type: String,
            required: true
        },
        nameField: {
            type: String,
            required: true
        },
        datatableTextFields: {
            type: Array,
            required: true
        },
        callbackUpdateDatatableOptions: {
            type: String,
            required: true
        }
    },
    data() {
       return {
           dtPage: 1,
           dtPerPage: 10,
           dtSearch: '',
           addRegisterText: this.$t("New")
       }
    },
    created() {
        this.$emit('getRegisters');
    },

    watch: {
        dtPage(newDtPage) {
            this.$store.dispatch(this.callbackUpdateDatatableOptions, {
                page: this.dtPage,
                perPage: this.dtPerPage,
                search: this.dtSearch
            })
            this.$emit('getRegisters', true);
        },

        dtPerPage(newDtPerPage) {
            this.$store.dispatch(this.callbackUpdateDatatableOptions, {
                page: this.dtPage,
                perPage: this.dtPerPage,
                search: this.dtSearch
            })
            this.$emit('getRegisters', true);
        },

        dtSearch(newDtSearch) {
            this.$store.dispatch(this.callbackUpdateDatatableOptions, {
                page: this.dtPage,
                perPage: this.dtPerPage,
                search: this.dtSearch
            })
            this.$emit('getRegisters', true);
        }
    },

    methods: {
        showModal(type, data) {
            this.$emit('showModal', { data, type });
        },

        toggleRegister(registerData) {
            this.$emit('toggleRegister', registerData);
        },

        showConfirmModal(registerData, type) {
            this.$store.dispatch('setConfirmModalData', {
                type,
                callback: 'toggleRegister',
                data: {
                    registerIdToToggle: registerData[this.identifier],
                    registerName: registerData[this.nameField],
                    registerStatus: registerData.isActive,
                    route: this.registersKey
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
