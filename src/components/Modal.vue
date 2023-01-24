<template>
        <div
            id="modal-screen-container"
            @click="dismissModal"
        >
            <div
                id="modal-container"
                :class="size"
            >
                <div class="modal-header">
                    {{ headerText }}

                    <button
                        class="close-modal-button"
                        @click="dismissModal"
                    >×</button>
                </div>

                <slot></slot>

                <div class="modal-footer">
                    <div class="modal-footer-buttons">
                        <IconButton
                            v-if="cancelButtonOptions.show"
                            :icon="cancelButtonOptions.icon"
                            :text="cancelButtonOptions.text"
                            :innerText="cancelButtonOptions.innerText"
                            @click="dismissModal"
                        />

                        <IconButton
                            v-if="confirmButtonOptions.show"
                            :icon="confirmButtonOptions.icon"
                            :text="confirmButtonOptions.text"
                            :innerText="confirmButtonOptions.innerText"
                            @click="this.emitCallback"
                        />
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import IconButton from './IconButton.vue';

export default {
    name: 'Modal',
    props: {
        size: {
            type: String,
            default: 'sm'
        },
        confirmButtonOptions: {
            type: Object,
            default: {
                "text": "confirm",
                "show": false
            }
        },
        cancelButtonOptions: {
            type: Object,
            default: {
                "text": "cancel",
                "show": false
            }
        },
        headerText: String,
    },
    components: {
        IconButton
    },
    mounted() {
        document
            .getElementById('modal-container')
            .addEventListener('click', (e) => {
                e.stopPropagation();
            });
    },
    methods: {
        dismissModal() {
            this.$store.dispatch('toggleModal', 0);
        },
        emitCallback() {
            this.$emit('emitCallback');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

#modal-screen-container {
    position: absolute;
    top: 0;
    left: $sidebar_wraped_width;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    width: calc(100vw - $sidebar_wraped_width);
    height: 100vh;
    background: $transparent_dark_white;
    opacity: 1;
    transition: .2s opacity;

    #modal-container {
        padding: 1rem;
        background: $white;
        box-shadow: 0px 0px 10px 2px $shadow_black;
        border-radius: 0.5rem;

        max-height: 80vh;
        max-width: 70vw;
        overflow-x: hidden;

        &.sm {
            width: 450px
        }

        &.md {
            width: 650px
        }

        &.lg {
            width: 70vw
        }

        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.5rem;
            font-weight: 400;

            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid $dark_white;

            .close-modal-button {
                background: transparent;
                color: $red;
                font-size: 1.25rem;
                font-weight: 800;
            }
        }

        .modal-footer {
            display: flex;
            justify-content: flex-end;
            .modal-footer-buttons {
                display: flex;

            }
        }
    }
}
</style>

