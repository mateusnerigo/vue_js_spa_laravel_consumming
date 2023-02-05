<template>
    <Modal
        :headerText="$t($store.state.confirmModalProps.title)"
        :size="'sm'"
        :confirmButtonOptions="this.confirmButtonOptions"
        :cancelButtonOptions="this.cancelButtonOptions"
        @emitCallback="this.$store.dispatch($store.state.confirmModalProps.callbackFn)"
    >
        <div class="confirm-modal-body">
            <div class="confirm-modal-icon">
                <div class="material-symbols-outlined">error</div>
            </div>

            <div class="confirm-modal-text">
                {{ $t($store.state.confirmModalProps.text) }}
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
    name: 'EditSalePointModal',
    props: {
        type: String,
        title: String,
        text: String
    },
    components: {
        Modal,
    },
    data() {
        return {
            confirmButtonOptions: {
                "text": "confirm",
                "innerText": "confirm",
                "type" : "deactivate",
                "show": "true"
            },
            cancelButtonOptions: {
                "text": "close",
                "innerText": "close",
                "show": "true"
            },
        }
    },
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.confirm-modal-body {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding: 0 1.5rem;

    .confirm-modal-icon {
        .material-symbols-outlined {
            width: 100%;
            color: $yellow;
            font-size: 2.5rem;
            margin-right: 1.5rem;
        }

    }
    .confirm-modal-text {
        color: $dark_gray
    }
}
</style>

