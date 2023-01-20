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
                {{ $t(headerText) }}

                <button
                    class="close-modal-button"
                    @click="$emit('dismissModal')"
                >×</button>
            </div>

            <slot></slot>

            <div class="modal-footer">
                fazer footer
            </div>
        </div>
    </div>
</template>

<script>
const modalScreenContainer = document.getElementById('modal-screen-container');

export default {
    name: 'Modal',
    props: {
        size: {
            type: String,
            default: 'sm'
        },
        headerText: String,
    },
    components: {

    },
    methods: {
        dismissModal() {
            document
                .getElementById('modal-container')
                .addEventListener('click', (e) => {
                    e.stopPropagation();
                });

            modalScreenContainer.style.opacity = 0;

            setTimeout(() => {
                modalScreenContainer.style.zIndex = -1
            }, 200)

        },

        showModal() {
            modalScreenContainer.style.opacity = 0;

            setTimeout(() => {
                modalScreenContainer.style.zIndex = -1
            }, 200)
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

    .blur {
        position: absolute;
        top: 0;
        left: 0;
    }

    #modal-container {
        padding: 1rem;
        background: $white;
        box-shadow: 0px 0px 10px 2px $dark_white;
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
    }
}

</style>
